import { Table } from 'antd'
import React from 'react'

export default function TableData({dataSource, columns}) {
  return (
    <Table dataSource={dataSource} columns={columns} />
  )
}
