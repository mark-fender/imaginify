'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { AspectRatioKey } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { aspectRatioOptions, creditFee } from '@/constants';
import { CustomField } from './CustomField';
import MediaUploader from './MediaUploader';
import TransformedImage from '../TransformedImage';
import InsufficientCreditModal from '../InsufficientCreditModal';
import useTransformationForm from './hooks/useTransformationForm';

const TransformationForm = ({
  action,
  data = null,
  userId,
  type,
  creditBalance,
  config = null,
}: TransformationFormProps) => {
  const {
    image,
    setImage,
    transformationConfig,
    newTransformation,
    isSubmitting,
    isTransforming,
    setIsTransforming,
    form,
    submitHandler,
    selectChangeHandler,
    inputChangeHandler,
    transformHandler,
  } = useTransformationForm({
    action,
    data,
    userId,
    type,
    creditBalance,
    config,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className='space-y-8'>
        {creditBalance < Math.abs(creditFee) && <InsufficientCreditModal />}
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
              <Select
                onValueChange={(value) => selectChangeHandler(value, field.onChange)}
                value={field.value}>
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
                    inputChangeHandler('prompt', e.target.value, type, field.onChange)
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
                      inputChangeHandler('color', e.target.value, 'recolor', field.onChange)
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
            disabled={isTransforming || !newTransformation}
            onClick={transformHandler}>
            {isTransforming ? 'Transforming...' : 'Apply Transformation'}
          </Button>

          <Button
            type='submit'
            className='submit-button capitalize'
            disabled={isSubmitting || !form.watch('title')}>
            {isSubmitting ? 'Submitting...' : 'Save Image'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransformationForm;