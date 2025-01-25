import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/taxistas/taxistasSlice';
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

const TaxistasView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { taxistas } = useAppSelector((state) => state.taxistas);

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
        <title>{getPageTitle('View taxistas')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View taxistas')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/taxistas/taxistas-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Usuario</p>

            <p>{taxistas?.usuario?.nombre ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Nombre</p>
            <p>{taxistas?.nombre}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Apellidos</p>
            <p>{taxistas?.apellidos}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>DNI</p>
            <p>{taxistas?.dni}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Dirección</p>
            <p>{taxistas?.direccion}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Teléfono</p>
            <p>{taxistas?.telefono}</p>
          </div>

          <FormField label='FechadeRegistro'>
            {taxistas.fecha_registro ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  taxistas.fecha_registro
                    ? new Date(
                        dayjs(taxistas.fecha_registro).format(
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
            <p className={'block font-bold mb-2'}>Estado</p>
            <p>{taxistas?.estado ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>cooperativadetaxi</p>

            <p>{taxistas?.cooperativadetaxi?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Conductores Taxista</p>
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
                    {taxistas.conductores_taxista &&
                      Array.isArray(taxistas.conductores_taxista) &&
                      taxistas.conductores_taxista.map((item: any) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              {!taxistas?.conductores_taxista?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Taxis Taxista</p>
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
                    {taxistas.taxis_taxista &&
                      Array.isArray(taxistas.taxis_taxista) &&
                      taxistas.taxis_taxista.map((item: any) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              {!taxistas?.taxis_taxista?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/taxistas/taxistas-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

TaxistasView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_TAXISTAS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default TaxistasView;
