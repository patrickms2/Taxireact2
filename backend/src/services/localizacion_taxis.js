const db = require('../db/models');
const Localizacion_taxisDBApi = require('../db/api/localizacion_taxis');
const processFile = require('../middlewares/upload');
const ValidationError = require('./notifications/errors/validation');
const csv = require('csv-parser');
const axios = require('axios');
const config = require('../config');
const stream = require('stream');

module.exports = class Localizacion_taxisService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Localizacion_taxisDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async bulkImport(req, res, sendInvitationEmails = true, host) {
    const transaction = await db.sequelize.transaction();

    try {
      await processFile(req, res);
      const bufferStream = new stream.PassThrough();
      const results = [];

      await bufferStream.end(Buffer.from(req.file.buffer, 'utf-8')); // convert Buffer to Stream

      await new Promise((resolve, reject) => {
        bufferStream
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', async () => {
            console.log('CSV results', results);
            resolve();
          })
          .on('error', (error) => reject(error));
      });

      await Localizacion_taxisDBApi.bulkImport(results, {
        transaction,
        ignoreDuplicates: true,
        validate: true,
        currentUser: req.currentUser,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let localizacion_taxis = await Localizacion_taxisDBApi.findBy(
        { id },
        { transaction },
      );

      if (!localizacion_taxis) {
        throw new ValidationError('localizacion_taxisNotFound');
      }

      const updatedLocalizacion_taxis = await Localizacion_taxisDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return updatedLocalizacion_taxis;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async deleteByIds(ids, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      await Localizacion_taxisDBApi.deleteByIds(ids, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      await Localizacion_taxisDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
