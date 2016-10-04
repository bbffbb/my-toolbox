using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;
using HRPaver_Social_Media.Models;
using HRPaver_Social_Media.Models.Entity;

namespace HRPaver_Social_Media.Service
{
	public class UserService
	{
		#region Member variables and constructor
		private readonly IAppDataContext _db;

		public UserService(IAppDataContext dbContext)
		{
			_db = dbContext ?? new ApplicationDbContext();
		}
		#endregion
		public ApplicationUser GetUser(string UserId)
		{
			var result = (from x in _db.Users
						  where x.Id == UserId
						  select x).SingleOrDefault();

			return result;
		}

		public IEnumerable<ApplicationUser> GetAllContacts(string UserId)
		{
			var result = (from c in _db.Contacts
						  where c.User.Id == UserId
						  join u in _db.Users on c.Friend.Id equals u.Id
						  select u);

			return result;
		}

		public IEnumerable<ApplicationUser> GetAllUsers(string Id)
		{
			var users = (from u in _db.Users
						 where u.Id != Id
						 select u).OrderBy(x => x.FullName).ToList();

            return users;
		}
        public bool AreFriends(string user1, string user2)
        {
            var result = (from c in _db.Contacts
                          where user1 == c.User.Id && user2 == c.Friend.Id ||
                                user2 == c.User.Id && user1 == c.Friend.Id 
                          select c).Any();
            return result;
        }

        public Contact GetContact(string user1, string user2){
            var result = (from c in _db.Contacts
                          where user1 == c.User.Id && user2 == c.Friend.Id
                          select c).Single();
            return result;
        }
		public IEnumerable<ApplicationUser> GetUsersBySearchTerm(string searchTerm)
		{
			var result = (from u in _db.Users
						  where u.FullName.StartsWith(searchTerm)
						  select u);
			return result;
		}

		public void UpdateUser(ApplicationUser a, Photo p)
		{
			var query = (from u in _db.Users
						 where u.Id == a.Id
						 select u).SingleOrDefault();

			query.Photo = p;

			_db.SaveChanges();
		}

		public void AddContact(Contact c)
		{
			_db.Contacts.Add(c);
			_db.SaveChanges();
		}

        public void RemoveContact(Contact c)
        {
            _db.Contacts.Remove(c);
            _db.SaveChanges();
        }
	}
}