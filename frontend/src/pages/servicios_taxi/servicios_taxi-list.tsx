import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import { uniqueId } from 'lodash';
import React, { ReactElement, useState } from 'react';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import TableServicios_taxi from '../../components/Servicios_taxi/TableServicios_taxi';
import BaseButton from '../../components/BaseButton';
import axios from 'axios';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import CardBoxModal from '../../components/CardBoxModal';
import DragDropFilePicker from '../../components/DragDropFilePicker';
import {
  setRefetch,
  uploadCsv,
} from '../../stores/servicios_taxi/servicios_taxiSlice';

import { hasPermission } from '../../helpers/userPermissions';

const Servicios_taxiTablesPage = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [showTableView, setShowTableView] = useState(false);

  const { currentUser } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [filters] = useState([
    { label: 'UbicaciónOrigen', title: 'ubicacion_origen' },
    { label: 'UbicaciónDestino', title: 'ubicacion_destino' },

    { label: 'FechadeSolicitud', title: 'fecha_solicitud', date: 'true' },
    { label: 'FechadeRealización', title: 'fecha_realizacion', date: 'true' },
    { label: 'Taxi', title: 'taxi' },

    {
      label: 'TipodeServicio',
      title: 'tipo_servicio',
      type: 'enum',
      options: ['Traslado', 'ReservaHotel'],
    },
    {
      label: 'EstadodelServicio',
      title: 'estado_servicio',
      type: 'enum',
      options: ['Pendiente', 'Encurso', 'Completado', 'Cancelado'],
    },
  ]);

  const hasCreatePermission =
    currentUser && hasPermission(currentUser, 'CREATE_SERVICIOS_TAXI');

  const addFilter = () => {
    const newItem = {
      id: uniqueId(),
      fields: {
        filterValue: '',
        filterValueFrom: '',
        filterValueTo: '',
        selectedField: '',
      },
    };
    newItem.fields.selectedField = filters[0].title;
    setFilterItems([...filterItems, newItem]);
  };

  const getServicios_taxiCSV = async () => {
    const response = await axios({
      url: '/servicios_taxi?filetype=csv',
      method: 'GET',
      responseType: 'blob',
    });
    const type = response.headers['content-type'];
    const blob = new Blob([response.data], { type: type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'servicios_taxiCSV.csv';
    link.click();
  };

  const onModalConfirm = async () => {
    if (!csvFile) return;
    await dispatch(uploadCsv(csvFile));
    dispatch(setRefetch(true));
    setCsvFile(null);
    setIsModalActive(false);
  };

  const onModalCancel = () => {
    setCsvFile(null);
    setIsModalActive(false);
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Servicios_taxi')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='Servicios_taxi'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox className='mb-6' cardBoxClassName='flex flex-wrap'>
          {hasCreatePermission && (
            <BaseButton
              className={'mr-3'}
              href={'/servicios_taxi/servicios_taxi-new'}
              color='info'
              label='New Item'
            />
          )}

          <BaseButton
            className={'mr-3'}
            color='info'
            label='Filter'
            onClick={addFilter}
          />
          <BaseButton
            className={'mr-3'}
            color='info'
            label='Download CSV'
            onClick={getServicios_taxiCSV}
          />

          {hasCreatePermission && (
            <BaseButton
              color='info'
              label='Upload CSV'
              onClick={() => setIsModalActive(true)}
            />
          )}

          <div className='md:inline-flex items-center ms-auto'>
            <div id='delete-rows-button'></div>
          </div>

          <div className='md:inline-flex items-center ms-auto'>
            <Link href={'/servicios_taxi/servicios_taxi-table'}>
              Switch to Table
            </Link>
          </div>
        </CardBox>
        <CardBox className='mb-6' hasTable>
          <TableServicios_taxi
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            filters={filters}
            showGrid={false}
          />
        </CardBox>
      </SectionMain>
      <CardBoxModal
        title='Upload CSV'
        buttonColor='info'
        buttonLabel={'Confirm'}
        // buttonLabel={false ? 'Deleting...' : 'Confirm'}
        isActive={isModalActive}
        onConfirm={onModalConfirm}
        onCancel={onModalCancel}
      >
        <DragDropFilePicker
          file={csvFile}
          setFile={setCsvFile}
          formats={'.csv'}
        />
      </CardBoxModal>
    </>
  );
};

Servicios_taxiTablesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_SERVICIOS_TAXI'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Servicios_taxiTablesPage;
