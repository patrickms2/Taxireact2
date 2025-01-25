import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/usuarios/usuariosSlice';
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

const UsuariosView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { usuarios } = useAppSelector((state) => state.usuarios);

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
        <title>{getPageTitle('View usuarios')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View usuarios')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/usuarios/usuarios-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Nombre</p>
            <p>{usuarios?.nombre}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Apellidos</p>
            <p>{usuarios?.apellidos}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>CorreoElectrónico</p>
            <p>{usuarios?.email}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Contraseña</p>
            <p>{usuarios?.password}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>TipodeUsuario</p>
            <p>{usuarios?.tipo_usuario ?? 'No data'}</p>
          </div>

          <FormField label='FechadeRegistro'>
            {usuarios.fecha_registro ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  usuarios.fecha_registro
                    ? new Date(
                        dayjs(usuarios.fecha_registro).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No FechadeRegistro</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>cooperativadetaxi</p>

            <p>{usuarios?.cooperativadetaxi?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Documentos Usuario</p>
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
                    {usuarios.documentos_usuario &&
                      Array.isArray(usuarios.documentos_usuario) &&
                      usuarios.documentos_usuario.map((item: any) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              {!usuarios?.documentos_usuario?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Estadisticas Usuario</p>
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
                    {usuarios.estadisticas_usuario &&
                      Array.isArray(usuarios.estadisticas_usuario) &&
                      usuarios.estadisticas_usuario.map((item: any) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              {!usuarios?.estadisticas_usuario?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Taxistas Usuario</p>
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
                    {usuarios.taxistas_usuario &&
                      Array.isArray(usuarios.taxistas_usuario) &&
                      usuarios.taxistas_usuario.map((item: any) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              {!usuarios?.taxistas_usuario?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Turnos Usuario</p>
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
                    {usuarios.turnos_usuario &&
                      Array.isArray(usuarios.turnos_usuario) &&
                      usuarios.turnos_usuario.map((item: any) => (
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
                            {dataFormatter.dateTimeFormatter(item.hora_inicio)}
                          </td>

                          <td data-label='hora_fin'>
                            {dataFormatter.dateTimeFormatter(item.hora_fin)}
                          </td>

                          <td data-label='estado_turno'>{item.estado_turno}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!usuarios?.turnos_usuario?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/usuarios/usuarios-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

UsuariosView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_USUARIOS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default UsuariosView;
