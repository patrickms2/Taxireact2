import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import { uniqueId } from 'lodash';
import React, { ReactElement, useState } from 'react';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import TablePagos_servicios from '../../components/Pagos_servicios/TablePagos_servicios';
import BaseButton from '../../components/BaseButton';
import axios from 'axios';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import CardBoxModal from '../../components/CardBoxModal';
import DragDropFilePicker from '../../components/DragDropFilePicker';
import {
  setRefetch,
  uploadCsv,
} from '../../stores/pagos_servicios/pagos_serviciosSlice';

import { hasPermission } from '../../helpers/userPermissions';

const Pagos_serviciosTablesPage = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [showTableView, setShowTableView] = useState(false);

  const { currentUser } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [filters] = useState([
    { label: 'Monto', title: 'monto', number: 'true' },
    { label: 'FechadePago', title: 'fecha_pago', date: 'true' },
    { label: 'ServiciodeTaxi', title: 'servicio_taxi' },

    {
      label: 'TipodePago',
      title: 'tipo_pago',
      type: 'enum',
      options: ['Pagocompleto', 'Depósito', 'Pagoendestino'],
    },
    {
      label: 'MétododePago',
      title: 'metodo_pago',
      type: 'enum',
      options: ['Tarjeta', 'Transferencia', 'Efectivo'],
    },
    {
      label: 'EstadodelPago',
      title: 'estado_pago',
      type: 'enum',
      options: ['Pendiente', 'Pagado', 'Reembolsado', 'Cancelado'],
    },
  ]);

  const hasCreatePermission =
    currentUser && hasPermission(currentUser, 'CREATE_PAGOS_SERVICIOS');

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

  const getPagos_serviciosCSV = async () => {
    const response = await axios({
      url: '/pagos_servicios?filetype=csv',
      method: 'GET',
      responseType: 'blob',
    });
    const type = response.headers['content-type'];
    const blob = new Blob([response.data], { type: type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'pagos_serviciosCSV.csv';
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
        <title>{getPageTitle('Pagos_servicios')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='Pagos_servicios'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox className='mb-6' cardBoxClassName='flex flex-wrap'>
          {hasCreatePermission && (
            <BaseButton
              className={'mr-3'}
              href={'/pagos_servicios/pagos_servicios-new'}
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
            onClick={getPagos_serviciosCSV}
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
            <Link href={'/pagos_servicios/pagos_servicios-table'}>
              Switch to Table
            </Link>
          </div>
        </CardBox>
        <CardBox className='mb-6' hasTable>
          <TablePagos_servicios
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

Pagos_serviciosTablesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_PAGOS_SERVICIOS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Pagos_serviciosTablesPage;
