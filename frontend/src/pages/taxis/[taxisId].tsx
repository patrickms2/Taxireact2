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

import { update, fetch } from '../../stores/taxis/taxisSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditTaxis = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    taxista: null,

    matricula: '',

    marca: '',

    modelo: '',

    año: '',

    color: '',

    estado: '',

    cooperativadetaxi: null,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { taxis } = useAppSelector((state) => state.taxis);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { taxisId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: taxisId }));
  }, [taxisId]);

  useEffect(() => {
    if (typeof taxis === 'object') {
      setInitialValues(taxis);
    }
  }, [taxis]);

  useEffect(() => {
    if (typeof taxis === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach((el) => (newInitialVal[el] = taxis[el]));

      setInitialValues(newInitialVal);
    }
  }, [taxis]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: taxisId, data }));
    await router.push('/taxis/taxis-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit taxis')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit taxis'}
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
              <FormField label='Taxista' labelFor='taxista'>
                <Field
                  name='taxista'
                  id='taxista'
                  component={SelectField}
                  options={initialValues.taxista}
                  itemRef={'taxistas'}
                  showField={'nombre'}
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

EditTaxis.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_TAXIS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditTaxis;
