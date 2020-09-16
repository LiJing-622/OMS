import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Button, Input, RangePicker } from 'antd'
import moment from 'moment'

const microcodeAction = ({
  handleSubmit,
  onChange,
  handleChange,
}) => {
  return (
    <div>
      <Form layout="inline" style={{ marginLeft: 8, marginBottom: 8 }}>
        <Form.Item label="手机号查询">
          <Input
            placeholder="请输入手机号"
            style={{ width: 200, marginRight: 10 }}
          />
        </Form.Item>
        <Form.Item label="提现状态">
          <Select
            defaultValue=""
            style={{ width: 120, marginLeft: 10 }}
            onChange={handleChange}
          >
            <Option value="SUCCESS">提现成功</Option>
            <Option value="PROCESSING">处理中</Option>
          </Select>
        </Form.Item>
        <Form.Item label="时间范围">
          <RangePicker
            style={{ marginLeft: 10 }}
            ranges={{
              Today: [moment(), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            style={{ width: 80, marginLeft: 30 }}
            onClick={handleSubmit}
          >
            查询
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
microcodeAction.propTypes = {
  handleSubmit: PropTypes.func,
  onChange: PropTypes.func,
  handleChange: PropTypes.func,
}
export default microcodeAction
