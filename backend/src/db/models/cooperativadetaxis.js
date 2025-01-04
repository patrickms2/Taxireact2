const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const cooperativadetaxis = sequelize.define(
    'cooperativadetaxis',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
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

  cooperativadetaxis.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.cooperativadetaxis.hasMany(db.users, {
      as: 'users_cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.cooperativadetaxis.hasMany(db.conductores, {
      as: 'conductores_cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.cooperativadetaxis.hasMany(db.departamentos, {
      as: 'departamentos_cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.cooperativadetaxis.hasMany(db.documentos, {
      as: 'documentos_cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.cooperativadetaxis.hasMany(db.estadisticas, {
      as: 'estadisticas_cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.cooperativadetaxis.hasMany(db.localizacion_taxis, {
      as: 'localizacion_taxis_cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.cooperativadetaxis.hasMany(db.pagos_servicios, {
      as: 'pagos_servicios_cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.cooperativadetaxis.hasMany(db.servicios_taxi, {
      as: 'servicios_taxi_cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.cooperativadetaxis.hasMany(db.taxis, {
      as: 'taxis_cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.cooperativadetaxis.hasMany(db.taxistas, {
      as: 'taxistas_cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.cooperativadetaxis.hasMany(db.turnos, {
      as: 'turnos_cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.cooperativadetaxis.hasMany(db.usuarios, {
      as: 'usuarios_cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    //end loop

    db.cooperativadetaxis.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.cooperativadetaxis.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return cooperativadetaxis;
};
