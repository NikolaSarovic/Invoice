using fakture.Controllers.User.UserDtos;
using fakture.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace fakture.Controllers.User.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<Korisnik> userManager;

        public UserRepository(UserManager<Korisnik> userManager,IConfiguration configuration)
        {
            this.userManager = userManager;
            _configuration = configuration;
        }

        public async Task<LoginResponseDto> Login(LoginDto loginDto)
        {
            var korisnik = await userManager.FindByEmailAsync(loginDto.Email);
            if (korisnik == null)
                return new LoginResponseDto
                {
                    Success = false,
                    Message = "Korisnik sa unesenom email adresom ne postoji"
                };
            if (await userManager.CheckPasswordAsync(korisnik, loginDto.Password))
            {
                Console.WriteLine(korisnik.Id);
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, korisnik.Email),
                    new Claim(ClaimTypes.NameIdentifier, korisnik.Id),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Aud, _configuration["JWT:ValidAudience"]),
                    new Claim(JwtRegisteredClaimNames.Iss, _configuration["JWT:ValidIssuer"])
                };
                var userRoles = await userManager.GetRolesAsync(korisnik);
                foreach (var role in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, role));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidAudience"],
                    audience: _configuration["JWT:ValidIssuer"],
                    expires: DateTime.Now.AddMinutes(120),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                return new LoginResponseDto
                {
                    Success = true,
                    Message = "Pristup uspjesan",
                    Token = tokenString,
                };
            }
            return new LoginResponseDto
            {
                Success = false,
                Message = "Pogresna lozinka"
            };
        }

        public async Task<RegistrationResponseDto> Registration(RegistrationDto registrationDto)
        {
            var userEmail = await userManager.FindByEmailAsync(registrationDto.Email);
            if (userEmail != null)
            {
                return new RegistrationResponseDto
                {
                    Success = false,
                    Message = "Korsnik postoji sa ovom mejl adresom"
                };
            }
            Korisnik korisnik = new Korisnik()
            {
                UserName = registrationDto.Ime,
                LastName=registrationDto.Prezime,
                Email = registrationDto.Email,
                PhoneNumber = registrationDto.BrojTelefona,
                SecurityStamp = Guid.NewGuid().ToString()
            };
            var newUser = await userManager.CreateAsync(korisnik, registrationDto.Lozinka);
            if (!newUser.Succeeded)
            {
                return new RegistrationResponseDto
                {
                    Success = false,
                    Message = "Greska pri kreiranju korisnika"
                };
            }
            await userManager.AddToRoleAsync(korisnik, "Korisnik");
            return new RegistrationResponseDto
            {
                Success = true,
                Message = "Uspjesna registracija"
            };

            
        }
    }
 }

