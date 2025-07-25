namespace AssociationService.Model
{
    // Models/Association.cs
    public class Association
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Patent { get; set; } // License number
        public string Type { get; set; }
        public string Contact { get; set; }
        public string Address { get; set; }
    }
}
