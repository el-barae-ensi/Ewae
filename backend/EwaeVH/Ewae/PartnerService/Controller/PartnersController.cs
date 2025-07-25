using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PartnerService.Data;
using PartnerService.Model;

namespace PartnerService.Controller
{
    // Controllers/PartnersController.cs
    [ApiController]
    [Route("api/[controller]")]
    public class PartnersController : ControllerBase
    {
        private readonly PartnerDbContext _context;

        public PartnersController(PartnerDbContext context)
        {
            _context = context;
        }

        // CRUD operations
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Partners.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var partner = await _context.Partners.FindAsync(id);
            if (partner == null) return NotFound();
            return Ok(partner);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Partner partner)
        {
            _context.Partners.Add(partner);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = partner.Id }, partner);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Partner partner)
        {
            if (id != partner.Id) return BadRequest();

            _context.Entry(partner).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var partner = await _context.Partners.FindAsync(id);
            if (partner == null) return NotFound();

            _context.Partners.Remove(partner);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
