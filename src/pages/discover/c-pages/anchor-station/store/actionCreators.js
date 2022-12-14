// 常量
import * as actionTypes from './constants'
// 网络请求
import * as djService from '@/service/dj'

// action
export const changeDJCateAction = cateList => ({
  type: actionTypes.CHANGE_DJ_CATE,
  cateList
})

export const changeDJRecommendAction = hotList => ({
  type: actionTypes.CHANGE_DJ_RECOMMEND,
  hotList
})

export const changeDJTopListAction = djList => ({
  type: actionTypes.CHANGE_DJ_TOP_LIST,
  djList
})

export const changeDJDetailsAction = details => ({
  type: actionTypes.CHANGE_DJ_DETAILS,
  details
})

export const changeDJProgramAction = program => ({
  type: actionTypes.CHANGE_DJ_PROGRAM,
  program
})

// --------------------------------------------------------network--------------------------------------------------------
export const getDJCateAction = () => {
  return dispatch => {
    djService.getDJCate().then(res => {
      dispatch(changeDJCateAction(res.categories))
    })
  }
}

// 电台热门推荐
export const getDJHotAction = () => {
  return dispatch => {
    djService.getDJHot().then(res => {
      dispatch(changeDJRecommendAction(res.djRadios))
    })
  }
}

// 电台热门排行榜
export const getDJHotTopListAction = (type, limit, offset) => {
  return dispatch => {
    djService.getDJHotTopList(type, limit, offset).then(res => {
      dispatch(changeDJTopListAction(res.toplist))
    })
  }
}

// 电台分类推荐
export const getDJRecommendAction = (id) => {
  return dispatch => {
    djService.getDJRecomment(id).then(res => {
      dispatch(changeDJRecommendAction(res.djRadios))
    })
  }
}

// 电台分类排行榜
export const getDJTopListAction = (cateId, limit, offset) => {
  return dispatch => {
    djService.getDJTopList(cateId, limit, offset).then(res => {
      dispatch(changeDJTopListAction(res.djRadios))
    })
  }
}

export const getDJDetailsAction = (rid) => {
  return dispatch => {
    djService.getDJDetails(rid).then(res => {
      dispatch(changeDJDetailsAction(res.data))
    })
  }
}

export const getDJProgramAction = (rid, limit, offset, asc) => {
  return dispatch => {
    djService.getDJProgram(rid, limit, offset, asc).then(res => {
      dispatch(changeDJProgramAction(res))
    })
  }
}

