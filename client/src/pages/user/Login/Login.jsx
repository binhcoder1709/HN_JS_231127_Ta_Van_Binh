import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import baseUrl from "../../../api/axios";
import store from "../../../redux/store";
import Cookies from "js-cookie";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được bỏ trống"),
      password: Yup.string().required("Mật khẩu không được để trống"),
    }),
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };

      try {
        const response = await baseUrl.post("auth/login", data);

        if (response.status == 200) {
          Cookies.set("token", response.data, { expires: 7 });
          const decoded = jwtDecode(response.data);
          if (decoded.role == 1) {
            notification.success({ message: "Đăng nhập thành công" });
            setTimeout(() => {
              navigate("/");
            }, 2000);
          } else if (decoded.role == 2) {
            notification.success({
              message: "Đăng nhập thành công trang quản trị",
            });
            setTimeout(() => {
              navigate("/admin");
            }, 2000);
          }
        }
      } catch (error) {
        if (error.response.status == 403) {
          notification.error({ message: "Tài khoản đã bị khoá" });
        }
        if (error.response.status == 401) {
          notification.error({ message: "Email hoặc mật khẩu không đúng" });
        }
      }
    },
  });

  return (
    <>
      <div className="flex justify-center w-full h-screen items-center">
        {/* form đăng nhập */}
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-blue-100 p-2 px-5 rounded-xl flex flex-col gap-2"
          >
            <div>
              <h1 className="text-2xl font-bold text-center">
                Trang đăng nhập thông tin
              </h1>
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

            {/* input cho mật khẩu */}
            <div>
              <Input
                variant="underlined"
                type="password"
                color="primary"
                label="Mật khẩu"
                placeholder="********"
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

            {/* nút submit */}
            <div className="flex justify-center">
              <Button type="submit" color="primary">
                Đăng nhập
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
