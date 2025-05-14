"use client";

import { Field, ErrorMessage } from "formik";
import { Textarea } from "@/components/ui/textarea";

type TextareaFieldProps = {
  name: string;
  label: string;
  placeholder: string;
};

const TextareaField = ({ name, label, placeholder }: TextareaFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-[14px]">{label}</p>
      <Field
        as={Textarea}
        name={name}
        placeholder={placeholder}
        className="min-h-[100px]"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default TextareaField;
