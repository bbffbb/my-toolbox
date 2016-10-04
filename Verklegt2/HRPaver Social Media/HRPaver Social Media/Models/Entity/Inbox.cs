using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace HRPaver_Social_Media.Models.Entity
{
    public class Inbox
    {
        public int Id { get; set; }
		public virtual ApplicationUser Reciever { get; set; }
		public virtual ApplicationUser Sender { get; set; }
        public DateTime DateCreated { get; set; }
        public string Message { get; set; }
        public string MessageTitle { get; set; }
        public int State { get; set; }
    }
}