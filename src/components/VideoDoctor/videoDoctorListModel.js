import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Link } from 'dva/router'
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Radio,
  Spin,
  Checkbox,
} from 'antd'
// import { doctorBlockStyle } from '../../themes/index.less'
import styles from './videoDoctor.less'

// const { TabPane } = Tabs
const FormItem = Form.Item
const RadioGroup = Radio.Group
class videoUserListModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dateList: [],
    }
  }
  handleCity = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'videoDoctor/showModal',
      payload: {
        modalVisible: true,
      },
    })
  }
  handleOk = () => {

  }
  render () {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    }
    console.log(this.props, 'this.props')
    const { doctor } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.boxTop}>
        <Spin spinning={false}>
          <Form>
            <Row>
              <Col span={24}>
                <FormItem {...formItemLayout} label="认证状态">
                  {getFieldDecorator('isOnline', {
                    rules: [
                      {
                        required: true,

                        message: '必须选择平台名称',
                      },
                    ],
                    initialValue: doctor.isOnline,
                  })(
                    <div className={styles.box}>
                      <div className={styles.boxP}>
                        <div className={styles.box}>
                          <p>一级成员消费 :</p>
                          <div className={styles.boxP}>
                            <Input
                              required placeholder="请输入分润比例"
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                    )}
                  <div className={styles.box}>
                    <div className={styles.boxP}>
                      <div className={styles.box}>
                        <p>二级成员消费 :</p>
                        <div className={styles.boxP}>
                          <Input
                            required placeholder="请输入分润比例"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
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
                    <Checkbox>
                        全部平台
                        </Checkbox>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="使用范围">
                  {getFieldDecorator('sex', {
                    rules: [
                      {
                        required: true,

                        message: '必须填写使用范围',
                      },
                    ],
                    initialValue: doctor.sex,
                  })(
                    <RadioGroup>
                      <Radio value={'0'}>全部普通用户</Radio>
                    </RadioGroup>
                    )}
                  <Button onClick={this.handleCity}>添加指定用户</Button>
                </FormItem>

                <div
                  style={{
                    marginLeft: '500px',
                    marginBottom: '40px',
                    alignContent: 'center',
                  }}
                >
                  <Link to="/doctors">
                    <Button type="default" size="large">
                        返回
                      </Button>
                  </Link>
                  <Button
                    type="primary"
                    size="large"
                    style={{ marginLeft: '20px', marginBottom: '30px' }}
                    onClick={this.handleOk}
                  >
                      确定
                    </Button>
                </div>

              </Col>
            </Row>
          </Form>
        </Spin>
      </div>
    )
  }

}
const mapStateToProps = () => {
  return {
    videoDoctorListModel,
  }
}
const videoDoctorListModel = Form.create()(videoUserListModal)
export default connect(mapStateToProps)(videoDoctorListModel)

