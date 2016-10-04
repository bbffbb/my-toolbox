using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRPaver_Social_Media.Models.Entity
{
	public class Group
	{
		public int Id { get; set; }
		public virtual ApplicationUser Creator { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public virtual Photo Photo { get; set; }
		public int Type { get; set; }
	}
}