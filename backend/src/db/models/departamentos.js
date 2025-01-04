const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const departamentos = sequelize.define(
    'departamentos',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      nombre_departamento: {
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

  departamentos.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.departamentos.hasMany(db.documentos, {
      as: 'documentos_departamento',
      foreignKey: {
        name: 'departamentoId',
      },
      constraints: false,
    });

    db.departamentos.hasMany(db.estadisticas, {
      as: 'estadisticas_departamento',
      foreignKey: {
        name: 'departamentoId',
      },
      constraints: false,
    });

    //end loop

    db.departamentos.belongsTo(db.cooperativadetaxis, {
      as: 'cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.departamentos.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.departamentos.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return departamentos;
};
