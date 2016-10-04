using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRPaver_Social_Media.Models
{
	public class ContactViewModel
	{
		public int Id { get; set; }
		public ApplicationUser User { get; set; }
		public ApplicationUser Friend { get; set; }
		public bool confirmed { get; set; }
		public bool isFriend { get; set; }
	}
}