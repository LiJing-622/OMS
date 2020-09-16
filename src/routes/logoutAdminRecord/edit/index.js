import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import LogoutAdminRecordModal from '../../../components/LogoutAdminRecord/LogoutAdminModal'

function LogoutAdminRecord ({ logoutAdminRecord, loading, dispatch }) {
  const {
    currentItem,
    currentList,
    dataSource,
    modalType,
  } = logoutAdminRecord
  const logoutAdminModalProps = {
    item: currentItem,
    type: modalType,
    maskClosable: false,
    confirmLoading: loading.effects['videoOrders/queryDoctor'],
    wrapClassName: 'vertical-center-modal',
    dataSource,
    onOk (data) {
      dispatch({
        type: `Patient/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'Patient/hideModal',
      })
    },
    // 返回列表页面
    changeType () {
      dispatch(
        routerRedux.push({
          pathname: '/logoutAdminRecord',
          page: { page: currentList },
        }),
      )
    },
  }

  return (
    <div className="content-inner">
      <LogoutAdminRecordModal {...logoutAdminModalProps} />
    </div>
  )
}

LogoutAdminRecord.propTypes = {
  logoutAdminRecord: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ logoutAdminRecord, auth, loading }) {
  return { logoutAdminRecord, auth, loading }
}

export default connect(mapStateToProps)(LogoutAdminRecord)
