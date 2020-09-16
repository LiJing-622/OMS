import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Form, Row, Col, Button, Select, Input, message } from 'antd'

const FormItem = Form.Item
const { Option } = Select
const { TextArea } = Input
// const { message } = Message
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
      realName: '',
      withdrawId: '',
      withdrawStatus: 'PROCESSING',
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
  // 点击时间
  onChangeFN = (dates, dateStrings) => {
    this.setState({
      createTimeBegin: dateStrings[0],
      createTimeEnd: dateStrings[1],
    })
  };
  onTextArea (value) {
    this.setState({
      a: value,
    })
  }
  clickMenu = value => {
    this.setState({
      withdrawStatus: Number(value),
    })
  };
  pathnameFN=() => {
    let rang = document.createRange()
    window.getSelection().removeAllRanges()
    const p1 = document.getElementById('p1')
    rang.selectNode(p1)
    window.getSelection().addRange(rang)
    const succ = document.execCommand('copy')
    if (succ) {
      message.success('复制成功！')
    }
  }
  // 点击查询
  handleSubmit = () => {
    const { dispatch } = this.props
    const { validateFields, getFieldsValue } = this.props.form
    const detailsItem = this.props.detailsItem
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      if (this.state.withdrawStatus === 'PROCESSING') {
        message.error('处理中不可提交')
      } else {
        dispatch({
          type: 'cashManagemen/remitConfirmQuery',
          payload: {
            remark: data.remark,
            remitStatus: this.state.withdrawStatus,
            withdrawId: detailsItem.withdrawId,
          },
        })
      }
    })
  };
  render () {
    const detailsItem = this.props.detailsItem
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 13 },
    }
    return (
      <Form>
        <Row>
          <Col span={24}>
            <Button
              type="default"
              size="large"
              style={{ marginLeft: '30px', marginBottom: '30px' }}
            >
              <Link to={{ pathname: '/cashManagement' }}>返回</Link>
            </Button>
          </Col>
        </Row>
        <fieldset style={{ border: 0 }}>
          <legend>提交信息</legend>
          <Row>
            <FormItem {...formItemLayout} label="申请时间">
              <div>
                <span>{!detailsItem ? '' : detailsItem.createTime}</span>
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="提现单号">
              <div>
                <span>{!detailsItem ? '' : detailsItem.withdrawId}</span>
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="申请人">
              <div>
                <span>{!detailsItem ? '' : detailsItem.realName}</span>
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="提现银行">
              <div>
                <span>{!detailsItem ? '' : detailsItem.bankName}</span>
              </div>
              <div>
                <span id="p1">{!detailsItem ? '' : detailsItem.bankCardNo} </span>
                <span
                  onClick={this.pathnameFN}
                  style={{ color: 'blue', marginLeft: '30px' }}
                >
                  复制卡号
                </span>
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="提现金额">
              <div>
                <span>￥{!detailsItem ? '' : detailsItem.txAmt}</span>
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="服务费">
              <div>
                <span>￥{!detailsItem ? '' : detailsItem.chargeAmt}</span>
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="税费">
              <div>
                <span>￥{!detailsItem ? '' : detailsItem.taxAmt}</span>
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="打款金额">
              <div>
                <span>￥{!detailsItem ? '' : detailsItem.arrivalAmt}</span>
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="提现状态">
              { detailsItem.withdrawStatus === 'PROCESSING' ? <Select
                placeholder="请选择审核状态!"
                style={{ width: 100, marginRight: 15 }}
                onChange={this.clickMenu}
                defaultValue={detailsItem.withdrawStatus}
              >
                <Option key={'PROCESSING'} value={'PROCESSING'}>
                处理中
                </Option>
                <Option key={'FAILURE'} value={'0'}>
                提现失败
                </Option>
                <Option key={'SUCCESS'} value={'1'}>
                提现成功
                </Option>
              </Select> : <div>
                <span>￥{!detailsItem ? '' : detailsItem.withdrawStatus === 'FAILURE' ? ' 提现失败' : '提现成功'}</span>
              </div>}
            </FormItem>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('remark', {
                rules: [{
                  required: true,
                  type: 'string',
                  message: '不能为空',
                }],
                initialValue: detailsItem.remark,
              })(
                <TextArea
                  style={{ width: 380, marginTop: 10 }}
                  rows={3}
                  placeholder="请输入您的备注内容"
                  onChange={value => this.onTextArea(value)}
                />
              )}
            </FormItem>
            {detailsItem.withdrawStatus === 'PROCESSING' ? <Button
              type="primary"
              style={{ width: 80, marginLeft: 500, align: 'center' }}
              onClick={this.handleSubmit}
            >
              提交
            </Button> : null}

          </Row>
        </fieldset>
      </Form>
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
