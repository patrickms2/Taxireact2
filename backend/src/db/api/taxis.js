const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class TaxisDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const taxis = await db.taxis.create(
      {
        id: data.id || undefined,

        matricula: data.matricula || null,
        marca: data.marca || null,
        modelo: data.modelo || null,
        año: data.año || null,
        color: data.color || null,
        estado: data.estado || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await taxis.setTaxista(data.taxista || null, {
      transaction,
    });

    await taxis.setCooperativadetaxi(data.cooperativadetaxi || null, {
      transaction,
    });

    return taxis;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const taxisData = data.map((item, index) => ({
      id: item.id || undefined,

      matricula: item.matricula || null,
      marca: item.marca || null,
      modelo: item.modelo || null,
      año: item.año || null,
      color: item.color || null,
      estado: item.estado || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const taxis = await db.taxis.bulkCreate(taxisData, { transaction });

    // For each item created, replace relation files

    return taxis;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const taxis = await db.taxis.findByPk(id, {}, { transaction });

    await taxis.update(
      {
        matricula: data.matricula || null,
        marca: data.marca || null,
        modelo: data.modelo || null,
        año: data.año || null,
        color: data.color || null,
        estado: data.estado || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await taxis.setTaxista(data.taxista || null, {
      transaction,
    });

    await taxis.setCooperativadetaxi(data.cooperativadetaxi || null, {
      transaction,
    });

    return taxis;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const taxis = await db.taxis.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of taxis) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of taxis) {
        await record.destroy({ transaction });
      }
    });

    return taxis;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const taxis = await db.taxis.findByPk(id, options);

    await taxis.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await taxis.destroy({
      transaction,
    });

    return taxis;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const taxis = await db.taxis.findOne({ where }, { transaction });

    if (!taxis) {
      return taxis;
    }

    const output = taxis.get({ plain: true });

    output.localizacion_taxis_taxi = await taxis.getLocalizacion_taxis_taxi({
      transaction,
    });

    output.servicios_taxi_taxi = await taxis.getServicios_taxi_taxi({
      transaction,
    });

    output.taxista = await taxis.getTaxista({
      transaction,
    });

    output.cooperativadetaxi = await taxis.getCooperativadetaxi({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    let where = {};
    const currentPage = +filter.page;

    const user = (options && options.currentUser) || null;
    const userCooperativadetaxis =
      (user && user.CooperativadeTaxis?.id) || null;

    if (userCooperativadetaxis) {
      if (options?.currentUser?.CooperativadeTaxisId) {
        where.CooperativadeTaxisId = options.currentUser.CooperativadeTaxisId;
      }
    }

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;

    let include = [
      {
        model: db.taxistas,
        as: 'taxista',

        where: filter.taxista
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.taxista
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  nombre: {
                    [Op.or]: filter.taxista
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },

      {
        model: db.cooperativadetaxis,
        as: 'cooperativadetaxi',

        where: filter.cooperativadetaxi
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.cooperativadetaxi
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  name: {
                    [Op.or]: filter.cooperativadetaxi
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.matricula) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('taxis', 'matricula', filter.matricula),
        };
      }

      if (filter.marca) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('taxis', 'marca', filter.marca),
        };
      }

      if (filter.modelo) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('taxis', 'modelo', filter.modelo),
        };
      }

      if (filter.color) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('taxis', 'color', filter.color),
        };
      }

      if (filter.añoRange) {
        const [start, end] = filter.añoRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            año: {
              ...where.año,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            año: {
              ...where.año,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.estado) {
        where = {
          ...where,
          estado: filter.estado,
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    if (globalAccess) {
      delete where.organizationId;
    }

    const queryOptions = {
      where,
      include,
      distinct: true,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction: options?.transaction,
      logging: console.log,
    };

    if (!options?.countOnly) {
      queryOptions.limit = limit ? Number(limit) : undefined;
      queryOptions.offset = offset ? Number(offset) : undefined;
    }

    try {
      const { rows, count } = await db.taxis.findAndCountAll(queryOptions);

      return {
        rows: options?.countOnly ? [] : rows,
        count: count,
      };
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  static async findAllAutocomplete(
    query,
    limit,
    offset,
    globalAccess,
    organizationId,
  ) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('taxis', 'matricula', query),
        ],
      };
    }

    const records = await db.taxis.findAll({
      attributes: ['id', 'matricula'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['matricula', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.matricula,
    }));
  }
};
