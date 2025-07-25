namespace LoginService.Model
{
   
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } // Note: In production, store only hashed passwords
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Role { get; set; } // "Admin", "Partner", "Association", etc.
    }
}
