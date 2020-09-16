import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { message } from 'antd'
import LogoutAdminModal from '../../../components/LogoutAdmin/LogoutAdminModal'

function LogoutAdmin ({ logoutAdmin, loading, dispatch }) {
  console.log(logoutAdmin)
  const {
    list,
    currentItem,
    currentList,
    dataSource,
    failureCause,
    modalType,
  } = logoutAdmin
  const logoutAdminModalProps = {
    item: currentItem,
    list: list,
    type: modalType,
    maskClosable: false,
    confirmLoading: loading.effects['logoutAdmin/queryDoctor'],
    wrapClassName: 'vertical-center-modal',
    dataSource,
    onOk (data) {
      dispatch({
        type: `logoutAdmin/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'logoutAdmin/hideModal',
      })
    },
    // 备注输入框的值
    onTextArea (e) {
      dispatch({
        type: 'logoutAdmin/changeType',
        payload: {
          currentItem: { ...currentItem, remark: e.target.value },
        },
      })
    },
    // 点击通过未通过
    clickMenu (val) {
      if (val === '审核通过') {
        val = 2
      } else {
        val = 3
      }
      dispatch({
        type: 'logoutAdmin/changeType',
        payload: {
          modalType: 'update',
          currentItem: { ...currentItem, auditStatus: val },
        },
      })
      // dispatch({
      //   type: 'updateQueryKey',
      //   payload: {
      //     id: id,
      //     auditStatus: auditStatus,
      //     remark: remark,
      //   },
      // })
    },
    clickMenuRadio (val) {
      dispatch({
        type: 'logoutAdmin/changeType',
        payload: {
          modalType: 'update',
          currentItem: { ...currentItem, failureCause: val.target.value },
        },
      })
    },
    // 提交
    handleSubmit () {
      console.log(failureCause)
      if (currentItem.auditStatus === 1) {
        currentItem.auditStatus = 3
      }
      // eslint-disable-next-line eqeqeq
      if (currentItem.auditStatus == 3 && currentItem.failureCause == null) {
        message.error('请填写失败原因')
      } else {
        dispatch({
          type: 'logoutAdmin/submitAuditFun',
          payload: {
            id: currentItem.id,
            auditStatus: currentItem.auditStatus,
            remark: currentItem.remark,
            failureCause: currentItem.failureCause,
          },
        })
      }
    },
    // 返回列表页面
    changeType () {
      dispatch(
        routerRedux.push({
          pathname: '/logoutAdmin',
          page: { page: currentList },
        })
      )
    },
  }

  return (
    <div className="content-inner">
      <LogoutAdminModal {...logoutAdminModalProps} />
    </div>
  )
}
// class LogoutAdmin extends React.Component {
//   render () {
//     console.log(this.props, '我先说句话')
//     // const { logoutAdmin, dispatch, loading } = this.props
//     const logoutAdminModalProps = {

//     }
//     return (
//       <div className="content-inner">
//         <LogoutAdminModal {...logoutAdminModalProps} />
//       </div>
//     )
//   }
// }
LogoutAdmin.propTypes = {
  logoutAdmin: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ logoutAdmin, auth, loading }) {
  return { logoutAdmin, auth, loading }
}

export default connect(mapStateToProps)(LogoutAdmin)
