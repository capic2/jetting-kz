import { forwardRef } from 'react';
import {
  NumberField as AriaNumberField,
  NumberFieldProps as AriaNumberFieldProps,
} from 'react-aria-components';

type NumberFieldProps = AriaNumberFieldProps

const NumberField = forwardRef<HTMLDivElement, NumberFieldProps>(
  ({ children }, ref) => {
    return <AriaNumberField ref={ref}>{children}</AriaNumberField>;
  }
);

NumberField.displayName = 'NumberField';

export { NumberField };

