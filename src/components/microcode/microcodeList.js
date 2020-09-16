import React from 'react'
import PropTypes from 'prop-types'
import { Table, Badge } from 'antd'
// import { Link } from 'dva/router'
// import { getGender } from '../../utils/helper.js'
import { getWithdrawBillsStatus } from '../../utils/helper'

const microcodeList = ({
  loading,
  onEdit,
}) => {
  const columns = [
    {
      title: '提现单号',
      dataIndex: 'code',
      key: 'code',
      render: (text, record) => {
        const code = record.code || '未填写'
        return code
      },
    },
    {
      title: '提现人',
      dataIndex: 'name',
      key: 'name',
      className: 'column-center',
      render: (text, record) => {
        const name = record.name || '未填写'
        return name
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      className: 'column-right',
      render: (text, record) => {
        const mobile = record.mobile || '未填写'
        return mobile
      },
    },
    {
      title: '提现金额',
      dataIndex: 'amount',
      key: 'amount',
      className: 'column-right',
      render: (text, record) => {
        const amount = record.amount || '未填写'
        return amount
      },
    },
    {
      title: '提现状态',
      dataIndex: 'status',
      key: 'status',
      className: 'column-center',
      render: (text, record) => {
        const billsStatus = getWithdrawBillsStatus(record.status)
        return <Badge status={billsStatus.status} text={billsStatus.text} />
      },
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
      className: 'column-center',
      render: (text, record) => {
        return record.createTime
      },
    },
    {
      title: '提现方式',
      dataIndex: 'paymentName',
      key: 'paymentName',
      className: 'column-center',
      render: (text, record) => {
        const paymentName = record.paymentName || '未填写'
        return paymentName
      },
    },
    {
      title: '提现账号',
      dataIndex: 'account',
      key: 'account',
      width: 200,
      className: 'column-center',
      render: (text, record) => {
        const account = record.account || '未填写'
        return account
      },
    },
    {
      title: '操作',
      key: 'operation',
      className: 'column-center',
      width: 100,
      render: (text, record) => {
        const { code } = record
        console.log(code)
        return (
          <span className={'table-operation'}>
            <a onClick={() => onEdit(code)}>查看</a>
            &nbsp;&nbsp;
            {/* <a onClick={() => onWithdraw(code)}>处理</a>
            &nbsp;&nbsp; */}
          </span>
        )
      },
    },
  ]
  return (
    <div>
      <Table
        // size="middle"
        columns={columns}
        // rowSelection={rowSelection}
        // dataSource={data}
        loading={loading}
        rowKey={record => record.code}
        // pagination={pagination}
        // onChange={onPageChange}
      />
    </div>
  )
}

microcodeList.propTypes = {
  loading: PropTypes.bool,
  onEdit: PropTypes.func,
  // dataSource: PropTypes.array,
  // onPageChange: PropTypes.func,
}

export default microcodeList
