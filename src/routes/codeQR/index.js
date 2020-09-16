import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { message } from 'antd'
import CodeQRList from '../../components/codeQR/codeQRList'
import CodeQRListAction from '../../components/codeQR/codeQRAction'

function CodeQR ({ codeQR, dispatch }) {
  const {
    list,
    item,
    confirmLoading,

  } = codeQR
  const codeQRListProps = {
    list,
    item,
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true })
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        // getBase64(info.file.originFileObj, imageUrl =>
        //   this.setState({
        //     imageUrl,
        //     loading: false,
        //   }),
        // )
      }
    },
    getBase64 (img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    },
    codeQRListProps () {
      // console.log('codeQRListProps')
    },
    // 点击编辑
    handFn (val) {
      dispatch({
        type: 'codeQR/selectChange',
        payload: val,
      })
      dispatch(routerRedux.push({
        pathname: '/codeQR/edit',
        query: {
          id: val.id,
        },
      }))
    },

    confirmLoading,
  }

  const CodeQRListActionProps = {
    // rank,
    onCreate () {
      dispatch({
        type: 'withdrawBills/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    // 新增模块按钮
    handleSizeChange () {
      dispatch({
        type: 'codeQR/selectChange',
        payload: {},
      })
      dispatch(
        routerRedux.push({
          pathname: '/codeQR/edit',
          query: { page: 1, keyword: '' },
        }),
      )
    },
  }


  return (
    <div className="content-inner">
      <CodeQRListAction {...CodeQRListActionProps} />
      <CodeQRList {...codeQRListProps} />
    </div>
  )
}

CodeQR.propTypes = {
  codeQR: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ codeQR, loading }) {
  return { codeQR, loading }
}

export default connect(mapStateToProps)(CodeQR)
