"use client";

import { ErrorMessage, useFormikContext, FormikValues } from "formik";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type SelectFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  disabled?: boolean;
  onChange?: (value: string) => void;
  value?: string;
};

const SelectField = ({
  name,
  label,
  placeholder,
  options,
  disabled = false,
  onChange,
  value,
}: SelectFieldProps) => {
  const { setFieldValue } = useFormikContext<FormikValues>();

  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-[14px]">{label}</p>
      <Select
        value={value}
        onValueChange={(val) => {
          setFieldValue(name, val);
          onChange?.(val);
        }}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default SelectField;
