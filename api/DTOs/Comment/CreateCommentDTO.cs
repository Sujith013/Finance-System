using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Comment
{
    public class CreateCommentDTO
    {
        [Required]
        [MinLength(5, ErrorMessage = "Title must be atleast 5 characters in Length")]
        [MaxLength(50,ErrorMessage = "Title cannot exceed 50 characters in total")]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MinLength(20, ErrorMessage = "Content must be atleast 20 characters in Length")]
        [MaxLength(200,ErrorMessage = "Content cannot exceed 200 characters in total")]
        public string Content { get; set; } = string.Empty;
    }
}