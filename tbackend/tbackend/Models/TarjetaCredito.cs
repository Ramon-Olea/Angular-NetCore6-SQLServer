using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.X509Certificates;

namespace tbackend.Models
{
    public class TarjetaCredito
    {
        public int Id { get; set; }
        [Required]
        public string? Titulo { get; set; }
        [Required]

        public string? NumeroTarjeta { get; set; }
        [Required]

        public string? FechaExpiracion { get; set; }
        [Required]
        public string? Cvv { get; set; }


    }
}
