import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Form, Select, Row, Col, Input, Button, DatePicker, Table } from 'antd'
// import { doctorBlockStyle } from '../../themes/index.less'
// import styles from './ParticularsList.less'
import moment from 'moment'
import { withdrawStatusValue } from '../../utils/helper.js'

const { Option } = Select
const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM-DD'
class CapitalAccountList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dateList: [],
      dataSource: [],
      doctorSource: [],
      vipSource: [],
      createTimeBegin: undefined,
      createTimeEnd: undefined,
      realName: null,
      keyWord: null,
      withdrawId: null,
      statusList: ['cancel', 'processing', 'success', 'failure'],
    }
  }

  // 点击时间
  onChangeFN = (dates, dateStrings) => {
    this.setState({
      createTimeBegin: dateStrings[0],
      createTimeEnd: dateStrings[1],
    })
  };
  // 输入框
  onSearch = e => {
    this.setState({
      // withdrawId: e.target.value,
      keyWord: e.target.value,
    })
  };
  // onSearchClick=(e) => {
  //   this.setState({
  //     withdrawId: e.target.value,
  //     // realName: e.target.value,
  //   })
  // }
  // eslint-disable-next-line react/sort-comp
  clickMenu = value => {
    if (value === '') {
      value = ['cancel', 'processing', 'success', 'failure']
      this.setState({
        statusList: value,
      })
    } else {
      this.setState({
        statusList: value.split(','),
      })
    }
  };
  // 点击查询
  handleSubmit = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'cashManagemen/query',
      payload: {
        createTimeBegin: this.state.createTimeBegin,
        createTimeEnd: this.state.createTimeEnd,
        txType: this.state.txType,
        keyWord: this.state.keyWord === '' ? null : this.state.keyWord,
        // realName: this.state.realName === '' ? null : this.state.realName,
        // withdrawId: this.state.withdrawId === '' ? null : this.state.withdrawId,
        statusList: this.state.statusList,
      },
    })
  };
  pathnameFN (value) {
    const { dispatch } = this.props
    dispatch({
      type: 'cashManagemen/titles',
      payload: {
        detailsItem: value,
      },
    })
  }
  onPageChange (page) {
    const { dispatch } = this.props
    // const { query, pathname } = location
    console.log('tag', this.state.statusList)

    dispatch({
      type: 'cashManagemen/query',
      payload: {
        page: page.current,
        pageSize: page.pageSize,
        createTimeBegin: this.state.createTimeBegin,
        createTimeEnd: this.state.createTimeEnd,
        keyWord: this.state.keyWord === '' ? null : this.state.keyWord,
        txType: this.state.txType,
        // realName: this.state.realName === '' ? null : this.state.realName,
        // withdrawId: this.state.withdrawId === '' ? null : this.state.withdrawId,
        statusList: this.state.statusList,
      },
    })
    // dispatch(routerRedux.push({
    //   pathname,
    //   query: {
    //     ...query,
    //     page: page.current,
    //     size: page.pageSize,
    //     createTimeBegin: this.state.createTimeBegin,
    //     createTimeEnd: this.state.createTimeEnd,
    //     txType: this.state.txType,
    //     realName: this.state.realName,
    //     statusList: this.state.statusList,
    //     withdrawId: this.state.withdrawId,
    //   },
    // }))
  }

  render () {
    const { pagination, dataSource } = this.props
    const columns = [
      {
        title: '申请日期',
        dataIndex: 'createTime',
        width: 200,
        key: 'createTime',
        render: (text, record) => {
          const createTime = record.createTime || '未填写'
          return createTime
        },
      },
      {
        title: '提现单号',
        dataIndex: 'withdrawId',
        width: 280,
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
        width: 100,
        key: 'txAmt',
        render: (text, record) => {
          const txAmt = record.txAmt
          return txAmt
          // return getGenderList(txAmt)
        },
      },
      {
        title: '服务费',
        dataIndex: 'chargeAmt',
        key: 'chargeAmt',
        render: (text, record) => {
          const chargeAmt = record.chargeAmt
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
          const arrivalAmt = record.arrivalAmt
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
        dataIndex: 'remark',
        key: 'remark',
        render: (text, record) => {
          const remark = record.remark || '未填写'
          return remark
        },
      },
      {
        title: '操作',
        key: 'id',
        render: (text, record) => {
          return (
            <div onClick={this.pathnameFN.bind(this, record)}>
              <Link to={{ pathname: '/cashManagement/edit' }}>
               查看详情</Link>
               &nbsp;&nbsp;
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
              'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
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
            <Option key={'success'} value={'success'}>
              提现成功
            </Option>
            <Option key={'failure'} value={'failure'}>
              提现失败
            </Option>
            <Option key={'processing'} value={'processing'}>
              正在处理
            </Option>
            <Option key={'cancel'} value={'cancel'}>
              提现取消
            </Option>
          </Select>
          <Input
            placeholder="请输入申请人名字/提现单号"
            style={{ width: 400, marginRight: 10 }}
            onChange={this.onSearch}
          />
          {/* <Input
            placeholder="请输入提现单号"
            style={{ width: 300, marginRight: 10 }}
            onChange={this.onSearchClick}
          /> */}
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
    cashManagemen,
  }
}
const cashManagemen = Form.create()(CapitalAccountList)

export default connect(mapStateToProps)(cashManagemen)
