using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HRPaver_Social_Media.Models;
using HRPaver_Social_Media.Models.Entity;


namespace HRPaver_Social_Media.Service
{
    public class EventListService
    {
         #region Member variables and constructor
		private readonly IAppDataContext _db;

		public EventListService(IAppDataContext dbContext)
		{
			_db = dbContext ?? new ApplicationDbContext();
		}
		#endregion

        public List<ApplicationUser> GetAllUsersInEvent(int eventId)
        {
            var result = (from e in _db.EventsList
                          where e.Event.Id == eventId
                          select e.User).ToList();

            return result;
        }

        public EventList getEventList(int Id, ApplicationUser user)
        {
            var result = (from e in _db.EventsList
                              where e.User.Id == user.Id && e.Event.Id == Id
                              select e).FirstOrDefault();
           
            return result;
        }

		public void UpdateEventList(EventList el, ApplicationUser user)
		{
			EventList t = getEventList(el.Id, user);
			if (t != null)
			{
				t.Id = el.Id;
				t.Event = el.Event;
				t.JoinTime = el.JoinTime;
				t.User = el.User;
				_db.SaveChanges();
			}
		}

        public void AddEventToList(EventList el)
        {
            _db.EventsList.Add(el);
            _db.SaveChanges();
        }

        public void UnattendEvent(EventList el)
        {
            _db.EventsList.Remove(el);
            _db.SaveChanges();
        }

        public void RemoveEventList(EventList el)
        {
                _db.EventsList.Remove(el);
                _db.SaveChanges();
        }

        
    }
}