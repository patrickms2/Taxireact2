import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/pagos_servicios/pagos_serviciosSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  servicio_taxi: '',

  monto: '',

  tipo_pago: 'Pagocompleto',

  metodo_pago: 'Tarjeta',

  fecha_pago: '',

  estado_pago: 'Pendiente',

  cooperativadetaxi: '',
};

const Pagos_serviciosNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/pagos_servicios/pagos_servicios-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='ServiciodeTaxi' labelFor='servicio_taxi'>
                <Field
                  name='servicio_taxi'
                  id='servicio_taxi'
                  component={SelectField}
                  options={[]}
                  itemRef={'servicios_taxi'}
                ></Field>
              </FormField>

              <FormField label='Monto'>
                <Field type='number' name='monto' placeholder='Monto' />
              </FormField>

              <FormField label='TipodePago' labelFor='tipo_pago'>
                <Field name='tipo_pago' id='tipo_pago' component='select'>
                  <option value='Pagocompleto'>Pagocompleto</option>

                  <option value='Depósito'>Depósito</option>

                  <option value='Pagoendestino'>Pagoendestino</option>
                </Field>
              </FormField>

              <FormField label='MétododePago' labelFor='metodo_pago'>
                <Field name='metodo_pago' id='metodo_pago' component='select'>
                  <option value='Tarjeta'>Tarjeta</option>

                  <option value='Transferencia'>Transferencia</option>

                  <option value='Efectivo'>Efectivo</option>
                </Field>
              </FormField>

              <FormField label='FechadePago'>
                <Field
                  type='datetime-local'
                  name='fecha_pago'
                  placeholder='FechadePago'
                />
              </FormField>

              <FormField label='EstadodelPago' labelFor='estado_pago'>
                <Field name='estado_pago' id='estado_pago' component='select'>
                  <option value='Pendiente'>Pendiente</option>

                  <option value='Pagado'>Pagado</option>

                  <option value='Reembolsado'>Reembolsado</option>

                  <option value='Cancelado'>Cancelado</option>
                </Field>
              </FormField>

              <FormField label='cooperativadetaxi' labelFor='cooperativadetaxi'>
                <Field
                  name='cooperativadetaxi'
                  id='cooperativadetaxi'
                  component={SelectField}
                  options={[]}
                  itemRef={'cooperativadetaxis'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() =>
                    router.push('/pagos_servicios/pagos_servicios-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

Pagos_serviciosNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_PAGOS_SERVICIOS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Pagos_serviciosNew;
