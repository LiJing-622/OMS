import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

const codeQRAction = ({
  handleSizeChange,
}) => {
  return (<div><Button size="large" onClick={handleSizeChange} type="primary">新增模板</Button></div>)
}
codeQRAction.propTypes = {
  // loading: PropTypes.bool,
  handleSizeChange: PropTypes.func,
}
export default codeQRAction
