import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { Link } from 'dva/router'

import { getGenderList } from '../../utils/helper.js'
import '../../themes/index.less'

const LogoutAdmin = ({
  pagination,
  loading,
  dataSource, // 数据
  onPageChange,

}) => {
  // console.log('tag', pagination)
  const columns = [{
    title: '账号姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => {
      const name = record.name
      return (
        name
      )
    },
  }, {
    title: '手机号码',
    dataIndex: 'phone',
    key: 'phone',
    render: (text, record) => {
      const phone = record.phone || '未填写'
      return (
        phone
      )
    },
  }, {
    title: '审核状态',
    dataIndex: 'auditStatus',
    key: 'auditStatus',
    render: (text, record) => {
      const auditStatus = record.auditStatus || '未填写'
      return (
        getGenderList(auditStatus)
      )
    },
  },
  {
    title: '申请时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: (text, record) => {
      const createTime = record.createTime || '未填写'
      return (
        createTime
      )
    },
  },
  {
    title: '审核时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    render: (text, record) => {
      const updateTime = record.updateTime || '未填写'
      return (
        updateTime
      )
    },
  },
  {
    title: '操作',
    key: 'operation',
    render: (text, record) => {
      const { id } = record
      return (
        <span>
          <Link to={{ pathname: `/logoutAdminRecord/edit/${id}`, query: { currentList: pagination.current } }} >详情</Link>
          &nbsp;&nbsp;
        </span>
      )
    },
  },
  ]
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.orderNo}
        pagination={pagination}
        onChange={onPageChange}
      />
    </div>
  )
}

LogoutAdmin.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
}

export default LogoutAdmin
