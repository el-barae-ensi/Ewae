namespace PartnerService.Model
{
    // Models/Partner.cs
    public class Partner
    {
        public int Id { get; set; }
        public int UserId { get; set; } // Reference to User in LoginService
        public string Name { get; set; }
        public bool ActiveField { get; set; }
        public string Description { get; set; }
        public string Logo { get; set; } // URL or base64 encoded image
    }
}
