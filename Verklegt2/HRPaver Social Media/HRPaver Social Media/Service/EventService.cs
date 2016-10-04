using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HRPaver_Social_Media.Models;
using HRPaver_Social_Media.Models.Entity;

namespace HRPaver_Social_Media.Service
{
    public class EventService
    {
        #region Member variables and constructor
		private readonly IAppDataContext _db;

		public EventService(IAppDataContext dbContext)
		{
			_db = dbContext ?? new ApplicationDbContext();
		}
		#endregion
        public Event GetEvent(int id)
        {
            var result = (from x in _db.Events
                          where x.Id == id
                          select x).SingleOrDefault();

            return result;
        }

        public IEnumerable<Event> GetAllEvents(ApplicationUser user)
        {
            var result = (from x in _db.Events select x);
            return result.Except(GetAllEventsUserIsAttending(user));
        }

        public IEnumerable<Event> GetAllEventsUserIsAttending(ApplicationUser user)
        {
            var result = (from x in _db.EventsList
                         where x.User.Id == user.Id
                         join e in _db.Events on x.Event equals e
                         select e).Distinct();

            return result;
        }

        public IEnumerable<Event> GetAllEventsUserCreated(ApplicationUser user)
        {

            var result = (from x in _db.Events
                              where user.Id == x.Creator.Id
                              select x);


           return result;
        }

        public IEnumerable<String> GetQueue(int id)
        {
            var result = from x in _db.EventsList
                         where x.Event.Id == id
                         orderby x.JoinTime ascending
                         select x.User.FullName;
            return result;
        }

        public IEnumerable<ApplicationUser> GetAllUsersByEventId(int Id)
        {
            var result = (from g in _db.EventsList
                          where g.Event.Id == Id
                          select g.User);
            return result;
        }

        public IEnumerable<Event> GetAllEventsUsersNotIn(ApplicationUser user)
        {
            var result = (from x in _db.Events
                          select x);
            return result.Except(GetAllEventsUserIsAttending(user));
        }

        public IEnumerable<Event> GetEventsById(ApplicationUser user)
        {
            var result = (from s in _db.Events
                          where s.Creator.Id == user.Id
                          select s);
            return result;
        }

        public void AddEvent(Event e)
        {
            _db.Events.Add(e);
            _db.SaveChanges();
        }

        public void RemoveEvent(Event s)
        {
                _db.Events.Remove(s);
                _db.SaveChanges();
        }

        public void UpdateEvents(Event s)
        {   
            Event t = GetEvent(s.Id);
            if (t != null)
            {
                t.Name = s.Name;
                t.Creator = s.Creator;
                t.Description = s.Description;
                t.SignupStart = s.SignupStart;
                t.SignupEnd = s.SignupEnd;
                t.StartTime = s.StartTime;
                t.EndTime = s.EndTime;
                t.MaxCapacity = s.MaxCapacity;
                t.Photo.Path = s.Photo.Path;

                _db.SaveChanges();
            }
        }
    }

}