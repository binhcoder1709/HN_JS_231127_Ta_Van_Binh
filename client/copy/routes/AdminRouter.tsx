import { FC } from "react";
import Navigator from "../layouts/admin/Navigator/Navigator";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../layouts/admin/HeaderAdmin/HeaderAdmin";

const AdminRouter: FC = () => {
    document.title = "EAUT - Trang quản trị"
  return (
    <>
      <div className="flex w-full">
        <div className="w-[20%]">
          <Navigator />
        </div>
        <div className="w-full flex flex-col">
            <div className="w-full">
                <HeaderAdmin/>
            </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRouter;
