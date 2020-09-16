import React from 'react'
// import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import { connect } from 'dva'
import VideoDoctorListModel from './videoDoctorListModel'

const { TabPane } = Tabs
class videoDoctorList extends React.Component {
  callback=() => {
    console.log('111')
  }
  render () {
    console.log(this.props.videoDoctor, 'this.props.videoDoctor')
    return (
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="9K代表" key="1" >
          <VideoDoctorListModel {...this.props.videoDoctor} />
        </TabPane>
        <TabPane tab="9K主管" key="2">
          <VideoDoctorListModel {...this.props.videoDoctor} />
        </TabPane>
        <TabPane tab="9K经理" key="3">

          <VideoDoctorListModel {...this.props.videoDoctor} />
        </TabPane>
        <TabPane tab="9K总监" key="4">
          <VideoDoctorListModel {...this.props.videoDoctor} />
        </TabPane>
      </Tabs>
    )
  }
}

const mapStateToProps = (videoDoctor) => {
  return {
    videoDoctor: videoDoctor.videoDoctor,
  }
}
export default connect(mapStateToProps)(videoDoctorList)
