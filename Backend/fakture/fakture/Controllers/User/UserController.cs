using fakture.Controllers.User.UserDtos;
using fakture.Controllers.User.UserRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System.Runtime.InteropServices.Marshalling;

namespace fakture.Controllers.User
{
    public class UserController:Controller
    {
        private IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("User/Login")]
        public async Task<ActionResult<LoginResponseDto>> Login([FromBody]LoginDto dto)
        {
            return Ok(await _userRepository.Login(dto));
        }
        [HttpPost("User/Registration")]
        public async Task<ActionResult<RegistrationResponseDto>> Registration([FromBody]RegistrationDto dto)
        {
            return Ok(await _userRepository.Registration(dto));
        }

      
    }
}
