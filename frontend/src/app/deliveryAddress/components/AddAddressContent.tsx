"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SelectField from "./SelectField";
import TextareaField from "./TextAreaField";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";

import { Check } from "lucide-react";
import { districts } from "../utils/address";
import { useUser } from "@/app/providers/UserProvider";
import { useDeliveryAddress } from "@/app/providers/DeliveryAddressProvider";

type DistrictKey = keyof typeof districts;

const validationSchema = Yup.object({
  city: Yup.string().required("Хот сонгоно уу"),
  district: Yup.string().required("Дүүрэг сонгоно уу"),
  khoroo: Yup.string().required("Хороо сонгоно уу"),
  detail: Yup.string().required("Дэлгэрэнгүй мэдээлэл шаардлагатай"),
});

const AddAddressContent = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictKey | "">(
    ""
  );
  const { userId } = useUser();
  const { fetchAddresses } = useDeliveryAddress();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex flex-col gap-2">
          <p>Шинэ хаяг бүртгэх</p>
          <p className="text-[14px] text-gray-400">
            Доорх мэдээллийг бөглөнө үү
          </p>
        </DialogTitle>
        <DialogDescription />

        <Formik
          initialValues={{
            city: "",
            district: "",
            khoroo: "",
            detail: "",
            userId: userId,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/deliveryAddress/${userId}`,
                {
                  city: values.city,
                  district: values.district,
                  khoroo: values.khoroo,
                  detail: values.detail,
                }
              );
              fetchAddresses();
              console.log(
                "Delivery address created successfully",
                response.data
              );
            } catch (error) {
              console.log("Error in creating delivery address", error);
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="flex flex-col gap-2 mt-4">
              <SelectField
                name="city"
                label="Хот / Аймаг"
                placeholder="Хот сонгох"
                options={["Улаанбаатар"]}
              />

              <SelectField
                name="district"
                label="Сум / Дүүрэг"
                placeholder="Дүүрэг сонгох"
                options={Object.keys(districts)}
                onChange={(value) => {
                  setFieldValue("district", value);
                  setFieldValue("khoroo", "");
                  setSelectedDistrict(value as DistrictKey);
                }}
              />

              <SelectField
                name="khoroo"
                label="Баг / Хороо"
                placeholder="Хороо сонгох"
                options={selectedDistrict ? districts[selectedDistrict] : []}
                value={values.khoroo}
                disabled={!selectedDistrict}
              />

              <TextareaField
                name="detail"
                label="Дэлгэрэнгүй мэдээлэл (Хотхон, Баяр, Орц, Орцны код, Давхар, Тоот)"
                placeholder="Дэлгэрэнгүй мэдээллээ оруулна уу"
              />
              <button
                type="submit"
                className="bg-[#5F2DF5] flex px-1 py-2.5 items-center justify-center gap-2 rounded-lg"
              >
                <Check width={16} height={16} stroke="white" />
                <p className="text-white font-semibold">Хадгалах</p>
              </button>
            </Form>
          )}
        </Formik>
      </DialogHeader>
    </DialogContent>
  );
};

export default AddAddressContent;
