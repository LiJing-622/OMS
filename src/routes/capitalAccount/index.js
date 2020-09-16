import React from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import CapitalAccountList from '../../components/CapitalAccount/capitalAccountList'
// import PatientSearch from '../../components/Patient/PatientSearch'
// import PatientAction from '../../components/Patient/PatientAction'
// import PatientModal from '../../components/Patient/PatientModal'

function CapitalAccount ({ capitalAccount, location }) {
  const {
    list,
    pagination,

  } = capitalAccount
  const capitalAccountListProps = {
    dataSource: list,
    pagination,
    location,
  }
  return (
    <div className="content-inner">
      <CapitalAccountList {...capitalAccountListProps} />
    </div>
  )
}

CapitalAccount.propTypes = {
  capitalAccount: PropTypes.object,
  // loading: PropTypes.object,
  location: PropTypes.object,
  // dispatch: PropTypes.func,
}

function mapStateToProps ({ capitalAccount, auth, loading }) {
  return { capitalAccount, auth, loading }
}

export default connect(mapStateToProps)(CapitalAccount)
