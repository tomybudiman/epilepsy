import {FieldError, FieldErrorsImpl, Merge} from 'react-hook-form';

export type ErrorFormField =
  | boolean
  | string
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | undefined;
