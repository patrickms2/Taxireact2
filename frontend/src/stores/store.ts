import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import conductoresSlice from './conductores/conductoresSlice';
import departamentosSlice from './departamentos/departamentosSlice';
import documentosSlice from './documentos/documentosSlice';
import estadisticasSlice from './estadisticas/estadisticasSlice';
import localizacion_taxisSlice from './localizacion_taxis/localizacion_taxisSlice';
import pagos_serviciosSlice from './pagos_servicios/pagos_serviciosSlice';
import servicios_taxiSlice from './servicios_taxi/servicios_taxiSlice';
import taxisSlice from './taxis/taxisSlice';
import taxistasSlice from './taxistas/taxistasSlice';
import turnosSlice from './turnos/turnosSlice';
import usuariosSlice from './usuarios/usuariosSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import cooperativadetaxisSlice from './cooperativadetaxis/cooperativadetaxisSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    conductores: conductoresSlice,
    departamentos: departamentosSlice,
    documentos: documentosSlice,
    estadisticas: estadisticasSlice,
    localizacion_taxis: localizacion_taxisSlice,
    pagos_servicios: pagos_serviciosSlice,
    servicios_taxi: servicios_taxiSlice,
    taxis: taxisSlice,
    taxistas: taxistasSlice,
    turnos: turnosSlice,
    usuarios: usuariosSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    cooperativadetaxis: cooperativadetaxisSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
