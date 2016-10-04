using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HRPaver_Social_Media.Models;
using HRPaver_Social_Media.Models.Entity;

namespace HRPaver_Social_Media.Service
{
	public class GroupService
	{
		#region Member variables and constructor
		private readonly IAppDataContext _db;

		public GroupService(IAppDataContext dbContext)
		{
			_db = dbContext ?? new ApplicationDbContext();
		}
		#endregion
        
		public Group GetGroup(int id)
        {
            var result = (from x in _db.Groups
                          where x.Id == id
                          select x).SingleOrDefault();
           
            return result;
        }
        
		public IEnumerable<Group> GetAllGroups()
        {
			var result = (from x in _db.Groups select x);
			return result;
        }

	    public IEnumerable<Group> GetAllGroupsByUser(ApplicationUser user)
	    {
	        var result = (from x in _db.GroupList
	                     where x.User.Id == user.Id
						 join g in _db.Groups on x.Group equals g
	                     select g).Distinct();

	        return result;
	    }

		public IEnumerable<Group> GetAllGroupsUsersNotIn(ApplicationUser user)
		{
			var result = (from x in _db.Groups
						  select x);

			return result.Except(GetAllGroupsByUser(user));
		}

		public IEnumerable<ApplicationUser> GetAllUsersByGroupId(int Id)
		{
			var result = (from g in _db.GroupList
						  where g.Group.Id == Id
						  select g.User);
			return result;
		}

		public IEnumerable<Group> GetGroupsBySearchTerm(string term)
		{
			var result = (from g in _db.Groups
						  where g.Name.StartsWith(term)
						  select g);
			return result;
		}
        
        public void AddGroup(Group g)
        {
            _db.Groups.Add(g);
            _db.SaveChanges();
        }

        public void Remove(Group g)
        {
            _db.Groups.Remove(g);
            _db.SaveChanges();
        }
	}
}