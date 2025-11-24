const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const taxistas = sequelize.define(
    'taxistas',
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

      dni: {
        type: DataTypes.TEXT,
      },

      direccion: {
        type: DataTypes.TEXT,
      },

      telefono: {
        type: DataTypes.TEXT,
      },

      fecha_registro: {
        type: DataTypes.DATE,
      },

      estado: {
        type: DataTypes.ENUM,

        values: ['Activo', 'Inactivo'],
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

  taxistas.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.taxistas.hasMany(db.conductores, {
      as: 'conductores_taxista',
      foreignKey: {
        name: 'taxistaId',
      },
      constraints: false,
    });

    db.taxistas.hasMany(db.taxis, {
      as: 'taxis_taxista',
      foreignKey: {
        name: 'taxistaId',
      },
      constraints: false,
    });

    //end loop

    db.taxistas.belongsTo(db.usuarios, {
      as: 'usuario',
      foreignKey: {
        name: 'usuarioId',
      },
      constraints: false,
    });

    db.taxistas.belongsTo(db.cooperativadetaxis, {
      as: 'cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.taxistas.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.taxistas.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return taxistas;
};
