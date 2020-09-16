import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Tabs, Select, Spin, Form, Row, Col, Radio, Checkbox, Input, Button } from 'antd'
import { connect } from 'dva'
// import styles from './videoUser.less'
// import { doctorBlockStyle } from '../../themes/index.less'
import styles from './videoUser.less'
// import VideoUserListWDList from './VideoUSerLIstWDList'
// const { Option } = Select
const { TabPane } = Tabs
// const { Search } = Input
const Option = Select.Option
const FormItem = Form.Item
const RadioGroup = Radio.Group
class videoUserModelFn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dateList: [],
      doctor: {
        sex: '',
        limit: '',
        isOnline: '',
      },
      date: [
        { name: '9k代表', id: '1' },
        { name: '9k主管', id: '2' },
        { name: '9k经理', id: '3' },
        { name: '9k总监', id: '4' },
      ],
    }
  }
  onChangeClick=() => {
    console.log('1111')
  }

  // 取消按钮
  handleCancel = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'videoUser/hideModal',
      payload: {
        modalVisible: false,
      },
    })
  };
  callback=(e) => {
    console.log(e, 'a')
  }
  // 确认按钮
  showOnOkModal = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'videoUser/hideModal',
      payload: {
        modalVisible: false,
      },
    })
  };
  addClick = value => {
    const { dispatch } = this.props
    console.log(this.state.dateList, 'hfhsj')
    dispatch({
      type: 'videoUser/hideModal',
      payload: {
        modalVisible: false,
      },
    })
    dispatch({
      type: 'videoUser/dataSource',
      payload: {
        dataSource: this.state.dateList,
      },
    })
    console.log(value, '历经')
  };
  // 添加城市
  checkboxClick = value => {
    console.log(value, '礼金')
  };
  handleChange = value => {
    this.state.dateList = value
    console.log('李晶', value)
    console.log('李晶', this.state.dateList)
  };


  render () {
    console.log(this.props)
    const { targetKeys } = this.props
    const { getFieldDecorator } = this.props.form
    const children = []
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    }
    for (let i = 10; i < 36; i++) {
      children.push(
        <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
      )
    }

    console.log(targetKeys, children, 'lijng ')

    return (
      <div className={styles.boxListTop}>
        <Tabs defaultActiveKey="1" onChange={this.callback} tabPosition="left">
          {this.state.date.map((item) => <TabPane tab={item.name} key={item.id}>
            <Spin spinning={false}>
              <Form>
                <Row>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label="认证状态">
                      <div className={styles.box}>
                        <div className={styles.boxP}>
                          <div className={styles.box}>
                            <p>一级成员消费 :</p>
                            <div className={styles.boxP}>
                              <Input
                                placeholder="请输入分润比例"
                              />
                            </div>
                          </div>
                        </div>

                      </div>
                      <div className={styles.box}>
                        <div className={styles.boxP}>
                          <div className={styles.box}>
                            <p>二级成员消费 :</p>
                            <div className={styles.boxP}>
                              <Input
                                placeholder="请输入分润比例"
                              />
                            </div>
                          </div>
                        </div>

                      </div>
                    </FormItem>
                    <FormItem {...formItemLayout} label="全部平台">
                      {getFieldDecorator('isOnline', {
                        rules: [
                          {
                            required: true,

                            message: '必须选择平台名称',
                          },
                        ],
                        initialValue: this.state.doctor.isOnline,
                      })(
                        <Checkbox>
                        全部平台
                        </Checkbox>
                    )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="使用范围">
                      {getFieldDecorator('sex', {
                        rules: [
                          {
                            required: true,

                            message: '必须填写使用范围',
                          },
                        ],
                        initialValue: this.state.doctor.sex,
                      })(
                        <RadioGroup>
                          <Radio value={'0'}>全部普通用户</Radio>
                        </RadioGroup>
                    )}
                      <Button onClick={this.handleCity}>添加指定用户</Button>
                    </FormItem>

                    <div
                      style={{
                        marginLeft: '500px',
                        marginBottom: '40px',
                        alignContent: 'center',
                      }}
                    >
                      <Link to="/doctors">
                        <Button type="default" size="large">
                        返回
                      </Button>
                      </Link>
                      <Button
                        type="primary"
                        size="large"
                        style={{ marginLeft: '20px', marginBottom: '30px' }}
                        onClick={this.handleOk}
                      >
                      确定
                    </Button>
                    </div>

                  </Col>
                </Row>
              </Form>
            </Spin>
          </TabPane>)}
        </Tabs>
      </div>
    )
  }
}
const mapStateToProps = () => {
  return {
    videoUserListWD,
  }
}
const videoUserListWD = Form.create()(videoUserModelFn)
export default connect(mapStateToProps)(videoUserListWD)
