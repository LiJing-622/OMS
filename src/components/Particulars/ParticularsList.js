import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'dva'
// import { routerRedux } from 'dva/router'
import {
  Form,
  Tabs,
  Select,
  Row,
  Col,
  Input,
  Button,
  Table,
  DatePicker,
} from 'antd'
// import { doctorBlockStyle } from '../../themes/index.less'
// import styles from './ParticularsList.less'
import moment from 'moment'
import { accountStatus } from '../../utils/helper.js'

const { TabPane } = Tabs
const { RangePicker } = DatePicker
const { Option } = Select
const dateFormat = 'YYYY-MM-DD'
class ParticularsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dateList: [],
      dataSource: [],
      doctorSource: [],
      vipSource: [],
      createTimeEnd: undefined,
      createTimeBegin: undefined,
      txType: null,
      customerId: null,
      serialNo: null,
      direction: 'D',
      data: {
        inputList: [],
        inputTwo: [],
      },
    }
  }
  onPageChange (value, page) {
    const { dispatch } = this.props
    dispatch({
      type: 'Particular/query',
      payload: {
        direction: value,
        page: page.current,
        pageSize: page.pageSize,
        txType: this.state.txType,
        serialNo: this.state.serialNo,
        customerId: this.state.customerId,
      },
    })
  }
  onSearch = (e) => {
    this.setState({
      serialNo: e.target.value,
    })
  };
  onSearchFN=(e) => {
    this.setState({
      customerId: e.target.value,
    })
  }
  onChangeFN = (dates, dateStrings) => {
    this.setState({
      createTimeBegin: dateStrings[0],
      createTimeEnd: dateStrings[1],
    })
  };
  // eslint-disable-next-line react/sort-comp
  clickMenu = (value) => {
    this.setState({
      txType: value,
    })
  };
  clickMenuFn=(value) => {
    this.setState({
      txType: value,
    })
  }
  handleChange=(e) => {
    this.setState({
      serialNo: e.target.value,
    })
  }
  handleSubmit = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'Particular/query',
      payload: {
        direction: 'D',
        createTimeBegin: this.state.createTimeBegin,
        createTimeEnd: this.state.createTimeEnd,
        txType: this.state.txType,
        serialNo: this.state.serialNo === '' ? null : this.state.serialNo,
        customerId: this.state.customerId === '' ? null : this.state.customerId,
      },
    })
  };
  handleSubmitData=() => {
    const { dispatch } = this.props
    dispatch({
      type: 'Particular/queryData',
      payload: {
        direction: 'C',
        createTimeBegin: this.state.createTimeBegin,
        createTimeEnd: this.state.createTimeEnd,
        txType: this.state.txType,
        serialNo: this.state.serialNo === '' ? null : this.state.serialNo,
        customerId: this.state.customerId === '' ? null : this.state.customerId,
      },
    })
  }
  // 切换tab
  callbackFN = val => {
    this.setState({
      createTimeBegin: '',
      createTimeEnd: '',
      txType: null,
      serialNo: null,
    })
    const { dispatch } = this.props
    if (val === 'D') {
      dispatch({
        type: 'Particular/query',
        payload: {
          direction: val,
        },
      })
    } else {
      dispatch({
        type: 'Particular/queryData',
        payload: {
          direction: val,
        },
      })
    }
  };
  onPageChangeFN= (value, page) => {
    const { dispatch } = this.props
    dispatch({
      type: 'Particular/queryData',
      payload: {
        direction: value,
        page: page.current,
        pageSize: page.pageSize,
        txType: this.state.txType,
        createTimeBegin: this.state.createTimeBegin,
        createTimeEnd: this.state.createTimeEnd,
        serialNo: this.state.serialNo === '' ? null : this.state.serialNo,
        customerId: this.state.customerId === '' ? null : this.state.customerId,
      },
    })
  };
  render () {
    const { dataSource, pagination, dataSourceData, dataPagination } = this.props

    const columns = [
      {
        title: '客户号',
        width: 150,
        dataIndex: 'customerId',
        key: 'customerId',
        render: (text, record) => {
          const customerId = record.customerId || '未填写'
          return customerId
        },
      },
      {
        title: '账户名称',
        width: 150,
        dataIndex: 'accountName',
        key: 'accountName',
        render: (text, record) => {
          const accountName = record.accountName || '未填写'
          return accountName
        },
      },
      {
        title: '交易单号',
        dataIndex: 'serialNo',
        width: 300,
        key: 'serialNo',
        render: (text, record) => {
          const serialNo = record.serialNo || '未填写'
          return serialNo
        },
      },
      {
        title: '类型',
        width: 150,
        dataIndex: 'txType',
        key: 'txType',
        render: (text, record) => {
          const txType = record.txType || '未填写'
          return accountStatus(txType)
        },
      },
      {
        title: '金额',
        width: 150,
        dataIndex: 'txAmt',
        key: 'txAmt ',
        render: (text, record) => {
          const txAmt = record.txAmt || '未填写'
          return txAmt
        },
      },
      {
        title: '日期',
        dataIndex: 'txTime',
        width: 200,
        key: 'txTime',
        render: (text, record) => {
          const txTime = record.txTime || '未填写'
          return txTime
        },
      },


      // {
      //   title: '余额',
      //   dataIndex: 'auditStatus',
      //   key: 'auditStatus',
      //   render: (text, record) => {
      //     const auditStatus = record.auditStatus || '未填写'
      //     return getGenderList(auditStatus)
      //   },
      // },

      {
        title: '说明',
        dataIndex: 'txDesc',
        key: 'txDesc',
        render: (text, record) => {
          const txDesc = record.txDesc || '未填写'
          return txDesc
        },
      },

    ]
    return (
      <Tabs defaultActiveKey="D" onChange={this.callbackFN}>
        <TabPane tab="收入" key="D">
          <Row
            type="flex"
            justify="space-between"
            style={{ marginBottom: '30px' }}
          >
            <Col span={1} style={{ textAlign: '' }} />
            <Col
              span={23}
              style={{
                textAlign: 'left',
                display: 'inline',
                marginBottom: '20px',
              }}
            >
              <RangePicker
                style={{ width: 500, marginRight: 10 }}
                format="YYYY-MM-DD"
                ranges={{
                  Today: [moment(), moment()],
                  'This Month': [
                    moment().startOf('month'),
                    moment().endOf('month'),
                  ],
                }}
                value={
                  this.state.createTimeBegin === undefined ||
                  this.state.createTimeEnd === undefined ||
                  this.state.createTimeBegin === '' ||
                  this.state.createTimeEnd === ''
                    ? null
                    : [
                      moment(this.state.createTimeBegin, dateFormat),
                      moment(this.state.createTimeEnd, dateFormat),
                    ]
                }
                onChange={this.onChangeFN}
              />
              <Select
                defaultValue={''}
                style={{ width: 200, marginRight: 15 }}
                onChange={this.clickMenu}
              >
                <Option key={''} value={''}>
                  全部类型
                </Option>
                <Option key={'recharge'} value={'recharge'}>
                  充值
                </Option>
                <Option key={'refund'} value={'refund'}>
                  退款
                </Option>
                <Option key={'revenue'} value={'revenue'}>
                  收入
                </Option>
              </Select>
              <Input
                placeholder="请输入账户查询"
                style={{ width: 300, marginRight: 10 }}
                onChange={this.onSearch}
              />
              <Input
                placeholder="请输入客户号"
                style={{ width: 300, marginRight: 10 }}
                onChange={this.onSearchFN}
              />
              <Button
                type="primary"
                style={{ width: 80, marginLeft: 30 }}
                onClick={this.handleSubmit}
              >
                查询
              </Button>
              {/* <Button
                type="primary"
                style={{ width: 140, marginLeft: 30 }}
                onClick={this.handleSubmit}
              >
                导出为Excel表格
              </Button> */}
            </Col>
            <Table
              columns={columns}
              dataSource={dataSource}
              rowKey={record => record.serialNo}
              pagination={pagination}
              onChange={this.onPageChange.bind(this, 'D')}
            />
          </Row>
        </TabPane>
        <TabPane tab="支出" key="C">
          <Row
            type="flex"
            justify="space-between"
            style={{ marginBottom: '10px' }}
          >
            <Col span={1} style={{ textAlign: '' }} />
            <Col
              span={23}
              style={{
                textAlign: 'left',
                display: 'inline',
                marginBottom: '20px',
              }}
            >
              <RangePicker
                style={{ width: 500, marginRight: 10 }}
                format="YYYY-MM-DD"
                value={
                  this.state.createTimeBegin === undefined ||
                  this.state.createTimeEnd === undefined ||
                  this.state.createTimeBegin === '' ||
                  this.state.createTimeEnd === ''
                    ? null
                    : [
                      moment(this.state.createTimeBegin, dateFormat),
                      moment(this.state.createTimeEnd, dateFormat),
                    ]
                }
                ranges={{
                  Today: [moment(), moment()],
                  'This Month': [
                    moment().startOf('month'),
                    moment().endOf('month'),
                  ],
                }}
                onChange={this.onChangeFN}
              />
              <Select
                defaultValue={''}
                style={{ width: 200, marginRight: 15 }}
                onChange={this.clickMenuFn}
              >
                <Option key={''} value={''}>
                  全部类型
                </Option>
                <Option key={'withdraw'} value={'withdraw'}>
                  提现
                </Option>
                <Option key={'transfer'} value={'transfer'}>
                  转帐
                </Option>
                <Option key={'expense'} value={'expense'}>
                  支出
                </Option>
              </Select>
              <Input
                placeholder="请输入姓名查询"
                style={{ width: 200, marginRight: 10 }}
                onChange={this.handleChange}
              />
              <Button
                type="primary"
                style={{ width: 80, marginLeft: 30 }}
                onClick={this.handleSubmitData}
              >
                查询
              </Button>
              {/* <Button
                type="primary"
                style={{ width: 140, marginLeft: 30 }}
                onClick={this.handleSubmit}
              >
                导出为Excel表格
              </Button> */}
            </Col>
            <Table
              columns={columns}
              dataSource={dataSourceData}
              rowKey={record => record.serialNo}
              pagination={dataPagination}
              onChange={this.onPageChangeFN.bind(this, 'C')}
            />
          </Row>
        </TabPane>
      </Tabs>
    )
  }
}
const mapStateToProps = () => {
  return {
    Particular,
  }
}
const Particular = Form.create()(ParticularsList)

export default connect(mapStateToProps)(Particular)
