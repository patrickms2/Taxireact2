const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const localizacion_taxis = sequelize.define(
    'localizacion_taxis',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      latitud: {
        type: DataTypes.DECIMAL,
      },

      longitud: {
        type: DataTypes.DECIMAL,
      },

      ultima_actualizacion: {
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

  localizacion_taxis.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.localizacion_taxis.belongsTo(db.taxis, {
      as: 'taxi',
      foreignKey: {
        name: 'taxiId',
      },
      constraints: false,
    });

    db.localizacion_taxis.belongsTo(db.cooperativadetaxis, {
      as: 'cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.localizacion_taxis.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.localizacion_taxis.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return localizacion_taxis;
};
