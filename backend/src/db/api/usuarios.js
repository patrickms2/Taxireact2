const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class UsuariosDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const usuarios = await db.usuarios.create(
      {
        id: data.id || undefined,

        nombre: data.nombre || null,
        apellidos: data.apellidos || null,
        email: data.email || null,
        password: data.password || null,
        tipo_usuario: data.tipo_usuario || null,
        fecha_registro: data.fecha_registro || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await usuarios.setCooperativadetaxi(data.cooperativadetaxi || null, {
      transaction,
    });

    return usuarios;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const usuariosData = data.map((item, index) => ({
      id: item.id || undefined,

      nombre: item.nombre || null,
      apellidos: item.apellidos || null,
      email: item.email || null,
      password: item.password || null,
      tipo_usuario: item.tipo_usuario || null,
      fecha_registro: item.fecha_registro || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const usuarios = await db.usuarios.bulkCreate(usuariosData, {
      transaction,
    });

    // For each item created, replace relation files

    return usuarios;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const usuarios = await db.usuarios.findByPk(id, {}, { transaction });

    await usuarios.update(
      {
        nombre: data.nombre || null,
        apellidos: data.apellidos || null,
        email: data.email || null,
        password: data.password || null,
        tipo_usuario: data.tipo_usuario || null,
        fecha_registro: data.fecha_registro || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await usuarios.setCooperativadetaxi(data.cooperativadetaxi || null, {
      transaction,
    });

    return usuarios;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const usuarios = await db.usuarios.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of usuarios) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of usuarios) {
        await record.destroy({ transaction });
      }
    });

    return usuarios;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const usuarios = await db.usuarios.findByPk(id, options);

    await usuarios.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await usuarios.destroy({
      transaction,
    });

    return usuarios;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const usuarios = await db.usuarios.findOne({ where }, { transaction });

    if (!usuarios) {
      return usuarios;
    }

    const output = usuarios.get({ plain: true });

    output.documentos_usuario = await usuarios.getDocumentos_usuario({
      transaction,
    });

    output.estadisticas_usuario = await usuarios.getEstadisticas_usuario({
      transaction,
    });

    output.taxistas_usuario = await usuarios.getTaxistas_usuario({
      transaction,
    });

    output.turnos_usuario = await usuarios.getTurnos_usuario({
      transaction,
    });

    output.cooperativadetaxi = await usuarios.getCooperativadetaxi({
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

      if (filter.nombre) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('usuarios', 'nombre', filter.nombre),
        };
      }

      if (filter.apellidos) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('usuarios', 'apellidos', filter.apellidos),
        };
      }

      if (filter.email) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('usuarios', 'email', filter.email),
        };
      }

      if (filter.password) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('usuarios', 'password', filter.password),
        };
      }

      if (filter.fecha_registroRange) {
        const [start, end] = filter.fecha_registroRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            fecha_registro: {
              ...where.fecha_registro,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            fecha_registro: {
              ...where.fecha_registro,
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

      if (filter.tipo_usuario) {
        where = {
          ...where,
          tipo_usuario: filter.tipo_usuario,
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
          count: await db.usuarios.count({
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
      : await db.usuarios.findAndCountAll({
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
          Utils.ilike('usuarios', 'nombre', query),
        ],
      };
    }

    const records = await db.usuarios.findAll({
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
