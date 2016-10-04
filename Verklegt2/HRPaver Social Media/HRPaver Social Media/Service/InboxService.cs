using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HRPaver_Social_Media.Models;
using HRPaver_Social_Media.Models.Entity;
using Microsoft.AspNet.SignalR.Messaging;

namespace HRPaver_Social_Media.Service
{
	public class InboxService
	{
		#region Member variables and constructor
		private readonly IAppDataContext _db;

		public InboxService(IAppDataContext dbContext)
		{
			_db = dbContext ?? new ApplicationDbContext();
		}
		#endregion

	    public IEnumerable<Inbox> GetInboxForUser(ApplicationUser userid)
	    {
	        var result = (from x in _db.Inbox
	                        where x.Reciever == userid
	                        select x).OrderByDescending(x => x.DateCreated);
	        return result;
	    }

	    public Inbox GetInbox(int inboxId)
	    {
	        var result = (from x in _db.Inbox
	            where x.Id == inboxId
	            select x).SingleOrDefault();

	        return result;
	    }


        public void RemoveInbox(Inbox i)
        {
            _db.Inbox.Add(i);
            _db.SaveChanges();
        }

        public void AddInbox(Inbox i)
        {
            _db.Inbox.Remove(i);
            _db.SaveChanges();
        }
	}
}