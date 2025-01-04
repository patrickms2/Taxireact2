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

import { create } from '../../stores/estadisticas/estadisticasSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  tipo_estadistica: 'Servicios',

  fecha: '',

  usuario: '',

  departamento: '',

  cooperativadetaxi: '',
};

const EstadisticasNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/estadisticas/estadisticas-list');
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
              <FormField label='TipodeEstadística' labelFor='tipo_estadistica'>
                <Field
                  name='tipo_estadistica'
                  id='tipo_estadistica'
                  component='select'
                >
                  <option value='Servicios'>Servicios</option>

                  <option value='Documentos'>Documentos</option>
                </Field>
              </FormField>

              <FormField label='Fecha'>
                <Field type='datetime-local' name='fecha' placeholder='Fecha' />
              </FormField>

              <FormField label='Usuario' labelFor='usuario'>
                <Field
                  name='usuario'
                  id='usuario'
                  component={SelectField}
                  options={[]}
                  itemRef={'usuarios'}
                ></Field>
              </FormField>

              <FormField label='Departamento' labelFor='departamento'>
                <Field
                  name='departamento'
                  id='departamento'
                  component={SelectField}
                  options={[]}
                  itemRef={'departamentos'}
                ></Field>
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
                  onClick={() => router.push('/estadisticas/estadisticas-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EstadisticasNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_ESTADISTICAS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EstadisticasNew;
