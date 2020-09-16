import React from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import CashManagementList from '../../../components/CashManagement/cashManagementEditList'
// import PatientSearch from '../../components/Patient/PatientSearch'
// import PatientAction from '../../components/Patient/PatientAction'
// import PatientModal from '../../components/Patient/PatientModal'

function CashManagement ({ cashManagemen }) {
  const {
    dataSource,
    detailsItem,
  } = cashManagemen
  const CashManagementListProps = {
    dataSource,
    detailsItem,
  }
  return (
    <div className="content-inner">
      <CashManagementList {...CashManagementListProps} />
    </div>
  )
}

CashManagement.propTypes = {
  cashManagemen: PropTypes.object,
  // loading: PropTypes.object,
  // location: PropTypes.object,
  // dispatch: PropTypes.func,
}

function mapStateToProps ({ cashManagemen, auth, loading }) {
  return { cashManagemen, auth, loading }
}

export default connect(mapStateToProps)(CashManagement)
