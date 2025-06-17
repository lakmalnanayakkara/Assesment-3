using backend.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text;

namespace backend.Controllers
{
    [Route("api/app")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public ValuesController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
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
    }
}
