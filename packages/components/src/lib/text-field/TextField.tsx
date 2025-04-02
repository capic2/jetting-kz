import { forwardRef } from 'react';
import {
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components';

interface TextFieldProps {
  children: AriaTextFieldProps['children'];
}

const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  ({ children }, ref) => {
    return <AriaTextField ref={ref}>{children}</AriaTextField>;
  }
);

TextField.displayName = 'TextField';

export { TextField };
