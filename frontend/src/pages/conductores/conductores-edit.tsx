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

import { update, fetch } from '../../stores/conductores/conductoresSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditConductoresPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    taxista: '',

    nombre: '',

    apellidos: '',

    dni: '',

    fecha_nacimiento: new Date(),

    licencia_conducir: '',

    cooperativadetaxi: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { conductores } = useAppSelector((state) => state.conductores);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof conductores === 'object') {
      setInitialValues(conductores);
    }
  }, [conductores]);

  useEffect(() => {
    if (typeof conductores === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = conductores[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [conductores]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/conductores/conductores-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit conductores')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit conductores'}
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
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.fecha_nacimiento
                      ? new Date(
                          dayjs(initialValues.fecha_nacimiento).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({
                      ...initialValues,
                      fecha_nacimiento: date,
                    })
                  }
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

EditConductoresPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_CONDUCTORES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditConductoresPage;
