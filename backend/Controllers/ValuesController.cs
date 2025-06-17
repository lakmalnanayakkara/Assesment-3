using backend.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text;
using backend.model;
using backend.Repository;

namespace backend.Controllers
{
    [Route("api/app")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private AppDbContext dbContext;
        private readonly HttpClient _httpClient;

        public ValuesController(IHttpClientFactory httpClientFactory, AppDbContext dbContext)
        {
            _httpClient = httpClientFactory.CreateClient();
            this.dbContext = dbContext;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] DTO.LoginRequest loginRequest)
        {
            var externalApiRequest = new ExternalApiRequest
            {
                API_Action = "GetLoginData",
                Company_Code = loginRequest.Username,
                API_Body = new ApiBody
                {
                    Username = loginRequest.Username,
                    Pw = loginRequest.Password
                }
            };

            var requestJson = JsonSerializer.Serialize(externalApiRequest);
            var content = new StringContent(requestJson, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("https://ez-staging-api.azurewebsites.net/api/External_Api/POS_Api/Invoke", content);

            if (!response.IsSuccessStatusCode)
            {
                return Unauthorized("Login failed");
            }

            var responseContent = await response.Content.ReadAsStringAsync();
            return Ok(responseContent);
        }

        [HttpPost("save-user-locations")]
        public IActionResult SaveUserLocations([FromBody] List<UserLocationDTO> locations)
        {
            if (locations == null || !locations.Any())
                return BadRequest("No locations received");
            int i = 0;
            foreach (var loc in locations)
            {
                var locationEntity = new UserLocation
                {
                    LocationID = ++i,
                    LocationCode = loc.Location_Code,
                    LocationName = loc.Location_Name,
                };

                dbContext.UserLocation.Add(locationEntity);
            }

            dbContext.SaveChanges();

            return Ok(new { message = "Locations saved successfully" });
        }

    }
}
