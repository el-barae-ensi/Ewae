using AssociationService.Data;
using AssociationService.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AssociationService.Controller
{
    // Controllers/AssociationsController.cs
    [ApiController]
    [Route("api/[controller]")]
    public class AssociationsController : ControllerBase
    {
        private readonly AssociationDbContext _context;

        public AssociationsController(AssociationDbContext context)
        {
            _context = context;
        }

        // CRUD operations 
        [HttpGet]
        public async Task<IActionResult> GetAll() { return Ok(await _context.Associations.ToListAsync()); }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id) {
            var association = await _context.Associations.FindAsync(id);
            if (association == null) return NotFound();
            return Ok(association);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Association association)
        {
            _context.Associations.Add(association);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = association.Id }, association);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Association association)
        {
            if (id != association.Id) return BadRequest();

            _context.Entry(association).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var association = await _context.Associations.FindAsync(id);
            if (association == null) return NotFound();

            _context.Associations.Remove(association);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}







