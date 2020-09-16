const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
const apiPrefix = 'http://116.62.26.45:9016'  // 线上

// const apiPrefix = 'http://192.168.1.245:9016'   // 测试
// const apiPrefix = 'http://218.240.130.110:9016' // 外网测试地址
module.exports = {
  name: '9K运营管理系统',
  prefix: '9koms',
  footerText: '9K运营管理系统© 2017 9K医生',
  logo: './logo.png',
  iconFontCSS: './iconfont.css',
  iconFontJS: './iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  // 加入跨域
  CORS: [
    'http://116.62.26.45:9016',
    'http://192.168.1.245:9016',
    'http://query.yahooapis.com',
    'http://218.240.130.110:9016',
  ],
  openPages: ['/login'],
  env: 'test',
  api: {
    userLogin: `${apiPrefix}/login`,
    userLogout: `${apiPrefix}/logout`,
    uploadTokenUrl: `${apiPrefix}/upload-token/:bucket`,
    userInfo: `${apiPrefix}/users/me`, // 菜单权限
    userPassword: `${APIV1}/users/password`,
    users: `${apiPrefix}/users`,
    user: `${apiPrefix}/users/:id`,
    password: `${apiPrefix}/users/login-password`,
    permissions: `${apiPrefix}/permissions`,
    permission: `${apiPrefix}/permissions/:id`,
    roles: `${apiPrefix}/roles`,
    role: `${apiPrefix}/roles/:id`,
    region: `${apiPrefix}/areas`,
    secondDept: `${apiPrefix}/departments/level-two`,
    queryChildDepts: `${apiPrefix}/departments`,
    verifyHospital: `${apiPrefix}/hospitals/:code/verify/:enable`,
    grantPermissions: `${apiPrefix}/roles/:id/grant`,
    grantRoles: `${apiPrefix}/users/:id/grant`,
    hospitalRank: `${apiPrefix}/hospitals/levels`,
    searchHospital: `${apiPrefix}/hospitals/code-name`,
    parentDept: `${apiPrefix}/departments/level-one`,
    hospitalCategory: `${apiPrefix}/hospitals/categories`,
    hospitalLevel: `${apiPrefix}/hospitals/levels`,
    hospitalSpecial: `${apiPrefix}/departments/level-two`,
    denyUser: `${apiPrefix}/users/:id/deny/:enable`,
    doctorTitles: `${apiPrefix}/title-auths`,
    doctorTitle: `${apiPrefix}/title-auths/:code`,
    doctorTitleVerify: `${apiPrefix}/title-auths/:code/verify/:enable`,
    hospitals: `${apiPrefix}/hospitals`,
    hospital: `${apiPrefix}/hospitals/:code`,
    patients: `${apiPrefix}/patients`,
    patient: `${apiPrefix}/patients/:code`,
    members: `${APIV2}/members`,
    doctorVerifys: `${apiPrefix}/physician-auths`,
    doctorVerify: `${apiPrefix}/physician-auths/:code`,
    verifyDoctor: `${apiPrefix}/physician-auths/:code/verify/:enable`,
    patientVerifys: `${apiPrefix}/idcard-pic-auths`,
    patientVerify: `${apiPrefix}/idcard-pic-auths/:code`,
    verifyPatient: `${apiPrefix}/idcard-pic-auths/:code/verify/:enable`,
    departments: `${apiPrefix}/departments/level-one`,
    department: `${apiPrefix}/departments/:code`,
    diseases: `${apiPrefix}/diseases`,
    disease: `${apiPrefix}/diseases/:code`,
    doctors: `${apiPrefix}/doctors`,
    doctor: `${apiPrefix}/doctors/:code`,
    // vcPrice:`${apiPrefix}`,
    // remoteConsults: 'http://116.62.107.223:9017/consultation/list',
    remoteConsults: `${apiPrefix}/rc-orders`,
    remoteConsult: `${apiPrefix}/rc-orders/:orderNo`,
    withdrawBills: `${apiPrefix}/withdraw-bills`,
    withdrawBill1: `${apiPrefix}/withdraw-bills/:withdrawBillNo/deal`,
    dealWithdrawBill: `${apiPrefix}/agencies/withdraw-bills/:withdrawBillNo/deal`,
    multiWithdrawBills: `${apiPrefix}/withdraw-bills/finish`,
    videoOrders: `${apiPrefix}/video-orders`,
    videoOrder: `${apiPrefix}/video-orders/:orderNo`,
    dashboard: `${APIV1}/dashboard`,
    hospitalCates: `${apiPrefix}/hospitals/categories`,
    hospitalCate: `${apiPrefix}/hospitals/categories/:code`,
    newHospitalCate: `${apiPrefix}/hospitals/categories`,
    fakeDoctors: `${apiPrefix}/offline-doctors`,
    createDepartment: `${apiPrefix}/departments`,
    offlineDoctor: `${apiPrefix}/offline-doctors/:code`,
    tagTemplate: `${apiPrefix}/tag-templates/:type`,
    tagTemplateList: `${apiPrefix}/tag-templates/list/:type`,
    tagTemplates: `${apiPrefix}/tag-templates`,
    tag: `${apiPrefix}/tag-templates/detail/:code`,
    updatetag: `${apiPrefix}/tag-templates/:code`,
    realDocES: `${apiPrefix}/doctors/:code/sync-es`,
    fakeDocES: `${apiPrefix}/offline-doctors/:code/sync-es`,
    hospitalES: `${apiPrefix}/hospitals/:code/sync-es`,
    realDoc: `${apiPrefix}/doctors`,
    undoneDoc: `${apiPrefix}/doctors`,
    undoneDoctor: `${apiPrefix}/doctors/unverified/:uid`,
    rcHospitals: `${apiPrefix}/rc-hospital-admins`,
    rcHospital: `${apiPrefix}/rc-hospital-admins/:uid`,
    hotKeywords: `${apiPrefix}/hot-keywords`,
    setDics: `${apiPrefix}/hot-keywords/:hotKeyword/set-dic`,
    cancelDics: `${apiPrefix}/hot-keywords/:hotKeyword/remove-dic`,
    fcSms: `${apiPrefix}/doctors/:uid/send-openfc-sms`,
    helpList: `${apiPrefix}/help-docs`,
    isTop: `${apiPrefix}/help-docs/:id`,
    isCateTop: `${apiPrefix}/help-docs/:id`,
    orderCancel: `${apiPrefix}/orderCancel`,
    questions: `${apiPrefix}/questions`,
    replyQues: `${apiPrefix}/questions/:code/send-msg`,
    doctorProfiles: `${apiPrefix}/doctor-profiles`,
    doctorProfile: `${apiPrefix}/doctor-profiles/:code`,
    doctorProfileVerify: `${apiPrefix}/doctor-profiles/:code/verify`,
    rotateImg: `${apiPrefix}/download-token`,
    helpCate: `${apiPrefix}/help-doc-cates`,
    createHelp: `${apiPrefix}/help-docs`,
    updateHelp: `${apiPrefix}/help-docs/:id`,
    titleList: `${apiPrefix}/doctor-level`,
    agencies: `${apiPrefix}/agencies`,
    agency: `${apiPrefix}/agencies/:code`,
    agenWB: `${apiPrefix}/agencies/withdraw-bills`,
    agenMultiWB: `${apiPrefix}/agencies/withdraw-bills/finish`,
    agenAreas: `${apiPrefix}/agencies/:code/areas/all`,
    agenArea: `${apiPrefix}/agencies/:code/areas`,
    deleAgenArea: `${apiPrefix}/agencies/:code/areas/:areaCode`,
    microcode: `${apiPrefix}/recruit/withdraw/list`, // 微代提现列表
    microcodeCode: `${apiPrefix}/recruit/withdraw/details/:id`, // 微代提现列表详情
    microcodeFinish: `${apiPrefix}/recruit/withdraw/finish`, // 微代提现列表详情
    memberLogout: `${apiPrefix}/memberLogout`, // 会员注销审核
    getMember: `${apiPrefix}/memberLogout/getMember/:id`, // 会员注销审核 详情
    submitAudit: `${apiPrefix}/memberLogout/audit`,
    recordList: `${apiPrefix}/memberLogout/recordList`, // 会员注销审核 列表 接口
    templateList: `${apiPrefix}/recruitsharestyle/getlist`, // 所有模板列表
    templateListSave: `${apiPrefix}/recruitsharestyle/save`, // 保存模板
    templateListEdit: `${apiPrefix}/recruitsharestyle/edit`, // 编辑模板
    shareProfitID: `${apiPrefix}/fenrunvideo/useridentity`, // 通过身份标签查询分润数据接口
    updateID: `${apiPrefix}/fenrunvideo/update`, // 分润修改接口
    deleteID: `${apiPrefix}/recruitsharestyle/delete`, // 通过id删除二维码接口
    balanceInfo: `${apiPrefix}/account/fund/balance-info`, // 资金账户列表查询/account/cut/account-detail-info
    accountDetailInfo: `${apiPrefix}/account/fund/account-detail-info`, // 资金收入账户列表查询
    queryWithdrawRecord: `${apiPrefix}/withdraw/query-withdraw-record`, // 查询提现记录 /withdraw/remit-confirm
    remitConfirm: `${apiPrefix}/withdraw/remit-confirm`, // 查询提现管理的保存按钮
    cancelApply: `${apiPrefix}/withdraw/cancel-withdraw-apply`, // 取消提现申请
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
