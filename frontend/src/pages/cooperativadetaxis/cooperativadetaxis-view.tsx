import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/cooperativadetaxis/cooperativadetaxisSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const CooperativadetaxisView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cooperativadetaxis } = useAppSelector(
    (state) => state.cooperativadetaxis,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View cooperativadetaxis')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View cooperativadetaxis')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{cooperativadetaxis?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Users Cooperativadetaxis</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cooperativadetaxis.users_cooperativadetaxi &&
                      Array.isArray(
                        cooperativadetaxis.users_cooperativadetaxi,
                      ) &&
                      cooperativadetaxis.users_cooperativadetaxi.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(`/users/users-view/?id=${item.id}`)
                            }
                          >
                            <td data-label='firstName'>{item.firstName}</td>

                            <td data-label='lastName'>{item.lastName}</td>

                            <td data-label='phoneNumber'>{item.phoneNumber}</td>

                            <td data-label='email'>{item.email}</td>

                            <td data-label='disabled'>
                              {dataFormatter.booleanFormatter(item.disabled)}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.users_cooperativadetaxi?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Conductores cooperativadetaxi
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>

                      <th>Apellidos</th>

                      <th>DNI</th>

                      <th>FechadeNacimiento</th>

                      <th>LicenciadeConducir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cooperativadetaxis.conductores_cooperativadetaxi &&
                      Array.isArray(
                        cooperativadetaxis.conductores_cooperativadetaxi,
                      ) &&
                      cooperativadetaxis.conductores_cooperativadetaxi.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/conductores/conductores-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='nombre'>{item.nombre}</td>

                            <td data-label='apellidos'>{item.apellidos}</td>

                            <td data-label='dni'>{item.dni}</td>

                            <td data-label='fecha_nacimiento'>
                              {dataFormatter.dateTimeFormatter(
                                item.fecha_nacimiento,
                              )}
                            </td>

                            <td data-label='licencia_conducir'>
                              {item.licencia_conducir}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.conductores_cooperativadetaxi?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Departamentos cooperativadetaxi
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>NombredelDepartamento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cooperativadetaxis.departamentos_cooperativadetaxi &&
                      Array.isArray(
                        cooperativadetaxis.departamentos_cooperativadetaxi,
                      ) &&
                      cooperativadetaxis.departamentos_cooperativadetaxi.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/departamentos/departamentos-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='nombre_departamento'>
                              {item.nombre_departamento}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.departamentos_cooperativadetaxi?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Documentos cooperativadetaxi
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>NombredelDocumento</th>

                      <th>TipodeDocumento</th>

                      <th>FechadeCreación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cooperativadetaxis.documentos_cooperativadetaxi &&
                      Array.isArray(
                        cooperativadetaxis.documentos_cooperativadetaxi,
                      ) &&
                      cooperativadetaxis.documentos_cooperativadetaxi.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/documentos/documentos-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='nombre'>{item.nombre}</td>

                            <td data-label='tipo_documento'>
                              {item.tipo_documento}
                            </td>

                            <td data-label='fecha_creacion'>
                              {dataFormatter.dateTimeFormatter(
                                item.fecha_creacion,
                              )}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.documentos_cooperativadetaxi?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Estadisticas cooperativadetaxi
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>TipodeEstadística</th>

                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cooperativadetaxis.estadisticas_cooperativadetaxi &&
                      Array.isArray(
                        cooperativadetaxis.estadisticas_cooperativadetaxi,
                      ) &&
                      cooperativadetaxis.estadisticas_cooperativadetaxi.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/estadisticas/estadisticas-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='tipo_estadistica'>
                              {item.tipo_estadistica}
                            </td>

                            <td data-label='fecha'>
                              {dataFormatter.dateTimeFormatter(item.fecha)}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.estadisticas_cooperativadetaxi?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Localizacion_taxis cooperativadetaxi
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Latitud</th>

                      <th>Longitud</th>

                      <th>ÚltimaActualización</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cooperativadetaxis.localizacion_taxis_cooperativadetaxi &&
                      Array.isArray(
                        cooperativadetaxis.localizacion_taxis_cooperativadetaxi,
                      ) &&
                      cooperativadetaxis.localizacion_taxis_cooperativadetaxi.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/localizacion_taxis/localizacion_taxis-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='latitud'>{item.latitud}</td>

                            <td data-label='longitud'>{item.longitud}</td>

                            <td data-label='ultima_actualizacion'>
                              {dataFormatter.dateTimeFormatter(
                                item.ultima_actualizacion,
                              )}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.localizacion_taxis_cooperativadetaxi
                ?.length && <div className={'text-center py-4'}>No data</div>}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Pagos_servicios cooperativadetaxi
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Monto</th>

                      <th>TipodePago</th>

                      <th>MétododePago</th>

                      <th>FechadePago</th>

                      <th>EstadodelPago</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cooperativadetaxis.pagos_servicios_cooperativadetaxi &&
                      Array.isArray(
                        cooperativadetaxis.pagos_servicios_cooperativadetaxi,
                      ) &&
                      cooperativadetaxis.pagos_servicios_cooperativadetaxi.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/pagos_servicios/pagos_servicios-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='monto'>{item.monto}</td>

                            <td data-label='tipo_pago'>{item.tipo_pago}</td>

                            <td data-label='metodo_pago'>{item.metodo_pago}</td>

                            <td data-label='fecha_pago'>
                              {dataFormatter.dateTimeFormatter(item.fecha_pago)}
                            </td>

                            <td data-label='estado_pago'>{item.estado_pago}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.pagos_servicios_cooperativadetaxi
                ?.length && <div className={'text-center py-4'}>No data</div>}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Servicios_taxi cooperativadetaxi
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>TipodeServicio</th>

                      <th>FechadeSolicitud</th>

                      <th>FechadeRealización</th>

                      <th>EstadodelServicio</th>

                      <th>UbicaciónOrigen</th>

                      <th>UbicaciónDestino</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cooperativadetaxis.servicios_taxi_cooperativadetaxi &&
                      Array.isArray(
                        cooperativadetaxis.servicios_taxi_cooperativadetaxi,
                      ) &&
                      cooperativadetaxis.servicios_taxi_cooperativadetaxi.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/servicios_taxi/servicios_taxi-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='tipo_servicio'>
                              {item.tipo_servicio}
                            </td>

                            <td data-label='fecha_solicitud'>
                              {dataFormatter.dateTimeFormatter(
                                item.fecha_solicitud,
                              )}
                            </td>

                            <td data-label='fecha_realizacion'>
                              {dataFormatter.dateTimeFormatter(
                                item.fecha_realizacion,
                              )}
                            </td>

                            <td data-label='estado_servicio'>
                              {item.estado_servicio}
                            </td>

                            <td data-label='ubicacion_origen'>
                              {item.ubicacion_origen}
                            </td>

                            <td data-label='ubicacion_destino'>
                              {item.ubicacion_destino}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.servicios_taxi_cooperativadetaxi
                ?.length && <div className={'text-center py-4'}>No data</div>}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Taxis cooperativadetaxi</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Matrícula</th>

                      <th>Marca</th>

                      <th>Modelo</th>

                      <th>Año</th>

                      <th>Color</th>

                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cooperativadetaxis.taxis_cooperativadetaxi &&
                      Array.isArray(
                        cooperativadetaxis.taxis_cooperativadetaxi,
                      ) &&
                      cooperativadetaxis.taxis_cooperativadetaxi.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(`/taxis/taxis-view/?id=${item.id}`)
                            }
                          >
                            <td data-label='matricula'>{item.matricula}</td>

                            <td data-label='marca'>{item.marca}</td>

                            <td data-label='modelo'>{item.modelo}</td>

                            <td data-label='año'>{item.año}</td>

                            <td data-label='color'>{item.color}</td>

                            <td data-label='estado'>{item.estado}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.taxis_cooperativadetaxi?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Taxistas cooperativadetaxi</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>

                      <th>Apellidos</th>

                      <th>DNI</th>

                      <th>Dirección</th>

                      <th>Teléfono</th>

                      <th>FechadeRegistro</th>

                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cooperativadetaxis.taxistas_cooperativadetaxi &&
                      Array.isArray(
                        cooperativadetaxis.taxistas_cooperativadetaxi,
                      ) &&
                      cooperativadetaxis.taxistas_cooperativadetaxi.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/taxistas/taxistas-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='nombre'>{item.nombre}</td>

                            <td data-label='apellidos'>{item.apellidos}</td>

                            <td data-label='dni'>{item.dni}</td>

                            <td data-label='direccion'>{item.direccion}</td>

                            <td data-label='telefono'>{item.telefono}</td>

                            <td data-label='fecha_registro'>
                              {dataFormatter.dateTimeFormatter(
                                item.fecha_registro,
                              )}
                            </td>

                            <td data-label='estado'>{item.estado}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.taxistas_cooperativadetaxi?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Turnos cooperativadetaxi</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Fecha</th>

                      <th>HoradeInicio</th>

                      <th>HoradeFin</th>

                      <th>EstadodelTurno</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cooperativadetaxis.turnos_cooperativadetaxi &&
                      Array.isArray(
                        cooperativadetaxis.turnos_cooperativadetaxi,
                      ) &&
                      cooperativadetaxis.turnos_cooperativadetaxi.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(`/turnos/turnos-view/?id=${item.id}`)
                            }
                          >
                            <td data-label='fecha'>
                              {dataFormatter.dateTimeFormatter(item.fecha)}
                            </td>

                            <td data-label='hora_inicio'>
                              {dataFormatter.dateTimeFormatter(
                                item.hora_inicio,
                              )}
                            </td>

                            <td data-label='hora_fin'>
                              {dataFormatter.dateTimeFormatter(item.hora_fin)}
                            </td>

                            <td data-label='estado_turno'>
                              {item.estado_turno}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.turnos_cooperativadetaxi?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Usuarios cooperativadetaxi</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>

                      <th>Apellidos</th>

                      <th>CorreoElectrónico</th>

                      <th>Contraseña</th>

                      <th>TipodeUsuario</th>

                      <th>FechadeRegistro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cooperativadetaxis.usuarios_cooperativadetaxi &&
                      Array.isArray(
                        cooperativadetaxis.usuarios_cooperativadetaxi,
                      ) &&
                      cooperativadetaxis.usuarios_cooperativadetaxi.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/usuarios/usuarios-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='nombre'>{item.nombre}</td>

                            <td data-label='apellidos'>{item.apellidos}</td>

                            <td data-label='email'>{item.email}</td>

                            <td data-label='password'>{item.password}</td>

                            <td data-label='tipo_usuario'>
                              {item.tipo_usuario}
                            </td>

                            <td data-label='fecha_registro'>
                              {dataFormatter.dateTimeFormatter(
                                item.fecha_registro,
                              )}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!cooperativadetaxis?.usuarios_cooperativadetaxi?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push('/cooperativadetaxis/cooperativadetaxis-list')
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

CooperativadetaxisView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_COOPERATIVADETAXIS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default CooperativadetaxisView;
