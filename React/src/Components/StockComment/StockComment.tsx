import React, { useEffect, useState } from 'react'
import StockCommentForm from './StockCommentForm';
import { CommentGetAPI, CommentPostAPI } from '../../Services/CommentService';
import { toast } from 'react-toastify';
import { CommentGet } from '../../Models/Comment';
import StockCommentList from './StockCommentList';

interface Props {
    stockSymbol:string;
}

type CommentFormInputs = {
    title:string;
    content:string;
}

const StockComment = ({stockSymbol}:Props) => {
  const [comments,setComments] = useState<CommentGet[]|null>(null);
  const [loading,setLoading] = useState<boolean>();

  useEffect(()=>{
    getComments();
  },[])

  const handleComment = (e:CommentFormInputs) => {
      CommentPostAPI(e.title,e.content,stockSymbol)
        .then((res)=>{
          if(res)
            toast.success("Comment Created Successfully!!");
            getComments();
        }).catch((e)=>{
          toast.warning(e);})
  }

  const getComments = () => {
    setLoading(true);
    CommentGetAPI(stockSymbol)
      .then((res)=>{
        setLoading(false);
        setComments(res?.data!);
      })
  }

  return( 
    <div className="flex flex-col">
    {loading ? <p>Loading Comments...</p>:<StockCommentList comments={comments!}/>}
    <StockCommentForm symbol={stockSymbol} handleComment={handleComment}/>
    </div>
  )
}

export default StockComment
