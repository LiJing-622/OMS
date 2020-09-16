import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'dva'
// import { Link } from 'dva/router'
import {
  Form,
  Tabs,
  // Row,
  Col,
  Button,
  Input,
  // Radio,
  Spin,
  // Tag,
  message,
  // Icon,
  Checkbox,
} from 'antd'
// import { doctorBlockStyle } from '../../themes/index.less'
import styles from './videoUser.less'

const { TabPane } = Tabs
const FormItem = Form.Item
// const RadioGroup = Radio.Group
// const CheckboxGroup = Checkbox.Group
// const videoUserList = ({
class videoUserListOne extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dateList: [],
      dataSource: [],
      doctorSource: [],
      vipSource: [],
      recruitDataOne: [],
      recruitDataTwo: [],
      recruitDataTree: [],
      recruitDataFour: [],
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
  // 一级input
  oneFNClick = (e, index, valueItem, item) => {
    const { dispatch } = this.props
    console.log(e.target.value)
    if (e.target.value === '') {
      item.percentageA = e.target.value
    } else {
      item.percentageA = Number(e.target.value)
    }
    dispatch({
      type: 'videoUser/listItemOne',
      payload: {
        listItem: item,
      },
    })
  };
  // 二级input
  // eslint-disable-next-line react/sort-comp
  twoFnClick = (e, index, valueItem, item) => {
    const { dispatch } = this.props
    if (e.target.value === '') {
      item.percentageB = e.target.value
    } else {
      item.percentageB = Number(e.target.value)
    }
    dispatch({
      type: 'videoUser/listItemOne',
      payload: {
        listItem: item,
      },
    })
  };
  // 提交
  handleOk = () => {
    const { doctor, dispatch } = this.props
    console.log('doctor', doctor.rules)
    if (doctor.rules[0].enableState === true) {
      if (doctor.rules[0].percentageA === '' || doctor.rules[0].percentageB === '') {
        message.error('选定的输入框不能为空')
        return
      }
    }
    if (doctor.rules[1].enableState === true) {
      if (doctor.rules[1].percentageA === '' || doctor.rules[1].percentageB === '') {
        message.error('选定的输入框不能为空')
        return
      }
    }
    if (doctor.rules[2].enableState === true) {
      if (doctor.rules[2].percentageA === '' || doctor.rules[2].percentageB === '') {
        message.error('选定的输入框不能为空')
        return
      }
    }
    dispatch({
      type: 'videoUser/updateIDUrl',
      payload: doctor,
    })
    // const is = dataSource[0].enableState
    // const is1 = dataSource[1].enableState
    // const is2 = dataSource[2].enableState
    // if (is === false && is1 === false && is2 === false) {
    //   message.error('请选择认证状态')
    // } else {
    //   if (
    //     (is === true && is1 === true && is2 === true) ||
    //     (is === false && is1 === false && is2 === true) ||
    //     (is === false && is1 === true && is2 === true) ||
    //     (is === true && is1 === false && is2 === true) ||
    //     (is === false && is1 === true && is2 === false) ||
    //     (is === true && is1 === false && is2 === false) ||
    //     (is === true && is1 === true && is2 === false)
    //   ) {
    //     if (
    //       dataSource[0].percentageA === '' ||
    //       dataSource[0].percentageB === '' ||
    //       dataSource[1].percentageA === '' ||
    //       dataSource[1].percentageB === '' ||
    //       dataSource[2].percentageA === '' ||
    //       dataSource[2].percentageB === ''
    //     ) {
    //       message.error('选定的输入框不能为空')
    //     } else {
    //       const { dispatch } = this.props
    //       dispatch({
    //         type: 'videoUser/updateIDUrl',
    //         payload: doctor,
    //       })
    //     }
    //   }
    // }
  };
  // 切换 tabs
  callback = val => {
    const { dispatch } = this.props
    dispatch({
      type: 'videoUser/shareProfit',
      payload: val,
    })
  };

  // eslint-disable-next-line react/sort-comp
  render () {
    const {
      dataSource,
      vipSource,
      doctorSource,
      recruitDataOne,
      recruitDataTwo,
      recruitDataTree,
      recruitDataFour,
    } = this.props

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    }
    return (
      <Tabs defaultActiveKey="user" onChange={this.callback}>
        <TabPane tab="普通用户" key="user">
          <Spin spinning={false}>
            {dataSource.length !== 0 ? (
              <Form>
                {/* <Row> */}
                <Col span={24}>
                  <FormItem
                    rules={[
                      {
                        required: true,
                        message: '必须填写分润限制',
                      },
                    ]}
                    {...formItemLayout}
                    label="认证状态"
                  >
                    {dataSource.map((item, index) => {
                      return (
                        <Checkbox
                          key={item.ruleCode}
                          defaultChecked={item.enableState}
                          onChange={e => this.onChangeClick(e, index, item)}
                        >
                          {item.ruleName}
                          <div className={styles.box}>
                            <div className={styles.boxP}>
                              <div className={styles.box}>
                                <p> 一级成员消费:</p>
                                <div className={styles.boxP}>
                                  <Input
                                    defaultValue={item.percentageA}
                                    style={{ marginTop: '10px' }}
                                    placeholder="请输入分润比例%"
                                    onChange={e =>
                                      this.oneFNClick(
                                        e,
                                        index,
                                        item.ruleCode,
                                        item
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className={styles.box}>
                                <p>二级成员消费:</p>
                                <div className={styles.boxP}>
                                  <Input
                                    defaultValue={item.percentageB}
                                    style={{ marginTop: '10px' }}
                                    placeholder="请输入分润比例%"
                                    onChange={e =>
                                      this.twoFnClick(
                                        e,
                                        index,
                                        item.percentageB,
                                        item
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Checkbox>
                      )
                    })}
                  </FormItem>
                  {/* <FormItem {...formItemLayout} label="使用范围">
                  {getFieldDecorator('sex', {
                    rules: [
                      {
                        required: true,

                        message: '必须填写性别',
                      },
                    ],
                    initialValue: doctor.sex,
                  })(
                    <Checkbox onChange={this.onChangeAll}>
                        全部普通用户
                      </Checkbox>
                    )}
                  {this.props.dataSource.map((item, index) => (
                    <Tag key={index} closable>
                      {item}
                    </Tag>
                    ))}
                  <Button onClick={this.handleCity}>添加指定用户</Button>
                </FormItem>
                <FormItem {...formItemLayout} label="分润限制">
                  {getFieldDecorator('limit', {
                    rules: [
                      {
                        required: true,

                        message: '必须填写分润限制',
                      },
                    ],
                    initialValue: doctor.limit,
                  })(
                    <RadioGroup onChange={this.onChangeLimit}>
                      <Radio value={'0'}>不限</Radio>
                      <Radio value={'3'}>自定义范围</Radio>
                    </RadioGroup>

                    )}
                  {this.state.doctor.FrChecked === '3' ?

                    <div className={styles.box}>

                      <span>第</span>

                      <div>
                        <div className={styles.boxPot}>
                          <Input
                            required
                            placeholder="请输入分润比例"
                            onChange={this.fenRunCilck}
                          />
                        </div>
                      </div>
                      <span>单</span>
                      <div className={styles.boxP}>
                        <span>至</span>
                      </div>

                      <div className={styles.box}>
                        <div className={styles.boxP}>
                          <Input
                            required
                            placeholder="请输入分润比例"
                            onChange={this.fenRunCilck}
                          />
                        </div>
                      </div>
                      <span>单</span>
                    </div>
                       : null}
                </FormItem>
                <FormItem {...formItemLayout} label="全部平台">
                  {getFieldDecorator('isOnline', {
                    rules: [
                      {
                        required: true,

                        message: '必须选择平台名称',
                      },
                    ],
                    initialValue: doctor.isOnline,
                  })(
                    <Checkbox onChange={this.onChangePlatform}>
                        全部平台
                      </Checkbox>
                    )}
                </FormItem>
                <FormItem> */}
                  {/* <FormItem {...formItemLayout} label="可用城市">
                    {getFieldDecorator('city', {
                      rules: [
                        {
                          required: true,

                          message: '必须填写分润限制',
                        },
                      ],
                      initialValue: doctor.city,
                    })(
                      <Checkbox onChange={this.onChangeCity}>
                          全部城市
                        </Checkbox>
                      )}
                    {this.props.dataSource.map((item, index) => (
                      <Tag key={index} closable>
                        {item}
                      </Tag>
                      ))}
                    <Button onClick={this.handleCity}>添加指定城市</Button>
                  </FormItem>
                </FormItem> */}
                  <FormItem
                    style={{
                      marginLeft: '500px',
                      marginBottom: '40px',
                      alignContent: 'center',
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      onClick={this.handleOk}
                      style={{ marginLeft: '20px', marginBottom: '30px' }}
                    >
                      确定
                    </Button>
                  </FormItem>
                </Col>
                {/* </Row> */}
              </Form>
            ) : null}
          </Spin>
        </TabPane>
        <TabPane tab="医生用户" key="doctor">
          <Spin spinning={false}>
            {doctorSource.length !== 0 ? (
              <Form>
                <Col span={24}>
                  <FormItem
                    rules={[
                      {
                        required: true,

                        message: '必须填写分润限制',
                      },
                    ]}
                    {...formItemLayout}
                    label="认证状态"
                  >
                    {doctorSource.map((item, index) => {
                      return (
                        <Checkbox
                          key={item.ruleCode}
                          defaultChecked={item.enableState}
                          onChange={e => this.onChangeClick(e, index, item)}
                        >
                          {item.ruleName}
                          <div className={styles.box}>
                            <div className={styles.boxP}>
                              <div className={styles.box}>
                                <p> 一级成员消费:</p>
                                <div className={styles.boxP}>
                                  <Input
                                    key={item.ruleCode}
                                    defaultValue={item.percentageA}
                                    style={{ marginTop: '10px' }}
                                    placeholder="请输入分润比例%"
                                    onChange={e =>
                                      this.oneFNClick(
                                        e,
                                        index,
                                        item.ruleCode,
                                        item
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className={styles.box}>
                                <p>二级成员消费:</p>
                                <div className={styles.boxP}>
                                  <Input
                                    defaultValue={item.percentageB}
                                    style={{ marginTop: '10px' }}
                                    placeholder="请输入分润比例%"
                                    onChange={e =>
                                      this.twoFnClick(
                                        e,
                                        index,
                                        item.ruleCode,
                                        item
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Checkbox>
                      )
                    })}
                  </FormItem>
                  {/* <FormItem {...formItemLayout} label="使用范围">
                  {getFieldDecorator('sex', {
                    rules: [
                      {
                        required: true,

                        message: '必须填写性别',
                      },
                    ],
                    initialValue: doctor.sex,
                  })(
                    <Checkbox onChange={this.onChangeAll}>
                        全部普通用户
                      </Checkbox>
                    )}
                  {this.props.dataSource.map((item, index) => (
                    <Tag key={index} closable>
                      {item}
                    </Tag>
                    ))}
                  <Button onClick={this.handleCity}>添加指定用户</Button>
                </FormItem>
                <FormItem {...formItemLayout} label="分润限制">
                  {getFieldDecorator('limit', {
                    rules: [
                      {
                        required: true,

                        message: '必须填写分润限制',
                      },
                    ],
                    initialValue: doctor.limit,
                  })(
                    <RadioGroup onChange={this.onChangeLimit}>
                      <Radio value={'0'}>不限</Radio>
                      <Radio value={'3'}>自定义范围</Radio>
                    </RadioGroup>

                    )}
                  {this.state.doctor.FrChecked === '3' ?

                    <div className={styles.box}>

                      <span>第</span>

                      <div>
                        <div className={styles.boxPot}>
                          <Input
                            required
                            placeholder="请输入分润比例"
                            onChange={this.fenRunCilck}
                          />
                        </div>
                      </div>
                      <span>单</span>
                      <div className={styles.boxP}>
                        <span>至</span>
                      </div>

                      <div className={styles.box}>
                        <div className={styles.boxP}>
                          <Input
                            required
                            placeholder="请输入分润比例"
                            onChange={this.fenRunCilck}
                          />
                        </div>
                      </div>
                      <span>单</span>
                    </div>
                       : null}
                </FormItem>
                <FormItem {...formItemLayout} label="全部平台">
                  {getFieldDecorator('isOnline', {
                    rules: [
                      {
                        required: true,

                        message: '必须选择平台名称',
                      },
                    ],
                    initialValue: doctor.isOnline,
                  })(
                    <Checkbox onChange={this.onChangePlatform}>
                        全部平台
                      </Checkbox>
                    )}
                </FormItem>
                <FormItem> */}
                  {/* <FormItem {...formItemLayout} label="可用城市">
                    {getFieldDecorator('city', {
                      rules: [
                        {
                          required: true,

                          message: '必须填写分润限制',
                        },
                      ],
                      initialValue: doctor.city,
                    })(
                      <Checkbox onChange={this.onChangeCity}>
                          全部城市
                        </Checkbox>
                      )}
                    {this.props.dataSource.map((item, index) => (
                      <Tag key={index} closable>
                        {item}
                      </Tag>
                      ))}
                    <Button onClick={this.handleCity}>添加指定城市</Button>
                  </FormItem>
                </FormItem> */}
                  <FormItem
                    style={{
                      marginLeft: '500px',
                      marginBottom: '40px',
                      alignContent: 'center',
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      onClick={this.handleOk}
                      style={{ marginLeft: '20px', marginBottom: '30px' }}
                    >
                      确定
                    </Button>
                  </FormItem>
                </Col>
                {/* </Row> */}
              </Form>
            ) : null}
          </Spin>
        </TabPane>
        <TabPane tab="VIP" key="vip">
          <Spin spinning={false}>
            {vipSource.length !== 0 ? (
              <Form>
                {/* <Row> */}
                <Col span={24}>
                  <FormItem
                    rules={[
                      {
                        required: true,

                        message: '必须填写分润限制',
                      },
                    ]}
                    {...formItemLayout}
                    label="认证状态"
                  >
                    {vipSource.map((item, index) => {
                      return (
                        <Checkbox
                          key={item.ruleCode}
                          defaultChecked={item.enableState}
                          onChange={e => this.onChangeClick(e, index, item)}
                        >
                          {item.ruleName}
                          <div className={styles.box}>
                            <div className={styles.boxP}>
                              <div className={styles.box}>
                                <p> 一级成员消费:</p>
                                <div className={styles.boxP}>
                                  <Input
                                    key={item.ruleCode}
                                    defaultValue={item.percentageA}
                                    style={{ marginTop: '10px' }}
                                    placeholder="请输入分润比例%"
                                    onChange={e =>
                                      this.oneFNClick(
                                        e,
                                        index,
                                        item.ruleCode,
                                        item
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className={styles.box}>
                                <p>二级成员消费:</p>
                                <div className={styles.boxP}>
                                  <Input
                                    defaultValue={item.percentageB}
                                    style={{ marginTop: '10px' }}
                                    placeholder="请输入分润比例%"
                                    onChange={e =>
                                      this.twoFnClick(
                                        e,
                                        index,
                                        item.percentageB,
                                        item
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Checkbox>
                      )
                    })}
                  </FormItem>
                  <FormItem
                    style={{
                      marginLeft: '500px',
                      marginBottom: '40px',
                      alignContent: 'center',
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      onClick={this.handleOk}
                      style={{ marginLeft: '20px', marginBottom: '30px' }}
                    >
                      确定
                    </Button>
                  </FormItem>
                </Col>
                {/* </Row> */}
              </Form>
            ) : null}
          </Spin>
        </TabPane>
        <TabPane tab="9K代表" key="recruit-1">
          <Spin spinning={false}>
            {recruitDataOne.length !== 0 ? (
              <Form>
                {/* <Row> */}
                <Col span={24}>
                  <FormItem
                    rules={[
                      {
                        required: true,

                        message: '必须填写分润限制',
                      },
                    ]}
                    {...formItemLayout}
                    label="认证状态"
                  >
                    {recruitDataOne.map((item, index) => {
                      return (
                        <Checkbox
                          key={item.ruleCode}
                          defaultChecked={item.enableState}
                          onChange={e => this.onChangeClick(e, index, item)}
                        >
                          {item.ruleName}
                          <div className={styles.box}>
                            <div className={styles.boxP}>
                              <div className={styles.box}>
                                <p> 一级成员消费:</p>
                                <div className={styles.boxP}>
                                  <Input
                                    key={item.ruleCode}
                                    defaultValue={item.percentageA}
                                    style={{ marginTop: '10px' }}
                                    placeholder="请输入分润比例%"
                                    onChange={e =>
                                      this.oneFNClick(
                                        e,
                                        index,
                                        item.ruleCode,
                                        item
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className={styles.box}>
                                <p>二级成员消费:</p>
                                <div className={styles.boxP}>
                                  <Input
                                    defaultValue={item.percentageB}
                                    style={{ marginTop: '10px' }}
                                    placeholder="请输入分润比例%"
                                    onChange={e =>
                                      this.twoFnClick(
                                        e,
                                        index,
                                        item.percentageB,
                                        item
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Checkbox>
                      )
                    })}
                  </FormItem>
                  <FormItem
                    style={{
                      marginLeft: '500px',
                      marginBottom: '40px',
                      alignContent: 'center',
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      onClick={this.handleOk}
                      style={{ marginLeft: '20px', marginBottom: '30px' }}
                    >
                      确定
                    </Button>
                  </FormItem>
                </Col>
                {/* </Row> */}
              </Form>
            ) : null}
          </Spin>
        </TabPane>
        <TabPane tab="9k主管" key="recruit-2">
          <Spin spinning={false}>
            {recruitDataTwo.length !== 0 ? (
              <Form>
                {/* <Row> */}
                <Col span={24}>
                  <FormItem
                    rules={[
                      {
                        required: true,

                        message: '必须填写分润限制',
                      },
                    ]}
                    {...formItemLayout}
                    label="认证状态"
                  >
                    {recruitDataTwo.map((item, index) => {
                      return (
                        <Checkbox
                          key={item.ruleCode}
                          defaultChecked={item.enableState}
                          onChange={e => this.onChangeClick(e, index, item)}
                        >
                          {item.ruleName}
                          <div className={styles.box}>
                            <div className={styles.boxP}>
                              <div className={styles.box}>
                                <p> 一级成员消费:</p>
                                <div className={styles.boxP}>
                                  <Input
                                    key={item.ruleCode}
                                    defaultValue={item.percentageA}
                                    style={{ marginTop: '10px' }}
                                    placeholder="请输入分润比例%"
                                    onChange={e =>
                                      this.oneFNClick(
                                        e,
                                        index,
                                        item.ruleCode,
                                        item
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className={styles.box}>
                                <p>二级成员消费:</p>
                                <div className={styles.boxP}>
                                  <Input
                                    defaultValue={item.percentageB}
                                    style={{ marginTop: '10px' }}
                                    placeholder="请输入分润比例%"
                                    onChange={e =>
                                      this.twoFnClick(
                                        e,
                                        index,
                                        item.percentageB,
                                        item
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Checkbox>
                      )
                    })}
                  </FormItem>
                  <FormItem
                    style={{
                      marginLeft: '500px',
                      marginBottom: '40px',
                      alignContent: 'center',
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      onClick={this.handleOk}
                      style={{ marginLeft: '20px', marginBottom: '30px' }}
                    >
                      确定
                    </Button>
                  </FormItem>
                </Col>
                {/* </Row> */}
              </Form>
            ) : null}
          </Spin>
        </TabPane>
        <TabPane tab="9k经理" key="recruit-3">
          <Spin spinning={false}>
            {recruitDataTree.length !== 0 ? (
              <Form>
                {/* <Row> */}
                <Col span={24}>
                  <FormItem
                    rules={[
                      {
                        required: true,

                        message: '必须填写分润限制',
                      },
                    ]}
                    {...formItemLayout}
                    label="认证状态"
                  >
                    {recruitDataTree.map((item, index) => {
                      return (
                        <Checkbox
                          key={item.ruleCode}
                          defaultChecked={item.enableState}
                          onChange={e => this.onChangeClick(e, index, item)}
                        >
                          {item.ruleName}
                          <div className={styles.box}>
                            <div className={styles.boxP}>
                              <div className={styles.box}>
                                <p> 一级成员消费:</p>
                                <div className={styles.boxP}>
                                  <Input
                                    key={item.ruleCode}
                                    defaultValue={item.percentageA}
                                    style={{ marginTop: '10px' }}
                                    placeholder="请输入分润比例%"
                                    onChange={e =>
                                      this.oneFNClick(
                                        e,
                                        index,
                                        item.ruleCode,
                                        item
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className={styles.box}>
                                <p>二级成员消费:</p>
                                <div className={styles.boxP}>
                                  <Input
                                    defaultValue={item.percentageB}
                                    style={{ marginTop: '10px' }}
                                    placeholder="请输入分润比例%"
                                    onChange={e =>
                                      this.twoFnClick(
                                        e,
                                        index,
                                        item.percentageB,
                                        item
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Checkbox>
                      )
                    })}
                  </FormItem>
                  <FormItem
                    style={{
                      marginLeft: '500px',
                      marginBottom: '40px',
                      alignContent: 'center',
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      onClick={this.handleOk}
                      style={{ marginLeft: '20px', marginBottom: '30px' }}
                    >
                      确定
                    </Button>
                  </FormItem>
                </Col>
                {/* </Row> */}
              </Form>
            ) : null}
          </Spin>
        </TabPane>
        <TabPane tab="9k总监" key="recruit-4">
          <Spin spinning={false}>
            {recruitDataFour.length !== 0 ? (
              <Form>
                {/* <Row> */}
                <Col span={24}>
                  <FormItem
                    rules={[
                      {
                        required: true,

                        message: '必须填写分润限制',
                      },
                    ]}
                    {...formItemLayout}
                    label="认证状态"
                  >
                    {recruitDataFour.map((item, index) => {
                      return (
                        <Checkbox
                          key={item.ruleCode}
                          defaultChecked={item.enableState}
                          onChange={e => this.onChangeClick(e, index, item)}
                        >
                          {item.ruleName}
                          <div className={styles.box}>
                            <div className={styles.boxP}>
                              <div className={styles.box}>
                                <p> 一级成员消费:</p>
                                <div className={styles.boxP}>
                                  <Input
                                    key={item.ruleCode}
                                    defaultValue={item.percentageA}
                                    style={{ marginTop: '10px' }}
                                    placeholder="请输入分润比例%"
                                    onChange={e =>
                                      this.oneFNClick(
                                        e,
                                        index,
                                        item.ruleCode,
                                        item
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className={styles.box}>
                                <p>二级成员消费:</p>
                                <div className={styles.boxP}>
                                  <Input
                                    defaultValue={item.percentageB}
                                    style={{ marginTop: '10px' }}
                                    placeholder="请输入分润比例%"
                                    onChange={e =>
                                      this.twoFnClick(
                                        e,
                                        index,
                                        item.percentageB,
                                        item
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Checkbox>
                      )
                    })}
                  </FormItem>
                  <FormItem
                    style={{
                      marginLeft: '500px',
                      marginBottom: '40px',
                      alignContent: 'center',
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      onClick={this.handleOk}
                      style={{ marginLeft: '20px', marginBottom: '30px' }}
                    >
                      确定
                    </Button>
                  </FormItem>
                </Col>
                {/* </Row> */}
              </Form>
            ) : null}
          </Spin>
        </TabPane>
      </Tabs>
    )
  }
}
const mapStateToProps = () => {
  return {
    videoUserList,
  }
}
const videoUserList = Form.create()(videoUserListOne)

export default connect(mapStateToProps)(videoUserList)
