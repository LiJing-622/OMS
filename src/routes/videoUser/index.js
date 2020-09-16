import React from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import VideoUserList from '../../components/VideoUser/VideoUserList'
import VideoUserListModal from '../../components/VideoUser/VideoUSerListModal'

function VideoUser ({ videoUser, dispatch }) {
  const {
    doctor,
    modalVisible,
    list,
    titles,
    dataSource,
    doctorSource,
    vipSource,
    recruitDataOne,
    recruitDataTwo,
    recruitDataTree,
    recruitDataFour,
    confirmLoading,

  } = videoUser
  const VideoUserListProps = {
    doctor,
    dataSource,
    doctorSource,
    vipSource,
    recruitDataOne,
    recruitDataTwo,
    recruitDataTree,
    recruitDataFour,
    modalVisible,
    list,
    titles,
    // onGenderChange (value) {
    //   console.log(value, 'b')
    // },
    onChangeClick (e) {
      dispatch({
        type: 'videoUser/selectChange',
        payload: e,
      })
    },
    fenRunCilckOne (e) {
      dispatch({
        type: 'videoUser/updateQueryKey',
        payload: e.target.value,
      })
    },
    fenRunCilckTwo (e) {
      dispatch({
        type: 'videoUser/updateQueryKey',
        payload: e.target.value,
      })
    },
    confirmLoading,
    handleCity () {
      dispatch({
        type: 'videoUser/showModal',
        payload: {
          modalVisible: true,
        },
      })
    },

  }

  // const withdrawBillsActionProps = {
  //   searchMode,
  //   keyword,
  //   selectedRowKeys,
  //   // rank,
  //   onCreate () {
  //     dispatch({
  //       type: 'withdrawBills/showModal',
  //       payload: {
  //         modalType: 'create',
  //       },
  //     })
  //   },
  //   onBatchWithdraw () {
  //     dispatch({
  //       type: 'withdrawBills/multiWithdraw',
  //       payload: {
  //         withdrawBillNoList: selectedRowKeys,
  //       },
  //     })
  //   },
  //   onSearch (kw) {
  //     dispatch(
  //       routerRedux.push({
  //         pathname: '/withdraw-bills',
  //         query: { page: 1, keyword: kw },
  //       }),
  //     )
  //   },
  //   onResetSearch () {
  //     dispatch(
  //       routerRedux.push({
  //         pathname: '/withdraw-bills',
  //         query: { page: 1, keyword: '' },
  //       }),
  //     )
  //   },
  // }

  // const withdrawBillsModalProps = {
  //   item: currentItem,
  //   visible: withdrawModalVisible,
  //   maskClosable: false,
  //   confirmLoading: loading.effects['withdrawBills/update'],
  //   title: '提现申请',
  //   wrapClassName: 'vertical-center-modal',
  //   dataSource,
  //   onOk (data) {
  //     dispatch({
  //       type: 'withdrawBills/withdraw',
  //       payload: data,
  //     })
  //   },
  //   onCancel () {
  //     dispatch({
  //       type: 'withdrawBills/hideWithdrawModal',
  //     })
  //   },
  // }
  return (
    <div className="content-inner">
      <VideoUserList {...VideoUserListProps} />
      <VideoUserListModal {...VideoUserListProps} />
    </div>
  )
}


VideoUser.propTypes = {
  videoUser: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps ({ videoUser, loading }) {
  return { videoUser, loading }
}

export default connect(mapStateToProps)(VideoUser)
