import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '../../ui/form';
import { TransformationFormValues } from './hooks/useTransformationForm';

interface CustomFieldProps {
  control: Control<TransformationFormValues> | undefined;
  render: (props: { field: any }) => React.ReactNode;
  name: keyof TransformationFormValues;
  formLabel?: string;
  className?: string;
}

export const CustomField = ({ control, render, name, formLabel, className }: CustomFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={className}>
        {formLabel && <FormLabel>{formLabel}</FormLabel>}
        <FormControl>{render({ field })}</FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
