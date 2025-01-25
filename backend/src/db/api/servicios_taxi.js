const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Servicios_taxiDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const servicios_taxi = await db.servicios_taxi.create(
      {
        id: data.id || undefined,

        tipo_servicio: data.tipo_servicio || null,
        fecha_solicitud: data.fecha_solicitud || null,
        fecha_realizacion: data.fecha_realizacion || null,
        estado_servicio: data.estado_servicio || null,
        ubicacion_origen: data.ubicacion_origen || null,
        ubicacion_destino: data.ubicacion_destino || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await servicios_taxi.setTaxi(data.taxi || null, {
      transaction,
    });

    await servicios_taxi.setCooperativadetaxi(data.cooperativadetaxi || null, {
      transaction,
    });

    return servicios_taxi;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const servicios_taxiData = data.map((item, index) => ({
      id: item.id || undefined,

      tipo_servicio: item.tipo_servicio || null,
      fecha_solicitud: item.fecha_solicitud || null,
      fecha_realizacion: item.fecha_realizacion || null,
      estado_servicio: item.estado_servicio || null,
      ubicacion_origen: item.ubicacion_origen || null,
      ubicacion_destino: item.ubicacion_destino || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const servicios_taxi = await db.servicios_taxi.bulkCreate(
      servicios_taxiData,
      { transaction },
    );

    // For each item created, replace relation files

    return servicios_taxi;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const servicios_taxi = await db.servicios_taxi.findByPk(
      id,
      {},
      { transaction },
    );

    await servicios_taxi.update(
      {
        tipo_servicio: data.tipo_servicio || null,
        fecha_solicitud: data.fecha_solicitud || null,
        fecha_realizacion: data.fecha_realizacion || null,
        estado_servicio: data.estado_servicio || null,
        ubicacion_origen: data.ubicacion_origen || null,
        ubicacion_destino: data.ubicacion_destino || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await servicios_taxi.setTaxi(data.taxi || null, {
      transaction,
    });

    await servicios_taxi.setCooperativadetaxi(data.cooperativadetaxi || null, {
      transaction,
    });

    return servicios_taxi;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const servicios_taxi = await db.servicios_taxi.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of servicios_taxi) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of servicios_taxi) {
        await record.destroy({ transaction });
      }
    });

    return servicios_taxi;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const servicios_taxi = await db.servicios_taxi.findByPk(id, options);

    await servicios_taxi.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await servicios_taxi.destroy({
      transaction,
    });

    return servicios_taxi;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const servicios_taxi = await db.servicios_taxi.findOne(
      { where },
      { transaction },
    );

    if (!servicios_taxi) {
      return servicios_taxi;
    }

    const output = servicios_taxi.get({ plain: true });

    output.pagos_servicios_servicio_taxi =
      await servicios_taxi.getPagos_servicios_servicio_taxi({
        transaction,
      });

    output.taxi = await servicios_taxi.getTaxi({
      transaction,
    });

    output.cooperativadetaxi = await servicios_taxi.getCooperativadetaxi({
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
        model: db.taxis,
        as: 'taxi',

        where: filter.taxi
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.taxi
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  matricula: {
                    [Op.or]: filter.taxi
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

      if (filter.ubicacion_origen) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'servicios_taxi',
            'ubicacion_origen',
            filter.ubicacion_origen,
          ),
        };
      }

      if (filter.ubicacion_destino) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'servicios_taxi',
            'ubicacion_destino',
            filter.ubicacion_destino,
          ),
        };
      }

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              fecha_solicitud: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              fecha_realizacion: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
        };
      }

      if (filter.fecha_solicitudRange) {
        const [start, end] = filter.fecha_solicitudRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            fecha_solicitud: {
              ...where.fecha_solicitud,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            fecha_solicitud: {
              ...where.fecha_solicitud,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.fecha_realizacionRange) {
        const [start, end] = filter.fecha_realizacionRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            fecha_realizacion: {
              ...where.fecha_realizacion,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            fecha_realizacion: {
              ...where.fecha_realizacion,
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

      if (filter.tipo_servicio) {
        where = {
          ...where,
          tipo_servicio: filter.tipo_servicio,
        };
      }

      if (filter.estado_servicio) {
        where = {
          ...where,
          estado_servicio: filter.estado_servicio,
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
      const { rows, count } = await db.servicios_taxi.findAndCountAll(
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
          Utils.ilike('servicios_taxi', 'tipo_servicio', query),
        ],
      };
    }

    const records = await db.servicios_taxi.findAll({
      attributes: ['id', 'tipo_servicio'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['tipo_servicio', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.tipo_servicio,
    }));
  }
};
