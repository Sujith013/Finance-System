import React from 'react'
import { CommentGet } from '../../Models/Comment';

interface Props{
    comment:CommentGet;
}

const StockCommentListItem = ({comment}:Props) => {
  return (
    <div className="relative grid grid-cols-1 gap-4 ml-4 p-4 mb-8 w-full border rounded-lg text-gray-400 dark:bg-gray-800 shadow-lg">
      <div className="relative flex gap-4">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between">
            <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
              {comment.title}
            </p>
          </div>
          <p className="text-dark text-sm">@{comment.createdBy}</p>
        </div>
      </div>
      <p className="-mt-4 text-white">{comment.content}</p>
    </div>
  );
}

export default StockCommentListItem
