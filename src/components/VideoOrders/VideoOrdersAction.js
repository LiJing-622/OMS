import React from 'react'
// import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Button,
  Form,
  message,
} from 'antd'
import { connect } from 'dva'
import moment from 'moment'
// const Search = Input.Search
const Option = Select.Option
const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM-DD HH:mm:ss'
class VideoOrdersAction extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dateList: [],
      dataSource: [],
      doctorSource: [],
      vipSource: [],
      startTime: undefined,
      endTime: undefined,
      bizType: null,
      status: null,
      orderNo: null,
      memPhone: null,
      doctorPhone: null,
      memCode: null,
      doctorCode: null,
      pageSize: 10,
      page: 1,
      affiliation: 'doctor9k',
      data: {
        inputList: [],
        inputTwo: [],
      },
    }
  }
  //   keyword,
  //   onSearch,
  //   // onResetSearch,
  //   handleChange,
  //  // orderStatus,
  //  handleSubmit, // 提交
  //   bizType,
  //   clickMenu,
  //   onStartDate,
  //   onEndDate,
  //   // onAdvanceSearchMode,
  // }) => {

  // 订单类型
  // eslint-disable-next-line react/sort-comp
  clickMenu = value => {
    this.setState({
      bizType: value,
    })
    console.log(value)
  };
  // 个人手机号查询
  memPhoneClick = e => {
    if (e.target.value === '') {
      this.setState({
        memPhone: null,
      })
    } else {
      this.setState({
        memPhone: e.target.value,
      })
    }
  };
  // 医生手机号查询
  doctorPhoneClick = e => {
    if (e.target.value === '') {
      this.setState({
        doctorPhone: null,
      })
    } else {
      this.setState({
        doctorPhone: e.target.value,
      })
    }
  };
  // 订单状态
  handleChange = value => {
    console.log(value, 'value')
    this.setState({
      status: value,
    })
  };
  // 订单号查询
  orderNoClick = e => {
    this.setState({
      orderNo: e.target.value,
    })
  };
  // 医生id
  doctorCodeClick = e => {
    this.setState({
      doctorCode: e.target.value,
    })
  };
  // 用户id
  memCodeClick = e => {
    this.setState({
      memCode: e.target.value,
    })
  };
  // 订单归属
  affiliationClick = value => {
    this.setState({
      affiliation: value,
    })
  };
  // 下单时间
  onChangeFN = (dates, dateStrings) => {
    console.log(dateStrings[1])
    this.setState({
      startTime: `${dateStrings[0]} 00:00:00`,
      endTime: `${dateStrings[1]} 23:59:59`,
    })
  };
  onSearch = () => {
    const { dispatch } = this.props
    let reg = 11 && /^1[3456789]\d{9}$/ // 手机号正则验证
    if (this.state.doctorPhone === null && this.state.memPhone === null) {
      dispatch({
        type: 'videoOrders/query',
        payload: {
          pageSize: this.state.pageSize,
          page: this.state.page,
          startTime: this.state.startTime,
          endTime: this.state.endTime,
          affiliation: this.state.affiliation,
          memCode: this.state.memCode,
          doctorCode: this.state.doctorCode,
          orderNo: this.state.orderNo,
          status: this.state.status,
          doctorPhone: this.state.doctorPhone,
          memPhone: this.state.memPhone,
          bizType: this.state.bizType,
        },
      })
    } else {
      if (this.state.doctorPhone !== null) {
        if (!reg.test(this.state.doctorPhone)) {
          // 手机号不合法
          console.log(this.state.doctorPhone, 'this.state.doctorPhone')
          message.error('请输入正确的手机号')
        } else {
          dispatch({
            type: 'videoOrders/query',
            payload: {
              pageSize: this.state.pageSize,
              page: this.state.page,
              startTime: this.state.startTime,
              endTime: this.state.endTime,
              affiliation: this.state.affiliation,
              memCode: this.state.memCode,
              doctorCode: this.state.doctorCode,
              orderNo: this.state.orderNo,
              status: this.state.status,
              doctorPhone: this.state.doctorPhone,
              memPhone: this.state.memPhone,
              bizType: this.state.bizType,
            },
          })
        }
      } else if (this.state.memPhone !== null) {
        if (!reg.test(this.state.memPhone)) {
          // 手机号不合法
          console.log(this.state.memPhone, 'this.state.doctorPhone')
          message.error('请输入正确的手机号')
        } else {
          dispatch({
            type: 'videoOrders/query',
            payload: {
              pageSize: this.state.pageSize,
              page: this.state.page,
              startTime: this.state.startTime,
              endTime: this.state.endTime,
              affiliation: this.state.affiliation,
              memCode: this.state.memCode,
              doctorCode: this.state.doctorCode,
              orderNo: this.state.orderNo,
              status: this.state.status,
              doctorPhone: this.state.doctorPhone,
              memPhone: this.state.memPhone,
              bizType: this.state.bizType,
            },
          })
        }
      }
    }
  };
  render () {
    return (
      <div>
        <Row type="flex" justify="space-between">
          {/* <Col span={1} style={{ textAlign: '' }} /> */}
          <Col
            span={23}
            style={{
              textAlign: 'left',
              display: 'inline',
              marginBottom: '5px',
            }}
          >
            <Form layout="inline">
              <Form.Item label="订单号查询">
                <Input
                  placeholder="请输入订单号查询"
                  style={{
                    width: 200,
                    marginRight: 10,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  onChange={this.orderNoClick}
                />
              </Form.Item>
              <Form.Item label="订单归属">
                <Select
                  defaultValue={'doctor9k'}
                  style={{
                    width: 200,
                    marginRight: 15,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  onChange={this.affiliationClick}
                >
                  <Option key={'doctor9k'} value={'doctor9k'}>
                    9K医生
                  </Option>
                  <Option key={'hospital_jk'} value={'hospital_jk'}>
                    测试（久康国际医院）
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item label="订单状态">
                <Select
                  defaultValue={'00'}
                  style={{
                    width: 200,
                    marginRight: 15,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  onChange={this.handleChange}
                >
                  <Option key={'00'} value={'00'}>
                    全部类型
                  </Option>
                  <Option key={'10'} value={'10'}>
                    待付款
                  </Option>
                  <Option key={'20'} value={'20'}>
                    已取消
                  </Option>
                  <Option key={'40'} value={'40'}>
                    服务中
                  </Option>
                  <Option key={'50'} value={'50'}>
                    已完成
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item label="订单类型">
                <Select
                  defaultValue={''}
                  style={{
                    width: 200,
                    marginRight: 15,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  onChange={this.clickMenu}
                >
                  <Option key={''} value={''}>
                    全部类型
                  </Option>
                  <Option key={'00'} value={'00'}>
                    视频预约
                  </Option>
                  <Option key={'02'} value={'02'}>
                    一元义诊
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item label="用户手机号">
                <Input
                  placeholder="请输入用户手机号查询"
                  style={{
                    width: 200,
                    marginRight: 10,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  onChange={this.memPhoneClick}
                />
              </Form.Item>
              <Form.Item label="医生手机号">
                <Input
                  placeholder="请输入医生手机号查询"
                  style={{
                    width: 200,
                    marginRight: 10,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  onChange={this.doctorPhoneClick}
                />
              </Form.Item>
              <Form.Item label="用户ID">
                <Input
                  placeholder="请输入用户id查询"
                  style={{ width: 200, marginRight: 10, marginTop: 10 }}
                  onChange={this.memCodeClick}
                />
              </Form.Item>
              <Form.Item label="医生ID">
                <Input
                  placeholder="请输入医生id查询"
                  style={{ width: 200, marginRight: 10, marginTop: 10 }}
                  onChange={this.doctorCodeClick}
                />
              </Form.Item>
              <Form.Item label="订单时间">
                <RangePicker
                  style={{ width: 400, marginRight: 10, marginTop: 10 }}
                  format="YYYY-MM-DD"
                  ranges={{
                    Today: [moment(), moment()],
                    'This Month': [
                      moment().startOf('month'),
                      moment().endOf('month'),
                    ],
                  }}
                  value={
                    this.state.startTime === undefined ||
                    this.state.endTime === undefined ||
                    this.state.startTime === '' ||
                    this.state.endTime === ''
                      ? null
                      : [
                        moment(this.state.startTime, dateFormat),
                        moment(this.state.endTime, dateFormat),
                      ]
                  }
                  onChange={this.onChangeFN}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  style={{
                    width: 80,
                    marginLeft: 30,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  onClick={this.onSearch}
                >
                  查询
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

// VideoOrdersAction.propTypes = {
//   keyword: PropTypes.string,
//   onSearch: PropTypes.func,
// }
const mapStateToProps = () => {
  return {
    videoOrders,
  }
}
const videoOrders = Form.create()(VideoOrdersAction)

export default connect(mapStateToProps)(videoOrders)
// export default VideoOrdersAction
