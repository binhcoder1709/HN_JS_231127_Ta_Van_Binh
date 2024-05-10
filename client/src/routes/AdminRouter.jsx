import React from "react";
import Navigator from "../layouts/admin/Navigator/Navigator";
import HeaderAdmin from "../layouts/admin/HeaderAdmin/HeaderAdmin";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/useSlice/tokenSlice";
import { jwtDecode } from "jwt-decode";

export default function AdminRouter() {
  document.title = "EAUT - Trang quản trị";
  const token = useSelector(selectToken);
  const decodePayload = jwtDecode(token);
  return (
    <>
      {" "}
      {decodePayload.role == 2 ? (
        <>
          {" "}
          <div className="flex w-full">
            <div className="w-[20%]">
              <Navigator />
            </div>
            <div className="w-full flex flex-col">
              <div className="w-full">
                <HeaderAdmin />
              </div>
              <div>
                <Outlet />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}
