import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Alert, Radio } from 'antd'

const Search = Input.Search

const PatientVerifyAction = ({
  searchMode,
  keyword,
  onSearch,
  onResetSearch,
  solvingItem,
  // solvedItem,
  idCardPicAuthStatus,
  // onAdvanceSearchMode,
}) => {
  return (
    <div>
      {
        (keyword && searchMode === 'simple') && <Alert message={`关键字："${keyword}"；`} type="info"
          showIcon style={{ marginBottom: 16 }} closeText="清除所有" onClose={onResetSearch}
        />
      }
      <Row type="flex" justify="space-between" style={{ marginBottom: 16 }}>
        <Col span={5} style={{ textAlign: '' }} />
        {
          searchMode === 'simple' && (
            <Col span={19} style={{ textAlign: 'right', display: 'inline' }}>
              <Radio.Group style={{ marginRight: '10px' }} value={idCardPicAuthStatus || 0} onChange={solvingItem}>
                <Radio.Button value={0}>未处理</Radio.Button>
                <Radio.Button value={1}>已处理</Radio.Button>
              </Radio.Group>
              <Search
                placeholder="请输入关键字查询"
                defaultValue={keyword || ''}
                onSearch={value => onSearch(value)}
                style={{ width: 150, marginRight: 5 }}
              />
              {/* <a onClick={onAdvanceSearchMode}>高级搜索</a> */}
            </Col>
          )
        }
      </Row>
    </div>
  )
}

PatientVerifyAction.propTypes = {
  searchMode: PropTypes.string,
  keyword: PropTypes.string,
  onSearch: PropTypes.func,
  onResetSearch: PropTypes.func,
}

export default PatientVerifyAction
