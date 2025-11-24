const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const servicios_taxi = sequelize.define(
    'servicios_taxi',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      tipo_servicio: {
        type: DataTypes.ENUM,

        values: ['Traslado', 'ReservaHotel'],
      },

      fecha_solicitud: {
        type: DataTypes.DATE,
      },

      fecha_realizacion: {
        type: DataTypes.DATE,
      },

      estado_servicio: {
        type: DataTypes.ENUM,

        values: ['Pendiente', 'Encurso', 'Completado', 'Cancelado'],
      },

      ubicacion_origen: {
        type: DataTypes.TEXT,
      },

      ubicacion_destino: {
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

  servicios_taxi.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.servicios_taxi.hasMany(db.pagos_servicios, {
      as: 'pagos_servicios_servicio_taxi',
      foreignKey: {
        name: 'servicio_taxiId',
      },
      constraints: false,
    });

    //end loop

    db.servicios_taxi.belongsTo(db.taxis, {
      as: 'taxi',
      foreignKey: {
        name: 'taxiId',
      },
      constraints: false,
    });

    db.servicios_taxi.belongsTo(db.cooperativadetaxis, {
      as: 'cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.servicios_taxi.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.servicios_taxi.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return servicios_taxi;
};
