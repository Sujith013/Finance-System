import React from 'react'
import { CommentGet } from '../../Models/Comment';
import StockCommentListItem from './StockCommentListItem';

interface Props{
    comments:CommentGet[];
}

const StockCommentList = ({comments}:Props) => {
  return (
    <>
    {comments?comments.map(comment=>{
        return <StockCommentListItem comment={comment}/>
    }):"No Comments to Display"}
    </>
  )
}

export default StockCommentList
