import React from 'react';
import { Control } from 'react-hook-form';
import { z } from 'zod';

import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '../../ui/form';

import { TransformationFormValues } from './TransformationForm';

type CustomFieldProps = {
  control: Control<TransformationFormValues> | undefined;
  render: (props: { field: any }) => React.ReactNode;
  name: keyof TransformationFormValues;
  formLabel?: string;
  className?: string;
};

export const CustomField = ({ control, render, name, formLabel, className }: CustomFieldProps) => {
  return (
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
};
