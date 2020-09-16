import React from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import CashRefundList from '../../components/CashRefund/cashRefundtList'

function CashRefund ({ cashRefund, location }) {
  const {
    list,
    pagination,
  } = cashRefund
  const CashRefundListProps = {
    dataSource: list,
    pagination,
    location,
  }
  return (
    <div className="content-inner">
      <CashRefundList {...CashRefundListProps} />
    </div>
  )
}

CashRefund.propTypes = {
  cashRefund: PropTypes.object,
  location: PropTypes.object,
}

function mapStateToProps ({ cashRefund, auth, loading }) {
  return { cashRefund, auth, loading }
}

export default connect(mapStateToProps)(CashRefund)
