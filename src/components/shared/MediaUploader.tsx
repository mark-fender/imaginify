'use client';

import { Dispatch, SetStateAction } from 'react';
import { useToast } from '../ui/use-toast';
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { IImage } from '@/lib/database/models/image.model';
import Image from 'next/image';
import { dataUrl, getImageSize } from '@/lib/utils';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';

interface MediaUploaderProps {
  onValueChange: (publicId: string) => void;
  setImage: Dispatch<SetStateAction<IImage>>;
  image: IImage;
  publicId: string;
  type: string;
}

const MediaUploader = ({ onValueChange, setImage, image, publicId, type }: MediaUploaderProps) => {
  const { toast } = useToast();

  const uploadSuccessHandler = (results: CloudinaryUploadWidgetResults) => {
    const info = results?.info as CloudinaryUploadWidgetInfo;
    setImage((prevImage: IImage) => ({
      ...prevImage,
      publicId: info.public_id,
      width: info.width,
      height: info.height,
      secureUrl: info.secure_url,
    }));

    onValueChange(info.public_id);

    toast({
      title: 'Image uploaded successfully',
      description: '1 credit was deducted from your account',
      duration: 5000,
      className: 'success-toast',
    });
  };

  const uploadErrorHandler = () => {
    toast({
      title: 'Something went wrong while uploading',
      description: 'Please try again',
      duration: 5000,
      className: 'error-toast',
    });
  };

  return (
    <CldUploadWidget
      uploadPreset='imaginify'
      options={{ multiple: false, resourceType: 'image' }}
      onSuccess={uploadSuccessHandler}
      onError={uploadErrorHandler}>
      {({ open }) => (
        <div className='flex flex-col gap-4'>
          <h3 className='h3-bold text-dark-400'>Original</h3>
          {publicId ? (
            <div className='cursor-pointer overflow-hidden rounded-[10px]'>
              <CldImage
                width={getImageSize(type, image, 'width')}
                height={getImageSize(type, image, 'height')}
                src={publicId}
                alt='image'
                sizes={'(max-width: 768px) 100vw, 50vw'}
                placeholder={dataUrl as PlaceholderValue}
                className='media-uploader_cldImage'
              />
            </div>
          ) : (
            <div className='media-uploader_cta' onClick={() => open()}>
              <div className='media-uploader_cta-image'>
                <Image src='/assets/icons/add.svg' alt='Add Image' width={24} height={24} />
              </div>
              <p className='p-14-medium'>Upload Image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;
