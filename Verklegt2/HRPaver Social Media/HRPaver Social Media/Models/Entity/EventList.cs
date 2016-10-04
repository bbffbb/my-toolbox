using HRPaver_Social_Media.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRPaver_Social_Media.Models.Entity
{
	public class EventList
	{
		public int Id { get; set; }
		public virtual ApplicationUser User { get; set; }
		public virtual Event Event { get; set; }
		public DateTime JoinTime { get; set; }
	}
}