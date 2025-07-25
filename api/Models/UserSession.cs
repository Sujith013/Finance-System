using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class UserSession
    {
        public string? Username { get; set; }
        public string? Token { get; set; }
        public string? Id { get; set; }
        public string? Email { get; set; }

    }
}