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

import { update, fetch } from '../../stores/estadisticas/estadisticasSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditEstadisticas = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    tipo_estadistica: '',

    fecha: new Date(),

    usuario: null,

    departamento: null,

    cooperativadetaxi: null,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { estadisticas } = useAppSelector((state) => state.estadisticas);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { estadisticasId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: estadisticasId }));
  }, [estadisticasId]);

  useEffect(() => {
    if (typeof estadisticas === 'object') {
      setInitialValues(estadisticas);
    }
  }, [estadisticas]);

  useEffect(() => {
    if (typeof estadisticas === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = estadisticas[el]),
      );

      setInitialValues(newInitialVal);
    }
  }, [estadisticas]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: estadisticasId, data }));
    await router.push('/estadisticas/estadisticas-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit estadisticas')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit estadisticas'}
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
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.fecha
                      ? new Date(
                          dayjs(initialValues.fecha).format('YYYY-MM-DD hh:mm'),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, fecha: date })
                  }
                />
              </FormField>

              <FormField label='Usuario' labelFor='usuario'>
                <Field
                  name='usuario'
                  id='usuario'
                  component={SelectField}
                  options={initialValues.usuario}
                  itemRef={'usuarios'}
                  showField={'nombre'}
                ></Field>
              </FormField>

              <FormField label='Departamento' labelFor='departamento'>
                <Field
                  name='departamento'
                  id='departamento'
                  component={SelectField}
                  options={initialValues.departamento}
                  itemRef={'departamentos'}
                  showField={'nombre_departamento'}
                ></Field>
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

EditEstadisticas.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_ESTADISTICAS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditEstadisticas;
