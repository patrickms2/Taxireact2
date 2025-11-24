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

import { create } from '../../stores/servicios_taxi/servicios_taxiSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  taxi: '',

  tipo_servicio: 'Traslado',

  fecha_solicitud: '',

  fecha_realizacion: '',

  estado_servicio: 'Pendiente',

  ubicacion_origen: '',

  ubicacion_destino: '',

  cooperativadetaxi: '',
};

const Servicios_taxiNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // get from url params
  const { dateRangeStart, dateRangeEnd } = router.query;

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/servicios_taxi/servicios_taxi-list');
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
            initialValues={
              dateRangeStart && dateRangeEnd
                ? {
                    ...initialValues,
                    fecha_solicitud:
                      moment(dateRangeStart).format('YYYY-MM-DDTHH:mm'),
                    fecha_realizacion:
                      moment(dateRangeEnd).format('YYYY-MM-DDTHH:mm'),
                  }
                : initialValues
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Taxi' labelFor='taxi'>
                <Field
                  name='taxi'
                  id='taxi'
                  component={SelectField}
                  options={[]}
                  itemRef={'taxis'}
                ></Field>
              </FormField>

              <FormField label='TipodeServicio' labelFor='tipo_servicio'>
                <Field
                  name='tipo_servicio'
                  id='tipo_servicio'
                  component='select'
                >
                  <option value='Traslado'>Traslado</option>

                  <option value='ReservaHotel'>ReservaHotel</option>
                </Field>
              </FormField>

              <FormField label='FechadeSolicitud'>
                <Field
                  type='datetime-local'
                  name='fecha_solicitud'
                  placeholder='FechadeSolicitud'
                />
              </FormField>

              <FormField label='FechadeRealización'>
                <Field
                  type='datetime-local'
                  name='fecha_realizacion'
                  placeholder='FechadeRealización'
                />
              </FormField>

              <FormField label='EstadodelServicio' labelFor='estado_servicio'>
                <Field
                  name='estado_servicio'
                  id='estado_servicio'
                  component='select'
                >
                  <option value='Pendiente'>Pendiente</option>

                  <option value='Encurso'>Encurso</option>

                  <option value='Completado'>Completado</option>

                  <option value='Cancelado'>Cancelado</option>
                </Field>
              </FormField>

              <FormField label='UbicaciónOrigen'>
                <Field name='ubicacion_origen' placeholder='UbicaciónOrigen' />
              </FormField>

              <FormField label='UbicaciónDestino'>
                <Field
                  name='ubicacion_destino'
                  placeholder='UbicaciónDestino'
                />
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
                    router.push('/servicios_taxi/servicios_taxi-list')
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

Servicios_taxiNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_SERVICIOS_TAXI'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Servicios_taxiNew;
