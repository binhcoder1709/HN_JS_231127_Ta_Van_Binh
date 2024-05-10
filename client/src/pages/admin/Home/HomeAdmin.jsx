import React, { useEffect, useState } from "react";
import TableData from "../../../components/TableData";
import baseUrl from "../../../api/axios";
import RedDot from "../../../assets/circle-xxl (1).png";
import GreenDot from "../../../assets/circle-xxl.png";
import YellowDot from "../../../assets/circle-xxl (2).png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faLock,
  faTrashCan,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { Button, message } from "antd";
import { Input } from "@nextui-org/react";

const ROLE_COLORS = {
  0: RedDot,
  1: GreenDot,
  2: YellowDot,
};

const HomeAdmin = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const userData = await baseUrl.get("users");
      setData(userData.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBlockUnblock = async (id, role) => {
    const newRole = role === 0 ? 1 : 0;
    try {
      const response = await baseUrl.patch(`users/update/role/${id}`, {
        role: newRole,
      });
      if (response.status === 200) {
        const action = newRole === 1 ? "Mở" : "Khoá";
        message.success(`${action} tài khoản thành công`);
        fetchData();
      }
    } catch (error) {
      message.error(`${action} tài khoản thất bại`);
    }
  };
  const handleEdit = async (id) => {
    try {
      const response = await baseUrl.get(`users/${id}`);
      if (response.status == 200) {
      }
    } catch (error) {}
  };
  const handleDelete = async (id) => {
    try {
      const response = await baseUrl.delete(`users/delete/${id}`);
      if (response.status == 200) {
        message.success("Xoá tài khoản thành công");
        fetchData();
      }
    } catch (error) {
      message.error("Xoá tài khoản thất baij");
    }
  };
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
      title: "Tên tài khoản",
      dataIndex: "user_name",
      key: "user_name",
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
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tình trạng",
      render: (text, record) => (
        <>
          <div className="flex justify-center">
            <img
              className="w-[10px] h-[10px]"
              src={ROLE_COLORS[record.role]}
              alt=""
            />
          </div>
        </>
      ),
    },
    {
      title: "Chức năng",
      render: (text, record) => {
        if (record.role === 2) {
          return (
            <>
              <Button title="Xem">
                <FontAwesomeIcon icon={faEye} />
              </Button>
            </>
          );
        } else {
          return (
            <>
              <div className="flex gap-2">
                {record.user_ID !== 1 && (
                  <>
                    <Button
                      onClick={() =>
                        handleBlockUnblock(record.id, record.role)
                      }
                      title={record.role === 0 ? "Mở khoá" : "Khoá"}
                    >
                      <FontAwesomeIcon
                        icon={record.role === 0 ? faUnlock : faLock}
                      />
                    </Button>
                  </>
                )}
                <Button title="Xem" onClick={() => handleEdit(record.id)}>
                  <FontAwesomeIcon icon={faEye} />
                </Button>
                <Button
                  title="Xoá"
                  onClick={() => handleDelete(record.id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </Button>
              </div>
            </>
          );
        }
      },
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="text-2xl font-bold text-center">Quản lí tài khoản</h1>
        </div>
        <div>
          <Input
            className="w-[300px]"
            placeholder="Tìm kiếm tài khoản"
          />
        </div>
        <div>
          <TableData columns={columns} dataSource={data} />
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;
