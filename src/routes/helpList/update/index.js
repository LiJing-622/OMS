import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import HelpModal from '../../../components/HelpList/HelpModal'

function Help ({ helpModal, dispatch }) {
  const {
  // list,
    currentList,
    currentItem,
    pagination,
 //   modalVisible,
    modalType,
    cateList,
    // dataSource,
  } = helpModal
  console.log(pagination)
  const helpModalModalProps = {
    item: modalType === 'create' ? currentItem : currentItem,
    type: modalType,
    // visible: modalVisible,
    modalType,
    maskClosable: false,
    title: `${modalType === 'create' ? '创建用户' : '医生信息详情'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      if (data.id === '') {
        dispatch({
          type: 'helpModal/create',
          payload: data,
        })
      } else {
        dispatch({
          type: 'helpModal/update',
          payload: data,
        })
      }
    },
    chooseApp (e) {
      dispatch({
        type: 'helpModal/queryHelpCate',
        payload: {
          app: e.target.value,
        },
      })
    },
    cateList,
    // 点击返回按钮 将page值传过去
    changeType () {
      dispatch(
        routerRedux.push({
          pathname: '/help',
          query: { page: currentList },
        }),
      )
    },
  }
  return (
    <div className="content-inner">
      <HelpModal {...helpModalModalProps} />
    </div>
  )
}

Help.propTypes = {
  helpModal: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ helpModal, loading }) {
  return { helpModal, loading }
}

export default connect(mapStateToProps)(Help)
