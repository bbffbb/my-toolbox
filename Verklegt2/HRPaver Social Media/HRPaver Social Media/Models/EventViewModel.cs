using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace HRPaver_Social_Media.Models
{
	public class EventViewModel
	{
		public Type Type;
		public int Id { get; set; }
        [StringLength(21, ErrorMessage = "The {0} must be between {2} and {1} characters in length", MinimumLength = 3)]
        public string name { get; set; }
        [StringLength(300, ErrorMessage = "The {0} must be less than {1} characters in length")]
        public string description { get; set; }
        public ApplicationUser Creator { get; set; }
        public string photoPath { get; set; }
        public int MaxCapacity { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:mm/dd/yyyy}")]
        public DateTime SignupStart { get; set; }
		[DataType(DataType.Date)]
		[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:mm/dd/yyyy}")]
        public DateTime SignupEnd { get; set; }
		[DataType(DataType.Time)]
		[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:HH:SS}")]
        public DateTime StartTime { get; set; }
		[DataType(DataType.Time)]
		[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:HH:SS}")]
        public DateTime EndTime { get; set; }
        public List<ApplicationUser> Members { get; set; }
	}
}