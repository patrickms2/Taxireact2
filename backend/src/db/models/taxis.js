const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const taxis = sequelize.define(
    'taxis',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      matricula: {
        type: DataTypes.TEXT,
      },

      marca: {
        type: DataTypes.TEXT,
      },

      modelo: {
        type: DataTypes.TEXT,
      },

      año: {
        type: DataTypes.INTEGER,
      },

      color: {
        type: DataTypes.TEXT,
      },

      estado: {
        type: DataTypes.ENUM,

        values: ['Activo', 'Mantenimiento', 'Baja'],
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

  taxis.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.taxis.hasMany(db.localizacion_taxis, {
      as: 'localizacion_taxis_taxi',
      foreignKey: {
        name: 'taxiId',
      },
      constraints: false,
    });

    db.taxis.hasMany(db.servicios_taxi, {
      as: 'servicios_taxi_taxi',
      foreignKey: {
        name: 'taxiId',
      },
      constraints: false,
    });

    //end loop

    db.taxis.belongsTo(db.taxistas, {
      as: 'taxista',
      foreignKey: {
        name: 'taxistaId',
      },
      constraints: false,
    });

    db.taxis.belongsTo(db.cooperativadetaxis, {
      as: 'cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.taxis.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.taxis.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return taxis;
};
