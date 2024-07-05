import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import Header from '@/components/shared/Header';
import { transformationTypes } from '@/constants';
import { getUserById } from '@/lib/actions/user.actions';
import { getImageByID } from '@/lib/actions/image.actions';
import TransformationForm from '@/components/shared/form/TransformationForm';

const Page = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const user = await getUserById(userId);
  const image = await getImageByID(id);

  const transformation = transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subTitle={transformation.subTitle} />

      <section className='mt-10'>
        <TransformationForm
          action='Update'
          userId={user._id}
          type={image.transformationType}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default Page;
