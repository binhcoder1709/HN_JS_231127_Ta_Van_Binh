import { Input, Textarea } from "@nextui-org/react";
import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import TableData from "../../../components/TableData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import baseUrl from "../../../api/axios";

export default function Author() {
  const [displayForm, setDisplayForm] = useState(false);
  const [data, setData] = useState([]);
  console.log(data);
  const fetchData = async () => {
    try {
      const response = await baseUrl.get("author");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await baseUrl.delete(`author/${id}`);
      if (response.status == 200) {
        message.success("Xoá tác giả thành công");
        fetchData();
      }
    } catch (error) {
      message.error("Xoá tác giả thất bại");
    }
  };
  const formik = useFormik({
    initialValues: {
      authorName: "",
      biography: "",
    },
    validationSchema: Yup.object({
      authorName: Yup.string()
        .required("vui lòng nhập tên tác giả")
        .max(50, "Tên tác giả không được vượt quá 50 ký tự"),
      biography: Yup.string()
        .required("Vui lòng nhập tiểu sử")
        .max(200, "Không nhập quá 200 ký tự"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const dataObj = {
        id: Math.floor(Math.random() * 99999999),
        author_name: values.authorName,
        biography: values.biography,
      };

      try {
        const response = await baseUrl.post("author", dataObj);
        if (response.status == 201) {
          message.success("Thêm tác giả thành công");
          setDisplayForm(false);
          resetForm();
          fetchData();
        }
      } catch (error) {
        message.error("Thêm tác giả thất baij");
      }
    },
  });
  const columns = [
    {
      title: "#",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên tác giả",
      dataIndex: "author_name",
      key: "author_name",
    },
    {
      title: "Tiểu sử",
      dataIndex: "biography",
      key: "biography",
    },
    {
      title: "Chức năng",
      render: (text, record) => (
        <>
          <div>
            <Button>
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() => handleDelete(record.id)}
              />
            </Button>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <div>
        <div>
          <h1 className="text-center text-2xl font-bold">Quản lí tác giả</h1>
        </div>
        <div className="flex justify-between items-center">
          <Input placeholder="Tìm kiếm tác giả" className="w-fit" />
          <Button onClick={() => setDisplayForm(true)}>Thêm tác giả</Button>
        </div>
        <div>
          <TableData columns={columns} dataSource={data} />
        </div>
      </div>
      {displayForm && (
        <div className="fixed top-0 left-0 w-full h-screen form-bg flex justify-center items-center">
          <form
            action=""
            className="bg-slate-200 p-5 w-[500px] flex flex-col gap-2 rounded-2xl"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-center text-2xl">Thêm tác giả</h1>
              <FontAwesomeIcon
                className="text-2xl"
                icon={faXmark}
                onClick={() => setDisplayForm(false)}
              />
            </div>
            <div>
              <label htmlFor="authorName">Tên tác giả</label>
              <Input
                placeholder="Tạ Văn Bình"
                id="authorName"
                name="authorName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.authorName}
              />
            </div>
            <div>
              <label htmlFor="biography">Tiểu sử</label>
              <Textarea
                placeholder="Tiểu sử..."
                id="biography"
                name="biography"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.biography}
              />
            </div>
            <div className="flex justify-center">
              <Button htmlType="submit" className="px-5">
                Thêm
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
