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

import { update, fetch } from '../../stores/servicios_taxi/servicios_taxiSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditServicios_taxiPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    taxi: null,

    tipo_servicio: '',

    fecha_solicitud: new Date(),

    fecha_realizacion: new Date(),

    estado_servicio: '',

    ubicacion_origen: '',

    ubicacion_destino: '',

    cooperativadetaxi: null,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { servicios_taxi } = useAppSelector((state) => state.servicios_taxi);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof servicios_taxi === 'object') {
      setInitialValues(servicios_taxi);
    }
  }, [servicios_taxi]);

  useEffect(() => {
    if (typeof servicios_taxi === 'object') {
      const newInitialVal = { ...initVals };
      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = servicios_taxi[el]),
      );
      setInitialValues(newInitialVal);
    }
  }, [servicios_taxi]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/servicios_taxi/servicios_taxi-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit servicios_taxi')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit servicios_taxi'}
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

              <FormField label='TipodeServicio' labelFor='tipo_servicio'>
                <Field
                  name='tipo_servicio'
                  id='tipo_servicio'
                  component='select'
                >
                  <option value='Traslado'>Traslado</option>

                  <option value='ReservaHotel'>ReservaHotel</option>
                </Field>
              </FormField>

              <FormField label='FechadeSolicitud'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.fecha_solicitud
                      ? new Date(
                          dayjs(initialValues.fecha_solicitud).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({
                      ...initialValues,
                      fecha_solicitud: date,
                    })
                  }
                />
              </FormField>

              <FormField label='FechadeRealización'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.fecha_realizacion
                      ? new Date(
                          dayjs(initialValues.fecha_realizacion).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({
                      ...initialValues,
                      fecha_realizacion: date,
                    })
                  }
                />
              </FormField>

              <FormField label='EstadodelServicio' labelFor='estado_servicio'>
                <Field
                  name='estado_servicio'
                  id='estado_servicio'
                  component='select'
                >
                  <option value='Pendiente'>Pendiente</option>

                  <option value='Encurso'>Encurso</option>

                  <option value='Completado'>Completado</option>

                  <option value='Cancelado'>Cancelado</option>
                </Field>
              </FormField>

              <FormField label='UbicaciónOrigen'>
                <Field name='ubicacion_origen' placeholder='UbicaciónOrigen' />
              </FormField>

              <FormField label='UbicaciónDestino'>
                <Field
                  name='ubicacion_destino'
                  placeholder='UbicaciónDestino'
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
                    router.push('/servicios_taxi/servicios_taxi-list')
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

EditServicios_taxiPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_SERVICIOS_TAXI'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditServicios_taxiPage;
