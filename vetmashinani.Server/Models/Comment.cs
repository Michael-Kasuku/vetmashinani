namespace vetmashinani.Server.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string? AppointmentId { get; set; }
        public string? Sender { get; set; }
        public string? Receiver { get; set; }
        public string? Content { get; set; }
        public DateTime SentAt { get; set; } = DateTime.Now;
    }
}
