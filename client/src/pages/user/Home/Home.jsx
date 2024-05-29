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
      const userData = await baseUrl.get("book");
      setData(userData.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatCurrency = (value) => {
    if (typeof value !== "number") {
      return "N/A";
    }
  
    // Chuyển đổi giá trị thành chuỗi và thêm dấu phẩy phân cách hàng nghìn
    const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    // Định dạng chuỗi thành tiền tệ Việt Nam
    return formattedValue + "đ";
  };

  // Khai báo các cột của bảng
  const columns = [
    {
      title: "#",
      render: (text, record, index) => index + 1,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên sách",
      dataIndex: "book_name",
      key: "book_name",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price) => formatCurrency(price),
    },
    
  ];

  return (
    <>
      <div>
        <TableData dataSource={data} columns={columns} />
      </div>
    </>
  );
};

export default Home;
