const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class TurnosDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const turnos = await db.turnos.create(
      {
        id: data.id || undefined,

        fecha: data.fecha || null,
        hora_inicio: data.hora_inicio || null,
        hora_fin: data.hora_fin || null,
        estado_turno: data.estado_turno || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await turnos.setUsuario(data.usuario || null, {
      transaction,
    });

    await turnos.setCooperativadetaxi(data.cooperativadetaxi || null, {
      transaction,
    });

    return turnos;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const turnosData = data.map((item, index) => ({
      id: item.id || undefined,

      fecha: item.fecha || null,
      hora_inicio: item.hora_inicio || null,
      hora_fin: item.hora_fin || null,
      estado_turno: item.estado_turno || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const turnos = await db.turnos.bulkCreate(turnosData, { transaction });

    // For each item created, replace relation files

    return turnos;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const turnos = await db.turnos.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.fecha !== undefined) updatePayload.fecha = data.fecha;

    if (data.hora_inicio !== undefined)
      updatePayload.hora_inicio = data.hora_inicio;

    if (data.hora_fin !== undefined) updatePayload.hora_fin = data.hora_fin;

    if (data.estado_turno !== undefined)
      updatePayload.estado_turno = data.estado_turno;

    updatePayload.updatedById = currentUser.id;

    await turnos.update(updatePayload, { transaction });

    if (data.usuario !== undefined) {
      await turnos.setUsuario(
        data.usuario,

        { transaction },
      );
    }

    if (data.cooperativadetaxi !== undefined) {
      await turnos.setCooperativadetaxi(
        data.cooperativadetaxi,

        { transaction },
      );
    }

    return turnos;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const turnos = await db.turnos.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of turnos) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of turnos) {
        await record.destroy({ transaction });
      }
    });

    return turnos;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const turnos = await db.turnos.findByPk(id, options);

    await turnos.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await turnos.destroy({
      transaction,
    });

    return turnos;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const turnos = await db.turnos.findOne({ where }, { transaction });

    if (!turnos) {
      return turnos;
    }

    const output = turnos.get({ plain: true });

    output.usuario = await turnos.getUsuario({
      transaction,
    });

    output.cooperativadetaxi = await turnos.getCooperativadetaxi({
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

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              hora_inicio: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              hora_fin: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
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

      if (filter.hora_inicioRange) {
        const [start, end] = filter.hora_inicioRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            hora_inicio: {
              ...where.hora_inicio,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            hora_inicio: {
              ...where.hora_inicio,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.hora_finRange) {
        const [start, end] = filter.hora_finRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            hora_fin: {
              ...where.hora_fin,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            hora_fin: {
              ...where.hora_fin,
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

      if (filter.estado_turno) {
        where = {
          ...where,
          estado_turno: filter.estado_turno,
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
      const { rows, count } = await db.turnos.findAndCountAll(queryOptions);

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
          Utils.ilike('turnos', 'usuario', query),
        ],
      };
    }

    const records = await db.turnos.findAll({
      attributes: ['id', 'usuario'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['usuario', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.usuario,
    }));
  }
};
