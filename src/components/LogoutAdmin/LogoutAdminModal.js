import React from 'react'
import { Form, Row, Col, Button, Select, Input, Radio } from 'antd'
// import { Link } from 'dva/router'
// import styles from './VideoOrders.less'
const { TextArea } = Input
// 推荐在入口文件全局设置 locale
// import PicturesWall from './VideoOrdersPic'
// import { getVideoOrdersStatus } from '../../utils/helper'

const Option = Select.Option
const FormItem = Form.Item
// import { getOpenStatus, isOpenStatus, format } from '../../utils/helper.js'

const logoutAdminModal = ({
  id,
  list = [],
  item = {},
  changeType,
  clickMenu,
  onTextArea,
  clickMenuRadio,
  onFinish,
  handleSubmit, // 提交
  form: {
    getFieldDecorator,
    validateMessages,
  },
}) => {
  console.log(id, 'a')
  console.log(list, 'a')
  const videoOrders = item
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 13 },
  }

  return (
    <Form
      {...formItemLayout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Row>
        <Col span={24}>
          <Button
            type="default"
            size="large"
            style={{ marginLeft: '30px', marginBottom: '30px' }}
            onClick={changeType}
          >
            返回
          </Button>
        </Col>
      </Row>
      <fieldset style={{ border: 0 }}>
        <legend>提交信息</legend>
        <Row>
          <FormItem {...formItemLayout} label="用户ID">
            <div>
              <span>
                {videoOrders.memberCode == null ? '无' : videoOrders.memberCode}
              </span>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label="账号姓名">
            <div>
              <span>{videoOrders.name == null ? '无' : videoOrders.name}</span>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label="手机号">
            <div>
              <span>
                {videoOrders.phone == null ? '无' : videoOrders.phone}
              </span>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label="申请时间">
            <div>
              <span>
                {videoOrders.auditTime === null ? '无' : videoOrders.auditTime}
              </span>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label="注销原因">
            <div>
              <span>
                {videoOrders.logoutReason == null
                  ? '无'
                  : videoOrders.logoutReason}
              </span>
            </div>
          </FormItem>
        </Row>
      </fieldset>
      <fieldset style={{ border: 0 }}>
        <legend>审核信息</legend>
        <Row>
          <FormItem {...formItemLayout} label="审核状态">
            {getFieldDecorator('auditStatus', {
              initialValue:
                videoOrders.auditStatus === 1 || 3 ? '审核未通过' : '审核通过',
            })(
              <Select
                placeholder="请选择审核状态!"
                style={{ width: 100, marginRight: 15 }}
                onChange={clickMenu}
              >
                <Option key={3} value={'审核未通过'}>
                  审核未通过
                </Option>
                <Option key={2} value={'审核通过'}>
                  审核通过
                </Option>
              </Select>
            )}
          </FormItem>
          {videoOrders.auditStatus === 3 || videoOrders.auditStatus === 1 ? (
            <FormItem
              {...formItemLayout}
              label="失败原因"
              rules={[{ required: true }]}
            >
              {getFieldDecorator('failureCause', {
                initialValue: videoOrders.failureCause,
              })(
                <Radio.Group onChange={clickMenuRadio}>
                  <Radio
                    value={
                      '你的账号存在安全风险,若有疑问请联系客服：400-150-0112'
                    }
                  >
                    账号安全问题
                  </Radio>
                  <Radio
                    value={
                      '你的账号当前有未结算的财产,清空财产后点击“重新申请”,若有疑问请联系客服：400-150-0112'
                    }
                  >
                    账号财务问题
                  </Radio>
                </Radio.Group>
              )}
            </FormItem>
          ) : null}

          <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('remark', { initialValue: videoOrders.remark })(
              <TextArea
                style={{ width: 380, marginTop: 10 }}
                rows={3}
                placeholder="请输入您的备注内容"
                onChange={value => onTextArea(value)}
              />
            )}
          </FormItem>
          <Button
            type="primary"
            style={{ width: 80, marginLeft: 500, align: 'center' }}
            onClick={handleSubmit}
          >
            提交
          </Button>
        </Row>
      </fieldset>
    </Form>
  )
}

export default Form.create()(logoutAdminModal)
