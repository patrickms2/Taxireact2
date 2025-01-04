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

import { update, fetch } from '../../stores/departamentos/departamentosSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditDepartamentos = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    nombre_departamento: '',

    cooperativadetaxi: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { departamentos } = useAppSelector((state) => state.departamentos);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { departamentosId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: departamentosId }));
  }, [departamentosId]);

  useEffect(() => {
    if (typeof departamentos === 'object') {
      setInitialValues(departamentos);
    }
  }, [departamentos]);

  useEffect(() => {
    if (typeof departamentos === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = departamentos[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [departamentos]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: departamentosId, data }));
    await router.push('/departamentos/departamentos-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit departamentos')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit departamentos'}
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
              <FormField label='NombredelDepartamento'>
                <Field
                  name='nombre_departamento'
                  placeholder='NombredelDepartamento'
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
                  onClick={() =>
                    router.push('/departamentos/departamentos-list')
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

EditDepartamentos.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_DEPARTAMENTOS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditDepartamentos;
