import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

const codeQRModal = ({
  getBack,
}) => {
  return (<div><Button size="large" onClick={getBack} >返回</Button></div>)
}
codeQRModal.propTypes = {
  getBack: PropTypes.func,
}
export default codeQRModal
