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

import { create } from '../../stores/conductores/conductoresSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  taxista: '',

  nombre: '',

  apellidos: '',

  dni: '',

  fecha_nacimiento: '',

  licencia_conducir: '',

  cooperativadetaxi: '',
};

const ConductoresNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/conductores/conductores-list');
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

              <FormField label='Nombre'>
                <Field name='nombre' placeholder='Nombre' />
              </FormField>

              <FormField label='Apellidos'>
                <Field name='apellidos' placeholder='Apellidos' />
              </FormField>

              <FormField label='DNI'>
                <Field name='dni' placeholder='DNI' />
              </FormField>

              <FormField label='FechadeNacimiento'>
                <Field
                  type='datetime-local'
                  name='fecha_nacimiento'
                  placeholder='FechadeNacimiento'
                />
              </FormField>

              <FormField label='LicenciadeConducir'>
                <Field
                  name='licencia_conducir'
                  placeholder='LicenciadeConducir'
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
                  onClick={() => router.push('/conductores/conductores-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

ConductoresNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_CONDUCTORES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default ConductoresNew;
