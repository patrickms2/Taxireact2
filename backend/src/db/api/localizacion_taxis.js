const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Localizacion_taxisDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const localizacion_taxis = await db.localizacion_taxis.create(
      {
        id: data.id || undefined,

        latitud: data.latitud || null,
        longitud: data.longitud || null,
        ultima_actualizacion: data.ultima_actualizacion || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await localizacion_taxis.setTaxi(data.taxi || null, {
      transaction,
    });

    await localizacion_taxis.setCooperativadetaxi(
      data.cooperativadetaxi || null,
      {
        transaction,
      },
    );

    return localizacion_taxis;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const localizacion_taxisData = data.map((item, index) => ({
      id: item.id || undefined,

      latitud: item.latitud || null,
      longitud: item.longitud || null,
      ultima_actualizacion: item.ultima_actualizacion || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const localizacion_taxis = await db.localizacion_taxis.bulkCreate(
      localizacion_taxisData,
      { transaction },
    );

    // For each item created, replace relation files

    return localizacion_taxis;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const localizacion_taxis = await db.localizacion_taxis.findByPk(
      id,
      {},
      { transaction },
    );

    await localizacion_taxis.update(
      {
        latitud: data.latitud || null,
        longitud: data.longitud || null,
        ultima_actualizacion: data.ultima_actualizacion || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await localizacion_taxis.setTaxi(data.taxi || null, {
      transaction,
    });

    await localizacion_taxis.setCooperativadetaxi(
      data.cooperativadetaxi || null,
      {
        transaction,
      },
    );

    return localizacion_taxis;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const localizacion_taxis = await db.localizacion_taxis.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of localizacion_taxis) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of localizacion_taxis) {
        await record.destroy({ transaction });
      }
    });

    return localizacion_taxis;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const localizacion_taxis = await db.localizacion_taxis.findByPk(
      id,
      options,
    );

    await localizacion_taxis.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await localizacion_taxis.destroy({
      transaction,
    });

    return localizacion_taxis;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const localizacion_taxis = await db.localizacion_taxis.findOne(
      { where },
      { transaction },
    );

    if (!localizacion_taxis) {
      return localizacion_taxis;
    }

    const output = localizacion_taxis.get({ plain: true });

    output.taxi = await localizacion_taxis.getTaxi({
      transaction,
    });

    output.cooperativadetaxi = await localizacion_taxis.getCooperativadetaxi({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.taxis,
        as: 'taxi',
      },

      {
        model: db.cooperativadetaxis,
        as: 'cooperativadetaxi',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.latitudRange) {
        const [start, end] = filter.latitudRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            latitud: {
              ...where.latitud,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            latitud: {
              ...where.latitud,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.longitudRange) {
        const [start, end] = filter.longitudRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            longitud: {
              ...where.longitud,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            longitud: {
              ...where.longitud,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.ultima_actualizacionRange) {
        const [start, end] = filter.ultima_actualizacionRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ultima_actualizacion: {
              ...where.ultima_actualizacion,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ultima_actualizacion: {
              ...where.ultima_actualizacion,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.taxi) {
        const listItems = filter.taxi.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          taxiId: { [Op.or]: listItems },
        };
      }

      if (filter.cooperativadetaxi) {
        const listItems = filter.cooperativadetaxi.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          cooperativadetaxiId: { [Op.or]: listItems },
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

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.localizacion_taxis.count({
            where: globalAccess ? {} : where,
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.localizacion_taxis.findAndCountAll({
          where: globalAccess ? {} : where,
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
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
          Utils.ilike('localizacion_taxis', 'taxi', query),
        ],
      };
    }

    const records = await db.localizacion_taxis.findAll({
      attributes: ['id', 'taxi'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['taxi', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.taxi,
    }));
  }
};
