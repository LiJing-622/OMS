import React from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import PatientList from '../../components/Particulars/ParticularsList'
// import PatientSearch from '../../components/Patient/PatientSearch'
// import PatientAction from '../../components/Patient/PatientAction'
// import PatientModal from '../../components/Patient/PatientModal'

function Particulars ({ Particular, location }) {
  const {
    list,
    listData,
    pagination,
    dataPagination,
  } = Particular
  const particularListProps = {
    dataSource: list,
    dataSourceData: listData,
    pagination,
    location,
    dataPagination,
  }
  return (
    <div className="content-inner">
      <PatientList {...particularListProps} />
    </div>
  )
}

Particulars.propTypes = {
  Particular: PropTypes.object,
  // loading: PropTypes.object,
  location: PropTypes.object,
  // dispatch: PropTypes.func,
}

function mapStateToProps ({ Particular, auth, loading }) {
  return { Particular, auth, loading }
}

export default connect(mapStateToProps)(Particulars)
