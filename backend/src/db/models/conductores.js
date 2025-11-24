const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const conductores = sequelize.define(
    'conductores',
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

      fecha_nacimiento: {
        type: DataTypes.DATE,
      },

      licencia_conducir: {
        type: DataTypes.TEXT,
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

  conductores.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.conductores.belongsTo(db.taxistas, {
      as: 'taxista',
      foreignKey: {
        name: 'taxistaId',
      },
      constraints: false,
    });

    db.conductores.belongsTo(db.cooperativadetaxis, {
      as: 'cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.conductores.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.conductores.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return conductores;
};
