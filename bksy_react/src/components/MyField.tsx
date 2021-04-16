import * as React from "react";
import { FieldProps } from "formik";
import { FormControlProps, TextField } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField/TextField";

export const MyField: React.FC<FieldProps & TextFieldProps> = ({
  placeholder,
  style,
  InputLabelProps,
  variant,
  field  
}) => {
  return <TextField placeholder={placeholder} style={style} InputLabelProps={InputLabelProps} 
  variant={variant}  {...field} />;
};
