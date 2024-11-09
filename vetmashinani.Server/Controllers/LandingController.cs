using Microsoft.AspNetCore.Mvc;

namespace vetkonnect.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Adjusted route to avoid conflicts with the frontend
    public class LandingController : ControllerBase
    {
        private readonly ILogger<LandingController> _logger;
        private readonly IWebHostEnvironment _env;

        public LandingController(ILogger<LandingController> logger, IWebHostEnvironment env)
        {
            _logger = logger;
            _env = env;
        }

        [HttpGet("{*page}")] // This catches all routes
        public IActionResult Get(string? page)
        {
            // Serve the index.html for any request
            var filePath = Path.Combine(_env.WebRootPath, "index.html");
            if (System.IO.File.Exists(filePath))
            {
                return PhysicalFile(filePath, "text/html");
            }
            else
            {
                return NotFound();
            }
        }
    }
}
