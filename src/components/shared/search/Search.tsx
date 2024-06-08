'use client';

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import useSearch from './hooks/useSearch';

const Search = () => {
  const { setQuery } = useSearch();

  return (
    <div className='search'>
      <Image src='/assets/icons/search.svg' alt='search' width={24} height={24} />

      <Input
        className='search-field'
        placeholder='Search'
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
