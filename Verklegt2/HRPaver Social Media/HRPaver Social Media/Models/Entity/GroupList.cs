using HRPaver_Social_Media.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRPaver_Social_Media.Models.Entity
{
	public class GroupList
	{
		public int ID { get; set; }
		public virtual ApplicationUser User { get; set; }
		public virtual Group Group { get; set; }
	}
}