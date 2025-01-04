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

import { create } from '../../stores/usuarios/usuariosSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  nombre: '',

  apellidos: '',

  email: '',

  password: '',

  tipo_usuario: 'Empleado',

  fecha_registro: '',

  cooperativadetaxi: '',
};

const UsuariosNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/usuarios/usuarios-list');
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
              <FormField label='Nombre'>
                <Field name='nombre' placeholder='Nombre' />
              </FormField>

              <FormField label='Apellidos'>
                <Field name='apellidos' placeholder='Apellidos' />
              </FormField>

              <FormField label='CorreoElectrónico'>
                <Field name='email' placeholder='CorreoElectrónico' />
              </FormField>

              <FormField label='Contraseña'>
                <Field name='password' placeholder='Contraseña' />
              </FormField>

              <FormField label='TipodeUsuario' labelFor='tipo_usuario'>
                <Field name='tipo_usuario' id='tipo_usuario' component='select'>
                  <option value='Empleado'>Empleado</option>

                  <option value='Taxista'>Taxista</option>

                  <option value='Cliente'>Cliente</option>

                  <option value='Hotel'>Hotel</option>
                </Field>
              </FormField>

              <FormField label='FechadeRegistro'>
                <Field
                  type='datetime-local'
                  name='fecha_registro'
                  placeholder='FechadeRegistro'
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
                  onClick={() => router.push('/usuarios/usuarios-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

UsuariosNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_USUARIOS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default UsuariosNew;
