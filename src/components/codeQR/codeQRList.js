import React from 'react'
import PropTypes from 'prop-types'
import styles from './codeQR.less'

const codeQRList = ({
  list,
  handFn, // 编辑
}) => {
  return (
    <div className={styles.Box}>
      {list.map(item => {
        return (<div key={item.id} className={styles.boxContent}>
          <p className={styles.header}>{item.styleName}</p>
          <div className={styles.content} >
            <img src={item.imageUrl} alt="" />
          </div>
          <div className={styles.contentPage}>
            <p>{item.useState === false ? '未启用' : '使用中'}</p>
            <p onClick={() => handFn(item)}>编辑</p>
          </div>
        </div>)
      })}
    </div>
  )
}
codeQRList.propTypes = {
  list: PropTypes.array,
  handFn: PropTypes.func,
}
export default codeQRList
