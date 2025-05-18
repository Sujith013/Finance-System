using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Comment;
using api.Models;

namespace api.Mappers
{
    public static class CommentMapper
    {
        public static CommentDTO ToCommentDTO(this Comment comment)
        {
            return new CommentDTO
            {
                Id = comment.Id,
                Title = comment.Title,
                Content = comment.Content,
                CreatedOn = comment.CreatedOn,
                StockId = comment.StockId
            };
        }

        public static Comment ToCommentFromCreate(this CreateCommentDTO commentDTO, int stockId)
        {
            return new Comment
            {
                Title = commentDTO.Title,
                Content = commentDTO.Content,
                StockId = stockId
            };
        }

        public static Comment ToCommentFromUpdate(this UpdateCommentDTO commentDto, int stockId)
        {
            return new Comment
            {
                Title = commentDto.Title,
                Content = commentDto.Content,
                StockId = stockId
            };
        }
    }
}