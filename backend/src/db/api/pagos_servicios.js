const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Pagos_serviciosDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pagos_servicios = await db.pagos_servicios.create(
      {
        id: data.id || undefined,

        monto: data.monto || null,
        tipo_pago: data.tipo_pago || null,
        metodo_pago: data.metodo_pago || null,
        fecha_pago: data.fecha_pago || null,
        estado_pago: data.estado_pago || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await pagos_servicios.setServicio_taxi(data.servicio_taxi || null, {
      transaction,
    });

    await pagos_servicios.setCooperativadetaxi(data.cooperativadetaxi || null, {
      transaction,
    });

    return pagos_servicios;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const pagos_serviciosData = data.map((item, index) => ({
      id: item.id || undefined,

      monto: item.monto || null,
      tipo_pago: item.tipo_pago || null,
      metodo_pago: item.metodo_pago || null,
      fecha_pago: item.fecha_pago || null,
      estado_pago: item.estado_pago || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const pagos_servicios = await db.pagos_servicios.bulkCreate(
      pagos_serviciosData,
      { transaction },
    );

    // For each item created, replace relation files

    return pagos_servicios;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const pagos_servicios = await db.pagos_servicios.findByPk(
      id,
      {},
      { transaction },
    );

    await pagos_servicios.update(
      {
        monto: data.monto || null,
        tipo_pago: data.tipo_pago || null,
        metodo_pago: data.metodo_pago || null,
        fecha_pago: data.fecha_pago || null,
        estado_pago: data.estado_pago || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await pagos_servicios.setServicio_taxi(data.servicio_taxi || null, {
      transaction,
    });

    await pagos_servicios.setCooperativadetaxi(data.cooperativadetaxi || null, {
      transaction,
    });

    return pagos_servicios;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pagos_servicios = await db.pagos_servicios.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of pagos_servicios) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of pagos_servicios) {
        await record.destroy({ transaction });
      }
    });

    return pagos_servicios;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pagos_servicios = await db.pagos_servicios.findByPk(id, options);

    await pagos_servicios.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await pagos_servicios.destroy({
      transaction,
    });

    return pagos_servicios;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const pagos_servicios = await db.pagos_servicios.findOne(
      { where },
      { transaction },
    );

    if (!pagos_servicios) {
      return pagos_servicios;
    }

    const output = pagos_servicios.get({ plain: true });

    output.servicio_taxi = await pagos_servicios.getServicio_taxi({
      transaction,
    });

    output.cooperativadetaxi = await pagos_servicios.getCooperativadetaxi({
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
        model: db.servicios_taxi,
        as: 'servicio_taxi',

        where: filter.servicio_taxi
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.servicio_taxi
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  tipo_servicio: {
                    [Op.or]: filter.servicio_taxi
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

      if (filter.montoRange) {
        const [start, end] = filter.montoRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            monto: {
              ...where.monto,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            monto: {
              ...where.monto,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.fecha_pagoRange) {
        const [start, end] = filter.fecha_pagoRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            fecha_pago: {
              ...where.fecha_pago,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            fecha_pago: {
              ...where.fecha_pago,
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

      if (filter.tipo_pago) {
        where = {
          ...where,
          tipo_pago: filter.tipo_pago,
        };
      }

      if (filter.metodo_pago) {
        where = {
          ...where,
          metodo_pago: filter.metodo_pago,
        };
      }

      if (filter.estado_pago) {
        where = {
          ...where,
          estado_pago: filter.estado_pago,
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
      const { rows, count } = await db.pagos_servicios.findAndCountAll(
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
          Utils.ilike('pagos_servicios', 'monto', query),
        ],
      };
    }

    const records = await db.pagos_servicios.findAll({
      attributes: ['id', 'monto'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['monto', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.monto,
    }));
  }
};
