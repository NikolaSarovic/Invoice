using fakture.Controllers.User.UserDtos;

namespace fakture.Controllers.User.UserRepository
{
    public interface IUserRepository
    {
        public Task<LoginResponseDto> Login(LoginDto loginDto);
        public Task<RegistrationResponseDto> Registration(RegistrationDto registrationDto);
    }
}
