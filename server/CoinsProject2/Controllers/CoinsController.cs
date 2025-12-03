using CoinsProject2.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Drawing;
using System.Text.Json;

namespace CoinsProject2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoinsController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey = "071f5bebfd0397c4a09e0038db318c4f";

        public CoinsController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }


        private async Task<Coins?> GetCoinByDateAsync(string coinName, DateTime date)
        {
            string formattedDate = date.ToString("yyyy-MM-dd");
            string url = $"https://api.exchangeratesapi.io/v1/{formattedDate}?access_key={_apiKey}";

            try
            {
                var response = await _httpClient.GetAsync(url);
                if (!response.IsSuccessStatusCode)
                    return null;

                var content = await response.Content.ReadAsStringAsync();
                var json = JsonDocument.Parse(content);

                if (json.RootElement.TryGetProperty("success", out var successProp) && successProp.GetBoolean())
                {
                    var rates = json.RootElement.GetProperty("rates");


                    if (rates.TryGetProperty(coinName.ToUpper(), out var value))
                    {
                        return new Coins
                        {
                            date = date,
                            price = value.GetDecimal()
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching data for {date:yyyy-MM-dd}: {ex.Message}");
            }
            return null;
        }


        private async Task<List<Coins>> GetCoinsInRange(string coinName, int daysBack)
        {
            var results = new List<Coins>();
            var today = DateTime.Today;
            decimal? lastValidPrice = null;

            for (int i = 1; i <= daysBack; i++)
            {
                var date = today.AddDays(-i);
                var result = await GetCoinByDateAsync(coinName, date);

                if (result != null)
                {
                    lastValidPrice = result.price;
                    results.Add(result);
                }
                else if (lastValidPrice != null)
                {

                    results.Add(new Coins
                    {

                        date = date,
                        price = lastValidPrice.Value
                    });
                }
                else
                {

                    results.Add(new Coins
                    {
                        date = date,
                        price = 0
                    });
                }
            }

            return results.OrderBy(c => c.date).ToList();
        }

        [HttpGet("week/{coinName}")]
        public async Task<IActionResult> GetWeek(string coinName)
        {
            var result = await GetCoinsInRange(coinName, 7);
            return Ok(result);
        }

        [HttpGet("month/{coinName}")]
        public async Task<IActionResult> GetMonth(string coinName)
        {
            var result = await GetCoinsInRange(coinName, 30);
            return Ok(result);
        }

        [HttpGet("halfyear/{coinName}")]
        public async Task<IActionResult> GetHalfYear(string coinName)
        {
            var result = await GetCoinsInRange(coinName, 182);
            return Ok(result);
        }

        [HttpGet("year/{coinName}")]
        public async Task<IActionResult> GetYear(string coinName)
        {
            var result = await GetCoinsInRange(coinName, 365);
            return Ok(result);
        }
       
    }
}

