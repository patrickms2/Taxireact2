import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

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
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/usuarios/usuariosSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditUsuariosPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    nombre: '',

    apellidos: '',

    email: '',

    password: '',

    tipo_usuario: '',

    fecha_registro: new Date(),

    cooperativadetaxi: null,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { usuarios } = useAppSelector((state) => state.usuarios);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof usuarios === 'object') {
      setInitialValues(usuarios);
    }
  }, [usuarios]);

  useEffect(() => {
    if (typeof usuarios === 'object') {
      const newInitialVal = { ...initVals };
      Object.keys(initVals).forEach((el) => (newInitialVal[el] = usuarios[el]));
      setInitialValues(newInitialVal);
    }
  }, [usuarios]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/usuarios/usuarios-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit usuarios')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit usuarios'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
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
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.fecha_registro
                      ? new Date(
                          dayjs(initialValues.fecha_registro).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, fecha_registro: date })
                  }
                />
              </FormField>

              <FormField label='cooperativadetaxi' labelFor='cooperativadetaxi'>
                <Field
                  name='cooperativadetaxi'
                  id='cooperativadetaxi'
                  component={SelectField}
                  options={initialValues.cooperativadetaxi}
                  itemRef={'cooperativadetaxis'}
                  showField={'name'}
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

EditUsuariosPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_USUARIOS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditUsuariosPage;
