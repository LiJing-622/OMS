import React from 'react'
import { Form, Row, Col, Button } from 'antd'
// import { Link } from 'dva/router'
// import styles from './VideoOrders.less'
// const { TextArea } = Input
// 推荐在入口文件全局设置 locale
// import PicturesWall from './VideoOrdersPic'
// import { getVideoOrdersStatus } from '../../utils/helper'

// const Option = Select.Option
const FormItem = Form.Item
// import { getOpenStatus, isOpenStatus, format } from '../../utils/helper.js'

const logoutAdminModal = ({
  item = {},
  changeType,
}) => {
  const videoOrders = item
  console.log('tag', videoOrders)
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 13 },
    // labelAlign: 'right',
  }
  // const formItemLayout2 = {
  //   labelCol: { span: 3 },
  //   wrapperCol: { span: 13 },
  // }
  return (
    <Form>
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
              <span>{!videoOrders ? '' : videoOrders.memberCode}</span>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label="账号姓名">
            <div>
              <span>{!videoOrders ? '' : videoOrders.name}</span>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label="手机号">
            <div>
              <span>{!videoOrders ? '' : videoOrders.phone}</span>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label="申请时间">
            <div>
              <span>{!videoOrders ? '' : videoOrders.auditTime}</span>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label="注销原因">
            <div>
              <span>{!videoOrders ? '' : videoOrders.logoutReason}</span>
            </div>
          </FormItem>
        </Row>
      </fieldset>
      <fieldset style={{ border: 0 }}>
        <legend>审核信息</legend>
        <Row>
          <FormItem {...formItemLayout} label="审核人">
            <div>
              <span>{!videoOrders ? '' : videoOrders.auditUser}</span>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label="审核时间">
            <div>
              <span>{!videoOrders ? '' : videoOrders.startTime}</span>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label="审核状态">
            <div>
              <span>{videoOrders.auditStatus === 2 ? '审核通过' : '审核未通过'}</span>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label="备注">
            <div>
              <span>{!videoOrders ? '' : videoOrders.remark}</span>
            </div>
          </FormItem>
        </Row>
      </fieldset>
    </Form>
  )
}

export default Form.create()(logoutAdminModal)
