using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Stock;
using api.Helpers;
using api.interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class StockRepository : IStockRepository
    {
        private readonly ApplicationDBContext _Dbcontext;

        public StockRepository(ApplicationDBContext dbContext)
        {
            _Dbcontext = dbContext;
        }

        public async Task<List<Stock>> GetAllAsync(QueryObject query)
        {
            var stocks = _Dbcontext.Stock.Include(c => c.Comments).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.CompanyName))
            {
                stocks = stocks.Where(s => s.CompanyName.Contains(query.CompanyName));
            }

            if (!string.IsNullOrWhiteSpace(query.Symbol))
            {
                stocks = stocks.Where(s => s.Symbol.Contains(query.Symbol));
            }

            return await stocks.ToListAsync();
        }

        public async Task<Stock?> GetByIdAsync(int id)
        {
            return await _Dbcontext.Stock.Include(c=>c.Comments).FirstOrDefaultAsync(i=>i.Id==id);
        }

        public async Task<Stock> CreateAsync(Stock stockModel)
        {
            await _Dbcontext.Stock.AddAsync(stockModel);
            await _Dbcontext.SaveChangesAsync();
            return stockModel;
        }

        public async Task<Stock?> UpdateAsync(int id, UpdateStockRequest stockDTO)
        {
            var stockModel = await _Dbcontext.Stock.FirstOrDefaultAsync(x => x.Id == id);

            if (stockModel == null)
                return null;

            stockModel.Symbol = stockDTO.Symbol;
            stockModel.CompanyName = stockDTO.CompanyName;
            stockModel.Purchase = stockDTO.Purchase;
            stockModel.LastDiv = stockDTO.LastDiv;
            stockModel.Industry = stockDTO.Industry;
            stockModel.MarketCap = stockDTO.MarketCap;

            await _Dbcontext.SaveChangesAsync();

            return stockModel;
        }

        public async Task<Stock?> DeleteAsync(int id)
        {
            var stockModel = await _Dbcontext.Stock.FirstOrDefaultAsync(x => x.Id == id);

            if (stockModel == null)
                return null;

            _Dbcontext.Stock.Remove(stockModel);
            await _Dbcontext.SaveChangesAsync();
            return stockModel;
        }

        public async Task<bool> StockExists(int id)
        {
            return await _Dbcontext.Stock.AnyAsync(s=>s.Id==id);
        }
    }
}