import React from 'react'
import CodeTemplate from '../codeTemplate/codeTemplate.js'
// eslint-disable-next-line import/first
import PropTypes from 'prop-types'
import { env } from '../../utils/config'
import {
  Tabs,
  Form,
  Input,
  Row,
  Col,
  Spin,
  Select,
  Button,
// eslint-disable-next-line import/first
} from 'antd'
import styles from './codeQR.less'
import { doctorBlockStyle } from '../../themes/index.less'

const { TabPane } = Tabs

const FormItem = Form.Item
const { Option } = Select
const codeQREditList = ({
  // list,
  item,
  infoStyle,
  callback,
  onOk,
  deleteTemplate,
  uploadIconSuccess,
  uploadToken,
  updateIcon,
  onGenderChange,
  form: { getFieldDecorator, validateFields, getFieldsValue },
}) => {
  const codeTemplate = item
  function submitSave (id) {
    validateFields(errors => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      if (id === undefined) {
        onOk(data)
      } else {
        onOk(data, id)
      }
    })
  }
  function submitDelete (id) {
    validateFields(errors => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue() }
      deleteTemplate(data, id)
    })
  }
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 8 },
  }
  const sip = {
    margin: 'auto',
    marginTop: '20%',
    marginBottom: '10%',
  }
  const fileStyle = {
    width: 187.5,
    height: 332.5,
    position: 'absolute',
    left: '0',
    top: '0',
    bottom: '0',
    right: '0',
    margin: 'auto',
  }
  const imageStyle = {
    margin: 0,
    padding: 0,
    height: 332.5,
    display: 'block',
    width: '100%',
    position: 'relative',
  }
  const imagePickerStyle = {
    position: 'relative',
    width: 187.5,
    height: 332.5,
    border: '1px solid #A7ADBD',
    margin: 'auto',
    marginTop: '5%',
    marginBottom: '5%',
    borderRadius: '10px',
    borderStyle: 'dashed',
  }
  return (
    <div style={{ marginTop: '20px' }}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="新增模块" key="1">
          <Spin spinning={false}>
            <Form name="nest-messages">
              <Row>
                <Col span={24}>
                  <div className={doctorBlockStyle}>
                    <FormItem {...formItemLayout} label="模板名称">
                      {getFieldDecorator('styleName', {
                        rules: [
                          {
                            required: true,

                            message: '必须填写模板名称',
                          },
                        ],
                        initialValue: codeTemplate.styleName,
                      })(
                        <Input
                          placeholder="模板名称,不超过10个字"
                        />
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="上传图片">
                      {getFieldDecorator('imageUrl', {
                        rules: [
                          {
                            required: true,
                            message: '必须上传图片',
                          },
                        ],
                        initialValue: codeTemplate.imageUrl,
                      })(
                        <CodeTemplate
                          Rotate={updateIcon}
                          infoStyle={infoStyle}
                          imgSrc={codeTemplate.imageUrl}
                          keyPrefix={`icon/${env}`}
                          uploadToken={uploadToken}
                          style={imagePickerStyle}
                          imageStyle={imageStyle}
                          fileStyle={fileStyle}
                          sip={sip} maxSize="5M"
                          onComplete={uploadIconSuccess}
                        />
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} rules={[{ required: true }]} label="二维码位置宽度">
                      {getFieldDecorator('pointX', {
                        rules: [
                          {
                            required: true,

                            message: '必须填写二维码位置宽度',
                          },
                        ],
                        initialValue: codeTemplate.pointX,
                      })(
                        <Input
                          placeholder="x坐标（pt）"
                        />
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} rules={[{ required: true }]} label="二维码位置高度">
                      {getFieldDecorator('pointY', {
                        rules: [
                          {
                            required: true,

                            message: '必须填写二维码位置高度',
                          },
                        ],
                        initialValue: codeTemplate.pointY,
                      })(

                        <Input placeholder="y坐标（pt）" />

                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} rules={[{ required: true }]}label="二维码大小宽度">
                      {getFieldDecorator('imageW', {
                        rules: [
                          {
                            required: true,

                            message: '必须填写二维码大小宽度',
                          },
                        ],
                        initialValue: codeTemplate.imageW,
                      })(

                        <Input placeholder="h宽（pt）" />

                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} rules={[{ required: true }]} label="二维码大小高度">
                      {getFieldDecorator('imageH', {
                        rules: [
                          {
                            required: true,

                            message: '必须填写二维码大小高度',
                          },
                        ],
                        initialValue: codeTemplate.imageH,
                      })(

                        <Input
                          style={{ marginRight: '20px' }}
                          placeholder="w高（pt）"
                        />

                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="模板状态">
                      {getFieldDecorator('useState', {
                        rules: [
                          {
                            required: true,

                            message: '必须填写模板状态',
                          },
                        ],
                        // initialValue: codeTemplate.useState,
                      })(
                        <Select
                          placeholder="--请选择--"
                          onChange={onGenderChange}
                        >
                          <Option key={'0'} value={false}>
                            未启用
                          </Option>
                          <Option key={'1'} value>
                            启用中
                          </Option>
                        </Select>
                      )}
                    </FormItem>
                    <div className={styles.BoxTwo}>
                      <div><Button size="large" onClick={() => submitDelete(codeTemplate.id, codeTemplate)} style={{ marginLeft: '450px' }} type="primary">删除</Button> </div>
                      <div><Button size="large" onClick={() => submitSave(codeTemplate.id)} style={{ marginLeft: '200px' }} type="primary">保存</Button></div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          </Spin>
        </TabPane>
      </Tabs>
    </div>
  )
}
codeQREditList.propTypes = {
  deleteTemplate: PropTypes.func,
  callback: PropTypes.func,
  onOk: PropTypes.func,
  onGenderChange: PropTypes.func,
}
export default Form.create()(codeQREditList)
