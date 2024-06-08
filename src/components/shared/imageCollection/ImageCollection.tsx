'use client';

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { IImage } from '@/lib/database/models/image.model';
import { Button } from '../../ui/button';
import Search from '../search/Search';
import usePagination from '@/lib/hooks/usePagination';
import ImageCard from './ImageCard';

const ImageCollection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const { pageChangeHandler } = usePagination();

  return (
    <>
      <div className='collection-heading'>
        <h2 className='h2-bold text-dark-600'>Recent Edits</h2>
        {hasSearch && <Search />}
      </div>

      {images.length > 0 ? (
        <ul className='collection-list'>
          {images.map((image) => (
            <ImageCard image={image} key={image._id} />
          ))}
        </ul>
      ) : (
        <div className='collection-empty'>
          <p className='p-20-semibold'>Empty List</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className='mt-10'>
          <PaginationContent className='flex w-full'>
            <Button
              disabled={Number(page) <= 1}
              className='collection-btn'
              onClick={() => pageChangeHandler('prev')}>
              <PaginationPrevious className='hover:bg-transparent hover:text-white' />
            </Button>

            <p className='flex-center p-16-medium w-fit flex-1'>
              {page} / {totalPages}
            </p>

            <Button
              className='button w-32 bg-purple-gradient bg-cover text-white'
              onClick={() => pageChangeHandler('next')}
              disabled={Number(page) >= totalPages}>
              <PaginationNext className='hover:bg-transparent hover:text-white' />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default ImageCollection;
