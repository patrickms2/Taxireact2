import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/pagos_servicios/pagos_serviciosSlice';
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

const Pagos_serviciosView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { pagos_servicios } = useAppSelector((state) => state.pagos_servicios);

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
        <title>{getPageTitle('View pagos_servicios')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View pagos_servicios')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/pagos_servicios/pagos_servicios-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>ServiciodeTaxi</p>

            <p>{pagos_servicios?.servicio_taxi?.tipo_servicio ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Monto</p>
            <p>{pagos_servicios?.monto || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>TipodePago</p>
            <p>{pagos_servicios?.tipo_pago ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>MétododePago</p>
            <p>{pagos_servicios?.metodo_pago ?? 'No data'}</p>
          </div>

          <FormField label='FechadePago'>
            {pagos_servicios.fecha_pago ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  pagos_servicios.fecha_pago
                    ? new Date(
                        dayjs(pagos_servicios.fecha_pago).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No FechadePago</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>EstadodelPago</p>
            <p>{pagos_servicios?.estado_pago ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>cooperativadetaxi</p>

            <p>{pagos_servicios?.cooperativadetaxi?.name ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/pagos_servicios/pagos_servicios-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Pagos_serviciosView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_PAGOS_SERVICIOS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Pagos_serviciosView;
