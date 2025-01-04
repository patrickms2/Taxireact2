const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class DepartamentosDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const departamentos = await db.departamentos.create(
      {
        id: data.id || undefined,

        nombre_departamento: data.nombre_departamento || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await departamentos.setCooperativadetaxi(data.cooperativadetaxi || null, {
      transaction,
    });

    return departamentos;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const departamentosData = data.map((item, index) => ({
      id: item.id || undefined,

      nombre_departamento: item.nombre_departamento || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const departamentos = await db.departamentos.bulkCreate(departamentosData, {
      transaction,
    });

    // For each item created, replace relation files

    return departamentos;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const departamentos = await db.departamentos.findByPk(
      id,
      {},
      { transaction },
    );

    await departamentos.update(
      {
        nombre_departamento: data.nombre_departamento || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await departamentos.setCooperativadetaxi(data.cooperativadetaxi || null, {
      transaction,
    });

    return departamentos;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const departamentos = await db.departamentos.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of departamentos) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of departamentos) {
        await record.destroy({ transaction });
      }
    });

    return departamentos;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const departamentos = await db.departamentos.findByPk(id, options);

    await departamentos.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await departamentos.destroy({
      transaction,
    });

    return departamentos;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const departamentos = await db.departamentos.findOne(
      { where },
      { transaction },
    );

    if (!departamentos) {
      return departamentos;
    }

    const output = departamentos.get({ plain: true });

    output.documentos_departamento =
      await departamentos.getDocumentos_departamento({
        transaction,
      });

    output.estadisticas_departamento =
      await departamentos.getEstadisticas_departamento({
        transaction,
      });

    output.cooperativadetaxi = await departamentos.getCooperativadetaxi({
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

      if (filter.nombre_departamento) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'departamentos',
            'nombre_departamento',
            filter.nombre_departamento,
          ),
        };
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
          count: await db.departamentos.count({
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
      : await db.departamentos.findAndCountAll({
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
          Utils.ilike('departamentos', 'nombre_departamento', query),
        ],
      };
    }

    const records = await db.departamentos.findAll({
      attributes: ['id', 'nombre_departamento'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['nombre_departamento', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.nombre_departamento,
    }));
  }
};
