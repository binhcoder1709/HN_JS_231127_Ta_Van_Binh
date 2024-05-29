import React from "react";
import Navigator from "../layouts/admin/Navigator/Navigator";
import { Outlet } from "react-router-dom";

export default function AdminRouter() {

  return (
    <div className="flex w-full">
      <div className="w-[20%]">
        <Navigator />
      </div>
      <div className="w-full flex flex-col">
        {/* <div className="w-full">
          <HeaderAdmin />
        </div> */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
