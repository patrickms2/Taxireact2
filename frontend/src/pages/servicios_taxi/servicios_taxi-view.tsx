import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/servicios_taxi/servicios_taxiSlice';
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

const Servicios_taxiView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { servicios_taxi } = useAppSelector((state) => state.servicios_taxi);

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
        <title>{getPageTitle('View servicios_taxi')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View servicios_taxi')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/servicios_taxi/servicios_taxi-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Taxi</p>

            <p>{servicios_taxi?.taxi?.matricula ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>TipodeServicio</p>
            <p>{servicios_taxi?.tipo_servicio ?? 'No data'}</p>
          </div>

          <FormField label='FechadeSolicitud'>
            {servicios_taxi.fecha_solicitud ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  servicios_taxi.fecha_solicitud
                    ? new Date(
                        dayjs(servicios_taxi.fecha_solicitud).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No FechadeSolicitud</p>
            )}
          </FormField>

          <FormField label='FechadeRealización'>
            {servicios_taxi.fecha_realizacion ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  servicios_taxi.fecha_realizacion
                    ? new Date(
                        dayjs(servicios_taxi.fecha_realizacion).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No FechadeRealización</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>EstadodelServicio</p>
            <p>{servicios_taxi?.estado_servicio ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>UbicaciónOrigen</p>
            <p>{servicios_taxi?.ubicacion_origen}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>UbicaciónDestino</p>
            <p>{servicios_taxi?.ubicacion_destino}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>cooperativadetaxi</p>

            <p>{servicios_taxi?.cooperativadetaxi?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>
              Pagos_servicios ServiciodeTaxi
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
                    {servicios_taxi.pagos_servicios_servicio_taxi &&
                      Array.isArray(
                        servicios_taxi.pagos_servicios_servicio_taxi,
                      ) &&
                      servicios_taxi.pagos_servicios_servicio_taxi.map(
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
              {!servicios_taxi?.pagos_servicios_servicio_taxi?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/servicios_taxi/servicios_taxi-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Servicios_taxiView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_SERVICIOS_TAXI'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Servicios_taxiView;
