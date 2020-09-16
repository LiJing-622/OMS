import React from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import LogoutAdminList from '../../components/LogoutAdminRecord/LogoutAdminList'
import LogoutAdminListAction from '../../components/LogoutAdminRecord/LogoutAdminAction'

class LogoutAdminRecord extends React.Component {
  render () {
    const { logoutAdminRecord, dispatch, loading } = this.props
    const {
      list,
      pagination,
      selectedRowKeys,
      name,
      phone,
      auditStatus,
    } = logoutAdminRecord
    const videoOrdersListProps = {
      pagination,
      loading: loading.effects['logoutAdminRecord/query'],
      dataSource: list,
      selectedRowKeys,
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'logoutAdminRecord/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
      onPageChange (page) {
        dispatch({
          type: 'logoutAdminRecord/query',
          payload: {
            page: page.current,
            pageSize: page.pageSize,
          },
        })
        if (auditStatus === ' ') {
          dispatch({
            type: 'logoutAdminRecord/changeType',
            payload: {
              auditStatus: ' ',
            },
          })
        }
      },
      onQuery (orderNo) {
        dispatch({
          type: 'logoutAdminRecord/queryVideoOrder',
          payload: {
            code: orderNo,
          },
        })
      },
    }
    const logoutAdminListActionProps = {
      pagination,
      loading: loading.effects['logoutAdminRecord/query'],
      dataSource: list,
      selectedRowKeys,
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'logoutAdminRecord/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },

      onPageChange (page) {
        dispatch({
          type: 'logoutAdminRecord/query',
          payload: {
            auditStatus: auditStatus,
            page: page.current,
            pageSize: page.pageSize,
          },
        })
        if (auditStatus === '') {
          dispatch({
            type: 'logoutAdminRecord/changeType',
            payload: {
              auditStatus: ' ',
            },
          })
        }
      },
      clickMenu (val) {
        if (val === '审核通过') {
          val = 2
        } else if (val === '审核未通过') {
          val = 3
        } else if (val === '取消审核') {
          val = 4
        } else {
          val = ''
        }
        dispatch({
          type: 'logoutAdminRecord/changeType',
          payload: {
            auditStatus: val,
          },
        })
      },
      // 手机号
      handlePhone (e) {
        dispatch({
          type: 'logoutAdminRecord/changeType',
          payload: {
            phone: e.target.value,
          },
        })
      },
      // 名字
      handleName (e) {
        dispatch({
          type: 'logoutAdminRecord/changeType',
          payload: {
            name: e.target.value,
          },
        })
      },
      // 搜索
      handleSubmit () {
        dispatch({
          type: 'logoutAdminRecord/query',
          payload: {
            auditStatus: auditStatus,
            phone: phone,
            name: name,
          },
        })
      },
      onQuery (id) {
        dispatch({
          type: 'logoutAdminRecord/changeType',
          payload: {
            code: id,
          },
        })
        dispatch({
          type: 'vlogoutAdminRecord/queryVideoOrder',
          payload: {
            code: id,
          },
        })
      },
    }
    return (
      <div className="content-inner">
        <LogoutAdminListAction {...logoutAdminListActionProps} />
        <LogoutAdminList {...videoOrdersListProps} />
      </div>
    )
  }
}
LogoutAdminRecord.propTypes = {
  logoutAdminRecord: PropTypes.object,
  loading: PropTypes.object,
  // location: PropTypes.object,
  // dispatch: PropTypes.func,
}
function mapStateToProps ({ logoutAdminRecord, loading }) {
  return { logoutAdminRecord, loading }
}
export default connect(mapStateToProps)(LogoutAdminRecord)
