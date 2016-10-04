using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRPaver_Social_Media.Models.Entity
{
	public class Photo
	{
		public int Id { get; set; }
		public string Path { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
	}
}