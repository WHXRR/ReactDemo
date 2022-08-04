import React, { memo, useState, useCallback, useEffect } from 'react'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getHotCommentAction, getCommentAction } from '../../store/actionCreators'

import Comment from '@/components/comment'

const Comments = memo((props) => {

  const dispatch = useDispatch()
  const { params } = props.match
  const { hotComments, comments, total } = useSelector(
    state => ({
      hotComments: state.getIn(['songDetail', 'hotComments']),
      comments: state.getIn(['songDetail', 'comments']),
      total: state.getIn(['songDetail', 'total']),
    }),
    shallowEqual
  )
  // 精彩评论
  useEffect(() => {
    dispatch(getHotCommentAction(params.id))
    dispatch(getCommentAction(params.id))
  }, [dispatch, params.id])

  const [current, setCurrentPage] = useState(1)
  const changePage = useCallback(
    (currentPage) => {
      setCurrentPage(currentPage)
      const targePageCount = (currentPage - 1) * 20
      dispatch(getCommentAction(params.id, 20, targePageCount))
    },
    [dispatch, params.id]
  )

  const handleLike = item => {
    console.log({ item });
  }

  const handleReplay = item => {
    console.log({ item });
  }

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
      />
    </>
  )
})

export default Comments