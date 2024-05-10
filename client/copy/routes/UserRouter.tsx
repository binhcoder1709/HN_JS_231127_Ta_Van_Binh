import { FC } from "react";
import Header from "../layouts/user/Header/Header";
import { Outlet } from "react-router-dom";

const UserRouter: FC = () => {
  document.title = "EAUT - Trang sinh viên";
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default UserRouter;
