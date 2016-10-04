using HRPaver_Social_Media.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRPaver_Social_Media.Models.Entity
{
	public class Contact
	{
		public int Id { get; set; }
		public virtual ApplicationUser User { get; set; }
		public virtual ApplicationUser Friend { get; set; }
		public bool Confirmed { get; set; }
		public bool IsFriend { get; set; }
	}
}