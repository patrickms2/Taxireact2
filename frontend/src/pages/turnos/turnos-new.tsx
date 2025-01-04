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

import { create } from '../../stores/turnos/turnosSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  usuario: '',

  fecha: '',

  hora_inicio: '',

  hora_fin: '',

  estado_turno: 'Programado',

  cooperativadetaxi: '',
};

const TurnosNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // get from url params
  const { dateRangeStart, dateRangeEnd } = router.query;

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/turnos/turnos-list');
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
            initialValues={
              dateRangeStart && dateRangeEnd
                ? {
                    ...initialValues,
                    hora_inicio:
                      moment(dateRangeStart).format('YYYY-MM-DDTHH:mm'),
                    hora_fin: moment(dateRangeEnd).format('YYYY-MM-DDTHH:mm'),
                  }
                : initialValues
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Usuario' labelFor='usuario'>
                <Field
                  name='usuario'
                  id='usuario'
                  component={SelectField}
                  options={[]}
                  itemRef={'usuarios'}
                ></Field>
              </FormField>

              <FormField label='Fecha'>
                <Field type='datetime-local' name='fecha' placeholder='Fecha' />
              </FormField>

              <FormField label='HoradeInicio'>
                <Field
                  type='datetime-local'
                  name='hora_inicio'
                  placeholder='HoradeInicio'
                />
              </FormField>

              <FormField label='HoradeFin'>
                <Field
                  type='datetime-local'
                  name='hora_fin'
                  placeholder='HoradeFin'
                />
              </FormField>

              <FormField label='EstadodelTurno' labelFor='estado_turno'>
                <Field name='estado_turno' id='estado_turno' component='select'>
                  <option value='Programado'>Programado</option>

                  <option value='Encurso'>Encurso</option>

                  <option value='Completado'>Completado</option>

                  <option value='Ausente'>Ausente</option>
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
                  onClick={() => router.push('/turnos/turnos-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

TurnosNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_TURNOS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default TurnosNew;
