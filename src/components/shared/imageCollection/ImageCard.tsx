import { IImage } from '@/lib/database/models/image.model';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import Image from 'next/image';
import { transformationTypes } from '@/constants';

interface ImageCardProps {
  image: IImage;
}

const ImageCard = ({ image }: ImageCardProps) => (
  <li>
    <Link href={`/transformations/${image._id}`} className='image-card'>
      <CldImage
        src={image.secureUrl}
        alt={image.title}
        width={image.width}
        height={image.height}
        {...image.config}
        loading='lazy'
        className='h-52 w-full rounded-[10px] object-cover'
        sizes='(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw'
      />
      <div className='flex-between'>
        <p className='p-20-semibold mr-3 line-clamp-1 text-dark-600'>{image.title}</p>
        <Image
          src={`/assets/icons/${
            transformationTypes[image.transformationType as TransformationTypeKey].icon
          }`}
          alt={image.title}
          width={24}
          height={24}
        />
      </div>
    </Link>
  </li>
);

export default ImageCard;
