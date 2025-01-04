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

    await conductores.update(
      {
        nombre: data.nombre || null,
        apellidos: data.apellidos || null,
        dni: data.dni || null,
        fecha_nacimiento: data.fecha_nacimiento || null,
        licencia_conducir: data.licencia_conducir || null,
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
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.taxistas,
        as: 'taxista',
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

      if (filter.taxista) {
        const listItems = filter.taxista.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          taxistaId: { [Op.or]: listItems },
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
          count: await db.conductores.count({
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
      : await db.conductores.findAndCountAll({
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
