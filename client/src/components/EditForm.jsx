import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";

export default function EditForm() {
  const formik = useFormik({
    initialValues: {
      bookName: "",
      description: "",
      price: null,
    },
    validationSchema: Yup.object({
      bookName: Yup.string()
        .required("Vui lòng nhập tên sản phẩm")
        .max(50, "Tên sản phẩm không quá 50 ký tự"),
      description: Yup.string()
        .required("Vui lòng nhập mô tả")
        .max(200, "Mô tả không được lớn hơn 200 ký tự"),
      price: Yup.number().required("Vui lòng nhập đơn giá"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const data = {
        id: Math.floor(Math.random() * 99999999),
        book_name: values.bookName,
        description: values.description,
        price: values.price,
      };
    },
  });
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen form-bg flex justify-center items-center">
        <form
          action=""
          className="bg-slate-200 p-5 w-[500px] flex flex-col gap-2 rounded-2xl"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-center text-2xl">Thêm sản phẩm</h1>
            <FontAwesomeIcon
              className="text-2xl"
              icon={faXmark}
              onClick={() => setDisplayForm(false)}
            />
          </div>
          <div>
            <label htmlFor="bookName">Tên sản phẩm</label>
            <Input
              placeholder="Sách giáo khoa"
              id="bookName"
              name="bookName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bookName}
            />
          </div>
          <div>
            <label htmlFor="price">Đơn giá</label>
            <Input
              placeholder="100.000"
              type="number"
              id="price"
              name="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
          </div>
          <div>
            <label htmlFor="description">Mô tả</label>
            <Textarea
              placeholder="Mô tả..."
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
          </div>
          <div className="flex justify-center">
            <Button htmlType="submit" className="px-5">
              Thêm
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
