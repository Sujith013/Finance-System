namespace api.interfaces
{
    public interface IRedisService
    {
        public Task SetUserSessionAsync<T>(string userId, T data, TimeSpan? expiry = null);
        public Task<T?> GetUserSessionAsync<T>(string userId);
        public Task RemoveUserSessionAsync(string userId);
    }
}