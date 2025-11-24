import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/conductores/conductores-list',
    label: 'Conductores',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiAccountDriver' in icon
        ? icon['mdiAccountDriver' as keyof typeof icon]
        : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_CONDUCTORES',
  },
  {
    href: '/departamentos/departamentos-list',
    label: 'Departamentos',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiOfficeBuilding' in icon
        ? icon['mdiOfficeBuilding' as keyof typeof icon]
        : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_DEPARTAMENTOS',
  },
  {
    href: '/documentos/documentos-list',
    label: 'Documentos',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiFileDocument' in icon
        ? icon['mdiFileDocument' as keyof typeof icon]
        : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_DOCUMENTOS',
  },
  {
    href: '/estadisticas/estadisticas-list',
    label: 'Estadisticas',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiChartBar' in icon
        ? icon['mdiChartBar' as keyof typeof icon]
        : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_ESTADISTICAS',
  },
  {
    href: '/localizacion_taxis/localizacion_taxis-list',
    label: 'Localizacion taxis',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiMapMarker' in icon
        ? icon['mdiMapMarker' as keyof typeof icon]
        : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_LOCALIZACION_TAXIS',
  },
  {
    href: '/pagos_servicios/pagos_servicios-list',
    label: 'Pagos servicios',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiCash' in icon
        ? icon['mdiCash' as keyof typeof icon]
        : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_PAGOS_SERVICIOS',
  },
  {
    href: '/servicios_taxi/servicios_taxi-list',
    label: 'Servicios taxi',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiTaxi' in icon
        ? icon['mdiTaxi' as keyof typeof icon]
        : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_SERVICIOS_TAXI',
  },
  {
    href: '/taxis/taxis-list',
    label: 'Taxis',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiCar' in icon
        ? icon['mdiCar' as keyof typeof icon]
        : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_TAXIS',
  },
  {
    href: '/taxistas/taxistas-list',
    label: 'Taxistas',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiAccountTie' in icon
        ? icon['mdiAccountTie' as keyof typeof icon]
        : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_TAXISTAS',
  },
  {
    href: '/turnos/turnos-list',
    label: 'Turnos',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiClock' in icon
        ? icon['mdiClock' as keyof typeof icon]
        : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_TURNOS',
  },
  {
    href: '/usuarios/usuarios-list',
    label: 'Usuarios',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiAccountCircle' in icon
        ? icon['mdiAccountCircle' as keyof typeof icon]
        : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_USUARIOS',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline ?? icon.mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline ?? icon.mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/cooperativadetaxis/cooperativadetaxis-list',
    label: 'Cooperativadetaxis',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_COOPERATIVADETAXIS',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

  {
    href: '/home',
    label: 'Home page',
    icon: icon.mdiHome,
    withDevider: true,
  },
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
