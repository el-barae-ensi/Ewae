using HomelessService.Data;
using HomelessService.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomelessService.Controller
{
    // Controllers/HomelessController.cs
    [ApiController]
    [Route("api/[controller]")]
    public class HomelessController : ControllerBase
    {
        private readonly HomelessDbContext _context;

        public HomelessController(HomelessDbContext context)
        {
            _context = context;
        }

        //CRUD Opperation
        [HttpGet]
        public async Task<IActionResult> GetAll() { return Ok(await _context.Homelesses.ToListAsync()); }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var homeless = await _context.Homelesses.FindAsync(id);
            if (homeless == null) return NotFound();
            return Ok(homeless);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Homeless homeless)
        {
            _context.Homelesses.Add(homeless);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = homeless.Id }, homeless);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Homeless homeless)
        {
            if (id != homeless.Id) return BadRequest();

            _context.Entry(homeless).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var homeless = await _context.Homelesses.FindAsync(id);
            if (homeless == null) return NotFound();

            _context.Homelesses.Remove(homeless);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}









