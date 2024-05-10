import React, { useEffect, useState } from "react";
import Header from "../layouts/user/Header/Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/useSlice/tokenSlice";
import baseUrl from "../api/axios";
import Confirm from "../components/Confirm";

export default function UserRouter() {
  document.title="EAUT - Trang sinh viên"
  const token = useSelector(selectToken);
  const [isLiveToken, setIsLiveToken] = useState(false);
  const [apiData, setApiData] = useState(null);

  const fetchApi = async () => {
    try {
      const response = await baseUrl.get("general", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApiData(response.data); // Lưu dữ liệu từ API vào state
    } catch (error) {
      if (error.response.status === 401) {
        setIsLiveToken(true);
      }
    }
  };

  useEffect(() => {
    fetchApi();
  }, [token]); // Thêm token vào danh sách dependency

  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
      {isLiveToken && (
        <div>
          <Confirm />
        </div>
      )}
    </>
  );
}
