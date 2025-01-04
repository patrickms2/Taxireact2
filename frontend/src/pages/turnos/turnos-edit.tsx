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

import { update, fetch } from '../../stores/turnos/turnosSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditTurnosPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    usuario: '',

    fecha: new Date(),

    hora_inicio: new Date(),

    hora_fin: new Date(),

    estado_turno: '',

    cooperativadetaxi: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { turnos } = useAppSelector((state) => state.turnos);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof turnos === 'object') {
      setInitialValues(turnos);
    }
  }, [turnos]);

  useEffect(() => {
    if (typeof turnos === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = turnos[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [turnos]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/turnos/turnos-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit turnos')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit turnos'}
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

              <FormField label='HoradeInicio'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.hora_inicio
                      ? new Date(
                          dayjs(initialValues.hora_inicio).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, hora_inicio: date })
                  }
                />
              </FormField>

              <FormField label='HoradeFin'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.hora_fin
                      ? new Date(
                          dayjs(initialValues.hora_fin).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, hora_fin: date })
                  }
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

EditTurnosPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_TURNOS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditTurnosPage;
