import { User } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../redux/useSlice/tokenSlice";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const token = useSelector(selectToken);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserData(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        // Optionally, handle the invalid token case, e.g., redirect to login
      }
    }
  }, [token]);

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <>
      <header className="w-full h-[60px] bg-white p-2 border-b-2 border-gray-400 flex items-center justify-around">
        {/* logo */}
        <div className="h-full">
          <img
            src="https://static.topcv.vn/company_logos/1ZBhWcwHtuLHOmyChDBbc01TlA8wUVQT_1639127653____512fb0dfe6913e2f14bfba6896eec801.jpg"
            alt=""
            className="h-full"
          />
        </div>

        <div>
          <Dropdown>
            <DropdownTrigger>
              <User
                name={userData.userName || "Guest"}
                className="cursor-pointer"
                description={userData.email || ""}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">Thông tin cá nhân</DropdownItem>
              <DropdownItem key="copy">Đổi mật khẩu</DropdownItem>
              <DropdownItem key="edit">Xác thực 2 yếu tố</DropdownItem>
              <DropdownItem
                key="delete"
                onClick={handleLogout}
                className="text-danger"
                color="danger"
              >
                Đăng xuất
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </header>
    </>
  );
};

export default Header;
