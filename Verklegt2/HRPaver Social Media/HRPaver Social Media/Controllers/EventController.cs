using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using HRPaver_Social_Media.Service;
using HRPaver_Social_Media.Models;
using HRPaver_Social_Media.Models.Entity;
using System.Net;

namespace HRPaver_Social_Media.Controllers
{
    public class EventController : Controller
    {
        private ApplicationDbContext myDbContext = new ApplicationDbContext();

		[Authorize]
        public ActionResult ViewAllEvents(string Id)
        {
			var eventService = new EventService(myDbContext);
			var eventListService = new EventListService(myDbContext);
            var userService = new UserService(myDbContext);
            var user = userService.GetUser(User.Identity.GetUserId());

			var eventsUserCreated = eventService.GetAllEventsUserCreated(user).OrderBy(x => x.SignupStart);
			var eventsUserIsAttending = eventService.GetAllEventsUserIsAttending(user).OrderBy(x => x.SignupStart);
            var eventsUserIsNotIn = eventService.GetAllEventsUsersNotIn(user).OrderBy(x => x.SignupStart);
            
			var eventsUserCreatedViewModel = new List<EventViewModel>();
			var eventsUserIsAttendingViewModel = new List<EventViewModel>();
			var eventsUserIsNotInViewModel = new List<EventViewModel>();

			foreach (var e in eventsUserCreated)
            {
                var eventViewModel = new EventViewModel();

				eventViewModel.Id = e.Id;
				eventViewModel.Creator = e.Creator;
				eventViewModel.description = e.Description;
				eventViewModel.name = e.Name;
				eventViewModel.SignupStart = e.SignupStart;
				eventViewModel.SignupEnd = e.SignupEnd;
				eventViewModel.MaxCapacity = e.MaxCapacity;
				eventViewModel.StartTime = e.StartTime;
				eventViewModel.EndTime = e.EndTime;
				eventViewModel.photoPath = e.Photo.Path;
				eventViewModel.Members = eventListService.GetAllUsersInEvent(e.Id);

				eventsUserCreatedViewModel.Add(eventViewModel);
            }

			foreach (var e in eventsUserIsAttending)
            {
				var eventViewModel = new EventViewModel();

				eventViewModel.Id = e.Id;
				eventViewModel.Creator = e.Creator;
				eventViewModel.description = e.Description;
				eventViewModel.name = e.Name;
				eventViewModel.SignupStart = e.SignupStart;
				eventViewModel.SignupEnd = e.SignupEnd;
				eventViewModel.MaxCapacity = e.MaxCapacity;
				eventViewModel.StartTime = e.StartTime;
				eventViewModel.EndTime = e.EndTime;
				eventViewModel.photoPath = e.Photo.Path;
				eventViewModel.Members = eventListService.GetAllUsersInEvent(e.Id);

				eventsUserIsAttendingViewModel.Add(eventViewModel);
            }

			foreach (var e in eventsUserIsNotIn)
            {
				var eventViewModel = new EventViewModel();

				eventViewModel.Id = e.Id;
				eventViewModel.Creator = e.Creator;
				eventViewModel.description = e.Description;
				eventViewModel.name = e.Name;
				eventViewModel.SignupStart = e.SignupStart;
				eventViewModel.SignupEnd = e.SignupEnd;
				eventViewModel.MaxCapacity = e.MaxCapacity;
				eventViewModel.StartTime = e.StartTime;
				eventViewModel.EndTime = e.EndTime;
				eventViewModel.photoPath = e.Photo.Path;
				eventViewModel.Members = eventListService.GetAllUsersInEvent(e.Id);

				eventsUserIsNotInViewModel.Add(eventViewModel);
            }

			return View(Tuple.Create(eventsUserCreatedViewModel.ToList(), 
						eventsUserIsAttendingViewModel.ToList(),
						eventsUserIsNotInViewModel.ToList()));
        }
        
		[Authorize]
        public ActionResult Attend(int Id)
        {
            var userService = new UserService(myDbContext);
            var eventListService = new EventListService(myDbContext);
			var eventService = new EventService(myDbContext);

            var userId = User.Identity.GetUserId();
            var user = userService.GetUser(userId);

            if(eventListService.getEventList(Id, user) != null)
            {
                return RedirectToAction("ViewAllEvents");
            }

            var eventList = new EventList();
            
            eventList.Event = eventService.GetEvent(Id);
            eventList.User = user;
            eventList.JoinTime = DateTime.Now;

            eventListService.AddEventToList(eventList);

            return RedirectToAction("ViewAllEvents", new { Id = userId });
        }

		[Authorize]
        public ActionResult UnAttend(int Id)
        {
            var userService = new UserService(myDbContext);
            var eventListService = new EventListService(myDbContext);

            var userId = User.Identity.GetUserId();
            var user = userService.GetUser(userId);
            var eventList = eventListService.getEventList(Id, user);

            eventListService.UnattendEvent(eventList);

            return RedirectToAction("ViewAllEvents", new { Id = userId });
        }

		[Authorize]
        public ActionResult AboutEvent(int? id)
        {
            var photoService = new PhotoService(myDbContext);
            var eventService = new EventService(myDbContext);
            var eventListService = new EventListService(myDbContext);
            var userService = new UserService(myDbContext);

            if (id.HasValue)
            {
                var realID = id.Value;
                var e = eventService.GetEvent(realID);

                var eventViewModel = new EventViewModel();
				eventViewModel.Id = e.Id;
				eventViewModel.name = e.Name;
				eventViewModel.Creator = userService.GetUser(User.Identity.GetUserId());
				eventViewModel.description = e.Description;
				eventViewModel.SignupStart = e.SignupStart;
				eventViewModel.SignupEnd = e.SignupEnd;
				eventViewModel.StartTime = e.StartTime;
				eventViewModel.EndTime = e.EndTime;
				eventViewModel.MaxCapacity = e.MaxCapacity;
				eventViewModel.photoPath = e.Photo.Path;

				return View(eventViewModel);
            }
            else
            {
                return View("Error");
            }
            
        }

		[Authorize]
        public ActionResult CreateNewEvent()
        {
            return View();
        }

		[Authorize]
        [HttpPost]
        public ActionResult CreateNewEvent(EventViewModel eventViewModel)
        {
            if (ModelState.IsValid)
            {
                var photoService = new PhotoService(myDbContext);
                var eventService = new EventService(myDbContext);
                var eventListService = new EventListService(myDbContext);
                var userService = new UserService(myDbContext);


                var e = new Event();

                e.Name = eventViewModel.name;
                e.Creator = userService.GetUser(User.Identity.GetUserId());
                e.Description = eventViewModel.description;
                e.SignupStart = eventViewModel.SignupStart;
                e.SignupEnd = eventViewModel.SignupEnd;
                e.StartTime = eventViewModel.StartTime;
                e.EndTime = eventViewModel.EndTime;
                e.MaxCapacity = eventViewModel.MaxCapacity;

                Photo p = new Photo();

                p.Path = eventViewModel.photoPath;
                e.Photo = p;

                EventList el = new EventList();

                el.User = e.Creator;
                el.Event = e;
                el.JoinTime = DateTime.Now;
                
                photoService.AddPhoto(p);
                eventService.AddEvent(e);
                eventListService.AddEventToList(el);

                return RedirectToAction("ViewAllEvents");

                }
                else
                {
                    return View(eventViewModel);
                }

        }

		[Authorize]
        [HttpGet]
        public ActionResult Edit(int? id)
        {
            var photoService = new PhotoService(myDbContext);
            var eventService = new EventService(myDbContext);
            var eventListService = new EventListService(myDbContext);
            var userService = new UserService(myDbContext);
            
            if(id.HasValue)
            {
                var realID = id.Value;
                var e = eventService.GetEvent(realID);

                if(e == null)
                {
                    return View("Error");
                }

                var eventViewModel = new EventViewModel();
                eventViewModel.Id = e.Id;
                eventViewModel.name = e.Name;
                eventViewModel.Creator = userService.GetUser(User.Identity.GetUserId());
                eventViewModel.description = e.Description;
                eventViewModel.SignupStart = e.SignupStart;
                eventViewModel.SignupEnd = e.SignupEnd;
                eventViewModel.StartTime = e.StartTime;
                eventViewModel.EndTime = e.EndTime;
                eventViewModel.MaxCapacity = e.MaxCapacity;
                eventViewModel.photoPath = e.Photo.Path;

                return View(eventViewModel);
            }
            else 
            {
                return View("Error");
            }  
        }

		[Authorize]
        [HttpPost]
        public ActionResult Edit(EventViewModel eventViewModel)
        {
            
            var photoService = new PhotoService(myDbContext);
            var eventService = new EventService(myDbContext);
            var eventListService = new EventListService(myDbContext);
            var userService = new UserService(myDbContext);
            var user = new ApplicationUser();

            try
            {
                Event e = new Event();

                e.Id = eventViewModel.Id;
                e.Name = eventViewModel.name;
                e.Creator = userService.GetUser(User.Identity.GetUserId());
                e.Description = eventViewModel.description;
                e.SignupStart = eventViewModel.SignupStart;
                e.SignupEnd = eventViewModel.SignupEnd;
                e.StartTime = eventViewModel.StartTime;
                e.EndTime = eventViewModel.EndTime;
                e.MaxCapacity = eventViewModel.MaxCapacity;

                Photo p = new Photo();

                p.Path = eventViewModel.photoPath;
                e.Photo = p;

                EventList el = new EventList();

                el.User = e.Creator;
                el.Event = e;
                el.JoinTime = DateTime.Now;

                eventListService.UpdateEventList(el, user);
                eventService.UpdateEvents(e);

                return RedirectToAction("ViewAllEvents");
            }
            catch
            {
                return View(eventViewModel);
            }
        }

		[Authorize]
        [HttpGet]
        public ActionResult Delete(int? id)
        {
            var photoService = new PhotoService(myDbContext);
            var eventService = new EventService(myDbContext);
            var eventListService = new EventListService(myDbContext);
            var userService = new UserService(myDbContext);
            
            if(id.HasValue)
            {
				var realID = id.Value;
				var e = eventService.GetEvent(realID);

                EventViewModel eventViewModel = new EventViewModel();

                eventViewModel.Id = e.Id;
                eventViewModel.name = e.Name;
                eventViewModel.Creator = userService.GetUser(User.Identity.GetUserId());
                eventViewModel.description = e.Description;
                eventViewModel.SignupStart = e.SignupStart;
                eventViewModel.SignupEnd = e.SignupEnd;
                eventViewModel.StartTime = e.StartTime;
                eventViewModel.EndTime = e.EndTime;
                eventViewModel.MaxCapacity = e.MaxCapacity;
                eventViewModel.photoPath = e.Photo.Path;

                return View(eventViewModel);
            }
            else
            {
                return View("Error");
            }     
        }

		[Authorize]
        [HttpPost]
        public ActionResult Delete(int Id)
        {

            var userService = new UserService(myDbContext);
            var eventListService = new EventListService(myDbContext);
            var eventService = new EventService(myDbContext);

            var userId = User.Identity.GetUserId();
            var user = userService.GetUser(userId);
            var eventList = eventListService.getEventList(Id, user);
            var e = eventService.GetEvent(Id);

            try
            {
                eventListService.RemoveEventList(eventList);
                eventService.RemoveEvent(e);
                return RedirectToAction("ViewAllEvents");
            } 
            catch
            {
                return View("ViewAllEvents");
            }
        }
    }
}