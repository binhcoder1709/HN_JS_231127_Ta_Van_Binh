import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string().required("Tên không được bỏ trống"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được bỏ trống"),
      password: Yup.string()
        .required("Mật khẩu không được bỏ trống")
        .min(8, "Tối thiểu 8 ký tự"),
      confirmPassword: Yup.string()
        .required("Vui lòng nhập lại mật khẩu")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp"),
    }),
    onSubmit: async (values) => {
      const data = {
        id: Math.floor(Math.random() * 999999999),
        user_name: values.userName,
        email: values.email,
        password: values.password,
        birthday: values.birthDate,
        role: 1,
      };
      
      try {
        const response = await baseUrl.post("auth/register", data);
        if (response.status == 201) {
          notification.success({ message: "Đăng ký thành công" });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        notification.error({ message: "Đăng ký thất bại" });
      }
    },
  });

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center">
        {/* form đăng ký */}
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-blue-100 p-2 px-5 rounded-xl flex flex-col gap-2"
          >
            <div>
              <h1 className="text-2xl font-bold text-center">
                Trang đăng ký thông tin
              </h1>
            </div>
            {/* ô input cho họ và tên*/}
              <div>
                <Input
                  variant="underlined"
                  color="primary"
                  label="Tên người dùng"
                  placeholder="bình tommy"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="userName"
                />
                {formik.touched.userName && formik.errors.userName ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.userName}
                  </div>
                ) : null}
              </div>

            {/* input cho email */}
            <div>
              <Input
                variant="underlined"
                color="primary"
                label="Email"
                placeholder="binhtommy@gmail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              {/* input cho mật khẩu */}
              <div>
                <Input
                  variant="underlined"
                  color="primary"
                  label="Mật khẩu"
                  placeholder="********"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              {/* input cho xác thực mật khẩu */}
              <div>
                <Input
                  variant="underlined"
                  color="primary"
                  label="Nhập lại mật khẩu"
                  type="password"
                  placeholder="********"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="confirmPassword"
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
            </div>

            {/* nút submit */}
            <div className="flex justify-center">
              <Button type="submit" color="primary">
                Đăng ký
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
