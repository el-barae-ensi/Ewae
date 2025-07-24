using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using iwaa.Services;
using iwaa.DTOs;

namespace iwaa.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(AuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logger = logger;
        }

        /// <summary>
        /// Authenticate user and return JWT token
        /// </summary>
        /// <param name="request">Login credentials</param>
        /// <returns>JWT token and user information</returns>
        [HttpPost("login")]
        public async Task<ActionResult<ApiResponse<LoginResponse>>> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
                return BadRequest(ApiResponse<LoginResponse>.ErrorResult("Données invalides", errors));
            }

            var result = await _authService.LoginAsync(request);

            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Register a new user account
        /// </summary>
        /// <param name="request">Registration details</param>
        /// <returns>JWT token and user information</returns>
        [HttpPost("register")]
        public async Task<ActionResult<ApiResponse<LoginResponse>>> Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
                return BadRequest(ApiResponse<LoginResponse>.ErrorResult("Données invalides", errors));
            }

            var result = await _authService.RegisterAsync(request);

            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Created("", result);
        }

        /// <summary>
        /// Get current user profile information
        /// </summary>
        /// <returns>User profile data</returns>
        [HttpGet("profile")]
        [Authorize]
        public async Task<ActionResult<ApiResponse<UserDto>>> GetProfile()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(ApiResponse<UserDto>.ErrorResult("Token invalide"));
            }

            var result = await _authService.GetUserProfileAsync(userId);

            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Update current user profile
        /// </summary>
        /// <param name="request">Profile update data</param>
        /// <returns>Success or error message</returns>
        [HttpPut("profile")]
        [Authorize]
        public async Task<ActionResult<ApiResponse>> UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
                return BadRequest(ApiResponse.ErrorResult("Données invalides", errors));
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(ApiResponse.ErrorResult("Token invalide"));
            }

            var result = await _authService.UpdateProfileAsync(userId, request);

            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Change user password
        /// </summary>
        /// <param name="request">Password change data</param>
        /// <returns>Success or error message</returns>
        [HttpPost("change-password")]
        [Authorize]
        public async Task<ActionResult<ApiResponse>> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
                return BadRequest(ApiResponse.ErrorResult("Données invalides", errors));
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(ApiResponse.ErrorResult("Token invalide"));
            }

            var result = await _authService.ChangePasswordAsync(userId, request);

            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Request password reset
        /// </summary>
        /// <param name="request">Email for password reset</param>
        /// <returns>Success message</returns>
        [HttpPost("forgot-password")]
        public async Task<ActionResult<ApiResponse>> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
                return BadRequest(ApiResponse.ErrorResult("Données invalides", errors));
            }

            var result = await _authService.ForgotPasswordAsync(request);

            // Always return success for security (don't reveal if email exists)
            return Ok(result);
        }

        /// <summary>
        /// Reset password with token
        /// </summary>
        /// <param name="request">Password reset data</param>
        /// <returns>Success or error message</returns>
        [HttpPost("reset-password")]
        public async Task<ActionResult<ApiResponse>> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
                return BadRequest(ApiResponse.ErrorResult("Données invalides", errors));
            }

            var result = await _authService.ResetPasswordAsync(request);

            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Refresh JWT token
        /// </summary>
        /// <param name="request">Current token and refresh token</param>
        /// <returns>New JWT token</returns>
        [HttpPost("refresh-token")]
        public async Task<ActionResult<ApiResponse<LoginResponse>>> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
                return BadRequest(ApiResponse<LoginResponse>.ErrorResult("Données invalides", errors));
            }

            var result = await _authService.RefreshTokenAsync(request);

            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Logout user (client should discard tokens)
        /// </summary>
        /// <returns>Success message</returns>
        [HttpPost("logout")]
        [Authorize]
        public ActionResult<ApiResponse> Logout()
        {
            // In a more sophisticated implementation, you might:
            // 1. Blacklist the current token
            // 2. Remove refresh tokens from database
            // 3. Log the logout event

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            _logger.LogInformation("User {UserId} logged out", userId);

            return Ok(ApiResponse.SuccessResult("Déconnexion réussie"));
        }

        /// <summary>
        /// Validate current token
        /// </summary>
        /// <returns>Token validity status</returns>
        [HttpGet("validate-token")]
        [Authorize]
        public ActionResult<ApiResponse<object>> ValidateToken()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var username = User.FindFirst(ClaimTypes.Name)?.Value;
            var role = User.FindFirst("role")?.Value;

            var tokenInfo = new
            {
                IsValid = true,
                UserId = userId,
                Username = username,
                Role = role,
                Permissions = User.FindAll("permission").Select(c => c.Value).ToList(),
                ExpiresAt = User.FindFirst("exp")?.Value
            };

            return Ok(ApiResponse<object>.SuccessResult(tokenInfo, "Token valide"));
        }

        /// <summary>
        /// Get user permissions
        /// </summary>
        /// <returns>List of user permissions</returns>
        [HttpGet("permissions")]
        [Authorize]
        public ActionResult<ApiResponse<List<string>>> GetPermissions()
        {
            var permissions = User.FindAll("permission").Select(c => c.Value).ToList();

            return Ok(ApiResponse<List<string>>.SuccessResult(permissions, "Permissions récupérées"));
        }

        /// <summary>
        /// Check if user has specific permission
        /// </summary>
        /// <param name="permission">Permission to check</param>
        /// <returns>True if user has permission, false otherwise</returns>
        [HttpGet("has-permission/{permission}")]
        [Authorize]
        public ActionResult<ApiResponse<bool>> HasPermission(string permission)
        {
            var hasPermission = User.FindAll("permission")
                .Any(c => c.Value.Equals(permission, StringComparison.OrdinalIgnoreCase));

            return Ok(ApiResponse<bool>.SuccessResult(hasPermission,
                hasPermission ? "Permission accordée" : "Permission refusée"));
        }
    }
}
