const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class TaxistasDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const taxistas = await db.taxistas.create(
      {
        id: data.id || undefined,

        nombre: data.nombre || null,
        apellidos: data.apellidos || null,
        dni: data.dni || null,
        direccion: data.direccion || null,
        telefono: data.telefono || null,
        fecha_registro: data.fecha_registro || null,
        estado: data.estado || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await taxistas.setUsuario(data.usuario || null, {
      transaction,
    });

    await taxistas.setCooperativadetaxi(data.cooperativadetaxi || null, {
      transaction,
    });

    return taxistas;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const taxistasData = data.map((item, index) => ({
      id: item.id || undefined,

      nombre: item.nombre || null,
      apellidos: item.apellidos || null,
      dni: item.dni || null,
      direccion: item.direccion || null,
      telefono: item.telefono || null,
      fecha_registro: item.fecha_registro || null,
      estado: item.estado || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const taxistas = await db.taxistas.bulkCreate(taxistasData, {
      transaction,
    });

    // For each item created, replace relation files

    return taxistas;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const taxistas = await db.taxistas.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.nombre !== undefined) updatePayload.nombre = data.nombre;

    if (data.apellidos !== undefined) updatePayload.apellidos = data.apellidos;

    if (data.dni !== undefined) updatePayload.dni = data.dni;

    if (data.direccion !== undefined) updatePayload.direccion = data.direccion;

    if (data.telefono !== undefined) updatePayload.telefono = data.telefono;

    if (data.fecha_registro !== undefined)
      updatePayload.fecha_registro = data.fecha_registro;

    if (data.estado !== undefined) updatePayload.estado = data.estado;

    updatePayload.updatedById = currentUser.id;

    await taxistas.update(updatePayload, { transaction });

    if (data.usuario !== undefined) {
      await taxistas.setUsuario(
        data.usuario,

        { transaction },
      );
    }

    if (data.cooperativadetaxi !== undefined) {
      await taxistas.setCooperativadetaxi(
        data.cooperativadetaxi,

        { transaction },
      );
    }

    return taxistas;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const taxistas = await db.taxistas.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of taxistas) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of taxistas) {
        await record.destroy({ transaction });
      }
    });

    return taxistas;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const taxistas = await db.taxistas.findByPk(id, options);

    await taxistas.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await taxistas.destroy({
      transaction,
    });

    return taxistas;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const taxistas = await db.taxistas.findOne({ where }, { transaction });

    if (!taxistas) {
      return taxistas;
    }

    const output = taxistas.get({ plain: true });

    output.conductores_taxista = await taxistas.getConductores_taxista({
      transaction,
    });

    output.taxis_taxista = await taxistas.getTaxis_taxista({
      transaction,
    });

    output.usuario = await taxistas.getUsuario({
      transaction,
    });

    output.cooperativadetaxi = await taxistas.getCooperativadetaxi({
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

      if (filter.nombre) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('taxistas', 'nombre', filter.nombre),
        };
      }

      if (filter.apellidos) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('taxistas', 'apellidos', filter.apellidos),
        };
      }

      if (filter.dni) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('taxistas', 'dni', filter.dni),
        };
      }

      if (filter.direccion) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('taxistas', 'direccion', filter.direccion),
        };
      }

      if (filter.telefono) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('taxistas', 'telefono', filter.telefono),
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

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.estado) {
        where = {
          ...where,
          estado: filter.estado,
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
      const { rows, count } = await db.taxistas.findAndCountAll(queryOptions);

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
          Utils.ilike('taxistas', 'nombre', query),
        ],
      };
    }

    const records = await db.taxistas.findAll({
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
