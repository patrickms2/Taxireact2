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

import { create } from '../../stores/taxis/taxisSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  taxista: '',

  matricula: '',

  marca: '',

  modelo: '',

  año: '',

  color: '',

  estado: 'Activo',

  cooperativadetaxi: '',
};

const TaxisNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/taxis/taxis-list');
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
              <FormField label='Taxista' labelFor='taxista'>
                <Field
                  name='taxista'
                  id='taxista'
                  component={SelectField}
                  options={[]}
                  itemRef={'taxistas'}
                ></Field>
              </FormField>

              <FormField label='Matrícula'>
                <Field name='matricula' placeholder='Matrícula' />
              </FormField>

              <FormField label='Marca'>
                <Field name='marca' placeholder='Marca' />
              </FormField>

              <FormField label='Modelo'>
                <Field name='modelo' placeholder='Modelo' />
              </FormField>

              <FormField label='Año'>
                <Field type='number' name='año' placeholder='Año' />
              </FormField>

              <FormField label='Color'>
                <Field name='color' placeholder='Color' />
              </FormField>

              <FormField label='Estado' labelFor='estado'>
                <Field name='estado' id='estado' component='select'>
                  <option value='Activo'>Activo</option>

                  <option value='Mantenimiento'>Mantenimiento</option>

                  <option value='Baja'>Baja</option>
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
                  onClick={() => router.push('/taxis/taxis-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

TaxisNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_TAXIS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default TaxisNew;
