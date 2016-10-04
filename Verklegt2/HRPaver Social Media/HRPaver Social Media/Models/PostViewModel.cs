using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRPaver_Social_Media.Models
{
	public class PostViewModel
	{
		public PostViewModel() 
		{
			this.StatusOrQuestion = true;
		}
		public PostViewModel(bool statusOrQuestion)
		{
			this.StatusOrQuestion = statusOrQuestion;
		}
		public int Id { get; set; }
		public string Author { get; set; }
		public string AuthorId { get; set; }
		public string AuthorPhotoFileName { get; set; }
		public List<string> PhotoFilename { get; set; }
		public ICollection<PostViewModel> Replies { get; set; }
		public DateTime PostTime { get; set; }
		[Required]
		[StringLength(2500, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 1)]
		[Display(Name="Text")]
		public string PostText { get; set; }
		public int Rateing { get; set; }
		public bool UserAnonymous { get; set; }
		public bool StatusOrQuestion { get; set; }
		public int GroupId { get; set; }
		public string GroupName { get; set; }
	}
}