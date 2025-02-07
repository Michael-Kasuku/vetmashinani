using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using vetmashinani.Server.DTO;
using vetmashinani.Server.Models;

namespace vetmashinani.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FarmerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly JwtHandler _jwtHandler;
        private readonly RoleManager<IdentityRole> _roleManager;

        public FarmerController(
            ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            JwtHandler jwtHandler)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
            _jwtHandler = jwtHandler;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            var user = await _userManager.FindByNameAsync(loginRequest.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginRequest.Password))
            {
                return Unauthorized(new LoginResult()
                {
                    Success = false,
                    Message = "Invalid Email or Password."
                });
            }
            // Check if the user is in the "Farmer" role
            var isVet = await _userManager.IsInRoleAsync(user, "Farmer");
            if (!isVet)
            {
                return Unauthorized(new LoginResult()
                {
                    Success = false,
                    Message = "Access denied. You must be a Farmer to log in."
                });
            }

            var secToken = await _jwtHandler.GetTokenAsync(user);
            var jwt = new JwtSecurityTokenHandler().WriteToken(secToken);
            return Ok(new LoginResult()
            {
                Success = true,
                Message = "Login successful",
                Token = jwt
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateFarmer([FromBody] ApplicationUser newUser)
        {
            string roleFarmer = "Farmer";

            // Ensure the "Veterinarian" role exists
            if (await _roleManager.FindByNameAsync(roleFarmer) == null)
            {
                await _roleManager.CreateAsync(new IdentityRole(roleFarmer));
            }

            // Check if the user already exists
            if (await _userManager.FindByNameAsync(newUser.Email) != null)
            {
                return Conflict(new { message = "User already exists!" });
            }

            // Create the new Vet user
            var userVet = new ApplicationUser
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                FullName = newUser.FullName,
                UserName = newUser.Email,
                Email = newUser.Email,
                JobTitle = newUser.JobTitle,
                Location = newUser.Location,
                EmailConfirmed = true,
                LockoutEnabled = false
            };

            //Assign  the Password to the User
            await _userManager.CreateAsync(userVet, newUser.PasswordHash);

            // Assign the "Farmer" role
            await _userManager.AddToRoleAsync(userVet, roleFarmer);

            // Save changes again after role assignment
            await _context.SaveChangesAsync();

            return Ok(new { message = "Farmer Account created successfully!" });
        }
    }
}
