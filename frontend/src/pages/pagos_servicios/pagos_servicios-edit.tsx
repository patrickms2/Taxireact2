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
} from '../../stores/pagos_servicios/pagos_serviciosSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditPagos_serviciosPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    servicio_taxi: null,

    monto: '',

    tipo_pago: '',

    metodo_pago: '',

    fecha_pago: new Date(),

    estado_pago: '',

    cooperativadetaxi: null,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { pagos_servicios } = useAppSelector((state) => state.pagos_servicios);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof pagos_servicios === 'object') {
      setInitialValues(pagos_servicios);
    }
  }, [pagos_servicios]);

  useEffect(() => {
    if (typeof pagos_servicios === 'object') {
      const newInitialVal = { ...initVals };
      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = pagos_servicios[el]),
      );
      setInitialValues(newInitialVal);
    }
  }, [pagos_servicios]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/pagos_servicios/pagos_servicios-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit pagos_servicios')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit pagos_servicios'}
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
              <FormField label='ServiciodeTaxi' labelFor='servicio_taxi'>
                <Field
                  name='servicio_taxi'
                  id='servicio_taxi'
                  component={SelectField}
                  options={initialValues.servicio_taxi}
                  itemRef={'servicios_taxi'}
                  showField={'tipo_servicio'}
                ></Field>
              </FormField>

              <FormField label='Monto'>
                <Field type='number' name='monto' placeholder='Monto' />
              </FormField>

              <FormField label='TipodePago' labelFor='tipo_pago'>
                <Field name='tipo_pago' id='tipo_pago' component='select'>
                  <option value='Pagocompleto'>Pagocompleto</option>

                  <option value='Depósito'>Depósito</option>

                  <option value='Pagoendestino'>Pagoendestino</option>
                </Field>
              </FormField>

              <FormField label='MétododePago' labelFor='metodo_pago'>
                <Field name='metodo_pago' id='metodo_pago' component='select'>
                  <option value='Tarjeta'>Tarjeta</option>

                  <option value='Transferencia'>Transferencia</option>

                  <option value='Efectivo'>Efectivo</option>
                </Field>
              </FormField>

              <FormField label='FechadePago'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.fecha_pago
                      ? new Date(
                          dayjs(initialValues.fecha_pago).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, fecha_pago: date })
                  }
                />
              </FormField>

              <FormField label='EstadodelPago' labelFor='estado_pago'>
                <Field name='estado_pago' id='estado_pago' component='select'>
                  <option value='Pendiente'>Pendiente</option>

                  <option value='Pagado'>Pagado</option>

                  <option value='Reembolsado'>Reembolsado</option>

                  <option value='Cancelado'>Cancelado</option>
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
                  onClick={() =>
                    router.push('/pagos_servicios/pagos_servicios-list')
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

EditPagos_serviciosPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_PAGOS_SERVICIOS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditPagos_serviciosPage;
