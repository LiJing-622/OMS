import React from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import CashManagementList from '../../components/CashManagement/cashManagementList'
// import PatientSearch from '../../components/Patient/PatientSearch'
// import PatientAction from '../../components/Patient/PatientAction'
// import PatientModal from '../../components/Patient/PatientModal'

function CashManagement ({ cashManagemen, location }) {
  const {
    list,
    pagination,
  } = cashManagemen
  const CashManagementListProps = {
    dataSource: list,
    pagination,
    location,
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
  location: PropTypes.object,
  // dispatch: PropTypes.func,
}

function mapStateToProps ({ cashManagemen, auth, loading }) {
  return { cashManagemen, auth, loading }
}

export default connect(mapStateToProps)(CashManagement)
