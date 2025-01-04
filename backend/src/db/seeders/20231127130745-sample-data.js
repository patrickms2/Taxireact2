const db = require('../models');
const Users = db.users;

const Conductores = db.conductores;

const Departamentos = db.departamentos;

const Documentos = db.documentos;

const Estadisticas = db.estadisticas;

const LocalizacionTaxis = db.localizacion_taxis;

const PagosServicios = db.pagos_servicios;

const ServiciosTaxi = db.servicios_taxi;

const Taxis = db.taxis;

const Taxistas = db.taxistas;

const Turnos = db.turnos;

const Usuarios = db.usuarios;

const Cooperativadetaxis = db.cooperativadetaxis;

const ConductoresData = [
  {
    // type code here for "relation_one" field

    nombre: 'Joseph J. Thomson',

    apellidos: 'William Herschel',

    dni: 'Robert Koch',

    fecha_nacimiento: new Date(),

    licencia_conducir: 'Comte de Buffon',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'Frederick Sanger',

    apellidos: 'Paul Dirac',

    dni: 'Francis Galton',

    fecha_nacimiento: new Date(),

    licencia_conducir: 'Galileo Galilei',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'Michael Faraday',

    apellidos: 'James Clerk Maxwell',

    dni: 'Neils Bohr',

    fecha_nacimiento: new Date(),

    licencia_conducir: 'Francis Crick',

    // type code here for "relation_one" field
  },
];

const DepartamentosData = [
  {
    nombre_departamento: 'Wilhelm Wundt',

    // type code here for "relation_one" field
  },

  {
    nombre_departamento: 'William Harvey',

    // type code here for "relation_one" field
  },

  {
    nombre_departamento: 'Frederick Sanger',

    // type code here for "relation_one" field
  },
];

const DocumentosData = [
  {
    nombre: 'Ludwig Boltzmann',

    tipo_documento: 'Licencia',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    fecha_creacion: new Date(),

    // type code here for "relation_one" field
  },

  {
    nombre: 'Emil Kraepelin',

    tipo_documento: 'Factura',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    fecha_creacion: new Date(),

    // type code here for "relation_one" field
  },

  {
    nombre: 'Paul Ehrlich',

    tipo_documento: 'Licencia',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    fecha_creacion: new Date(),

    // type code here for "relation_one" field
  },
];

const EstadisticasData = [
  {
    tipo_estadistica: 'Servicios',

    fecha: new Date(),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    tipo_estadistica: 'Documentos',

    fecha: new Date(),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    tipo_estadistica: 'Documentos',

    fecha: new Date(),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const LocalizacionTaxisData = [
  {
    // type code here for "relation_one" field

    latitud: 94.71,

    longitud: 61.76,

    ultima_actualizacion: new Date(),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    latitud: 55.53,

    longitud: 64.69,

    ultima_actualizacion: new Date(),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    latitud: 67.24,

    longitud: 79.41,

    ultima_actualizacion: new Date(),

    // type code here for "relation_one" field
  },
];

const PagosServiciosData = [
  {
    // type code here for "relation_one" field

    monto: 56.46,

    tipo_pago: 'Pagocompleto',

    metodo_pago: 'Tarjeta',

    fecha_pago: new Date(),

    estado_pago: 'Reembolsado',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    monto: 87.07,

    tipo_pago: 'Pagoendestino',

    metodo_pago: 'Efectivo',

    fecha_pago: new Date(),

    estado_pago: 'Cancelado',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    monto: 32.05,

    tipo_pago: 'Pagoendestino',

    metodo_pago: 'Efectivo',

    fecha_pago: new Date(),

    estado_pago: 'Pendiente',

    // type code here for "relation_one" field
  },
];

const ServiciosTaxiData = [
  {
    // type code here for "relation_one" field

    tipo_servicio: 'ReservaHotel',

    fecha_solicitud: new Date(),

    fecha_realizacion: new Date(),

    estado_servicio: 'Pendiente',

    ubicacion_origen: 'Gustav Kirchhoff',

    ubicacion_destino: 'Trofim Lysenko',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    tipo_servicio: 'ReservaHotel',

    fecha_solicitud: new Date(),

    fecha_realizacion: new Date(),

    estado_servicio: 'Encurso',

    ubicacion_origen: 'Carl Gauss (Karl Friedrich Gauss)',

    ubicacion_destino: 'Frederick Gowland Hopkins',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    tipo_servicio: 'ReservaHotel',

    fecha_solicitud: new Date(),

    fecha_realizacion: new Date(),

    estado_servicio: 'Encurso',

    ubicacion_origen: 'Christiaan Huygens',

    ubicacion_destino: 'Frederick Gowland Hopkins',

    // type code here for "relation_one" field
  },
];

const TaxisData = [
  {
    // type code here for "relation_one" field

    matricula: 'Archimedes',

    marca: 'John Dalton',

    modelo: 'Comte de Buffon',

    año: 2,

    color: 'Paul Dirac',

    estado: 'Baja',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    matricula: 'Sigmund Freud',

    marca: 'Gertrude Belle Elion',

    modelo: 'Heike Kamerlingh Onnes',

    año: 8,

    color: 'William Bayliss',

    estado: 'Baja',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    matricula: 'Paul Ehrlich',

    marca: 'Max Delbruck',

    modelo: 'Hermann von Helmholtz',

    año: 4,

    color: 'Albert Einstein',

    estado: 'Activo',

    // type code here for "relation_one" field
  },
];

const TaxistasData = [
  {
    // type code here for "relation_one" field

    nombre: 'Marcello Malpighi',

    apellidos: 'Frederick Gowland Hopkins',

    dni: 'Anton van Leeuwenhoek',

    direccion: 'Alfred Binet',

    telefono: 'Andreas Vesalius',

    fecha_registro: new Date(),

    estado: 'Activo',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'Louis Pasteur',

    apellidos: 'James Watson',

    dni: 'Joseph J. Thomson',

    direccion: 'Tycho Brahe',

    telefono: 'Paul Dirac',

    fecha_registro: new Date(),

    estado: 'Activo',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'Theodosius Dobzhansky',

    apellidos: 'Francis Crick',

    dni: 'James Clerk Maxwell',

    direccion: 'William Herschel',

    telefono: 'Charles Darwin',

    fecha_registro: new Date(),

    estado: 'Activo',

    // type code here for "relation_one" field
  },
];

const TurnosData = [
  {
    // type code here for "relation_one" field

    fecha: new Date(),

    hora_inicio: new Date(),

    hora_fin: new Date(),

    estado_turno: 'Programado',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    fecha: new Date(),

    hora_inicio: new Date(),

    hora_fin: new Date(),

    estado_turno: 'Encurso',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    fecha: new Date(),

    hora_inicio: new Date(),

    hora_fin: new Date(),

    estado_turno: 'Programado',

    // type code here for "relation_one" field
  },
];

const UsuariosData = [
  {
    nombre: 'Max Delbruck',

    apellidos: 'Charles Sherrington',

    email: 'Trofim Lysenko',

    password: 'B. F. Skinner',

    tipo_usuario: 'Cliente',

    fecha_registro: new Date(),

    // type code here for "relation_one" field
  },

  {
    nombre: 'J. Robert Oppenheimer',

    apellidos: 'Francis Crick',

    email: 'Charles Lyell',

    password: 'Albrecht von Haller',

    tipo_usuario: 'Cliente',

    fecha_registro: new Date(),

    // type code here for "relation_one" field
  },

  {
    nombre: 'Sigmund Freud',

    apellidos: 'James Watson',

    email: 'Albrecht von Haller',

    password: 'Max Delbruck',

    tipo_usuario: 'Cliente',

    fecha_registro: new Date(),

    // type code here for "relation_one" field
  },
];

const CooperativadetaxisData = [
  {
    name: 'Erwin Schrodinger',
  },

  {
    name: 'Ludwig Boltzmann',
  },

  {
    name: 'Alfred Binet',
  },
];

// Similar logic for "relation_many"

async function associateUserWithCooperativadetaxi() {
  const relatedCooperativadetaxi0 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setCooperativadetaxi) {
    await User0.setCooperativadetaxi(relatedCooperativadetaxi0);
  }

  const relatedCooperativadetaxi1 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setCooperativadetaxi) {
    await User1.setCooperativadetaxi(relatedCooperativadetaxi1);
  }

  const relatedCooperativadetaxi2 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setCooperativadetaxi) {
    await User2.setCooperativadetaxi(relatedCooperativadetaxi2);
  }
}

async function associateConductoreWithTaxistum() {
  const relatedTaxistum0 = await Taxistas.findOne({
    offset: Math.floor(Math.random() * (await Taxistas.count())),
  });
  const Conductore0 = await Conductores.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Conductore0?.setTaxistum) {
    await Conductore0.setTaxistum(relatedTaxistum0);
  }

  const relatedTaxistum1 = await Taxistas.findOne({
    offset: Math.floor(Math.random() * (await Taxistas.count())),
  });
  const Conductore1 = await Conductores.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Conductore1?.setTaxistum) {
    await Conductore1.setTaxistum(relatedTaxistum1);
  }

  const relatedTaxistum2 = await Taxistas.findOne({
    offset: Math.floor(Math.random() * (await Taxistas.count())),
  });
  const Conductore2 = await Conductores.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Conductore2?.setTaxistum) {
    await Conductore2.setTaxistum(relatedTaxistum2);
  }
}

async function associateConductoreWithCooperativadetaxi() {
  const relatedCooperativadetaxi0 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Conductore0 = await Conductores.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Conductore0?.setCooperativadetaxi) {
    await Conductore0.setCooperativadetaxi(relatedCooperativadetaxi0);
  }

  const relatedCooperativadetaxi1 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Conductore1 = await Conductores.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Conductore1?.setCooperativadetaxi) {
    await Conductore1.setCooperativadetaxi(relatedCooperativadetaxi1);
  }

  const relatedCooperativadetaxi2 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Conductore2 = await Conductores.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Conductore2?.setCooperativadetaxi) {
    await Conductore2.setCooperativadetaxi(relatedCooperativadetaxi2);
  }
}

async function associateDepartamentoWithCooperativadetaxi() {
  const relatedCooperativadetaxi0 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Departamento0 = await Departamentos.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Departamento0?.setCooperativadetaxi) {
    await Departamento0.setCooperativadetaxi(relatedCooperativadetaxi0);
  }

  const relatedCooperativadetaxi1 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Departamento1 = await Departamentos.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Departamento1?.setCooperativadetaxi) {
    await Departamento1.setCooperativadetaxi(relatedCooperativadetaxi1);
  }

  const relatedCooperativadetaxi2 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Departamento2 = await Departamentos.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Departamento2?.setCooperativadetaxi) {
    await Departamento2.setCooperativadetaxi(relatedCooperativadetaxi2);
  }
}

async function associateDocumentoWithUsuario() {
  const relatedUsuario0 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Documento0 = await Documentos.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Documento0?.setUsuario) {
    await Documento0.setUsuario(relatedUsuario0);
  }

  const relatedUsuario1 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Documento1 = await Documentos.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Documento1?.setUsuario) {
    await Documento1.setUsuario(relatedUsuario1);
  }

  const relatedUsuario2 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Documento2 = await Documentos.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Documento2?.setUsuario) {
    await Documento2.setUsuario(relatedUsuario2);
  }
}

async function associateDocumentoWithDepartamento() {
  const relatedDepartamento0 = await Departamentos.findOne({
    offset: Math.floor(Math.random() * (await Departamentos.count())),
  });
  const Documento0 = await Documentos.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Documento0?.setDepartamento) {
    await Documento0.setDepartamento(relatedDepartamento0);
  }

  const relatedDepartamento1 = await Departamentos.findOne({
    offset: Math.floor(Math.random() * (await Departamentos.count())),
  });
  const Documento1 = await Documentos.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Documento1?.setDepartamento) {
    await Documento1.setDepartamento(relatedDepartamento1);
  }

  const relatedDepartamento2 = await Departamentos.findOne({
    offset: Math.floor(Math.random() * (await Departamentos.count())),
  });
  const Documento2 = await Documentos.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Documento2?.setDepartamento) {
    await Documento2.setDepartamento(relatedDepartamento2);
  }
}

async function associateDocumentoWithCooperativadetaxi() {
  const relatedCooperativadetaxi0 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Documento0 = await Documentos.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Documento0?.setCooperativadetaxi) {
    await Documento0.setCooperativadetaxi(relatedCooperativadetaxi0);
  }

  const relatedCooperativadetaxi1 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Documento1 = await Documentos.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Documento1?.setCooperativadetaxi) {
    await Documento1.setCooperativadetaxi(relatedCooperativadetaxi1);
  }

  const relatedCooperativadetaxi2 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Documento2 = await Documentos.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Documento2?.setCooperativadetaxi) {
    await Documento2.setCooperativadetaxi(relatedCooperativadetaxi2);
  }
}

async function associateEstadisticaWithUsuario() {
  const relatedUsuario0 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Estadistica0 = await Estadisticas.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Estadistica0?.setUsuario) {
    await Estadistica0.setUsuario(relatedUsuario0);
  }

  const relatedUsuario1 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Estadistica1 = await Estadisticas.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Estadistica1?.setUsuario) {
    await Estadistica1.setUsuario(relatedUsuario1);
  }

  const relatedUsuario2 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Estadistica2 = await Estadisticas.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Estadistica2?.setUsuario) {
    await Estadistica2.setUsuario(relatedUsuario2);
  }
}

async function associateEstadisticaWithDepartamento() {
  const relatedDepartamento0 = await Departamentos.findOne({
    offset: Math.floor(Math.random() * (await Departamentos.count())),
  });
  const Estadistica0 = await Estadisticas.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Estadistica0?.setDepartamento) {
    await Estadistica0.setDepartamento(relatedDepartamento0);
  }

  const relatedDepartamento1 = await Departamentos.findOne({
    offset: Math.floor(Math.random() * (await Departamentos.count())),
  });
  const Estadistica1 = await Estadisticas.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Estadistica1?.setDepartamento) {
    await Estadistica1.setDepartamento(relatedDepartamento1);
  }

  const relatedDepartamento2 = await Departamentos.findOne({
    offset: Math.floor(Math.random() * (await Departamentos.count())),
  });
  const Estadistica2 = await Estadisticas.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Estadistica2?.setDepartamento) {
    await Estadistica2.setDepartamento(relatedDepartamento2);
  }
}

async function associateEstadisticaWithCooperativadetaxi() {
  const relatedCooperativadetaxi0 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Estadistica0 = await Estadisticas.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Estadistica0?.setCooperativadetaxi) {
    await Estadistica0.setCooperativadetaxi(relatedCooperativadetaxi0);
  }

  const relatedCooperativadetaxi1 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Estadistica1 = await Estadisticas.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Estadistica1?.setCooperativadetaxi) {
    await Estadistica1.setCooperativadetaxi(relatedCooperativadetaxi1);
  }

  const relatedCooperativadetaxi2 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Estadistica2 = await Estadisticas.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Estadistica2?.setCooperativadetaxi) {
    await Estadistica2.setCooperativadetaxi(relatedCooperativadetaxi2);
  }
}

async function associateLocalizacionTaxiWithTaxi() {
  const relatedTaxi0 = await Taxis.findOne({
    offset: Math.floor(Math.random() * (await Taxis.count())),
  });
  const LocalizacionTaxi0 = await LocalizacionTaxis.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (LocalizacionTaxi0?.setTaxi) {
    await LocalizacionTaxi0.setTaxi(relatedTaxi0);
  }

  const relatedTaxi1 = await Taxis.findOne({
    offset: Math.floor(Math.random() * (await Taxis.count())),
  });
  const LocalizacionTaxi1 = await LocalizacionTaxis.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (LocalizacionTaxi1?.setTaxi) {
    await LocalizacionTaxi1.setTaxi(relatedTaxi1);
  }

  const relatedTaxi2 = await Taxis.findOne({
    offset: Math.floor(Math.random() * (await Taxis.count())),
  });
  const LocalizacionTaxi2 = await LocalizacionTaxis.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (LocalizacionTaxi2?.setTaxi) {
    await LocalizacionTaxi2.setTaxi(relatedTaxi2);
  }
}

async function associateLocalizacionTaxiWithCooperativadetaxi() {
  const relatedCooperativadetaxi0 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const LocalizacionTaxi0 = await LocalizacionTaxis.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (LocalizacionTaxi0?.setCooperativadetaxi) {
    await LocalizacionTaxi0.setCooperativadetaxi(relatedCooperativadetaxi0);
  }

  const relatedCooperativadetaxi1 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const LocalizacionTaxi1 = await LocalizacionTaxis.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (LocalizacionTaxi1?.setCooperativadetaxi) {
    await LocalizacionTaxi1.setCooperativadetaxi(relatedCooperativadetaxi1);
  }

  const relatedCooperativadetaxi2 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const LocalizacionTaxi2 = await LocalizacionTaxis.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (LocalizacionTaxi2?.setCooperativadetaxi) {
    await LocalizacionTaxi2.setCooperativadetaxi(relatedCooperativadetaxi2);
  }
}

async function associatePagosServicioWithServicio_taxi() {
  const relatedServicio_taxi0 = await ServiciosTaxi.findOne({
    offset: Math.floor(Math.random() * (await ServiciosTaxi.count())),
  });
  const PagosServicio0 = await PagosServicios.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (PagosServicio0?.setServicio_taxi) {
    await PagosServicio0.setServicio_taxi(relatedServicio_taxi0);
  }

  const relatedServicio_taxi1 = await ServiciosTaxi.findOne({
    offset: Math.floor(Math.random() * (await ServiciosTaxi.count())),
  });
  const PagosServicio1 = await PagosServicios.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (PagosServicio1?.setServicio_taxi) {
    await PagosServicio1.setServicio_taxi(relatedServicio_taxi1);
  }

  const relatedServicio_taxi2 = await ServiciosTaxi.findOne({
    offset: Math.floor(Math.random() * (await ServiciosTaxi.count())),
  });
  const PagosServicio2 = await PagosServicios.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (PagosServicio2?.setServicio_taxi) {
    await PagosServicio2.setServicio_taxi(relatedServicio_taxi2);
  }
}

async function associatePagosServicioWithCooperativadetaxi() {
  const relatedCooperativadetaxi0 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const PagosServicio0 = await PagosServicios.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (PagosServicio0?.setCooperativadetaxi) {
    await PagosServicio0.setCooperativadetaxi(relatedCooperativadetaxi0);
  }

  const relatedCooperativadetaxi1 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const PagosServicio1 = await PagosServicios.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (PagosServicio1?.setCooperativadetaxi) {
    await PagosServicio1.setCooperativadetaxi(relatedCooperativadetaxi1);
  }

  const relatedCooperativadetaxi2 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const PagosServicio2 = await PagosServicios.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (PagosServicio2?.setCooperativadetaxi) {
    await PagosServicio2.setCooperativadetaxi(relatedCooperativadetaxi2);
  }
}

async function associateServiciosTaxiWithTaxi() {
  const relatedTaxi0 = await Taxis.findOne({
    offset: Math.floor(Math.random() * (await Taxis.count())),
  });
  const ServiciosTaxi0 = await ServiciosTaxi.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ServiciosTaxi0?.setTaxi) {
    await ServiciosTaxi0.setTaxi(relatedTaxi0);
  }

  const relatedTaxi1 = await Taxis.findOne({
    offset: Math.floor(Math.random() * (await Taxis.count())),
  });
  const ServiciosTaxi1 = await ServiciosTaxi.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ServiciosTaxi1?.setTaxi) {
    await ServiciosTaxi1.setTaxi(relatedTaxi1);
  }

  const relatedTaxi2 = await Taxis.findOne({
    offset: Math.floor(Math.random() * (await Taxis.count())),
  });
  const ServiciosTaxi2 = await ServiciosTaxi.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ServiciosTaxi2?.setTaxi) {
    await ServiciosTaxi2.setTaxi(relatedTaxi2);
  }
}

async function associateServiciosTaxiWithCooperativadetaxi() {
  const relatedCooperativadetaxi0 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const ServiciosTaxi0 = await ServiciosTaxi.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ServiciosTaxi0?.setCooperativadetaxi) {
    await ServiciosTaxi0.setCooperativadetaxi(relatedCooperativadetaxi0);
  }

  const relatedCooperativadetaxi1 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const ServiciosTaxi1 = await ServiciosTaxi.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ServiciosTaxi1?.setCooperativadetaxi) {
    await ServiciosTaxi1.setCooperativadetaxi(relatedCooperativadetaxi1);
  }

  const relatedCooperativadetaxi2 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const ServiciosTaxi2 = await ServiciosTaxi.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ServiciosTaxi2?.setCooperativadetaxi) {
    await ServiciosTaxi2.setCooperativadetaxi(relatedCooperativadetaxi2);
  }
}

async function associateTaxiWithTaxistum() {
  const relatedTaxistum0 = await Taxistas.findOne({
    offset: Math.floor(Math.random() * (await Taxistas.count())),
  });
  const Taxi0 = await Taxis.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Taxi0?.setTaxistum) {
    await Taxi0.setTaxistum(relatedTaxistum0);
  }

  const relatedTaxistum1 = await Taxistas.findOne({
    offset: Math.floor(Math.random() * (await Taxistas.count())),
  });
  const Taxi1 = await Taxis.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Taxi1?.setTaxistum) {
    await Taxi1.setTaxistum(relatedTaxistum1);
  }

  const relatedTaxistum2 = await Taxistas.findOne({
    offset: Math.floor(Math.random() * (await Taxistas.count())),
  });
  const Taxi2 = await Taxis.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Taxi2?.setTaxistum) {
    await Taxi2.setTaxistum(relatedTaxistum2);
  }
}

async function associateTaxiWithCooperativadetaxi() {
  const relatedCooperativadetaxi0 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Taxi0 = await Taxis.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Taxi0?.setCooperativadetaxi) {
    await Taxi0.setCooperativadetaxi(relatedCooperativadetaxi0);
  }

  const relatedCooperativadetaxi1 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Taxi1 = await Taxis.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Taxi1?.setCooperativadetaxi) {
    await Taxi1.setCooperativadetaxi(relatedCooperativadetaxi1);
  }

  const relatedCooperativadetaxi2 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Taxi2 = await Taxis.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Taxi2?.setCooperativadetaxi) {
    await Taxi2.setCooperativadetaxi(relatedCooperativadetaxi2);
  }
}

async function associateTaxistaWithUsuario() {
  const relatedUsuario0 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Taxista0 = await Taxistas.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Taxista0?.setUsuario) {
    await Taxista0.setUsuario(relatedUsuario0);
  }

  const relatedUsuario1 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Taxista1 = await Taxistas.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Taxista1?.setUsuario) {
    await Taxista1.setUsuario(relatedUsuario1);
  }

  const relatedUsuario2 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Taxista2 = await Taxistas.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Taxista2?.setUsuario) {
    await Taxista2.setUsuario(relatedUsuario2);
  }
}

async function associateTaxistaWithCooperativadetaxi() {
  const relatedCooperativadetaxi0 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Taxista0 = await Taxistas.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Taxista0?.setCooperativadetaxi) {
    await Taxista0.setCooperativadetaxi(relatedCooperativadetaxi0);
  }

  const relatedCooperativadetaxi1 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Taxista1 = await Taxistas.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Taxista1?.setCooperativadetaxi) {
    await Taxista1.setCooperativadetaxi(relatedCooperativadetaxi1);
  }

  const relatedCooperativadetaxi2 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Taxista2 = await Taxistas.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Taxista2?.setCooperativadetaxi) {
    await Taxista2.setCooperativadetaxi(relatedCooperativadetaxi2);
  }
}

async function associateTurnoWithUsuario() {
  const relatedUsuario0 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Turno0 = await Turnos.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Turno0?.setUsuario) {
    await Turno0.setUsuario(relatedUsuario0);
  }

  const relatedUsuario1 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Turno1 = await Turnos.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Turno1?.setUsuario) {
    await Turno1.setUsuario(relatedUsuario1);
  }

  const relatedUsuario2 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Turno2 = await Turnos.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Turno2?.setUsuario) {
    await Turno2.setUsuario(relatedUsuario2);
  }
}

async function associateTurnoWithCooperativadetaxi() {
  const relatedCooperativadetaxi0 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Turno0 = await Turnos.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Turno0?.setCooperativadetaxi) {
    await Turno0.setCooperativadetaxi(relatedCooperativadetaxi0);
  }

  const relatedCooperativadetaxi1 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Turno1 = await Turnos.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Turno1?.setCooperativadetaxi) {
    await Turno1.setCooperativadetaxi(relatedCooperativadetaxi1);
  }

  const relatedCooperativadetaxi2 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Turno2 = await Turnos.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Turno2?.setCooperativadetaxi) {
    await Turno2.setCooperativadetaxi(relatedCooperativadetaxi2);
  }
}

async function associateUsuarioWithCooperativadetaxi() {
  const relatedCooperativadetaxi0 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Usuario0 = await Usuarios.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Usuario0?.setCooperativadetaxi) {
    await Usuario0.setCooperativadetaxi(relatedCooperativadetaxi0);
  }

  const relatedCooperativadetaxi1 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Usuario1 = await Usuarios.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Usuario1?.setCooperativadetaxi) {
    await Usuario1.setCooperativadetaxi(relatedCooperativadetaxi1);
  }

  const relatedCooperativadetaxi2 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Usuario2 = await Usuarios.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Usuario2?.setCooperativadetaxi) {
    await Usuario2.setCooperativadetaxi(relatedCooperativadetaxi2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Conductores.bulkCreate(ConductoresData);

    await Departamentos.bulkCreate(DepartamentosData);

    await Documentos.bulkCreate(DocumentosData);

    await Estadisticas.bulkCreate(EstadisticasData);

    await LocalizacionTaxis.bulkCreate(LocalizacionTaxisData);

    await PagosServicios.bulkCreate(PagosServiciosData);

    await ServiciosTaxi.bulkCreate(ServiciosTaxiData);

    await Taxis.bulkCreate(TaxisData);

    await Taxistas.bulkCreate(TaxistasData);

    await Turnos.bulkCreate(TurnosData);

    await Usuarios.bulkCreate(UsuariosData);

    await Cooperativadetaxis.bulkCreate(CooperativadetaxisData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithCooperativadetaxi(),

      await associateConductoreWithTaxistum(),

      await associateConductoreWithCooperativadetaxi(),

      await associateDepartamentoWithCooperativadetaxi(),

      await associateDocumentoWithUsuario(),

      await associateDocumentoWithDepartamento(),

      await associateDocumentoWithCooperativadetaxi(),

      await associateEstadisticaWithUsuario(),

      await associateEstadisticaWithDepartamento(),

      await associateEstadisticaWithCooperativadetaxi(),

      await associateLocalizacionTaxiWithTaxi(),

      await associateLocalizacionTaxiWithCooperativadetaxi(),

      await associatePagosServicioWithServicio_taxi(),

      await associatePagosServicioWithCooperativadetaxi(),

      await associateServiciosTaxiWithTaxi(),

      await associateServiciosTaxiWithCooperativadetaxi(),

      await associateTaxiWithTaxistum(),

      await associateTaxiWithCooperativadetaxi(),

      await associateTaxistaWithUsuario(),

      await associateTaxistaWithCooperativadetaxi(),

      await associateTurnoWithUsuario(),

      await associateTurnoWithCooperativadetaxi(),

      await associateUsuarioWithCooperativadetaxi(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('conductores', null, {});

    await queryInterface.bulkDelete('departamentos', null, {});

    await queryInterface.bulkDelete('documentos', null, {});

    await queryInterface.bulkDelete('estadisticas', null, {});

    await queryInterface.bulkDelete('localizacion_taxis', null, {});

    await queryInterface.bulkDelete('pagos_servicios', null, {});

    await queryInterface.bulkDelete('servicios_taxi', null, {});

    await queryInterface.bulkDelete('taxis', null, {});

    await queryInterface.bulkDelete('taxistas', null, {});

    await queryInterface.bulkDelete('turnos', null, {});

    await queryInterface.bulkDelete('usuarios', null, {});

    await queryInterface.bulkDelete('cooperativadetaxis', null, {});
  },
};
