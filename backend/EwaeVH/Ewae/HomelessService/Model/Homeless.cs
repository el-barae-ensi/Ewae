namespace HomelessService.Model
{
    // Models/Homeless.cs
    public class Homeless
    {
        public int Id { get; set; }
        public int UserId { get; set; } // Reference to User who registered this record
        public DateTime DateOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
        public string Fingerprint { get; set; }
        public string Photo { get; set; }
        public string Characteristics { get; set; }
        public DateTime FindingDate { get; set; }
    }
}
