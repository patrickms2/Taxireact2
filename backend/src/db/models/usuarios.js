const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const usuarios = sequelize.define(
    'usuarios',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      nombre: {
        type: DataTypes.TEXT,
      },

      apellidos: {
        type: DataTypes.TEXT,
      },

      email: {
        type: DataTypes.TEXT,
      },

      password: {
        type: DataTypes.TEXT,
      },

      tipo_usuario: {
        type: DataTypes.ENUM,

        values: ['Empleado', 'Taxista', 'Cliente', 'Hotel'],
      },

      fecha_registro: {
        type: DataTypes.DATE,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  usuarios.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.usuarios.hasMany(db.documentos, {
      as: 'documentos_usuario',
      foreignKey: {
        name: 'usuarioId',
      },
      constraints: false,
    });

    db.usuarios.hasMany(db.estadisticas, {
      as: 'estadisticas_usuario',
      foreignKey: {
        name: 'usuarioId',
      },
      constraints: false,
    });

    db.usuarios.hasMany(db.taxistas, {
      as: 'taxistas_usuario',
      foreignKey: {
        name: 'usuarioId',
      },
      constraints: false,
    });

    db.usuarios.hasMany(db.turnos, {
      as: 'turnos_usuario',
      foreignKey: {
        name: 'usuarioId',
      },
      constraints: false,
    });

    //end loop

    db.usuarios.belongsTo(db.cooperativadetaxis, {
      as: 'cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.usuarios.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.usuarios.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return usuarios;
};
