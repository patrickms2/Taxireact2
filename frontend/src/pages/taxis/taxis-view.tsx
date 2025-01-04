import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/taxis/taxisSlice';
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

const TaxisView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { taxis } = useAppSelector((state) => state.taxis);

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
        <title>{getPageTitle('View taxis')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View taxis')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Taxista</p>

            <p>{taxis?.taxista?.nombre ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Matrícula</p>
            <p>{taxis?.matricula}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Marca</p>
            <p>{taxis?.marca}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Modelo</p>
            <p>{taxis?.modelo}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Año</p>
            <p>{taxis?.año || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Color</p>
            <p>{taxis?.color}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Estado</p>
            <p>{taxis?.estado ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>cooperativadetaxi</p>

            <p>{taxis?.cooperativadetaxi?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Localizacion_taxis Taxi</p>
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
                    {taxis.localizacion_taxis_taxi &&
                      Array.isArray(taxis.localizacion_taxis_taxi) &&
                      taxis.localizacion_taxis_taxi.map((item: any) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              {!taxis?.localizacion_taxis_taxi?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Servicios_taxi Taxi</p>
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
                    {taxis.servicios_taxi_taxi &&
                      Array.isArray(taxis.servicios_taxi_taxi) &&
                      taxis.servicios_taxi_taxi.map((item: any) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              {!taxis?.servicios_taxi_taxi?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/taxis/taxis-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

TaxisView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_TAXIS'}>{page}</LayoutAuthenticated>
  );
};

export default TaxisView;
