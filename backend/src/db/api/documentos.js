const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class DocumentosDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const documentos = await db.documentos.create(
      {
        id: data.id || undefined,

        nombre: data.nombre || null,
        tipo_documento: data.tipo_documento || null,
        fecha_creacion: data.fecha_creacion || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await documentos.setUsuario(data.usuario || null, {
      transaction,
    });

    await documentos.setDepartamento(data.departamento || null, {
      transaction,
    });

    await documentos.setCooperativadetaxi(data.cooperativadetaxi || null, {
      transaction,
    });

    return documentos;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const documentosData = data.map((item, index) => ({
      id: item.id || undefined,

      nombre: item.nombre || null,
      tipo_documento: item.tipo_documento || null,
      fecha_creacion: item.fecha_creacion || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const documentos = await db.documentos.bulkCreate(documentosData, {
      transaction,
    });

    // For each item created, replace relation files

    return documentos;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const documentos = await db.documentos.findByPk(id, {}, { transaction });

    await documentos.update(
      {
        nombre: data.nombre || null,
        tipo_documento: data.tipo_documento || null,
        fecha_creacion: data.fecha_creacion || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await documentos.setUsuario(data.usuario || null, {
      transaction,
    });

    await documentos.setDepartamento(data.departamento || null, {
      transaction,
    });

    await documentos.setCooperativadetaxi(data.cooperativadetaxi || null, {
      transaction,
    });

    return documentos;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const documentos = await db.documentos.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of documentos) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of documentos) {
        await record.destroy({ transaction });
      }
    });

    return documentos;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const documentos = await db.documentos.findByPk(id, options);

    await documentos.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await documentos.destroy({
      transaction,
    });

    return documentos;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const documentos = await db.documentos.findOne({ where }, { transaction });

    if (!documentos) {
      return documentos;
    }

    const output = documentos.get({ plain: true });

    output.usuario = await documentos.getUsuario({
      transaction,
    });

    output.departamento = await documentos.getDepartamento({
      transaction,
    });

    output.cooperativadetaxi = await documentos.getCooperativadetaxi({
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
        model: db.usuarios,
        as: 'usuario',
      },

      {
        model: db.departamentos,
        as: 'departamento',
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
          [Op.and]: Utils.ilike('documentos', 'nombre', filter.nombre),
        };
      }

      if (filter.fecha_creacionRange) {
        const [start, end] = filter.fecha_creacionRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            fecha_creacion: {
              ...where.fecha_creacion,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            fecha_creacion: {
              ...where.fecha_creacion,
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

      if (filter.tipo_documento) {
        where = {
          ...where,
          tipo_documento: filter.tipo_documento,
        };
      }

      if (filter.usuario) {
        const listItems = filter.usuario.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          usuarioId: { [Op.or]: listItems },
        };
      }

      if (filter.departamento) {
        const listItems = filter.departamento.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          departamentoId: { [Op.or]: listItems },
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
          count: await db.documentos.count({
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
      : await db.documentos.findAndCountAll({
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
          Utils.ilike('documentos', 'nombre', query),
        ],
      };
    }

    const records = await db.documentos.findAll({
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
