const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const pagos_servicios = sequelize.define(
    'pagos_servicios',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      monto: {
        type: DataTypes.DECIMAL,
      },

      tipo_pago: {
        type: DataTypes.ENUM,

        values: ['Pagocompleto', 'Depósito', 'Pagoendestino'],
      },

      metodo_pago: {
        type: DataTypes.ENUM,

        values: ['Tarjeta', 'Transferencia', 'Efectivo'],
      },

      fecha_pago: {
        type: DataTypes.DATE,
      },

      estado_pago: {
        type: DataTypes.ENUM,

        values: ['Pendiente', 'Pagado', 'Reembolsado', 'Cancelado'],
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

  pagos_servicios.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.pagos_servicios.belongsTo(db.servicios_taxi, {
      as: 'servicio_taxi',
      foreignKey: {
        name: 'servicio_taxiId',
      },
      constraints: false,
    });

    db.pagos_servicios.belongsTo(db.cooperativadetaxis, {
      as: 'cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.pagos_servicios.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.pagos_servicios.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return pagos_servicios;
};
