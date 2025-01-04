const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const turnos = sequelize.define(
    'turnos',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      fecha: {
        type: DataTypes.DATE,
      },

      hora_inicio: {
        type: DataTypes.DATE,
      },

      hora_fin: {
        type: DataTypes.DATE,
      },

      estado_turno: {
        type: DataTypes.ENUM,

        values: ['Programado', 'Encurso', 'Completado', 'Ausente'],
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

  turnos.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.turnos.belongsTo(db.usuarios, {
      as: 'usuario',
      foreignKey: {
        name: 'usuarioId',
      },
      constraints: false,
    });

    db.turnos.belongsTo(db.cooperativadetaxis, {
      as: 'cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.turnos.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.turnos.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return turnos;
};
