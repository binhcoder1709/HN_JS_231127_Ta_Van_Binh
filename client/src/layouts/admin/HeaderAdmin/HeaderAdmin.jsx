import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../../redux/useSlice/tokenSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function HeaderAdmin() {
  const token = useSelector(selectToken);
  const decodePayload = jwtDecode(token);
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  return (
    <>
      <div className="w-full bg-gray-200 h-[60px] flex items-center justify-around">
        <div>
          <h1>Book Store - Quản trị viên</h1>
        </div>
        <div>
          <Dropdown>
            <DropdownTrigger>
              <User
                name={decodePayload.userName}
                className="cursor-pointer"
                description={decodePayload.email}
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
      </div>
    </>
  );
}
