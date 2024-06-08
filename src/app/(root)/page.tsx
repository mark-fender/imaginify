import { navLinks } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import { getAllImages } from '@/lib/actions/image.actions';
import ImageCollection from '@/components/shared/imageCollection/ImageCollection';

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery });

  return (
    <>
      <section className='home'>
        <h1 className='home-heading'>Unleash Your Creative Vision with Imaginify!</h1>
        <ul className='flex-center w-full gap-20'>
          {navLinks.slice(1, 5).map((link) => (
            <Link key={link.route} href={link.route} className='flex-center flex-col gap-2'>
              <li className='flex-center w-fit rounded-full bg-white p-4'>
                <Image src={link.icon} alt={link.label} width={24} height={24} />
              </li>
              <p className='p-14-medium text-white text-center'>{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className='sm:mt-12'>
        <ImageCollection
          hasSearch
          images={images?.data}
          page={page}
          totalPages={images?.totalPages}
        />
      </section>
    </>
  );
};

export default Home;
