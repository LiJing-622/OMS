import React from 'react'
// import PropTypes from 'prop-types'
// import { Link } from 'dva/router'
import { Modal, Button, Select } from 'antd'
import { connect } from 'dva'
import styles from './videoUser.less'

const { Option } = Select
// const { Search } = Input


class videoUserListModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dateList: [],
    }
  }

// 取消按钮
  handleCancel = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'videoUser/hideModal',
      payload: {
        modalVisible: false,
      },
    })
  };
  // 确认按钮
  showOnOkModal=() => {
    const { dispatch } = this.props
    dispatch({
      type: 'videoUser/hideModal',
      payload: {
        modalVisible: false,
      },
    })
  };
  addClick=() => {
    const { dispatch } = this.props
    dispatch({
      type: 'videoUser/hideModal',
      payload: {
        modalVisible: false,
      },
    })
    dispatch({
      type: 'videoUser/dataSource',
      payload: {
        dataSource: this.state.dateList,
      },
    })
  }
 // 添加城市
  checkboxClick=(value) => {
    console.log(value, '礼金')
  }
  handleChange=(value) => {
    this.state.dateList = value
  }

  render () {
    const { modalVisible } = this.props
    const children = []
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
    }
    return (
      <div>
        <Modal
          title="添加指定城市"
          visible={modalVisible}
          // onOk={this.showOnOkModal}
          onCancel={this.handleCancel}
        >
          <div className={styles.box}>
            {/* <Search
      placeholder="搜索城市"
      size="large"
      onSearch={value => console.log(value)}
    /> */}
            <Button className={styles.boxP} type="primary" onClick={this.addClick}>添加</Button>

          </div>
          <div className={styles.boxTop}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              defaultValue={[]}
              onChange={this.handleChange}
            >
              {children}
            </Select>,

    </div>
        </Modal></div>
    )
  }
}
const mapStateToProps = () => {
  return {
    videoUserListModal,
  }
}

export default connect(mapStateToProps)(videoUserListModal)
// export default Form.create()(videoUserListModal)
