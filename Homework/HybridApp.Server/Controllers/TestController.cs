using Microsoft.AspNetCore.Mvc;

namespace HybridApp.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { message = "Бэкенд ASP.NET Core на связи!", time = DateTime.Now });
    }
}