import React, { useEffect, useState } from "react";
import Header from "../layouts/user/Header/Header";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/useSlice/tokenSlice";
import baseUrl from "../api/axios";
import Confirm from "../components/Confirm";
import Cookies from 'js-cookie';

export default function UserRouter() {
  const cookieToken = Cookies.get("token");
  const stateToken = useSelector(selectToken);
  const token = stateToken || cookieToken;
  const [isLiveToken, setIsLiveToken] = useState(false);
  const [apiData, setApiData] = useState(null);

  const fetchApi = async () => {
    if (!token) return;

    try {
      const response = await baseUrl.get("general", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApiData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsLiveToken(true);
      }
    }
  };

  useEffect(() => {
    fetchApi();
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

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
