import dva from 'dva'
import 'babel-polyfill'
import createLoading from 'dva-loading'
import { hashHistory } from 'dva/router'
import { message } from 'antd'
// import indexModel from './models/app'
// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: hashHistory,
  onError (error) {
    message.error(error.message)
  },
})
// 2. Model
// app.model(indexModel)
app.model(require('./models/app'))
app.model(require('./models/auth'))
app.model(require('./models/roles'))
app.model(require('./models/permissions'))
app.model(require('./models/hospital'))
app.model(require('./models/department'))
app.model(require('./models/diseases'))
app.model(require('./models/doctorVerify'))
app.model(require('./models/doctorTitle'))
app.model(require('./models/patient'))
app.model(require('./models/patientVerify'))
app.model(require('./models/doctor'))
// app.model(require('./models/members'))
app.model(require('./models/withdrawBills'))
app.model(require('./models/videoOrders'))
// app.model(require('./models/cases'))
app.model(require('./models/remoteConsult'))
app.model(require('./models/hospitalCate'))
app.model(require('./models/codeQR'))
// app.model(require('./models/microcode')) // 暂定
app.router(require('./router'))
// 3. Router

// 4. Start
app.start('#root')
