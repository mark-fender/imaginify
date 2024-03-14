'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { AspectRatioKey, debounce, deepMergeObjects } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { aspectRatioOptions, defaultValues, transformationTypes } from '@/constants';
import { CustomField } from './CustomField';
import { useState, useTransition } from 'react';
import { IImage } from '@/lib/database/models/image.model';
import { updateCredits } from '@/lib/actions/user.actions';
import MediaUploader from '../MediaUploader';
import TransformedImage from '../TransformedImage';

const transformationFormSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

export type TransformationFormValues = z.infer<typeof transformationFormSchema>;

const TransformationForm = ({
  action,
  data = null,
  userId,
  type,
  creditBalance,
  config = null,
}: TransformationFormProps) => {
  const initialValues =
    data && action === 'Update'
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues;

  const transformationType = transformationTypes[type];
  const [image, setImage] = useState<IImage>(data);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config);
  const [newTransformation, setNewTransformation] = useState<Transformations | null>(null);

  const [isPending, startTransition] = useTransition();

  const form = useForm<TransformationFormValues>({
    resolver: zodResolver(transformationFormSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (values: TransformationFormValues) => {
    console.log(values);
  };

  const onSelectChangeHandler = (value: string, onChangeField: (value: string) => void) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey];

    setImage((prevImage: IImage) => ({
      ...prevImage,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }));
  };

  const onInputChangeHandler = (
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
      onChange(value);
    }, 1000);
  };

  const transformHandler = async () => {
    setIsTransforming(true);
    setTransformationConfig(deepMergeObjects(newTransformation, transformationConfig));
    setNewTransformation(null);
    startTransition(async () => { 
      // await updateCredits(userId, creditFee);
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Image Title' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {type === 'fill' && (
          <CustomField
            control={form.control}
            name='aspectRatio'
            formLabel='Aspect Ratio'
            className='w-full'
            render={({ field }) => (
              <Select onValueChange={(value) => onSelectChangeHandler(value, field.onChange)}>
                <SelectTrigger className='select-field'>
                  <SelectValue placeholder='Select size' />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(aspectRatioOptions).map((key) => (
                    <SelectItem key={key} value={key} className='select-item'>
                      {aspectRatioOptions[key as AspectRatioKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}
        {(type === 'remove' || type === 'recolor') && (
          <div className='prompt-field'>
            <CustomField
              control={form.control}
              name='prompt'
              formLabel={type === 'remove' ? 'Object to remove' : 'Object to recolor'}
              className='w-full'
              render={({ field }) => (
                <Input
                  value={field.value}
                  className='input-field'
                  onChange={(e) =>
                    onInputChangeHandler('prompt', e.target.value, type, field.onChange)
                  }
                />
              )}
            />
            {type === 'recolor' && (
              <CustomField
                control={form.control}
                name='color'
                formLabel='Replacement Color'
                className='w-full'
                render={({ field }) => (
                  <Input
                    value={field.value}
                    className='input-field'
                    onChange={(e) =>
                      onInputChangeHandler('color', e.target.value, 'recolor', field.onChange)
                    }
                  />
                )}
              />
            )}
          </div>
        )}

        <div className='media-uploader-field'>
          <CustomField
            control={form.control}
            name='publicId'
            className='flex- size-full flex-col'
            render={({ field }) => (
              <MediaUploader
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={type}
              />
            )}
          />

          <TransformedImage
            image={image}
            type={type}
            title={form.getValues('title')}
            isTransforming={isTransforming}
            setIsTransforming={setIsTransforming}
            transformationConfig={transformationConfig}
          />
        </div>

        <div className='flex flex-col gap-4'>
          <Button
            type='button'
            className='submit-button capitalize'
            disabled={isTransforming || newTransformation === null}
            onClick={transformHandler}>
            {isTransforming ? 'Transforming...' : 'Apply Transformation'}
          </Button>

          <Button type='submit' className='submit-button capitalize' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save Image'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransformationForm;
