const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const documentos = sequelize.define(
    'documentos',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      nombre: {
        type: DataTypes.TEXT,
      },

      tipo_documento: {
        type: DataTypes.ENUM,

        values: ['Factura', 'Contrato', 'Permiso', 'Licencia'],
      },

      fecha_creacion: {
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

  documentos.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.documentos.belongsTo(db.usuarios, {
      as: 'usuario',
      foreignKey: {
        name: 'usuarioId',
      },
      constraints: false,
    });

    db.documentos.belongsTo(db.departamentos, {
      as: 'departamento',
      foreignKey: {
        name: 'departamentoId',
      },
      constraints: false,
    });

    db.documentos.belongsTo(db.cooperativadetaxis, {
      as: 'cooperativadetaxi',
      foreignKey: {
        name: 'cooperativadetaxiId',
      },
      constraints: false,
    });

    db.documentos.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.documentos.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return documentos;
};
