const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CooperativadetaxisDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cooperativadetaxis = await db.cooperativadetaxis.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return cooperativadetaxis;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const cooperativadetaxisData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const cooperativadetaxis = await db.cooperativadetaxis.bulkCreate(
      cooperativadetaxisData,
      { transaction },
    );

    // For each item created, replace relation files

    return cooperativadetaxis;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const cooperativadetaxis = await db.cooperativadetaxis.findByPk(
      id,
      {},
      { transaction },
    );

    await cooperativadetaxis.update(
      {
        name: data.name || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return cooperativadetaxis;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cooperativadetaxis = await db.cooperativadetaxis.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of cooperativadetaxis) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of cooperativadetaxis) {
        await record.destroy({ transaction });
      }
    });

    return cooperativadetaxis;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cooperativadetaxis = await db.cooperativadetaxis.findByPk(
      id,
      options,
    );

    await cooperativadetaxis.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await cooperativadetaxis.destroy({
      transaction,
    });

    return cooperativadetaxis;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const cooperativadetaxis = await db.cooperativadetaxis.findOne(
      { where },
      { transaction },
    );

    if (!cooperativadetaxis) {
      return cooperativadetaxis;
    }

    const output = cooperativadetaxis.get({ plain: true });

    output.users_cooperativadetaxi =
      await cooperativadetaxis.getUsers_cooperativadetaxi({
        transaction,
      });

    output.conductores_cooperativadetaxi =
      await cooperativadetaxis.getConductores_cooperativadetaxi({
        transaction,
      });

    output.departamentos_cooperativadetaxi =
      await cooperativadetaxis.getDepartamentos_cooperativadetaxi({
        transaction,
      });

    output.documentos_cooperativadetaxi =
      await cooperativadetaxis.getDocumentos_cooperativadetaxi({
        transaction,
      });

    output.estadisticas_cooperativadetaxi =
      await cooperativadetaxis.getEstadisticas_cooperativadetaxi({
        transaction,
      });

    output.localizacion_taxis_cooperativadetaxi =
      await cooperativadetaxis.getLocalizacion_taxis_cooperativadetaxi({
        transaction,
      });

    output.pagos_servicios_cooperativadetaxi =
      await cooperativadetaxis.getPagos_servicios_cooperativadetaxi({
        transaction,
      });

    output.servicios_taxi_cooperativadetaxi =
      await cooperativadetaxis.getServicios_taxi_cooperativadetaxi({
        transaction,
      });

    output.taxis_cooperativadetaxi =
      await cooperativadetaxis.getTaxis_cooperativadetaxi({
        transaction,
      });

    output.taxistas_cooperativadetaxi =
      await cooperativadetaxis.getTaxistas_cooperativadetaxi({
        transaction,
      });

    output.turnos_cooperativadetaxi =
      await cooperativadetaxis.getTurnos_cooperativadetaxi({
        transaction,
      });

    output.usuarios_cooperativadetaxi =
      await cooperativadetaxis.getUsuarios_cooperativadetaxi({
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

    let include = [];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('cooperativadetaxis', 'name', filter.name),
        };
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
      const { rows, count } = await db.cooperativadetaxis.findAndCountAll(
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
          Utils.ilike('cooperativadetaxis', 'name', query),
        ],
      };
    }

    const records = await db.cooperativadetaxis.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
