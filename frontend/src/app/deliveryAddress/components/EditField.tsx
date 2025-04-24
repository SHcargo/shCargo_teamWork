"use client";

import { ErrorMessage, useFormikContext } from "formik";
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

const EditField = ({
  name,
  label,
  placeholder,
  options,
  onChange,
  value,
}: SelectFieldProps) => {
  const { setFieldValue } = useFormikContext<any>();

  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-[14px]">{label}</p>
      <Select
        value={value}
        onValueChange={(val) => {
          setFieldValue(name, val);
          onChange?.(val);
        }}
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

export default EditField;
