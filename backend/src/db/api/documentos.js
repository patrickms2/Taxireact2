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

    const updatePayload = {};

    if (data.nombre !== undefined) updatePayload.nombre = data.nombre;

    if (data.tipo_documento !== undefined)
      updatePayload.tipo_documento = data.tipo_documento;

    if (data.fecha_creacion !== undefined)
      updatePayload.fecha_creacion = data.fecha_creacion;

    updatePayload.updatedById = currentUser.id;

    await documentos.update(updatePayload, { transaction });

    if (data.usuario !== undefined) {
      await documentos.setUsuario(
        data.usuario,

        { transaction },
      );
    }

    if (data.departamento !== undefined) {
      await documentos.setDepartamento(
        data.departamento,

        { transaction },
      );
    }

    if (data.cooperativadetaxi !== undefined) {
      await documentos.setCooperativadetaxi(
        data.cooperativadetaxi,

        { transaction },
      );
    }

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

      if (filter.active !== undefined) {
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
      const { rows, count } = await db.documentos.findAndCountAll(queryOptions);

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
