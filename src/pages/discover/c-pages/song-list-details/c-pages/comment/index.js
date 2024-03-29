import React, { memo, useEffect, useState, useCallback } from 'react'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getSongListHotCommentAction, getSongListCommentAction, changeSongListHotCommentAction, changeSongListCommentAction } from '../../store/actionCreators'

import Comment from '@/components/comment'

import { message } from 'antd'

import { commentLike, handleComment } from '@/service/songDetail'

const SongListComment = memo((props) => {
  const { params } = props.match
  const dispatch = useDispatch()
  const { hotComments, comments, total } = useSelector(
    state => ({
      hotComments: state.getIn(['songListDetails', 'hotComments']),
      comments: state.getIn(['songListDetails', 'comments']),
      total: state.getIn(['songListDetails', 'total']),
    }),
    shallowEqual
  )

  useEffect(() => {
    dispatch(getSongListHotCommentAction(params.id))
    dispatch(getSongListCommentAction(params.id))
  }, [dispatch, params.id])

  const handleLike = useCallback(
    (item, type) => {
      commentLike(params.id, item.commentId, +!item.liked, 2).then(() => {
        let newComments = []
        if (type === 'hot') {
          newComments = [...hotComments]
        } else {
          newComments = [...comments]
        }
        !item.liked ? newComments[item.index].likedCount += 1 : newComments[item.index].likedCount -= 1
        newComments[item.index].liked = !item.liked
        type === 'hot' ? dispatch(changeSongListHotCommentAction(newComments)) : dispatch(changeSongListCommentAction(newComments))
      })
    },
    [params.id, dispatch, hotComments, comments]
  )

  const handleReplay = (item, idx, type) => {
    if (type === 'hot') {
      const newArr = [...hotComments]
      newArr.forEach((item, index) => {
        if (index === idx) return
        item.isReplay = false
      })
      newArr[idx].isReplay = !item.isReplay
      dispatch(changeSongListHotCommentAction(newArr))
    } else {
      const newArr = [...comments]
      newArr.forEach((item, index) => {
        if (index === idx) return
        item.isReplay = false
      })
      newArr[idx].isReplay = !item.isReplay
      dispatch(changeSongListCommentAction(newArr))
    }
  }

  const [current, setCurrentPage] = useState(1)
  const changePage = useCallback(
    (currentPage) => {
      setCurrentPage(currentPage)
      const targePageCount = (currentPage - 1) * 20
      dispatch(getSongListCommentAction(params.id, 20, targePageCount))
    },
    [dispatch, params.id]
  )

  const [commentLoading, changeLoading] = useState(false)
  const handleSubmit = useCallback(
    (content, replayTo) => {
      changeLoading(true)
      handleComment(params.id, content, replayTo ? 2 : 1, 2, replayTo ? replayTo.commentId : null).then(res => {
        if (res.code === 200) {
          message.success('评论成功').then(() => {
            dispatch(getSongListCommentAction(params.id))
          })
        } else {
          message.error(res.msg)
        }
        changeLoading(false)
      })
    },
    [params.id, dispatch]
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

export default SongListComment