import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Form, Row, Col, Table, Modal } from 'antd'
// import { doctorBlockStyle } from '../../themes/index.less'
// import styles from './ParticularsList.less'
// import moment from 'moment'
import { withdrawStatusValue } from '../../utils/helper.js'

// const { Option } = Select
// const { RangePicker } = DatePicker
// const dateFormat = 'YYYY-MM-DD'
class CashRefundList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      dateList: [],
      dataSource: [],
      doctorSource: [],
      vipSource: [],
      createTimeBegin: undefined,
      createTimeEnd: undefined,
      realName: '',
      withdrawId: '',
      statusList: [],
      data: {
        inputList: [],
        inputTwo: [],
      },
    }
  }
  // 点击查询
  // eslint-disable-next-line react/sort-comp
  handleSubmit = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'cashManagemen/shareProfit',
      payload: {
        createTimeBegin: this.state.createTimeBegin,
        createTimeEnd: this.state.createTimeEnd,
        txType: this.state.txType,
        realName: this.state.realName,
        withdrawId: this.state.withdrawId,
        statusList: this.state.statusList,
      },
    })
  };
  // 退出
  pathnameFN (value) {
    this.setState({
      visible: true,
      withdrawId: value,
    })
  }
  onPageChange (page) {
    const { dispatch, location } = this.props
    const { query, pathname } = location
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...query,
        page: page.current,
        size: page.pageSize,
      },
    }))
  }
  // 确认退款
  handleOk = () => {
    const { dispatch } = this.props
    this.setState({
      visible: false,
    })
    dispatch({
      type: 'cashRefund/cancelApplyStart',
      payload: {
        withdrawId: this.state.withdrawId,
      },
    })
  };
   // 取消退款
  handleCancel = () => {
    this.setState({
      visible: false,
    })
  };
  render () {
    const { dataSource, pagination } = this.props
    const columns = [
      {
        title: '申请日期',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text, record) => {
          const createTime = record.createTime || '未填写'
          return createTime
        },
      },
      {
        title: '提现单号',
        dataIndex: 'withdrawId',
        key: 'withdrawId',
        render: (text, record) => {
          const withdrawId = record.withdrawId
          return withdrawId
        },
      },
      {
        title: '申请人',
        dataIndex: 'realName',
        key: 'realName',
        render: (text, record) => {
          const realName = record.realName || '未填写'
          return realName
        },
      },
      {
        title: '提现银行',
        dataIndex: 'bankName',
        key: 'bankName ',
        render: (text, record) => {
          const bankName = record.bankName || '未填写'
          return bankName
        },
      },
      {
        title: '提现金额',
        dataIndex: 'txAmt',
        key: 'txAmt',
        render: (text, record) => {
          const txAmt = record.txAmt || '未填写'
          return txAmt
          // return getGenderList(txAmt)
        },
      },
      {
        title: '服务费',
        dataIndex: 'chargeAmt',
        key: 'chargeAmt',
        render: (text, record) => {
          const chargeAmt = record.chargeAmt || '未填写'
          return chargeAmt
        },
      },
      {
        title: '税费',
        dataIndex: 'taxAmt',
        key: 'taxAmt',
        render: (text, record) => {
          const taxAmt = record.taxAmt
          return taxAmt
        },
      },
      {
        title: '打款金额',
        dataIndex: 'arrivalAmt',
        key: 'arrivalAmt',
        render: (text, record) => {
          const arrivalAmt = record.arrivalAmt || '未填写'
          return arrivalAmt
        },
      },
      {
        title: '提现状态',
        dataIndex: 'withdrawStatus',
        key: 'withdrawStatus',
        render: (text, record) => {
          const withdrawStatus = record.withdrawStatus || '未填写'
          return withdrawStatusValue(withdrawStatus)
        },
      },
      {
        title: '备注',
        dataIndex: 'withdrawDesc',
        key: 'withdrawDesc',
        render: (text, record) => {
          const withdrawDesc = record.withdrawDesc || '未填写'
          return withdrawDesc
        },
      },
      {
        title: '操作',
        key: 'id',
        render: (text, record) => {
          return (
            <div onClick={this.pathnameFN.bind(this, record.withdrawId)} style={{ color: 'blue' }}>
              退款 &nbsp;&nbsp;
            </div>
          )
        },
      },
    ]
    return (
      <Row type="flex" justify="space-between" style={{ marginBottom: '30px' }}>
        <Col span={1} style={{ textAlign: '' }} />
        <Col
          span={23}
          style={{ textAlign: 'left', display: 'inline', marginBottom: '20px' }}
        />
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.withdrawId}
          pagination={pagination}
          onChange={this.onPageChange.bind(this)}
        />
        <Modal
          title="退款"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>是否取消退款?</p>
        </Modal>
      </Row>
    )
  }
}
const mapStateToProps = () => {
  return {
    cashRefund,
  }
}
const cashRefund = Form.create()(CashRefundList)

export default connect(mapStateToProps)(cashRefund)
