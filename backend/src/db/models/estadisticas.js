const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const estadisticas = sequelize.define(
    'estadisticas',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      tipo_estadistica: {
        type: DataTypes.ENUM,

        values: ['Servicios', 'Documentos'],
      },

      fecha: {
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

  estadisticas.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.estadisticas.belongsTo(db.usuarios, {
      as: 'usuario',
      foreignKey: {
        name: 'usuarioId',
      },
      constraints: false,
    });

    db.estadisticas.belongsTo(db.departamentos, {
      as: 'departamento',
      foreignKey: {
        name: 'departamentoId',
      },
      constraints: false,
    });

    db.estadisticas.belongsTo(db.cooperativadetaxis, {
      as: 'cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.estadisticas.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.estadisticas.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return estadisticas;
};
