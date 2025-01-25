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

    nombre: 'Arthur Eddington',

    apellidos: 'Andreas Vesalius',

    dni: 'John von Neumann',

    fecha_nacimiento: new Date(),

    licencia_conducir: 'Thomas Hunt Morgan',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'Charles Darwin',

    apellidos: 'Jean Baptiste Lamarck',

    dni: 'Louis Pasteur',

    fecha_nacimiento: new Date(),

    licencia_conducir: 'Edward Teller',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'Theodosius Dobzhansky',

    apellidos: 'Alfred Binet',

    dni: 'Paul Dirac',

    fecha_nacimiento: new Date(),

    licencia_conducir: 'Erwin Schrodinger',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'Enrico Fermi',

    apellidos: 'Johannes Kepler',

    dni: 'Karl Landsteiner',

    fecha_nacimiento: new Date(),

    licencia_conducir: 'Louis Victor de Broglie',

    // type code here for "relation_one" field
  },
];

const DepartamentosData = [
  {
    nombre_departamento: 'Sheldon Glashow',

    // type code here for "relation_one" field
  },

  {
    nombre_departamento: 'Max Born',

    // type code here for "relation_one" field
  },

  {
    nombre_departamento: 'Christiaan Huygens',

    // type code here for "relation_one" field
  },

  {
    nombre_departamento: 'Charles Lyell',

    // type code here for "relation_one" field
  },
];

const DocumentosData = [
  {
    nombre: 'Max Born',

    tipo_documento: 'Factura',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    fecha_creacion: new Date(),

    // type code here for "relation_one" field
  },

  {
    nombre: 'Carl Linnaeus',

    tipo_documento: 'Contrato',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    fecha_creacion: new Date(),

    // type code here for "relation_one" field
  },

  {
    nombre: 'Marcello Malpighi',

    tipo_documento: 'Contrato',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    fecha_creacion: new Date(),

    // type code here for "relation_one" field
  },

  {
    nombre: 'Frederick Gowland Hopkins',

    tipo_documento: 'Permiso',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    fecha_creacion: new Date(),

    // type code here for "relation_one" field
  },
];

const EstadisticasData = [
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
];

const LocalizacionTaxisData = [
  {
    // type code here for "relation_one" field

    latitud: 92.34,

    longitud: 95.86,

    ultima_actualizacion: new Date(),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    latitud: 97.03,

    longitud: 43.72,

    ultima_actualizacion: new Date(),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    latitud: 25.13,

    longitud: 91.12,

    ultima_actualizacion: new Date(),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    latitud: 91.72,

    longitud: 13.38,

    ultima_actualizacion: new Date(),

    // type code here for "relation_one" field
  },
];

const PagosServiciosData = [
  {
    // type code here for "relation_one" field

    monto: 10.76,

    tipo_pago: 'Pagoendestino',

    metodo_pago: 'Tarjeta',

    fecha_pago: new Date(),

    estado_pago: 'Cancelado',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    monto: 33.34,

    tipo_pago: 'Pagocompleto',

    metodo_pago: 'Transferencia',

    fecha_pago: new Date(),

    estado_pago: 'Reembolsado',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    monto: 26.61,

    tipo_pago: 'Depósito',

    metodo_pago: 'Efectivo',

    fecha_pago: new Date(),

    estado_pago: 'Pendiente',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    monto: 57.51,

    tipo_pago: 'Pagocompleto',

    metodo_pago: 'Tarjeta',

    fecha_pago: new Date(),

    estado_pago: 'Pagado',

    // type code here for "relation_one" field
  },
];

const ServiciosTaxiData = [
  {
    // type code here for "relation_one" field

    tipo_servicio: 'ReservaHotel',

    fecha_solicitud: new Date(),

    fecha_realizacion: new Date(),

    estado_servicio: 'Encurso',

    ubicacion_origen: 'Gregor Mendel',

    ubicacion_destino: 'Lynn Margulis',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    tipo_servicio: 'ReservaHotel',

    fecha_solicitud: new Date(),

    fecha_realizacion: new Date(),

    estado_servicio: 'Encurso',

    ubicacion_origen: 'Max Planck',

    ubicacion_destino: 'Albrecht von Haller',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    tipo_servicio: 'Traslado',

    fecha_solicitud: new Date(),

    fecha_realizacion: new Date(),

    estado_servicio: 'Cancelado',

    ubicacion_origen: 'Rudolf Virchow',

    ubicacion_destino: 'B. F. Skinner',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    tipo_servicio: 'Traslado',

    fecha_solicitud: new Date(),

    fecha_realizacion: new Date(),

    estado_servicio: 'Encurso',

    ubicacion_origen: 'Frederick Gowland Hopkins',

    ubicacion_destino: 'Jean Baptiste Lamarck',

    // type code here for "relation_one" field
  },
];

const TaxisData = [
  {
    // type code here for "relation_one" field

    matricula: 'John Bardeen',

    marca: 'Claude Bernard',

    modelo: 'Francis Crick',

    año: 6,

    color: 'Louis Pasteur',

    estado: 'Mantenimiento',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    matricula: 'B. F. Skinner',

    marca: 'Michael Faraday',

    modelo: 'Thomas Hunt Morgan',

    año: 4,

    color: 'B. F. Skinner',

    estado: 'Activo',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    matricula: 'Albert Einstein',

    marca: 'Max Planck',

    modelo: 'Hans Bethe',

    año: 3,

    color: 'Tycho Brahe',

    estado: 'Activo',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    matricula: 'Max Delbruck',

    marca: 'Linus Pauling',

    modelo: 'Frederick Sanger',

    año: 4,

    color: 'Nicolaus Copernicus',

    estado: 'Activo',

    // type code here for "relation_one" field
  },
];

const TaxistasData = [
  {
    // type code here for "relation_one" field

    nombre: 'Alfred Wegener',

    apellidos: 'Ernst Haeckel',

    dni: 'Arthur Eddington',

    direccion: 'Alexander Fleming',

    telefono: 'Francis Galton',

    fecha_registro: new Date(),

    estado: 'Activo',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'Max Planck',

    apellidos: 'Alfred Kinsey',

    dni: 'Charles Lyell',

    direccion: 'Jean Piaget',

    telefono: 'Werner Heisenberg',

    fecha_registro: new Date(),

    estado: 'Inactivo',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'B. F. Skinner',

    apellidos: 'Trofim Lysenko',

    dni: 'Anton van Leeuwenhoek',

    direccion: 'Albrecht von Haller',

    telefono: 'Tycho Brahe',

    fecha_registro: new Date(),

    estado: 'Activo',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    nombre: 'Max Delbruck',

    apellidos: 'Albert Einstein',

    dni: 'Christiaan Huygens',

    direccion: 'Johannes Kepler',

    telefono: 'Gertrude Belle Elion',

    fecha_registro: new Date(),

    estado: 'Inactivo',

    // type code here for "relation_one" field
  },
];

const TurnosData = [
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

    estado_turno: 'Completado',

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

    estado_turno: 'Completado',

    // type code here for "relation_one" field
  },
];

const UsuariosData = [
  {
    nombre: 'Joseph J. Thomson',

    apellidos: 'Marcello Malpighi',

    email: 'Andreas Vesalius',

    password: 'Euclid',

    tipo_usuario: 'Taxista',

    fecha_registro: new Date(),

    // type code here for "relation_one" field
  },

  {
    nombre: 'Charles Lyell',

    apellidos: 'Max Delbruck',

    email: 'Wilhelm Wundt',

    password: 'Robert Koch',

    tipo_usuario: 'Hotel',

    fecha_registro: new Date(),

    // type code here for "relation_one" field
  },

  {
    nombre: 'Konrad Lorenz',

    apellidos: 'Archimedes',

    email: 'Konrad Lorenz',

    password: 'Johannes Kepler',

    tipo_usuario: 'Empleado',

    fecha_registro: new Date(),

    // type code here for "relation_one" field
  },

  {
    nombre: 'B. F. Skinner',

    apellidos: 'Albert Einstein',

    email: 'Werner Heisenberg',

    password: 'William Herschel',

    tipo_usuario: 'Empleado',

    fecha_registro: new Date(),

    // type code here for "relation_one" field
  },
];

const CooperativadetaxisData = [
  {
    name: 'Comte de Buffon',
  },

  {
    name: 'Archimedes',
  },

  {
    name: 'William Bayliss',
  },

  {
    name: 'Edward Teller',
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
