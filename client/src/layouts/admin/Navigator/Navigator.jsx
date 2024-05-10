import React from "react";
import { NavLink } from "react-router-dom";
import Logo from '../../../assets/logo.png'

export default function Navigator() {
  return (
    <>
      {" "}
      <div className="w-full h-screen border-r-2 border-gray-400 flex flex-col items-center">
        <div>
          <img
            src={Logo}
            className="w-full object-cover"
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <NavLink to={"/admin"} end className={"p-2 px-10"}>
            Quản lí tài khoản
          </NavLink>
          <NavLink to={"/admin/products"} className={"p-2 px-10"}>
            Quản lí sản phẩm
          </NavLink>
          <NavLink to={"/admin/authors"} className={"p-2 px-10"}>
            Quản lí tác giả
          </NavLink>
        </div>
      </div>
    </>
  );
}
