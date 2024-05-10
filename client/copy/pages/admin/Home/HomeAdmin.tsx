import { Input } from "@nextui-org/react";
import { FC } from "react";
import TableData from "../../../components/TableData";

const HomeAdmin:FC = ()=>
    {
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
                title: "Địa chỉ",
                dataIndex: "address",
                key: "address",
            },
            {
              title: "Tình trạng",
              render: (text: any, record: any) => (
                <>
                  <span>{record.role == 1 ? "Đang hoạt động" : "Ngừng hoạt động"}</span>
                </>
              ),
            },
            {
                title: "Chức năng",
                dataIndex: "birthday",
                key: "birthday",
            }
          ];
        return(<>
            <div className="flex flex-col gap-2">
                <div>
                    <h1 className="text-2xl font-bold text-center">Quản lí sinh viên</h1>
                </div>
                <div>
                    <Input className="w-[300px]" placeholder="Tìm kiếm thông tin sinh viên"/>
                </div>
                <div>
                    <TableData columns={columns}/>
                </div>
            </div>
        </>)
    }

    export default HomeAdmin;