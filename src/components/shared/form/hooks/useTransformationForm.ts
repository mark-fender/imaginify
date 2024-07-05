import {
  defaultValues,
  transformationTypes,
  aspectRatioOptions,
  creditFee,
  TransformationType,
  ActionType,
} from '@/constants';
import { addImage, updateImage } from '@/lib/actions/image.actions';
import { updateCredits } from '@/lib/actions/user.actions';
import { IImage } from '@/lib/database/models/image.model';
import { AspectRatioKey, debounce, deepMergeObjects } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCldImageUrl } from 'next-cloudinary';
import config from 'next/config';
import { useRouter } from 'next/navigation';
import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const transformationFormSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

export type TransformationFormValues = z.infer<typeof transformationFormSchema>;

const useTransformationForm = ({ action, data, type, userId }: TransformationFormProps) => {
  const initialValues =
    data && action === ActionType.UPDATE
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues;

  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config);
  const [newTransformation, setNewTransformation] = useState<Transformations | null>(null);

  const [_isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<TransformationFormValues>({
    resolver: zodResolver(transformationFormSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (
      image &&
      (type === TransformationType.RESTORE || type === TransformationType.REMOVE_BACKGROUND)
    ) {
      setNewTransformation(transformationType.config);
    }
  }, [image, transformationType.config, type]);

  const handleAddImage = async (params: AddImageParams) => {
    try {
      const newImage = await addImage(params);

      if (newImage) {
        form.reset();
        setImage(data);
        router.push(`/transformations/${newImage._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateImage = async (params: UpdateImageParams) => {
    try {
      const imageUpdate = await updateImage(params);

      if (imageUpdate) {
        router.push(`/transformations/${imageUpdate._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (values: TransformationFormValues) => {
    setIsSubmitting(true);

    if (data || image) {
      const transformationURL = getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig,
      });

      const imageData = {
        title: values.title,
        publicId: image.publicId,
        transformationType: type,
        width: Number(image?.width),
        height: Number(image?.height),
        config: transformationConfig,
        secureUrl: image?.secureUrl,
        transformationURL,
        aspectRatio: values?.aspectRatio,
        prompt: values.prompt,
        color: values.color,
      };

      if (action === ActionType.ADD) {
        handleAddImage({ image: imageData, userId, path: '/' });
      }

      if (action === ActionType.UPDATE) {
        handleUpdateImage({
          image: { ...imageData, _id: data?._id },
          userId,
          path: `/transformations/${data._id}}`,
        });
      }

      setIsSubmitting(false);
    }
  };

  const selectChangeHandler = (value: AspectRatioKey, onChange: (value: string) => void) => {
    const imageSize = aspectRatioOptions[value];

    setImage((prevImage: IImage) => ({
      ...prevImage,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }));

    setNewTransformation(transformationType.config);

    return onChange(value);
  };

  const inputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChange: (value: string) => void,
  ) => {
    debounce(() => {
      setNewTransformation((prevTransformation: any) => ({
        ...prevTransformation,
        [type]: {
          ...prevTransformation?.[type],
          [fieldName === 'prompt' ? 'prompt' : 'to']: value,
        },
      }));
    }, 1000)();

    return onChange(value);
  };

  const transformHandler = async () => {
    setIsTransforming(true);
    setTransformationConfig(deepMergeObjects(newTransformation, transformationConfig));
    setNewTransformation(null);
    startTransition(async () => {
      await updateCredits(userId, creditFee);
    });
  };

  return {
    image,
    setImage,
    transformationConfig,
    newTransformation,
    isSubmitting,
    isTransforming,
    setIsTransforming,
    form,
    handleSubmit,
    selectChangeHandler,
    inputChangeHandler,
    transformHandler,
  };
};

export default useTransformationForm;
