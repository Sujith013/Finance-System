using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDBContext _dbContext;
        public PortfolioRepository(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<List<Stock>> GetUserPortfolio(AppUser appUser)
        {
            return await _dbContext.Portfolio.Where(u => u.AppUserId == appUser.Id)
                            .Select(stock => new Stock
                            {
                                Id = stock.StockId,
                                Symbol = stock.Stock.Symbol,
                                CompanyName = stock.Stock.CompanyName,
                                Purchase = stock.Stock.Purchase,
                                LastDiv = stock.Stock.LastDiv,
                                Industry = stock.Stock.Industry,
                                MarketCap = stock.Stock.MarketCap
                            }).ToListAsync();
        }

        public async Task<Portfolio> CreateAsync(Portfolio portfolio)
        {
            await _dbContext.Portfolio.AddAsync(portfolio);
            await _dbContext.SaveChangesAsync();
            return portfolio;
        }

        public async Task<Portfolio> DeleteAsync(AppUser appUser, string symbol)
        {
            var portfolioModel = await _dbContext.Portfolio.FirstOrDefaultAsync(s => s.AppUserId == appUser.Id && s.Stock.Symbol.ToLower() == symbol.ToLower());

            if (portfolioModel == null)
                #pragma warning disable CS8603 // Possible null reference return.
                return null;

            _dbContext.Portfolio.Remove(portfolioModel);
            await _dbContext.SaveChangesAsync();
            return portfolioModel;
        }
    }
}