namespace fakture.Controllers.User.UserDtos
{
    public class LoginResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string? Token { get; set; }
    }
}
