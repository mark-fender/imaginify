import { useToast } from '@/components/ui/use-toast';
import { IImage } from '@/lib/database/models/image.model';
import { CloudinaryUploadWidgetResults, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { Dispatch, SetStateAction } from 'react';

interface UseMediaUploaderParams {
  setImage: Dispatch<SetStateAction<IImage>>;
  onValueChange: (publicId: string) => void;
}

const useMediaUploader = ({ setImage, onValueChange }: UseMediaUploaderParams) => {
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

  return {
    uploadSuccessHandler,
    uploadErrorHandler,
  };
};

export default useMediaUploader;
