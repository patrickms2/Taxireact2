const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ConductoresDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const conductores = await db.conductores.create(
      {
        id: data.id || undefined,

        nombre: data.nombre || null,
        apellidos: data.apellidos || null,
        dni: data.dni || null,
        fecha_nacimiento: data.fecha_nacimiento || null,
        licencia_conducir: data.licencia_conducir || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await conductores.setTaxista(data.taxista || null, {
      transaction,
    });

    await conductores.setCooperativadetaxi(data.cooperativadetaxi || null, {
      transaction,
    });

    return conductores;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const conductoresData = data.map((item, index) => ({
      id: item.id || undefined,

      nombre: item.nombre || null,
      apellidos: item.apellidos || null,
      dni: item.dni || null,
      fecha_nacimiento: item.fecha_nacimiento || null,
      licencia_conducir: item.licencia_conducir || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const conductores = await db.conductores.bulkCreate(conductoresData, {
      transaction,
    });

    // For each item created, replace relation files

    return conductores;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const conductores = await db.conductores.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.nombre !== undefined) updatePayload.nombre = data.nombre;

    if (data.apellidos !== undefined) updatePayload.apellidos = data.apellidos;

    if (data.dni !== undefined) updatePayload.dni = data.dni;

    if (data.fecha_nacimiento !== undefined)
      updatePayload.fecha_nacimiento = data.fecha_nacimiento;

    if (data.licencia_conducir !== undefined)
      updatePayload.licencia_conducir = data.licencia_conducir;

    updatePayload.updatedById = currentUser.id;

    await conductores.update(updatePayload, { transaction });

    if (data.taxista !== undefined) {
      await conductores.setTaxista(
        data.taxista,

        { transaction },
      );
    }

    if (data.cooperativadetaxi !== undefined) {
      await conductores.setCooperativadetaxi(
        data.cooperativadetaxi,

        { transaction },
      );
    }

    return conductores;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const conductores = await db.conductores.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of conductores) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of conductores) {
        await record.destroy({ transaction });
      }
    });

    return conductores;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const conductores = await db.conductores.findByPk(id, options);

    await conductores.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await conductores.destroy({
      transaction,
    });

    return conductores;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const conductores = await db.conductores.findOne(
      { where },
      { transaction },
    );

    if (!conductores) {
      return conductores;
    }

    const output = conductores.get({ plain: true });

    output.taxista = await conductores.getTaxista({
      transaction,
    });

    output.cooperativadetaxi = await conductores.getCooperativadetaxi({
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

      if (filter.nombre) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('conductores', 'nombre', filter.nombre),
        };
      }

      if (filter.apellidos) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('conductores', 'apellidos', filter.apellidos),
        };
      }

      if (filter.dni) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('conductores', 'dni', filter.dni),
        };
      }

      if (filter.licencia_conducir) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'conductores',
            'licencia_conducir',
            filter.licencia_conducir,
          ),
        };
      }

      if (filter.fecha_nacimientoRange) {
        const [start, end] = filter.fecha_nacimientoRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            fecha_nacimiento: {
              ...where.fecha_nacimiento,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            fecha_nacimiento: {
              ...where.fecha_nacimiento,
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
      delete where.CooperativadeTaxisId;
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
      const { rows, count } = await db.conductores.findAndCountAll(
        queryOptions,
      );

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
          Utils.ilike('conductores', 'nombre', query),
        ],
      };
    }

    const records = await db.conductores.findAll({
      attributes: ['id', 'nombre'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['nombre', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.nombre,
    }));
  }
};
