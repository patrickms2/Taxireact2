import dayjs from 'dayjs';
import _ from 'lodash';

export default {
  filesFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => item);
  },
  imageFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => ({
      publicUrl: item.publicUrl || '',
    }));
  },
  oneImageFormatter(arr) {
    if (!arr || !arr.length) return '';
    return arr[0].publicUrl || '';
  },
  dateFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD');
  },
  dateTimeFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD HH:mm');
  },
  booleanFormatter(val) {
    return val ? 'Yes' : 'No';
  },
  dataGridEditFormatter(obj) {
    return _.transform(obj, (result, value, key) => {
      if (_.isArray(value)) {
        result[key] = _.map(value, 'id');
      } else if (_.isObject(value)) {
        result[key] = value.id;
      } else {
        result[key] = value;
      }
    });
  },

  departamentosManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.nombre_departamento);
  },
  departamentosOneListFormatter(val) {
    if (!val) return '';
    return val.nombre_departamento;
  },
  departamentosManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.nombre_departamento };
    });
  },
  departamentosOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.nombre_departamento, id: val.id };
  },

  servicios_taxiManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.tipo_servicio);
  },
  servicios_taxiOneListFormatter(val) {
    if (!val) return '';
    return val.tipo_servicio;
  },
  servicios_taxiManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.tipo_servicio };
    });
  },
  servicios_taxiOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.tipo_servicio, id: val.id };
  },

  taxisManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.matricula);
  },
  taxisOneListFormatter(val) {
    if (!val) return '';
    return val.matricula;
  },
  taxisManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.matricula };
    });
  },
  taxisOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.matricula, id: val.id };
  },

  taxistasManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.nombre);
  },
  taxistasOneListFormatter(val) {
    if (!val) return '';
    return val.nombre;
  },
  taxistasManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.nombre };
    });
  },
  taxistasOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.nombre, id: val.id };
  },

  usuariosManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.nombre);
  },
  usuariosOneListFormatter(val) {
    if (!val) return '';
    return val.nombre;
  },
  usuariosManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.nombre };
    });
  },
  usuariosOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.nombre, id: val.id };
  },

  rolesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  rolesOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  rolesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  rolesOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  permissionsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  permissionsOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  permissionsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  permissionsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  cooperativadetaxisManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  cooperativadetaxisOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  cooperativadetaxisManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  cooperativadetaxisOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },
};
