using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using vetmashinani.Server.DTO;
using vetmashinani.Server.Models;

namespace vetmashinani.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly JwtHandler _jwtHandler;

        public AccountController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, JwtHandler jwtHandler)
        {
            _context = context;
            _userManager = userManager;
            _jwtHandler = jwtHandler;
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromForm] UpdateProfileRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Email))
            {
                return BadRequest(new { message = "Invalid user data." });
            }

            // Retrieve the user by email
            var currentUser = await _userManager.FindByEmailAsync(request.Email);

            if (currentUser == null)
            {
                return NotFound(new { message = "User not found." });
            }

            // Process the profile picture
            if (request.ProfilePicture != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await request.ProfilePicture.CopyToAsync(memoryStream);
                    currentUser.ProfilePicture = memoryStream.ToArray();
                }
            }

            // Save changes to the database
            var result = await _userManager.UpdateAsync(currentUser);

            if (!result.Succeeded)
            {
                // Include detailed errors from the result
                var errors = string.Join("; ", result.Errors.Select(e => e.Description));
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"Error updating user profile: {errors}" });
            }

            return Ok(new { message = "Profile updated successfully." });
        }


        [HttpGet]
        public async Task<IActionResult> getProfileImage(string Email)
        {
            if (string.IsNullOrEmpty(Email))
            {
                return BadRequest("Invalid user data.");
            }

            // Retrieve the user by email
            var currentUser = await _userManager.FindByEmailAsync(Email);

            if (currentUser == null)
            {
                return NotFound("User not found.");
            }

            // Check if the user has a profile picture
            if (currentUser.ProfilePicture == null || currentUser.ProfilePicture.Length == 0)
            {
                return NotFound("Profile picture not found.");
            }

            // Return the profile picture
            return File(currentUser.ProfilePicture, "image/png");
        }

        [HttpGet]
        public async Task<IActionResult> getFarmers()
        {
            string roleFarmer = "Farmers";

            var users = await _context.ApplicationUsers.ToListAsync();

            // Retrieve all users and filter those who have the "Farmer" role
            var farmers = users
                .Where(u => _userManager.GetRolesAsync(u).Result.Contains(roleFarmer))
                .Select(u => new
                {
                    Id = u.Id,
                    Name = u.FullName,
                    JobTitle = u.JobTitle,
                    Location = u.Location,
                    Email = u.Email
                })
                .ToList();

            return Ok(farmers);
        }

        [HttpGet]
        public async Task<IActionResult> getVets()
        {
            string roleVeterinarian = "Veterinarian";

            var users = await _context.ApplicationUsers.ToListAsync();

            // Retrieve all users and filter those who have the "Veterinarian" role
            var vets = users
                .Where(u => _userManager.GetRolesAsync(u).Result.Contains(roleVeterinarian))
                .Select(u => new
                {
                    Id = u.Id,
                    Name = u.FullName,
                    JobTitle = u.JobTitle,
                    Location = u.Location,
                    Email = u.Email
                })
                .ToList();

            return Ok(vets);
        }

        [HttpPost]
        public async Task<IActionResult> AddAppointment([FromBody] Appointment appointment)
        {
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(AddAppointment), new { id = appointment.Id }, appointment);
        }

        [HttpPut]
        public async Task<IActionResult> CancelAppointment(CancelAppointmentRequest cancelAppointmentRequest)
        {
            var selectedAppointment = await _context.Appointments.FirstOrDefaultAsync(a => a.Id == cancelAppointmentRequest.Id);

            if (selectedAppointment == null)
            {
                return NotFound(new { message = "Appointment not found." });
            }

             selectedAppointment.Status = cancelAppointmentRequest.Status;            

            await _context.SaveChangesAsync();

            return Ok(new { message = "Appointment cancelled successfully." });
        }

        [HttpGet]
        public async Task<IActionResult> GetAppointments(string Email)
        {
            var appointments = await _context.Appointments
                .Where(a => a.Host == Email || a.Guest == Email) // Check both Host and Guest columns
                .Select(a => new
                {
                    Id = a.Id,
                    Description = a.Description,
                    Host = a.Host,
                    Guest = a.Guest,
                    Status = a.Status,
                    dateAdded = a.dateAdded,
                })
                .ToListAsync();

            return Ok(appointments);
        }

        [HttpPut]
        public async Task<IActionResult> ApproveAppointment(ApproveAppointmentRequest approveAppointmentRequest)
        {
            var selectedAppointment = await _context.Appointments.FirstOrDefaultAsync(a => a.Id == approveAppointmentRequest.Id);

            if (selectedAppointment == null)
            {
                return NotFound(new { message = "Appointment not found." });
            }

            selectedAppointment.Status = approveAppointmentRequest.Status;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Appointment approved successfully." });
        }

        [HttpGet]
        public async Task<IActionResult> GetComments(int appointmentId,string senderEmail, string receiverEmail)
        {
            try
            {
                var comments = await _context.Comments
                    .Where(comment =>
                        (comment.Id==appointmentId&&comment.Sender == senderEmail && comment.Receiver == receiverEmail) ||
                        (comment.Id == appointmentId && comment.Sender == receiverEmail && comment.Receiver == senderEmail))
                    .OrderBy(comment => comment.SentAt)
                    .ToListAsync();

                return Ok(comments);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving chats: {ex.Message}");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddComment([FromBody] Comment comment)
        {
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(AddComment), new { id = comment.Id }, comment);
        }
    }
}
