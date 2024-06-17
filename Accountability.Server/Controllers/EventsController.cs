using Accountability.Server.Data;
using Accountability.Server.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Accountability.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public EventsController(ApplicationDbContext context)
        {
            _context = context;
        }


        // GET: api/<EventsController>
        [HttpGet]
        public IActionResult Get()
        {
            var events = _context.Events.Select((e) => new EventDTO
            {
                StartTime = e.StartTime,
                EndTime = e.EndTime,
                Comment = e.Comment
            }).ToList();
            return StatusCode(200, events);
        }

        // POST api/<EventsController>
        [HttpPost]
        public IActionResult Post([FromBody] Models.Event post)
        {
            _context.Events.Add(post);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.SaveChanges();
            return StatusCode(201, post);
        }

        // PUT api/<EventsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<EventsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
