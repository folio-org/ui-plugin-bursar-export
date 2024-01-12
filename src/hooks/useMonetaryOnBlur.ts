import { FocusEvent, useCallback } from 'react';
import { useForm } from 'react-final-form';

export default function useMonetaryOnBlur(name: string) {
  const form = useForm();

  return useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      form.change(name, parseFloat(e.target.value || '0').toFixed(2));
    },
    [name, form]
  );
}
