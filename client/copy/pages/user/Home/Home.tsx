import { FC, useEffect, useState } from "react";
import TableData from "../../../components/TableData";
import { useSelector } from "react-redux";
import baseUrl from "../../../api/axios";
import store from "../../../redux/store";
import { findAll } from "../../../services/user.service";

const Home: FC = () => {
  const [data, setData] = useState([]);
  console.log(data);


  const fetchData = async () => {
    try {
      const response = await baseUrl.get("users")
      setData(response.data)
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchData()
  }, []);
  // khai báo các cột của bảng
  const columns: object[] = [
    {
      title: "#",
      render: (text: string, record: string, index: number) => index + 1,
    },
    {
      title: "Mã sinh viên",
      dataIndex: "user_ID",
      key: "user_ID",
    },
    {
      title: "Tên sinh viên",
      render: (text: any, record: any) => (
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
      render: (text: any, record: any) => (
        <>
          <span>{record.role == 1 ? "Đang hoạt động" : "Ngừng hoạt động"}</span>
        </>
      ),
    },
  ];
  return (
    <>
      {/* bảng hiển thị danh sách sinh viên */}
      <div>
        <TableData dataSource={data} columns={columns} />
      </div>
    </>
  );
};

export default Home;
