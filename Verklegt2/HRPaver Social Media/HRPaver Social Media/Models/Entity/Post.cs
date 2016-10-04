using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRPaver_Social_Media.Models.Entity
{
	public class Post
	{
		public int Id { get; set; }
		public virtual Group GroupId { get; set; }
		public virtual ApplicationUser User { get; set; }
		public virtual ICollection<Photo> Photos { get; set; }
		public DateTime PostTime { get; set; }
		public string PostTitle { get; set; }
		public string PostText { get; set; }
		public int Rating { get; set; }
		public bool UserAnonymous { get; set; }
		public bool StatusOrQuestion { get; set; }
	}
}