using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HRPaver_Social_Media.Models;
using HRPaver_Social_Media.Models.Entity;

namespace HRPaver_Social_Media.Service
{
	public class PostService
	{
		#region Member variables and constructor
		private readonly IAppDataContext _db;

		public PostService(IAppDataContext dbContext)
		{
			_db = dbContext ?? new ApplicationDbContext();
		}
		#endregion
		public IEnumerable<Post> GetAllPostsByUserId(string Id)
		{
			var result = (from f in _db.Contacts
						  where f.User.Id == Id
						  join p in _db.Posts on f.Friend.Id equals p.User.Id
						  select p);
			var result2 = (from p in _db.Posts
						   where p.User.Id == Id
						   select p);
			var together = result.Concat(result2);
			return together;
		}

		public IEnumerable<Post> GetAllPostsByGroupId(int Id)
		{
			var result = (from p in _db.Posts
						  where p.GroupId.Id == Id
						  select p).OrderByDescending( x => x.PostTime);
			return result;
		}

		public IEnumerable<Post> GetAllPosts()
		{
			return _db.Posts.ToList();
		}

		public Post GetPostById(int Id)
		{
			var result = (from p in _db.Posts
						  where p.Id == Id
						  select p).SingleOrDefault();
			return result;
		}

		public void UpdateRatePost(Post p)
		{
			var result = (from posts in _db.Posts
						  where posts.Id == p.Id
						  select posts).SingleOrDefault();
			result.Rating = p.Rating;
			
			_db.SaveChanges();
			
		}
		public void AddPost(Post p)
		{
			_db.Posts.Add(p);
			_db.SaveChanges();
		}

        public void RemovePost(Post p)
        {
            _db.Posts.Remove(p);
            _db.SaveChanges();
        }
	}
}