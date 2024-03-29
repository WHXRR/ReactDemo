import React, { memo, useState, useCallback } from 'react'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getCommentAction, changeHotCommentAction, changeCommentAction } from '../../store/actionCreators'

import Comment from '@/components/comment'

import { message } from 'antd'

import { commentLike, handleComment } from '@/service/songDetail'

const TopListComment = memo(() => {
  const dispatch = useDispatch()
  const { hotComments, comments, total, currentList } = useSelector(
    state => ({
      hotComments: state.getIn(['topList', 'hotComments']),
      comments: state.getIn(['topList', 'comments']),
      total: state.getIn(['topList', 'total']),
      currentList: state.getIn(['topList', 'currentList']),
    }),
    shallowEqual
  )

  // useEffect(() => {
  //   dispatch(getHotCommentAction(currentList.id))
  //   dispatch(getCommentAction(currentList.id))
  // }, [dispatch, currentList])

  const handleLike = useCallback(
    (item, type) => {
      commentLike(currentList.id, item.commentId, +!item.liked, 2).then(() => {
        let newComments = []
        if (type === 'hot') {
          newComments = [...hotComments]
        } else {
          newComments = [...comments]
        }
        !item.liked ? newComments[item.index].likedCount += 1 : newComments[item.index].likedCount -= 1
        newComments[item.index].liked = !item.liked
        type === 'hot' ? dispatch(changeHotCommentAction(newComments)) : dispatch(changeCommentAction(newComments))
      })
    },
    [currentList, dispatch, hotComments, comments]
  )

  const handleReplay = (item, idx, type) => {
    if (type === 'hot') {
      const newArr = [...hotComments]
      newArr.forEach((item, index) => {
        if (index === idx) return
        item.isReplay = false
      })
      newArr[idx].isReplay = !item.isReplay
      dispatch(changeHotCommentAction(newArr))
    } else {
      const newArr = [...comments]
      newArr.forEach((item, index) => {
        if (index === idx) return
        item.isReplay = false
      })
      newArr[idx].isReplay = !item.isReplay
      dispatch(changeCommentAction(newArr))
    }
  }

  const [current, setCurrentPage] = useState(1)
  const changePage = useCallback(
    (currentPage) => {
      setCurrentPage(currentPage)
      const targePageCount = (currentPage - 1) * 20
      dispatch(getCommentAction(currentList.id, 20, targePageCount))
    },
    [dispatch, currentList]
  )
  
  const [commentLoading, changeLoading] = useState(false)
  const handleSubmit = useCallback(
    (content, replayTo) => {
      changeLoading(true)
      handleComment(currentList.id, content, replayTo ? 2 : 1, 2, replayTo ? replayTo.commentId : null).then(res => {
        if (res.code === 200) {
          message.success('评论成功').then(() => {
            dispatch(getCommentAction(currentList.id))
          })
        } else {
          message.error(res.msg)
        }
        changeLoading(false)
      })
    },
    [currentList, dispatch]
  )

  return (
    <>
      <Comment
        hotComment={hotComments}
        newComment={comments}
        handleLike={handleLike}
        handleReplay={handleReplay}
        changePage={changePage}
        current={current}
        commentsTotal={total}
        handleSubmit={handleSubmit}
        commentLoading={commentLoading}
      />
    </>
  )
})

export default TopListComment