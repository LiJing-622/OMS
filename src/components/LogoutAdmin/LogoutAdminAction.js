import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Button } from 'antd'

// const Option = Select.Option

const LogoutAdminAction = ({
  // keyword,
  handleSubmit,
  handleName,
  // clickMenu,
  handlePhone,
}) => {
  return (
    <div>
      <Row type="flex" justify="space-between" style={{ marginBottom: '10px' }}>
        <Col span={1} style={{ textAlign: '' }} />
        <Col
          span={23}
          style={{ textAlign: 'right', display: 'inline', marginBottom: '5px' }}
        >
          {/* <Select
            value={'00'}
            defaultValue={'00'}
            style={{ width: 100, marginRight: 15 }}
            onChange={clickMenu}
          >
            <Option key={'00'} value={'00'}>
              全部类型
            </Option>
            <Option key={'01'} value={'01'}>
              审核未通过
            </Option>
            <Option key={'02'} value={'02'}>
              审核通过
            </Option>
            <Option key={'03'} value={'03'}>
              取消审核
            </Option>
          </Select> */}

          <Input
            placeholder="请输入手机号查询"
            style={{ width: 200, marginRight: 10 }}
            onChange={value => handlePhone(value)}
          />
          <Input
            placeholder="请输入姓名查询"
            style={{ width: 200, marginRight: 10 }}
            onChange={value => handleName(value)}
          />
          <Button
            type="primary"
            style={{ width: 80, marginLeft: 30 }}
            onClick={handleSubmit}
          >
            查询
          </Button>
        </Col>
      </Row>
    </div>
  )
}
LogoutAdminAction.propTypes = {
  // keyword: PropTypes.string,
  handleSubmit: PropTypes.func,
}

export default LogoutAdminAction
