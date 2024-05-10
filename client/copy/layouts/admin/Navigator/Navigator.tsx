import { FC } from "react";
import { NavLink } from "react-router-dom";

const Navigator: FC = () => {
  return (
    <>
      <div className="w-full h-screen border-r-2 border-gray-400 flex flex-col items-center">
        <div>
          <img
            src="https://navigates.vn/wp-content/uploads/2023/06/logo-dai-hoc-cong-nghe-dong-a.jpg"
            className="w-full object-cover"
            alt=""
          />
        </div>
        <div>
          <NavLink to={"/admin"} className={"p-2"}>
            Quản lí sinh viên
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navigator;
