using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using api.Service;
using api.interfaces;
using api.Models;

namespace api.Controllers
{
    [Route("api/session")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly IRedisService _redisService;

        public SessionController(IRedisService redisService)
        {
            _redisService = redisService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetSession(string userId)
        {
            var session = await _redisService.GetUserSessionAsync<UserSession>(userId);
            if (session == null)
                return NotFound("No session found");
            return Ok(session);
        }
    }
}