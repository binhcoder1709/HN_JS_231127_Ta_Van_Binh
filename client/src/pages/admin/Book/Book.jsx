import { faEye, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import TableData from "../../../components/TableData";
import { Input, Textarea } from "@nextui-org/react";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import * as Yup from "yup";
import baseUrl from "../../../api/axios";
import BookEditForm from "../../../components/BookEditForm";

export default function Book() {
  const [displayForm, setDisplayForm] = useState(false);
  const [displayEditForm, setDisplayEditForm] = useState(false);
  const [data, setData] = useState([]);
  const [authorData, setAuthorData] = useState([]);
  const [dataById, setDataById] = useState({});
  const formik = useFormik({
    initialValues: {
      bookName: "",
      description: "",
      price: null,
      author: "", // Add author field to initialValues
    },
    validationSchema: Yup.object({
      bookName: Yup.string()
        .required("Vui lòng nhập tên sản phẩm")
        .max(50, "Tên sản phẩm không quá 50 ký tự"),
      description: Yup.string()
        .required("Vui lòng nhập mô tả")
        .max(200, "Mô tả không được lớn hơn 200 ký tự"),
      price: Yup.number().required("Vui lòng nhập đơn giá"),
      author: Yup.string().required("Vui lòng chọn tác giả"), // Add author validation
    }),
    onSubmit: async (values, { resetForm }) => {
      const data = {
        id: Math.floor(Math.random() * 99999999),
        book_name: values.bookName,
        description: values.description,
        price: values.price,
        author: values.author, // Include author in data object
      };
      try {
        const response = await baseUrl.post("book", data);
        if (response.status == 201) {
          message.success("Thêm sản phẩm thành công");
          setDisplayForm(false);
          resetForm();
          fetchData();
        }
      } catch (error) {
        console.log(error);
        message.error("Thêm sản phẩm thất bại");
      }
    },
  });
  const fetchData = async () => {
    try {
      const response = await baseUrl.get("book");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchAuthorData = async () => {
    try {
      const response = await baseUrl.get("author");
      setAuthorData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchAuthorData();
  }, []);
  const handleEdit = async (id) => {
    try {
      const response = await baseUrl.get(`book/${id}`);
      setDataById(response.data);
      setDisplayEditForm(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await baseUrl.delete(`book/${id}`);
      if (response.status == 200) {
        message.success("Xoá sản phẩm thành công");
        fetchData();
      }
    } catch (error) {
      message.error("Xoá sản phẩm thất bại");
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
      title: "Tên sản phẩm",
      dataIndex: "book_name",
      key: "book_name",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Chức năng",
      render: (text, record) => (
        <>
          <div className="flex gap-2">
            <Button>
              <FontAwesomeIcon
                icon={faEye}
                onClick={() => handleEdit(record.id)}
              />
            </Button>
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
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="text-2xl font-bold text-center">Quản lí sản phẩm</h1>
        </div>
        <div className="flex items-center justify-between">
          <Input className="w-[300px]" placeholder="Tìm kiếm sản phẩm" />
          <Button onClick={() => setDisplayForm(true)}>Thêm sản phẩm</Button>
        </div>
        <div>
          <TableData dataSource={data} columns={columns} />
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
              <h1 className="text-center text-2xl">Thêm sản phẩm</h1>
              <FontAwesomeIcon
                className="text-2xl"
                icon={faXmark}
                onClick={() => setDisplayForm(false)}
              />
            </div>
            <div>
              <label htmlFor="bookName">Tên sản phẩm</label>
              <Input
                placeholder="Sách giáo khoa"
                id="bookName"
                name="bookName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bookName}
              />
            </div>
            <div>
              <label htmlFor="price">Đơn giá</label>
              <Input
                placeholder="100.000"
                type="number"
                id="price"
                name="price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="author">Tác giả</label>
              <Select
                value={formik.values.author}
                onChange={(value) => formik.setFieldValue("author", value)}
              >
                {authorData.map((item) => (
                  <Select.Option value={item.id}>
                    {item.author_name}
                  </Select.Option>
                ))}

                {/* Add more options as needed */}
              </Select>
            </div>
            <div>
              <label htmlFor="description">Mô tả</label>
              <Textarea
                placeholder="Mô tả..."
                id="description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
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
      {displayEditForm && (
        <>
          <BookEditForm
            setDisplayEditForm={setDisplayEditForm}
            data={dataById}
          />
        </>
      )}
    </>
  );
}
