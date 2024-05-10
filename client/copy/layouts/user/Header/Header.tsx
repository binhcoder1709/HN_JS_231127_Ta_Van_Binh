import { Avatar, Button, User } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

interface UserData {
  userName: string;
}

const Header: FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token) as UserData;
      setUserData(decodedToken);
    } else {
      console.log("Token is not available");
    }
  }, [token]);

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

        {/* nút đăng nhập và đăng ký */}
        {/* <div className="flex gap-2">
          <Link to={"/register"}>
            <Button color="default">
              Đăng ký
              <Link to={"/register"}></Link>
            </Button>
          </Link>
          <Link to={"/login"}>
            <Button color="primary">Đăng nhập</Button>
          </Link>
        </div> */}
        <div>
          {userData && (
            <User
              name={userData.userName}
              description="Product Designer"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
            />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
