using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRPaver_Social_Media.Models.Entity
{
	public class Event
	{
		public int Id { get; set; }
		public virtual ApplicationUser Creator { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public virtual Photo Photo { get; set; }
		public int MaxCapacity { get; set; }
		public DateTime SignupStart { get; set; }
		public DateTime SignupEnd { get; set; }
		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }
	}
}