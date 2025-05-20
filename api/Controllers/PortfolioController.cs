using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Extension;
using api.interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/portfolio")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IStockRepository _stockRepository;
        private readonly IPortfolioRepository _portfolioRepository;
        public PortfolioController(UserManager<AppUser> userManager, IStockRepository stockRepository, IPortfolioRepository portfolioRepository)
        {
            _userManager = userManager;
            _stockRepository = stockRepository;
            _portfolioRepository = portfolioRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio()
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            #pragma warning disable CS8604 // Possible null reference argument.
            var userPortfolio = await _portfolioRepository.GetUserPortfolio(appUser);

            return Ok(userPortfolio);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddToPortfolio(string symbol)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var stock = await _stockRepository.GetBySymbolAsync(symbol);

            if (stock == null) return BadRequest("Stock Not Found");

            #pragma warning disable CS8604 // Possible null reference argument.
            var userPortfolio = await _portfolioRepository.GetUserPortfolio(appUser);

            if (userPortfolio.Any(e => e.Symbol.ToLower() == symbol.ToLower()))
                return BadRequest("Stock Already Exists in the Portfolio");

            var portfolioModel = new Portfolio
            {
                StockId = stock.Id,
                AppUserId = appUser.Id
            };

            await _portfolioRepository.CreateAsync(portfolioModel);

            if (portfolioModel == null)
                return StatusCode(500, "Could Not Create");

            return Created();
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteFromPortfolio(string symbol)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            #pragma warning disable CS8604 // Possible null reference argument.
            var userPortfolio = await _portfolioRepository.GetUserPortfolio(appUser);

            if (!userPortfolio.Any(e => e.Symbol.ToLower() == symbol.ToLower()))
                return BadRequest("Stock does not exist in the Portfolio");

            await _portfolioRepository.DeleteAsync(appUser, symbol);

            return Ok();
        }
    }
}