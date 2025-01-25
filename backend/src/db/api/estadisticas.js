const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class EstadisticasDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const estadisticas = await db.estadisticas.create(
      {
        id: data.id || undefined,

        tipo_estadistica: data.tipo_estadistica || null,
        fecha: data.fecha || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await estadisticas.setUsuario(data.usuario || null, {
      transaction,
    });

    await estadisticas.setDepartamento(data.departamento || null, {
      transaction,
    });

    await estadisticas.setCooperativadetaxi(data.cooperativadetaxi || null, {
      transaction,
    });

    return estadisticas;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const estadisticasData = data.map((item, index) => ({
      id: item.id || undefined,

      tipo_estadistica: item.tipo_estadistica || null,
      fecha: item.fecha || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const estadisticas = await db.estadisticas.bulkCreate(estadisticasData, {
      transaction,
    });

    // For each item created, replace relation files

    return estadisticas;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const estadisticas = await db.estadisticas.findByPk(
      id,
      {},
      { transaction },
    );

    await estadisticas.update(
      {
        tipo_estadistica: data.tipo_estadistica || null,
        fecha: data.fecha || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await estadisticas.setUsuario(data.usuario || null, {
      transaction,
    });

    await estadisticas.setDepartamento(data.departamento || null, {
      transaction,
    });

    await estadisticas.setCooperativadetaxi(data.cooperativadetaxi || null, {
      transaction,
    });

    return estadisticas;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const estadisticas = await db.estadisticas.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of estadisticas) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of estadisticas) {
        await record.destroy({ transaction });
      }
    });

    return estadisticas;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const estadisticas = await db.estadisticas.findByPk(id, options);

    await estadisticas.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await estadisticas.destroy({
      transaction,
    });

    return estadisticas;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const estadisticas = await db.estadisticas.findOne(
      { where },
      { transaction },
    );

    if (!estadisticas) {
      return estadisticas;
    }

    const output = estadisticas.get({ plain: true });

    output.usuario = await estadisticas.getUsuario({
      transaction,
    });

    output.departamento = await estadisticas.getDepartamento({
      transaction,
    });

    output.cooperativadetaxi = await estadisticas.getCooperativadetaxi({
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
        model: db.usuarios,
        as: 'usuario',

        where: filter.usuario
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.usuario
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  nombre: {
                    [Op.or]: filter.usuario
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },

      {
        model: db.departamentos,
        as: 'departamento',

        where: filter.departamento
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.departamento
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  nombre_departamento: {
                    [Op.or]: filter.departamento
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

      if (filter.fechaRange) {
        const [start, end] = filter.fechaRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            fecha: {
              ...where.fecha,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            fecha: {
              ...where.fecha,
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

      if (filter.tipo_estadistica) {
        where = {
          ...where,
          tipo_estadistica: filter.tipo_estadistica,
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
      const { rows, count } = await db.estadisticas.findAndCountAll(
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
          Utils.ilike('estadisticas', 'tipo_estadistica', query),
        ],
      };
    }

    const records = await db.estadisticas.findAll({
      attributes: ['id', 'tipo_estadistica'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['tipo_estadistica', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.tipo_estadistica,
    }));
  }
};
