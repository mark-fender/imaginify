import page from '@/app/(root)/page';
import { useSearchParams, useRouter } from 'next/navigation';
import { formUrlQuery } from '../utils';

const usePagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageChangeHandler = (action: string) => {
    const pageValue = action === 'next' ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: 'page',
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return {
    pageChangeHandler,
  };
};

export default usePagination;
