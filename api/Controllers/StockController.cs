using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Stock;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ApplicationDBContext _Dbcontext;
        public StockController(ApplicationDBContext Dbcontext)
        {
            _Dbcontext = Dbcontext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var stocks = await _Dbcontext.Stock.ToListAsync();
            var stockDTO = stocks.Select(s => s.ToStockDTO());
            return Ok(stockDTO);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var stock = await _Dbcontext.Stock.FindAsync(id);

            if (stock == null)
                return NotFound();

            return Ok(stock.ToStockDTO());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockRequest stockDTO)
        {
            var stockModel = stockDTO.ToStockFromCreateDTO();
            await _Dbcontext.Stock.AddAsync(stockModel);
            await _Dbcontext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDTO());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockRequest stockDTO)
        {
            var stockModel = await _Dbcontext.Stock.FirstOrDefaultAsync(x => x.Id == id);

            if (stockModel == null)
                return NotFound();

            stockModel.Symbol = stockDTO.Symbol;
            stockModel.CompanyName = stockDTO.CompanyName;
            stockModel.Purchase = stockDTO.Purchase;
            stockModel.LastDiv = stockDTO.LastDiv;
            stockModel.Industry = stockDTO.Industry;
            stockModel.MarketCap = stockDTO.MarketCap;

            await _Dbcontext.SaveChangesAsync();
            return Ok(stockModel.ToStockDTO());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var stockModel = await _Dbcontext.Stock.FirstOrDefaultAsync(x => x.Id == id);

            if (stockModel == null)
                return NotFound();

            _Dbcontext.Stock.Remove(stockModel);
            await _Dbcontext.SaveChangesAsync();

            return NoContent();
        }
    }
}