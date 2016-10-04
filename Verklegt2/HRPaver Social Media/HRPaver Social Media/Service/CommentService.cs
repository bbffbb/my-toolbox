using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HRPaver_Social_Media.Models;
using HRPaver_Social_Media.Models.Entity;
using Microsoft.Ajax.Utilities;

namespace HRPaver_Social_Media.Service
{
	public class CommentService
	{
		#region Member variables and constructor
		private readonly IAppDataContext _db;

		public CommentService(IAppDataContext dbContext)
		{
			_db = dbContext ?? new ApplicationDbContext();
		}
		#endregion

		public IEnumerable<Comment> GetCommentsforPost(int Id)
		{
			var result = (from c in _db.Comments
						  where c.Post.Id == Id
						  select c);
			
			return result;
		}

		public void UpdatePhotoPath(string photopath, ApplicationUser user)
		{
			var query = (from c in _db.Comments
						 where c.AuthorId == user.Id
						 select c);

			foreach(var item in query)
			{
				item.AuthorPhotoFileName = photopath;
			}

			_db.SaveChanges();
		}
		public void AddComment(Comment c)
		{
			_db.Comments.Add(c);
			_db.SaveChanges();
		}

		public void RemoveComment(Comment c)
		{
			_db.Comments.Add(c);
			_db.SaveChanges();
		}
	}
}