import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { message } from 'antd'
import CodeQRList from '../../../components/codeQR/codeQREditList'
// import CodeNewTemplate from '../../../components/codeQR/codeNewTemplate'
import CodeQRListModal from '../../../components/codeQR/codeQREditModal'

function CodeQR ({ codeQR, dispatch }) {
  const {
    list,
    item,
    uploadToken,
    confirmLoading,
  } = codeQR
  const codeQRListProps = {
    list,
    item,
    uploadToken,
    uploadIconSuccess (res) {
      const IconUrl = `http://jkgj-hosp.jiukangguoji.cn/${res.key}`
      dispatch({
        type: 'codeQR/uploadIconSuccess',
        payload: IconUrl,
      })
    },
    // 删除
    deleteTemplate (data, code) {
      dispatch({
        type: 'codeQR/deleteIDUrl',
        payload: code,
      })
    },

    // 提交  //是全部的数据
    onOk (data, code) {
      console.log('tag', data, code)
      data.id = code
      if (code === undefined) {
        dispatch({
          type: 'codeQR/templateSaveWayQuery',
          payload: data,
        })
      } else {
        dispatch({
          type: 'codeQR/templateListEditWay',
          payload: data,
        })
      }
    },
    confirmLoading,
  }

  const codeQRListModalProps = {
    // rank,
    getBack () {
      dispatch(routerRedux.push({
        pathname: '/codeQR',
      }))
    },
    // 新增模块按钮
    handleSizeChange () {
      dispatch(
        routerRedux.push({
          pathname: '/codeQR/edit',
          query: { page: 1, keyword: '' },
        })
      )
    },
  }
  return (
    <div className="content-inner">
      {/* <CodeNewTemplate {...codeQRListModalProps}/> */}
      <CodeQRListModal {...codeQRListModalProps} />
      <CodeQRList {...codeQRListProps} />
    </div>
  )
}

CodeQR.propTypes = {
  codeQR: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ codeQR, loading, dispatch }) {
  return { codeQR, loading, dispatch }
}

export default connect(mapStateToProps)(CodeQR)
