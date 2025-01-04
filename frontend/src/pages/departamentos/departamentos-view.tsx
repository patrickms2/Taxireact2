import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/departamentos/departamentosSlice';
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

const DepartamentosView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { departamentos } = useAppSelector((state) => state.departamentos);

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
        <title>{getPageTitle('View departamentos')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View departamentos')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>NombredelDepartamento</p>
            <p>{departamentos?.nombre_departamento}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>cooperativadetaxi</p>

            <p>{departamentos?.cooperativadetaxi?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Documentos Departamento</p>
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
                    {departamentos.documentos_departamento &&
                      Array.isArray(departamentos.documentos_departamento) &&
                      departamentos.documentos_departamento.map((item: any) => (
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
              {!departamentos?.documentos_departamento?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Estadisticas Departamento</p>
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
                    {departamentos.estadisticas_departamento &&
                      Array.isArray(departamentos.estadisticas_departamento) &&
                      departamentos.estadisticas_departamento.map(
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
              {!departamentos?.estadisticas_departamento?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/departamentos/departamentos-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

DepartamentosView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_DEPARTAMENTOS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default DepartamentosView;
