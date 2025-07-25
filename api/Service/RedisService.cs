using System.Text.Json;
using System.Threading.Tasks;
using api.interfaces;
using Microsoft.Extensions.Caching.Distributed;

namespace api.Service
{
    public class RedisService:IRedisService
    {
        private readonly IDistributedCache _cache;

        public RedisService(IDistributedCache cache)
        {
            _cache = cache;
        }

        public async Task SetUserSessionAsync<T>(string userId, T data, TimeSpan? expiry = null)
        {
            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = expiry ?? TimeSpan.FromHours(1)
            };

            var jsonData = JsonSerializer.Serialize(data);
            await _cache.SetStringAsync($"user:{userId}", jsonData, options);
        }

        public async Task<T?> GetUserSessionAsync<T>(string userId)
        {
            var jsonData = await _cache.GetStringAsync($"user:{userId}");

            if (string.IsNullOrEmpty(jsonData))
                return default;

            return JsonSerializer.Deserialize<T>(jsonData);
        }

        public async Task RemoveUserSessionAsync(string userId)
        {
            await _cache.RemoveAsync($"user:{userId}");
        }
    }
}
