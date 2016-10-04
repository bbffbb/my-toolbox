using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Web.WebPages.Html;

namespace HRPaver_Social_Media.Models
{
	public class GroupViewModel
	{
		public GroupViewModel()
		{
			Types = new List<SelectListItem>();
			Types.Add(new SelectListItem { Text = "-Select-", Value = "0", Selected = true });
			Types.Add(new SelectListItem { Text = "Public", Value = "1" });
			Types.Add(new SelectListItem { Text = "Closed", Value = "2" });
			Types.Add(new SelectListItem { Text = "Private", Value = "3" });
			Types.Add(new SelectListItem { Text = "Course", Value = "4" });
		}
		public int Id { get; set; }
        [Required]
        [StringLength(21, ErrorMessage = "The {0} must be between {2} and {1} characters in length", MinimumLength = 3)]
       
        public string Name { get; set; }
        [StringLength(300, ErrorMessage = "The {0} must be less than {1} characters in length")]
		public string Description { get; set; }

		[Required(ErrorMessage = "You have to choose a type")]
		[Range(1,4)]
		public string Type { get; set; }
		public List<SelectListItem> Types { get; set; }
		public ApplicationUser Creator { get; set; }
		public string photoPath { get; set; }
        public List<ApplicationUser> Members { get; set; }
	}
}