import React from 'react';
import CardBox from '../CardBox';
import ImageField from '../ImageField';
import dataFormatter from '../../helpers/dataFormatter';
import { saveFile } from '../../helpers/fileSaver';
import ListActionsPopover from '../ListActionsPopover';
import { useAppSelector } from '../../stores/hooks';
import { Pagination } from '../Pagination';
import LoadingSpinner from '../LoadingSpinner';
import Link from 'next/link';

import { hasPermission } from '../../helpers/userPermissions';

type Props = {
  localizacion_taxis: any[];
  loading: boolean;
  onDelete: (id: string) => void;
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
};

const ListLocalizacion_taxis = ({
  localizacion_taxis,
  loading,
  onDelete,
  currentPage,
  numPages,
  onPageChange,
}: Props) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const hasUpdatePermission = hasPermission(
    currentUser,
    'UPDATE_LOCALIZACION_TAXIS',
  );

  const corners = useAppSelector((state) => state.style.corners);
  const bgColor = useAppSelector((state) => state.style.cardsColor);

  return (
    <>
      <div className='relative overflow-x-auto p-4 space-y-4'>
        {loading && <LoadingSpinner />}
        {!loading &&
          localizacion_taxis.map((item) => (
            <div key={item.id}>
              <CardBox hasTable isList className={'rounded shadow-none'}>
                <div
                  className={`flex rounded  dark:bg-dark-900  border  border-stone-300  items-center overflow-hidden`}
                >
                  <Link
                    href={`/localizacion_taxis/localizacion_taxis-view/?id=${item.id}`}
                    className={
                      'flex-1 px-4 py-6 h-24 flex divide-x-2  divide-stone-300   items-center overflow-hidden`}> dark:divide-dark-700 overflow-x-auto'
                    }
                  >
                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>Taxi</p>
                      <p className={'line-clamp-2'}>
                        {dataFormatter.taxisOneListFormatter(item.taxi)}
                      </p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>Latitud</p>
                      <p className={'line-clamp-2'}>{item.latitud}</p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>Longitud</p>
                      <p className={'line-clamp-2'}>{item.longitud}</p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>
                        ÚltimaActualización
                      </p>
                      <p className={'line-clamp-2'}>
                        {dataFormatter.dateTimeFormatter(
                          item.ultima_actualizacion,
                        )}
                      </p>
                    </div>
                  </Link>
                  <ListActionsPopover
                    onDelete={onDelete}
                    itemId={item.id}
                    pathEdit={`/localizacion_taxis/localizacion_taxis-edit/?id=${item.id}`}
                    pathView={`/localizacion_taxis/localizacion_taxis-view/?id=${item.id}`}
                    hasUpdatePermission={hasUpdatePermission}
                  />
                </div>
              </CardBox>
            </div>
          ))}
        {!loading && localizacion_taxis.length === 0 && (
          <div className='col-span-full flex items-center justify-center h-40'>
            <p className=''>No data to display</p>
          </div>
        )}
      </div>
      <div className={'flex items-center justify-center my-6'}>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          setCurrentPage={onPageChange}
        />
      </div>
    </>
  );
};

export default ListLocalizacion_taxis;
