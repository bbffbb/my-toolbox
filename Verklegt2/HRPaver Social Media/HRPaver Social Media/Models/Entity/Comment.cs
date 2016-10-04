using HRPaver_Social_Media.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRPaver_Social_Media.Models.Entity
{
	public class Comment
	{
		public int Id { get; set; }
		public string Author { get; set; }
		public string AuthorId { get; set; }
		//public virtual Comment Parent { get; set; } //ef við viljum fara út í hierarchy
		public string AuthorPhotoFileName { get; set; }
		public virtual Post Post { get; set; }
		public string Body { get; set; }
		public DateTime PostTime { get; set; }
		public int Rating { get; set; }
		public bool UserAnonymous { get; set; }
		public virtual ICollection<Photo> Photos { get; set; }
		public bool CommentOrQuestion { get; set; }
	}
}