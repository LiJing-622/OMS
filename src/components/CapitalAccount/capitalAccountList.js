import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Form, Select, Row, Col, Input, Button, Table } from 'antd'
// import { doctorBlockStyle } from '../../themes/index.less'
// import styles from './ParticularsList.less'
// import moment from 'moment'
// import { getGenderList } from '../../utils/helper.js'

const { Option } = Select
class CapitalAccountList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dateList: [],
      dataSource: [],
      doctorSource: [],
      vipSource: [],
      accountType: 1,
      customerId: null,
      data: {
        inputList: [],
        inputTwo: [],
      },
    }
  }
  // 第一行点击复选框
  onChangeClick = (e, index, valueItem) => {
    const { dispatch } = this.props
    valueItem.enableState = e.target.checked
    dispatch({
      type: 'videoUser/listItemOne',
      payload: {
        listItem: valueItem,
      },
    })
  };
  onSearch = e => {
    this.setState({
      customerId: e.target.value,
    })
  };

  // eslint-disable-next-line react/sort-comp
  clickMenu = value => {
    this.setState({
      accountType: value,
    })
  };
  onPageChange (page) {
    const { dispatch, location } = this.props
    const { query, pathname } = location
    dispatch(
      routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          size: page.pageSize,
        },
      })
    )
  }

  // 点击搜索
  handleSubmit = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'capitalAccount/query',
      payload: {
        accountType: this.state.accountType,
        customerId: this.state.customerId === '' ? null : this.state.customerId,
      },
    })
  };
  render () {
    const { dataSource, pagination } = this.props
    const columns = [
      {
        title: '客户号',
        dataIndex: 'customerId',
        key: 'customerId',
        render: (text, record) => {
          const customerId = record.customerId || '无'
          return customerId
        },
      },
      {
        title: '账户号',
        dataIndex: 'accountId',
        key: 'accountId',
        render: (text, record) => {
          const accountId = record.accountId || '无'
          return accountId
        },
      },
      {
        title: '子账户号',
        dataIndex: 'subAccountId',
        key: 'subAccountId',
        render: (text, record) => {
          const subAccountId = record.subAccountId || '无'
          return subAccountId
        },
      },
      {
        title: '账户类型',
        dataIndex: 'accountType',
        key: 'accountType ',
        render: (text, record) => {
          const accountType =
            record.accountType === 'PERSONAL'
              ? '个人账户'
              : '企业账户' || '未填写'
          return accountType
        },
      },
      {
        title: '余额',
        dataIndex: 'balance',
        key: 'balance',
        render: (text, record) => {
          const balance = record.balance
          return balance
        },
      },
      {
        title: '可用金额',
        dataIndex: 'availableBalance',
        key: 'availableBalance',
        render: (text, record) => {
          const availableBalance = record.availableBalance
          return availableBalance
        },
      },
      {
        title: '自有资金',
        dataIndex: 'selfAmt',
        key: 'selfAmt',
        render: (text, record) => {
          const selfAmt = record.selfAmt
          return selfAmt
        },
      },
      {
        title: '收入资金',
        dataIndex: 'incomeAmt',
        key: 'incomeAmt',
        render: (text, record) => {
          const incomeAmt = record.incomeAmt
          return incomeAmt
        },
      },
      // {
      //   title: '待结算资金',
      //   dataIndex: 'frozenAmt',
      //   key: 'frozenAmt',
      //   render: (text, record) => {
      //     const frozenAmt = record.frozenAmt
      //     return frozenAmt
      //   },
      // },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text, record) => {
          const createTime = record.createTime || '未创建时间'
          return createTime
        },
      },

      // {
      //   title: '备注',
      //   dataIndex: 'id',
      //   key: 'id',
      //   render: (text, record) => {
      //     //  const { id } = record.id
      //     return (
      //       <span>
      //         <Link to={{ pathname: `/logoutAdmin/edit/${id}`, query: { currentList: pagination.current } }} >审核</Link>
      //         <Link >审核</Link>
      //       &nbsp;&nbsp;
      //       </span>
      //     )
      //   },
      // },
    ]
    return (
      <Row type="flex" justify="space-between" style={{ marginBottom: '30px' }}>
        <Col span={1} style={{ textAlign: '' }} />
        <Col
          span={23}
          style={{ textAlign: 'left', display: 'inline', marginBottom: '20px' }}
        >
          <Select
            defaultValue={'1'}
            style={{ width: 200, marginRight: 15 }}
            onChange={this.clickMenu}
          >
            <Option key={1} value={'1'}>
              个人账户
            </Option>
            <Option key={2} value={'2'}>
              企业账户
            </Option>
          </Select>
          <Input
            placeholder="请输入客户号查询"
            style={{ width: 200, marginRight: 10 }}
            onChange={this.onSearch}
          />
          <Button
            type="primary"
            style={{ width: 80, marginLeft: 30 }}
            onClick={this.handleSubmit}
          >
            查询
          </Button>
        </Col>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.withdrawId}
          pagination={pagination}
          onChange={this.onPageChange.bind(this)}
        />
      </Row>
    )
  }
}
const mapStateToProps = () => {
  return {
    capitalAccount,
  }
}
const capitalAccount = Form.create()(CapitalAccountList)

export default connect(mapStateToProps)(capitalAccount)
