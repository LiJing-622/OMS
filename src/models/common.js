import modelExtend from 'dva-model-extend'

const model = {
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

const pageModel = modelExtend(model, {

  state: {
    keyword: '',
    searchMode: 'simple',
    list: [],
    listData: [],

    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共${total}条记录`,
      current: 1,
      total: 0,
    },
    dataPagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共${total}条记录`,
      current: 1,
      total: 0,
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { list, listData, pagination, dataPagination } = payload
      return {
        ...state,
        list,
        listData,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
        dataPagination: {
          ...state.dataPagination,
          ...dataPagination,
        },
      }
    },
    updateSearchMode (state, action) {
      const { searchMode } = action.payload
      return { ...state, searchMode: searchMode }
    },
  },

})


module.exports = {
  model,
  pageModel,
}
