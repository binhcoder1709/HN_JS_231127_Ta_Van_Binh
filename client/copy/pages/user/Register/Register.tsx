import { Button, Input } from "@nextui-org/react";
import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../../../services/auth.service";
import store from "../../../redux/store";

const Register: FC = () => {
  document.title = "Đăng ký thông tin sinh viên";
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      address: "",
      birthDate: null,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Họ không được bỏ trống"),
      lastName: Yup.string().required("Tên không được bỏ trống"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được bỏ trống"),
      password: Yup.string()
        .required("Mật khẩu không được bỏ trống")
        .min(8, "Tối thiểu 8 ký tự"),
      confirmPassword: Yup.string()
        .required("Vui lòng nhập lại mật khẩu")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp"),
      phoneNumber: Yup.string().required("Số điện thoại không được bỏ trống"),
      address: Yup.string().required("Địa chỉ không được bỏ trống"),
      birthDate: Yup.date()
        .max(new Date(), "Ngày sinh không được lớn hơn ngày hiện tại")
        .nullable()
        .required("Ngày sinh không được bỏ trống"),
    }),
    onSubmit: async (values) => {
      const data: object = {
        user_ID: Math.floor(Math.random() * 999999999),
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        phone_number: values.phoneNumber,
        address: values.address,
        birthday: values.birthDate,
        role: 1,
      };

      try {
        const response = await store.dispatch(register(data));
        if (response.meta.requestStatus == "fulfilled") {
          notification.success({ message: "Đăng ký thành công" });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        notification.error({ message: "Đăng nhập thất bại" });
      }
    },
  });

  return (
    <>
      <div className="flex flex-col items-center">
        {/* logo */}
        <div>
          <img
            src="https://navigates.vn/wp-content/uploads/2023/06/logo-dai-hoc-cong-nghe-dong-a.jpg"
            className="w-[400px] h-[200px]"
            alt=""
          />
        </div>

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
            <div className="flex gap-4">
              <div>
                <Input
                  variant="underlined"
                  color="primary"
                  label="Họ"
                  placeholder="Nguyễn"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="firstName"
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.firstName}
                  </div>
                ) : null}
              </div>
              <div>
                <Input
                  variant="underlined"
                  color="primary"
                  label="Tên"
                  placeholder="Văn A"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="lastName"
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.lastName}
                  </div>
                ) : null}
              </div>
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
            {/* input cho số điện thoại */}
            <div>
              <Input
                variant="underlined"
                type="number"
                color="primary"
                label="Số điện thoại"
                placeholder="0931910xxx"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="phoneNumber"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.phoneNumber}
                </div>
              ) : null}
            </div>

            {/* input cho địa chỉ */}
            <div>
              <Input
                variant="underlined"
                color="primary"
                label="Địa chỉ"
                placeholder="Hà Nội"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="address"
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.address}
                </div>
              ) : null}
            </div>

            {/* ngày sinh */}
            <div>
              <Input
                type="date"
                variant="underlined"
                color="primary"
                label="Ngày sinh"
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="birthDate"
              />
              {formik.touched.birthDate && formik.errors.birthDate ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.birthDate}
                </div>
              ) : null}
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
