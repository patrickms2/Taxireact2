import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/estadisticas/estadisticasSlice';
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

const EstadisticasView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { estadisticas } = useAppSelector((state) => state.estadisticas);

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
        <title>{getPageTitle('View estadisticas')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View estadisticas')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/estadisticas/estadisticas-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>TipodeEstadística</p>
            <p>{estadisticas?.tipo_estadistica ?? 'No data'}</p>
          </div>

          <FormField label='Fecha'>
            {estadisticas.fecha ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  estadisticas.fecha
                    ? new Date(
                        dayjs(estadisticas.fecha).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No Fecha</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Usuario</p>

            <p>{estadisticas?.usuario?.nombre ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Departamento</p>

            <p>
              {estadisticas?.departamento?.nombre_departamento ?? 'No data'}
            </p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>cooperativadetaxi</p>

            <p>{estadisticas?.cooperativadetaxi?.name ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/estadisticas/estadisticas-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

EstadisticasView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ESTADISTICAS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EstadisticasView;
