using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Comment;

namespace api.DTOs.Stock
{
    public class CreateStockRequest
    {
        [Required]
        [MaxLength(10,ErrorMessage = "The ticker length cannot exceed 10 characters")]
        public string Symbol { get; set; } = string.Empty;

        [Required]
        [MaxLength(10,ErrorMessage = "The companyName length cannot exceed 10 characters")]
        public string CompanyName { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18,2)")]

        [Required]
        [Range(1,1000000000000)]
        public decimal Purchase { get; set; }

        [Required]
        [Range(0.001, 100)]
        public decimal LastDiv { get; set; }

        [Required]
        [MaxLength(10, ErrorMessage = "Industry cannot be over 10 characters")]
        public string Industry { get; set; } = string.Empty;

        [Range(1, 5000000000)]
        public long MarketCap { get; set; }
        public List<CommentDTO>? Comments { get; set; }
    }
}