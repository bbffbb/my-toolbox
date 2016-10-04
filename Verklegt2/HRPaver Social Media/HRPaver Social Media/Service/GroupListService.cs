using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HRPaver_Social_Media.Models;
using HRPaver_Social_Media.Models.Entity;


namespace HRPaver_Social_Media.Service
{
	public class GroupListService
	{
       #region Member variables and constructor
		private readonly IAppDataContext _db;

		public GroupListService(IAppDataContext dbContext)
		{
			_db = dbContext ?? new ApplicationDbContext();
		}
		#endregion

        public List<ApplicationUser> GetAllUsersInGroup(int groupId)
	    {
	        var result = (from g in _db.GroupList
	                    where g.Group.Id == groupId
	                    select g.User).ToList();

            return result;
	    }

		public GroupList getGroupList(int Id, ApplicationUser user)
		{

			var result = (from g in _db.GroupList
						  where g.User.Id == user.Id &&
						  g.Group.Id == Id
						  select g).FirstOrDefault();
			return result;
		}

		public IEnumerable<Group> getGroupsByUser(ApplicationUser user)
		{
			var result = (from g in _db.GroupList
						  where g.User.Id == user.Id
						  select g.Group);
			return result;
		}

        public void AddGroupToList(GroupList gl)
        {
            _db.GroupList.Add(gl);
            _db.SaveChanges();
        }

		public void LeaveGroup(GroupList gl)
		{
			_db.GroupList.Remove(gl);
			_db.SaveChanges();
		}
	}
}