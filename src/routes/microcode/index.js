import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import {
  Table,
  Badge,
  DatePicker,
  Select,
  Input,
  Button,
  Form,
  Modal,
  Row,
  Col,
  Card,
} from 'antd'

import moment from 'moment'
import { getWithdrawBillsStatus } from '../../utils/helper'
// import { getWithdrawBillStatus } from '../../utils/helper'
import { labelStyleList, blockStyle } from '../../themes/index.less'
// import microGenerationModal from '../../components/microcode/microGenerationModal'
// import  microGenerationAction from '../../components/'
// import microGenerationList from '../../components/microcode/microcodeList'

function Microcode ({ microcode, dispatch }) {
  const { modalVisible, list, currentItem, loading } = microcode
  // 列表标题
  const columns = [
    {
      title: '提现单号',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        const id = record.id || '未填写'
        return id
      },
    },
    {
      title: '收款人姓名',
      dataIndex: 'receiptor',
      key: 'receiptor',
      className: 'column-center',
      render: (text, record) => {
        const receiptor = record.receiptor || '未填写'
        return receiptor
      },
    },
    {
      title: '收款人联系电话',
      dataIndex: 'phone',
      key: 'phone',
      className: 'column-right',
      render: (text, record) => {
        const phone = record.phone || '未填写'
        return phone
      },
    },
    {
      title: '提现金额',
      dataIndex: 'amount',
      key: 'amount',
      className: 'column-right',
      render: (text, record) => {
        const amount = record.amount || '未填写'
        return amount
      },
    },
    {
      title: '提现状态',
      dataIndex: 'withdrawStatusName',
      key: 'withdrawStatusName',
      className: 'column-center',
      render: (text, record) => {
        const billsStatus = getWithdrawBillsStatus(record.withdrawStatusName)
        return <Badge status={billsStatus.status} text={billsStatus.text} />
      },
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
      className: 'column-center',
      render: (text, record) => {
        return record.createTime
      },
    },
    {
      title: '收款账户（银行卡号）',
      dataIndex: 'receiptsAccount',
      key: 'receiptsAccount',
      className: 'column-center',
      render: (text, record) => {
        const receiptsAccount = record.receiptsAccount || '未填写'
        return receiptsAccount
      },
    },
    {
      title: '提现方式',
      dataIndex: 'receiptsAccountType',
      key: 'receiptsAccountType',
      width: 200,
      className: 'column-center',
      render: (text, record) => {
        const receiptsAccountType = record.receiptsAccountType || '未填写'
        return receiptsAccountType
      },
    },
    {
      title: '操作',
      key: 'operation',
      className: 'column-center',
      width: 100,
      render: (text, record) => {
        const { id } = record
        return (
          <span className={'table-operation'}>
            <a onClick={() => onEdit(id)}>查看</a>
            &nbsp;&nbsp;
            {/* <a onClick={() => onWithdraw(code)}>处理</a>
            &nbsp;&nbsp; */}
          </span>
        )
      },
    },
  ]
  const { RangePicker } = DatePicker
  const { Option } = Select
  const { TextArea } = Input

  // 点击时间
  let startTime = null
  let endTime = null
  let withdrawStatus = ''
  let remark = ''
  let phone = ''
  function onChange (dates) {
    startTime = dates[0]._d.valueOf()
    endTime = dates[1]._d.valueOf()
  }
  // 点击选择器

  function handleChange (value) {
    withdrawStatus = value
  }
  // 点击查看显示弹框
  function onEdit (id) {
    dispatch({
      type: 'microcode/showModal',
      payload: {
        modalVisible,
      },
    })
    dispatch({
      type: 'microcode/code',
      payload: {
        id,
      },
    })
  }
  // 确认
  function onOk () {
    dispatch({
      type: 'microcode/finish',
      payload: {
        remark: remark,
        withdrawId: currentItem.id,
      },
    })
    // history.go(0)
  }
  // 取消
  function onCancel () {
    dispatch({
      type: 'microcode/hideModal',
      payload: {
        modalVisible,
      },
    })
  }
  // 弹框的复选框
  function SelectFunction (value) {
    console.log(value)
  }

  function onTextArea (e) {
    if (currentItem.remark !== e.target.value) {
      remark = e.target.value
    }
  }

  function handlePhone (e) {
    phone = e.target.value
  }
  // 点击查询按钮e
  function handleSubmit () {
    dispatch({
      type: 'microcode/query',
      payload: {
        pageSize: 1000000,
        page: 1,
        phone: phone,
        startTime: startTime,
        endTime: endTime,
        withdrawStatus: withdrawStatus,
      },
    })
  }
  return (
    <div className="content-inner">
      <Form layout="inline" style={{ marginLeft: 8, marginBottom: 8 }}>
        <Form.Item label="手机号查询">
          <Input
            placeholder="请输入手机号"
            style={{ width: 200, marginRight: 10 }}
            onChange={value => handlePhone(value)}
          />
        </Form.Item>
        <Form.Item label="提现状态">
          <Select
            placeholder="请选择提现状态"
            style={{ width: 120, marginLeft: 10 }}
            onChange={handleChange}
          >
            <Option value="">全部状态</Option>
            <Option value="PROCESSING">处理中</Option>
            <Option value="SUCCESS">提现成功</Option>
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
      {/* <microGenerationList /> */}
      <Table
        columns={columns}
        // rowSelection={rowSelection}
        dataSource={list}
        loading={loading}
        key={record => record.code}
        rowKey={record => record.code}
      />
      {/* 弹框 */}
      {/* {modalVisible && <microGenerationModal {...withdrawBillsModalProps} />} */}
      <Modal
        title="查看微代详情"
        visible={modalVisible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form layout="inline">
          <Row>
            <Col span={28}>
              <Card
                bordered={false}
                style={{ width: 400, marginLeft: 10, color: '#000' }}
                noHovering
              >
                <div className={blockStyle}>
                  <div className={labelStyleList}>提现单号：</div>
                  <span>{currentItem.id}</span>
                </div>
                <div className={blockStyle}>
                  <div className={labelStyleList}>收款人姓名：</div>
                  <span>{currentItem.receiptor}</span>
                </div>
                <div className={blockStyle}>
                  <div className={labelStyleList}>收款人联系电话：</div>
                  <span>{currentItem.phone}</span>
                </div>
                <div className={blockStyle}>
                  <div className={labelStyleList}>收款人身份证：</div>
                  <span>{currentItem.idCard}</span>
                </div>
                <div className={blockStyle}>
                  <div className={labelStyleList}>提现状态：</div>
                  <span>{currentItem.withdrawStatusName}</span>
                </div>
                <div className={blockStyle}>
                  <div className={labelStyleList}>汇款方式：</div>
                  <span>{currentItem.remittanceMethodName}</span>
                </div>
                <div className={blockStyle}>
                  <div className={labelStyleList}>提现金额：</div>
                  <span>{currentItem.amount}</span>
                </div>
                <div className={blockStyle}>
                  <div className={labelStyleList}>提现手续费：</div>
                  <span>{currentItem.serviceFee}</span>
                </div>
                <div className={blockStyle}>
                  <div className={labelStyleList}>优惠服务费：</div>
                  <span>{currentItem.discountServiceFee}</span>
                </div>
                <div className={blockStyle}>
                  <div className={labelStyleList}>实收服务费 ：</div>
                  <span>{currentItem.actualServiceFee}</span>
                </div>
                <div className={blockStyle}>
                  <div className={labelStyleList}>实际收款金额 ：</div>
                  <span>{currentItem.actualReceiptsAmount}</span>
                </div>
                <div className={blockStyle}>
                  <div className={labelStyleList}>收款帐号类型 : </div>
                  <span>{currentItem.receiptsAccountType}</span>
                </div>
                <div className={blockStyle}>
                  <div className={labelStyleList}>收款账户（银行卡号）：</div>
                  <span>{currentItem.receiptsAccount}</span>
                </div>
              </Card>
            </Col>
            <Col>
              <Form.Item
                label="提现结果"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
              >
                <Select
                  defaultValue={currentItem.withdrawStatus}
                  style={{ width: 360, marginBottom: 10 }}
                  onChange={SelectFunction}
                >
                  <Option value="PROCESSING">处理中</Option>
                  <Option value="SUCCESS">提交成功</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="备注说明"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
              >
                <TextArea
                  defaultValue={currentItem.remark}
                  style={{ width: 380, marginTop: 10 }}
                  rows={3}
                  placeholder="填写备注信息"
                  onChange={value => onTextArea(value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}
Microcode.PropTypes = {
  microcode: PropTypes.object,
  // auth: PropTypes.object,
  loading: PropTypes.object,
  // location: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ microcode, loading }) {
  return { microcode, loading }
}
export default connect(mapStateToProps)(Microcode)
