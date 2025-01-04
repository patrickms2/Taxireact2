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

import {
  update,
  fetch,
} from '../../stores/localizacion_taxis/localizacion_taxisSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditLocalizacion_taxis = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    taxi: '',

    latitud: '',

    longitud: '',

    ultima_actualizacion: new Date(),

    cooperativadetaxi: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { localizacion_taxis } = useAppSelector(
    (state) => state.localizacion_taxis,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { localizacion_taxisId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: localizacion_taxisId }));
  }, [localizacion_taxisId]);

  useEffect(() => {
    if (typeof localizacion_taxis === 'object') {
      setInitialValues(localizacion_taxis);
    }
  }, [localizacion_taxis]);

  useEffect(() => {
    if (typeof localizacion_taxis === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = localizacion_taxis[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [localizacion_taxis]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: localizacion_taxisId, data }));
    await router.push('/localizacion_taxis/localizacion_taxis-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit localizacion_taxis')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit localizacion_taxis'}
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
              <FormField label='Taxi' labelFor='taxi'>
                <Field
                  name='taxi'
                  id='taxi'
                  component={SelectField}
                  options={initialValues.taxi}
                  itemRef={'taxis'}
                  showField={'matricula'}
                ></Field>
              </FormField>

              <FormField label='Latitud'>
                <Field type='number' name='latitud' placeholder='Latitud' />
              </FormField>

              <FormField label='Longitud'>
                <Field type='number' name='longitud' placeholder='Longitud' />
              </FormField>

              <FormField label='ÚltimaActualización'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.ultima_actualizacion
                      ? new Date(
                          dayjs(initialValues.ultima_actualizacion).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({
                      ...initialValues,
                      ultima_actualizacion: date,
                    })
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
                  onClick={() =>
                    router.push('/localizacion_taxis/localizacion_taxis-list')
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

EditLocalizacion_taxis.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_LOCALIZACION_TAXIS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditLocalizacion_taxis;
