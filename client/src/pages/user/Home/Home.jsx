import React, { useEffect, useState } from "react";
import TableData from "../../../components/TableData";
import { useSelector } from "react-redux";
import { findAll } from "../../../services/user.service";
import { selectData } from "../../../redux/useSlice/userSlice";
import baseUrl from "../../../api/axios";

const Home = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      // const userData = await useSelector(selectData);
      const userData = await baseUrl.get("users");
      setData(userData.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Khai báo các cột của bảng
  const columns = [
    {
      title: "#",
      render: (text, record, index) => index + 1,
    },
    {
      title: "ID",
      dataIndex: "user_ID",
      key: "user_ID",
    },
    {
      title: "Tên sinh viên",
      render: (text, record) => (
        <>
          <span>
            {record.first_name} {record.last_name}
          </span>
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Tình trạng",
      render: (text, record) => (
        <>
          <span>
            {record.role === 1 ? "Đang hoạt động" : record.role == 0 ? "Ngừng hoạt động" : "Quản trị viên"}
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      {/* Bảng hiển thị danh sách sinh viên */}
      <div>
        <TableData dataSource={data} columns={columns} />
      </div>
    </>
  );
};

export default Home;
