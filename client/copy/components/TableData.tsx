import { FC } from "react";
import { Table } from "antd";

interface Props {
  dataSource: object[];
  columns: object[];
}

const TableData: FC<Props> = ({ dataSource, columns }) => {
  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default TableData;
