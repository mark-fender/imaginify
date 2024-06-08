import { getCldImageUrl } from 'next-cloudinary';
import { title } from 'process';
import { download } from '../utils';
import { IImage } from '../database/models/image.model';

interface UseDownloadImageParams {
  image: IImage;
  transformationConfig: Transformations | null;
}

const useDownloadImage = ({ image, transformationConfig }: UseDownloadImageParams) => {
  const downloadHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    download(
      getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig,
      }),
      title,
    );
  };

  return { downloadHandler };
};

export default useDownloadImage;
