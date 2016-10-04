using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRPaver_Social_Media.Models
{
    public class InboxViewModel
    {
        public virtual ApplicationUser Reciever { get; set; }
        public virtual ApplicationUser Sender { get; set; }
        public DateTime DateCreated { get; set; }
        public string Message { get; set; }
        public string MessageTitle { get; set; }
        public int State { get; set; }
    }
}