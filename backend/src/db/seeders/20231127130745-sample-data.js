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

    nombre: 'Willard Libby',

    apellidos: 'Joseph J. Thomson',

    dni: 'Marcello Malpighi',

    fecha_nacimiento: new Date(Date.now()),

    licencia_conducir: 'Christiaan Huygens',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'Michael Faraday',

    apellidos: 'Willard Libby',

    dni: 'Euclid',

    fecha_nacimiento: new Date(Date.now()),

    licencia_conducir: 'Johannes Kepler',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'Marie Curie',

    apellidos: 'William Herschel',

    dni: 'Louis Victor de Broglie',

    fecha_nacimiento: new Date(Date.now()),

    licencia_conducir: 'Stephen Hawking',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'James Watson',

    apellidos: 'Carl Gauss (Karl Friedrich Gauss)',

    dni: 'Stephen Hawking',

    fecha_nacimiento: new Date(Date.now()),

    licencia_conducir: 'Euclid',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'Francis Crick',

    apellidos: 'Lucretius',

    dni: 'James Clerk Maxwell',

    fecha_nacimiento: new Date(Date.now()),

    licencia_conducir: 'Max von Laue',

    // type code here for "relation_one" field
  },
];

const DepartamentosData = [
  {
    nombre_departamento: 'Frederick Sanger',

    // type code here for "relation_one" field
  },

  {
    nombre_departamento: 'B. F. Skinner',

    // type code here for "relation_one" field
  },

  {
    nombre_departamento: 'Christiaan Huygens',

    // type code here for "relation_one" field
  },

  {
    nombre_departamento: 'Erwin Schrodinger',

    // type code here for "relation_one" field
  },

  {
    nombre_departamento: 'Claude Bernard',

    // type code here for "relation_one" field
  },
];

const DocumentosData = [
  {
    nombre: 'Comte de Buffon',

    tipo_documento: 'Licencia',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    fecha_creacion: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    nombre: 'Trofim Lysenko',

    tipo_documento: 'Factura',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    fecha_creacion: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    nombre: 'Max Delbruck',

    tipo_documento: 'Permiso',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    fecha_creacion: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    nombre: 'Charles Darwin',

    tipo_documento: 'Permiso',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    fecha_creacion: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    nombre: 'Nicolaus Copernicus',

    tipo_documento: 'Factura',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    fecha_creacion: new Date(Date.now()),

    // type code here for "relation_one" field
  },
];

const EstadisticasData = [
  {
    tipo_estadistica: 'Documentos',

    fecha: new Date(Date.now()),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    tipo_estadistica: 'Servicios',

    fecha: new Date(Date.now()),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    tipo_estadistica: 'Documentos',

    fecha: new Date(Date.now()),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    tipo_estadistica: 'Documentos',

    fecha: new Date(Date.now()),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    tipo_estadistica: 'Documentos',

    fecha: new Date(Date.now()),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const LocalizacionTaxisData = [
  {
    // type code here for "relation_one" field

    latitud: 46.76,

    longitud: 99.38,

    ultima_actualizacion: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    latitud: 80.65,

    longitud: 39.16,

    ultima_actualizacion: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    latitud: 17.01,

    longitud: 68.53,

    ultima_actualizacion: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    latitud: 71.38,

    longitud: 41.75,

    ultima_actualizacion: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    latitud: 25.97,

    longitud: 18.54,

    ultima_actualizacion: new Date(Date.now()),

    // type code here for "relation_one" field
  },
];

const PagosServiciosData = [
  {
    // type code here for "relation_one" field

    monto: 74.27,

    tipo_pago: 'Depósito',

    metodo_pago: 'Transferencia',

    fecha_pago: new Date(Date.now()),

    estado_pago: 'Pagado',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    monto: 12.61,

    tipo_pago: 'Depósito',

    metodo_pago: 'Efectivo',

    fecha_pago: new Date(Date.now()),

    estado_pago: 'Pendiente',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    monto: 81.04,

    tipo_pago: 'Pagocompleto',

    metodo_pago: 'Transferencia',

    fecha_pago: new Date(Date.now()),

    estado_pago: 'Pagado',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    monto: 90.84,

    tipo_pago: 'Pagocompleto',

    metodo_pago: 'Efectivo',

    fecha_pago: new Date(Date.now()),

    estado_pago: 'Pagado',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    monto: 72.72,

    tipo_pago: 'Pagoendestino',

    metodo_pago: 'Transferencia',

    fecha_pago: new Date(Date.now()),

    estado_pago: 'Pendiente',

    // type code here for "relation_one" field
  },
];

const ServiciosTaxiData = [
  {
    // type code here for "relation_one" field

    tipo_servicio: 'ReservaHotel',

    fecha_solicitud: new Date(Date.now()),

    fecha_realizacion: new Date(Date.now()),

    estado_servicio: 'Encurso',

    ubicacion_origen: 'Ernst Mayr',

    ubicacion_destino: 'Rudolf Virchow',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    tipo_servicio: 'Traslado',

    fecha_solicitud: new Date(Date.now()),

    fecha_realizacion: new Date(Date.now()),

    estado_servicio: 'Completado',

    ubicacion_origen: 'Max Planck',

    ubicacion_destino: 'Max Planck',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    tipo_servicio: 'ReservaHotel',

    fecha_solicitud: new Date(Date.now()),

    fecha_realizacion: new Date(Date.now()),

    estado_servicio: 'Completado',

    ubicacion_origen: 'Lucretius',

    ubicacion_destino: 'Sigmund Freud',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    tipo_servicio: 'ReservaHotel',

    fecha_solicitud: new Date(Date.now()),

    fecha_realizacion: new Date(Date.now()),

    estado_servicio: 'Cancelado',

    ubicacion_origen: 'Andreas Vesalius',

    ubicacion_destino: 'Joseph J. Thomson',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    tipo_servicio: 'ReservaHotel',

    fecha_solicitud: new Date(Date.now()),

    fecha_realizacion: new Date(Date.now()),

    estado_servicio: 'Cancelado',

    ubicacion_origen: 'Richard Feynman',

    ubicacion_destino: 'Heike Kamerlingh Onnes',

    // type code here for "relation_one" field
  },
];

const TaxisData = [
  {
    // type code here for "relation_one" field

    matricula: 'Jean Baptiste Lamarck',

    marca: 'Stephen Hawking',

    modelo: 'Jean Piaget',

    año: 6,

    color: 'Charles Sherrington',

    estado: 'Activo',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    matricula: 'Comte de Buffon',

    marca: 'Sheldon Glashow',

    modelo: 'Anton van Leeuwenhoek',

    año: 2,

    color: 'Wilhelm Wundt',

    estado: 'Mantenimiento',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    matricula: 'Rudolf Virchow',

    marca: 'Wilhelm Wundt',

    modelo: 'Isaac Newton',

    año: 9,

    color: 'Justus Liebig',

    estado: 'Activo',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    matricula: 'Gertrude Belle Elion',

    marca: 'Jean Piaget',

    modelo: 'Wilhelm Wundt',

    año: 6,

    color: 'Jean Piaget',

    estado: 'Mantenimiento',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    matricula: 'Willard Libby',

    marca: 'Robert Koch',

    modelo: 'Max von Laue',

    año: 1,

    color: 'Louis Victor de Broglie',

    estado: 'Mantenimiento',

    // type code here for "relation_one" field
  },
];

const TaxistasData = [
  {
    // type code here for "relation_one" field

    nombre: 'Alexander Fleming',

    apellidos: 'Max Born',

    dni: 'Comte de Buffon',

    direccion: 'Sigmund Freud',

    telefono: 'Arthur Eddington',

    fecha_registro: new Date(Date.now()),

    estado: 'Activo',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'B. F. Skinner',

    apellidos: 'Hans Selye',

    dni: 'Lucretius',

    direccion: 'Linus Pauling',

    telefono: 'Emil Kraepelin',

    fecha_registro: new Date(Date.now()),

    estado: 'Activo',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'Frederick Gowland Hopkins',

    apellidos: 'Hans Bethe',

    dni: 'James Watson',

    direccion: 'William Herschel',

    telefono: 'Hans Bethe',

    fecha_registro: new Date(Date.now()),

    estado: 'Inactivo',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'Marcello Malpighi',

    apellidos: 'Comte de Buffon',

    dni: 'William Bayliss',

    direccion: 'Louis Victor de Broglie',

    telefono: 'Robert Koch',

    fecha_registro: new Date(Date.now()),

    estado: 'Activo',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'Neils Bohr',

    apellidos: 'William Bayliss',

    dni: 'Emil Fischer',

    direccion: 'Theodosius Dobzhansky',

    telefono: 'Nicolaus Copernicus',

    fecha_registro: new Date(Date.now()),

    estado: 'Activo',

    // type code here for "relation_one" field
  },
];

const TurnosData = [
  {
    // type code here for "relation_one" field

    fecha: new Date(Date.now()),

    hora_inicio: new Date(Date.now()),

    hora_fin: new Date(Date.now()),

    estado_turno: 'Completado',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    fecha: new Date(Date.now()),

    hora_inicio: new Date(Date.now()),

    hora_fin: new Date(Date.now()),

    estado_turno: 'Encurso',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    fecha: new Date(Date.now()),

    hora_inicio: new Date(Date.now()),

    hora_fin: new Date(Date.now()),

    estado_turno: 'Encurso',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    fecha: new Date(Date.now()),

    hora_inicio: new Date(Date.now()),

    hora_fin: new Date(Date.now()),

    estado_turno: 'Encurso',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    fecha: new Date(Date.now()),

    hora_inicio: new Date(Date.now()),

    hora_fin: new Date(Date.now()),

    estado_turno: 'Completado',

    // type code here for "relation_one" field
  },
];

const UsuariosData = [
  {
    nombre: 'Alfred Binet',

    apellidos: 'Erwin Schrodinger',

    email: 'Karl Landsteiner',

    password: 'Francis Galton',

    tipo_usuario: 'Empleado',

    fecha_registro: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    nombre: 'John Bardeen',

    apellidos: 'Alfred Kinsey',

    email: 'Neils Bohr',

    password: 'J. Robert Oppenheimer',

    tipo_usuario: 'Cliente',

    fecha_registro: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    nombre: 'August Kekule',

    apellidos: 'Michael Faraday',

    email: 'Hans Bethe',

    password: 'Ernest Rutherford',

    tipo_usuario: 'Taxista',

    fecha_registro: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    nombre: 'Noam Chomsky',

    apellidos: 'Jean Piaget',

    email: 'Max von Laue',

    password: 'Arthur Eddington',

    tipo_usuario: 'Cliente',

    fecha_registro: new Date(Date.now()),

    // type code here for "relation_one" field
  },

  {
    nombre: 'Werner Heisenberg',

    apellidos: 'Arthur Eddington',

    email: 'Michael Faraday',

    password: 'Gregor Mendel',

    tipo_usuario: 'Taxista',

    fecha_registro: new Date(Date.now()),

    // type code here for "relation_one" field
  },
];

const CooperativadetaxisData = [
  {
    name: 'William Harvey',
  },

  {
    name: 'Lynn Margulis',
  },

  {
    name: 'Louis Victor de Broglie',
  },

  {
    name: 'Franz Boas',
  },

  {
    name: 'Konrad Lorenz',
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

  const relatedCooperativadetaxi3 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setCooperativadetaxi) {
    await User3.setCooperativadetaxi(relatedCooperativadetaxi3);
  }

  const relatedCooperativadetaxi4 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const User4 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (User4?.setCooperativadetaxi) {
    await User4.setCooperativadetaxi(relatedCooperativadetaxi4);
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

  const relatedTaxistum3 = await Taxistas.findOne({
    offset: Math.floor(Math.random() * (await Taxistas.count())),
  });
  const Conductore3 = await Conductores.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Conductore3?.setTaxistum) {
    await Conductore3.setTaxistum(relatedTaxistum3);
  }

  const relatedTaxistum4 = await Taxistas.findOne({
    offset: Math.floor(Math.random() * (await Taxistas.count())),
  });
  const Conductore4 = await Conductores.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Conductore4?.setTaxistum) {
    await Conductore4.setTaxistum(relatedTaxistum4);
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

  const relatedCooperativadetaxi3 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Conductore3 = await Conductores.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Conductore3?.setCooperativadetaxi) {
    await Conductore3.setCooperativadetaxi(relatedCooperativadetaxi3);
  }

  const relatedCooperativadetaxi4 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Conductore4 = await Conductores.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Conductore4?.setCooperativadetaxi) {
    await Conductore4.setCooperativadetaxi(relatedCooperativadetaxi4);
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

  const relatedCooperativadetaxi3 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Departamento3 = await Departamentos.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Departamento3?.setCooperativadetaxi) {
    await Departamento3.setCooperativadetaxi(relatedCooperativadetaxi3);
  }

  const relatedCooperativadetaxi4 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Departamento4 = await Departamentos.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Departamento4?.setCooperativadetaxi) {
    await Departamento4.setCooperativadetaxi(relatedCooperativadetaxi4);
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

  const relatedUsuario3 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Documento3 = await Documentos.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Documento3?.setUsuario) {
    await Documento3.setUsuario(relatedUsuario3);
  }

  const relatedUsuario4 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Documento4 = await Documentos.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Documento4?.setUsuario) {
    await Documento4.setUsuario(relatedUsuario4);
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

  const relatedDepartamento3 = await Departamentos.findOne({
    offset: Math.floor(Math.random() * (await Departamentos.count())),
  });
  const Documento3 = await Documentos.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Documento3?.setDepartamento) {
    await Documento3.setDepartamento(relatedDepartamento3);
  }

  const relatedDepartamento4 = await Departamentos.findOne({
    offset: Math.floor(Math.random() * (await Departamentos.count())),
  });
  const Documento4 = await Documentos.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Documento4?.setDepartamento) {
    await Documento4.setDepartamento(relatedDepartamento4);
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

  const relatedCooperativadetaxi3 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Documento3 = await Documentos.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Documento3?.setCooperativadetaxi) {
    await Documento3.setCooperativadetaxi(relatedCooperativadetaxi3);
  }

  const relatedCooperativadetaxi4 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Documento4 = await Documentos.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Documento4?.setCooperativadetaxi) {
    await Documento4.setCooperativadetaxi(relatedCooperativadetaxi4);
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

  const relatedUsuario3 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Estadistica3 = await Estadisticas.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Estadistica3?.setUsuario) {
    await Estadistica3.setUsuario(relatedUsuario3);
  }

  const relatedUsuario4 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Estadistica4 = await Estadisticas.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Estadistica4?.setUsuario) {
    await Estadistica4.setUsuario(relatedUsuario4);
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

  const relatedDepartamento3 = await Departamentos.findOne({
    offset: Math.floor(Math.random() * (await Departamentos.count())),
  });
  const Estadistica3 = await Estadisticas.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Estadistica3?.setDepartamento) {
    await Estadistica3.setDepartamento(relatedDepartamento3);
  }

  const relatedDepartamento4 = await Departamentos.findOne({
    offset: Math.floor(Math.random() * (await Departamentos.count())),
  });
  const Estadistica4 = await Estadisticas.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Estadistica4?.setDepartamento) {
    await Estadistica4.setDepartamento(relatedDepartamento4);
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

  const relatedCooperativadetaxi3 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Estadistica3 = await Estadisticas.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Estadistica3?.setCooperativadetaxi) {
    await Estadistica3.setCooperativadetaxi(relatedCooperativadetaxi3);
  }

  const relatedCooperativadetaxi4 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Estadistica4 = await Estadisticas.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Estadistica4?.setCooperativadetaxi) {
    await Estadistica4.setCooperativadetaxi(relatedCooperativadetaxi4);
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

  const relatedTaxi3 = await Taxis.findOne({
    offset: Math.floor(Math.random() * (await Taxis.count())),
  });
  const LocalizacionTaxi3 = await LocalizacionTaxis.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (LocalizacionTaxi3?.setTaxi) {
    await LocalizacionTaxi3.setTaxi(relatedTaxi3);
  }

  const relatedTaxi4 = await Taxis.findOne({
    offset: Math.floor(Math.random() * (await Taxis.count())),
  });
  const LocalizacionTaxi4 = await LocalizacionTaxis.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (LocalizacionTaxi4?.setTaxi) {
    await LocalizacionTaxi4.setTaxi(relatedTaxi4);
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

  const relatedCooperativadetaxi3 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const LocalizacionTaxi3 = await LocalizacionTaxis.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (LocalizacionTaxi3?.setCooperativadetaxi) {
    await LocalizacionTaxi3.setCooperativadetaxi(relatedCooperativadetaxi3);
  }

  const relatedCooperativadetaxi4 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const LocalizacionTaxi4 = await LocalizacionTaxis.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (LocalizacionTaxi4?.setCooperativadetaxi) {
    await LocalizacionTaxi4.setCooperativadetaxi(relatedCooperativadetaxi4);
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

  const relatedServicio_taxi3 = await ServiciosTaxi.findOne({
    offset: Math.floor(Math.random() * (await ServiciosTaxi.count())),
  });
  const PagosServicio3 = await PagosServicios.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (PagosServicio3?.setServicio_taxi) {
    await PagosServicio3.setServicio_taxi(relatedServicio_taxi3);
  }

  const relatedServicio_taxi4 = await ServiciosTaxi.findOne({
    offset: Math.floor(Math.random() * (await ServiciosTaxi.count())),
  });
  const PagosServicio4 = await PagosServicios.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (PagosServicio4?.setServicio_taxi) {
    await PagosServicio4.setServicio_taxi(relatedServicio_taxi4);
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

  const relatedCooperativadetaxi3 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const PagosServicio3 = await PagosServicios.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (PagosServicio3?.setCooperativadetaxi) {
    await PagosServicio3.setCooperativadetaxi(relatedCooperativadetaxi3);
  }

  const relatedCooperativadetaxi4 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const PagosServicio4 = await PagosServicios.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (PagosServicio4?.setCooperativadetaxi) {
    await PagosServicio4.setCooperativadetaxi(relatedCooperativadetaxi4);
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

  const relatedTaxi3 = await Taxis.findOne({
    offset: Math.floor(Math.random() * (await Taxis.count())),
  });
  const ServiciosTaxi3 = await ServiciosTaxi.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (ServiciosTaxi3?.setTaxi) {
    await ServiciosTaxi3.setTaxi(relatedTaxi3);
  }

  const relatedTaxi4 = await Taxis.findOne({
    offset: Math.floor(Math.random() * (await Taxis.count())),
  });
  const ServiciosTaxi4 = await ServiciosTaxi.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (ServiciosTaxi4?.setTaxi) {
    await ServiciosTaxi4.setTaxi(relatedTaxi4);
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

  const relatedCooperativadetaxi3 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const ServiciosTaxi3 = await ServiciosTaxi.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (ServiciosTaxi3?.setCooperativadetaxi) {
    await ServiciosTaxi3.setCooperativadetaxi(relatedCooperativadetaxi3);
  }

  const relatedCooperativadetaxi4 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const ServiciosTaxi4 = await ServiciosTaxi.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (ServiciosTaxi4?.setCooperativadetaxi) {
    await ServiciosTaxi4.setCooperativadetaxi(relatedCooperativadetaxi4);
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

  const relatedTaxistum3 = await Taxistas.findOne({
    offset: Math.floor(Math.random() * (await Taxistas.count())),
  });
  const Taxi3 = await Taxis.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Taxi3?.setTaxistum) {
    await Taxi3.setTaxistum(relatedTaxistum3);
  }

  const relatedTaxistum4 = await Taxistas.findOne({
    offset: Math.floor(Math.random() * (await Taxistas.count())),
  });
  const Taxi4 = await Taxis.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Taxi4?.setTaxistum) {
    await Taxi4.setTaxistum(relatedTaxistum4);
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

  const relatedCooperativadetaxi3 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Taxi3 = await Taxis.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Taxi3?.setCooperativadetaxi) {
    await Taxi3.setCooperativadetaxi(relatedCooperativadetaxi3);
  }

  const relatedCooperativadetaxi4 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Taxi4 = await Taxis.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Taxi4?.setCooperativadetaxi) {
    await Taxi4.setCooperativadetaxi(relatedCooperativadetaxi4);
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

  const relatedUsuario3 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Taxista3 = await Taxistas.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Taxista3?.setUsuario) {
    await Taxista3.setUsuario(relatedUsuario3);
  }

  const relatedUsuario4 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Taxista4 = await Taxistas.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Taxista4?.setUsuario) {
    await Taxista4.setUsuario(relatedUsuario4);
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

  const relatedCooperativadetaxi3 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Taxista3 = await Taxistas.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Taxista3?.setCooperativadetaxi) {
    await Taxista3.setCooperativadetaxi(relatedCooperativadetaxi3);
  }

  const relatedCooperativadetaxi4 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Taxista4 = await Taxistas.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Taxista4?.setCooperativadetaxi) {
    await Taxista4.setCooperativadetaxi(relatedCooperativadetaxi4);
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

  const relatedUsuario3 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Turno3 = await Turnos.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Turno3?.setUsuario) {
    await Turno3.setUsuario(relatedUsuario3);
  }

  const relatedUsuario4 = await Usuarios.findOne({
    offset: Math.floor(Math.random() * (await Usuarios.count())),
  });
  const Turno4 = await Turnos.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Turno4?.setUsuario) {
    await Turno4.setUsuario(relatedUsuario4);
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

  const relatedCooperativadetaxi3 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Turno3 = await Turnos.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Turno3?.setCooperativadetaxi) {
    await Turno3.setCooperativadetaxi(relatedCooperativadetaxi3);
  }

  const relatedCooperativadetaxi4 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Turno4 = await Turnos.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Turno4?.setCooperativadetaxi) {
    await Turno4.setCooperativadetaxi(relatedCooperativadetaxi4);
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

  const relatedCooperativadetaxi3 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Usuario3 = await Usuarios.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Usuario3?.setCooperativadetaxi) {
    await Usuario3.setCooperativadetaxi(relatedCooperativadetaxi3);
  }

  const relatedCooperativadetaxi4 = await Cooperativadetaxis.findOne({
    offset: Math.floor(Math.random() * (await Cooperativadetaxis.count())),
  });
  const Usuario4 = await Usuarios.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Usuario4?.setCooperativadetaxi) {
    await Usuario4.setCooperativadetaxi(relatedCooperativadetaxi4);
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
