import React from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import LogoutAdminList from '../../components/LogoutAdmin/LogoutAdminList'
import LogoutAdminListAction from '../../components/LogoutAdmin/LogoutAdminAction'

class LogoutAdmin extends React.Component {


  render () {
    const { logoutAdmin, dispatch, loading } = this.props
    const {
       list,
       keyword,
       pagination,
       selectedRowKeys,
       orderStatus,
       auditStatus,
       phone,
       name,
     } = logoutAdmin
    const videoOrdersListProps = {
      keyword,
      pagination,
      loading: loading.effects['logoutAdmin/query'],
      dataSource: list,
      selectedRowKeys,
      rowSelection: {
        selectedRowKeys,
        onChange: (keys) => {
          dispatch({
            type: 'logoutAdmin/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
      onPageChange (page) {
        dispatch({
          type: 'logoutAdmin/query',
          payload: {
            auditStatus: auditStatus === ' ' ? '' : auditStatus,
            orderStatus: orderStatus,
            page: page.current,
            pageSize: page.pageSize,
            keyword: keyword,
          },
        })
      },
      onQuery (id) {
        dispatch({
          type: 'logoutAdmin/changeType',
          payload: {
            id: id,
          },
        })
        dispatch({
          type: 'logoutAdmin/queryVideoOrder',
          payload: {
            id: id,
          },
        })
      },
    }
    const logoutAdminListActionProps = {
      keyword,
      pagination,
      loading: loading.effects['logoutAdmin/query'],
      dataSource: list,
      selectedRowKeys,
      rowSelection: {
        selectedRowKeys,
        onChange: (keys) => {
          dispatch({
            type: 'logoutAdmin/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
      onPageChange (page) {
        dispatch({
          type: 'logoutAdmin/query',
          payload: {
            auditStatus: auditStatus === ' ' ? '' : auditStatus,
            page: page.current,
            pageSize: page.pageSize,
          },
        })
        if (auditStatus === '') {
          dispatch({
            type: 'logoutAdmin/changeType',
            payload: {
              auditStatus: ' ',
            },
          })
        }
      },
      // 手机号
      handlePhone (e) {
        dispatch({
          type: 'logoutAdmin/changeType',
          payload: {
            phone: e.target.value,
          },
        })
      },
      // 名字
      handleName (e) {
        dispatch({
          type: 'logoutAdmin/changeType',
          payload: {
            name: e.target.value,
          },
        })
      },
      // 搜索
      handleSubmit () {
        dispatch({
          type: 'logoutAdmin/query',
          payload: {
            auditStatus: 1,
            orderStatus: orderStatus,
            phone: phone,
            name: name,
          },
        })
      },
      // onQuery (id) {
      //   dispatch({
      //     type: 'logoutAdmin/changeType',
      //     payload: {
      //       code: id,
      //     },
      //   })
      //   dispatch({
      //     type: 'videoOrders/queryVideoOrder',
      //     payload: {
      //       code: id,
      //     },
      //   })
      // },
    }
    return (<div className="content-inner" >
      <LogoutAdminListAction {...logoutAdminListActionProps} />
      <LogoutAdminList {...videoOrdersListProps} />

    </div>)
  }
}
LogoutAdmin.propTypes = {
  logoutAdmin: PropTypes.object,
  loading: PropTypes.object,
  // location: PropTypes.object,
  // dispatch: PropTypes.func,
}
function mapStateToProps ({ logoutAdmin, loading }) {
  return { logoutAdmin, loading }
}
export default connect(mapStateToProps)(LogoutAdmin)
