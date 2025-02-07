namespace vetmashinani.Server.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public string? Host { get; set; }
        public string? Guest { get; set; }
        public string? Status { get; set; }
        public DateTime dateAdded { get; set; } = DateTime.Now;
    }
}
