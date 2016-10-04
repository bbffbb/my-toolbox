using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace HRPaver_Social_Media.Hubs
{
    public class ChatHub : Hub
    {
        public void SendMessage(string username, string message)
        {
            Clients.All.showMessage(username, message);
            //Groups.Add(Context.ConnectionId, "Employees");
            //Clients.Group("Employee").showMessage(username, "This is a message for the Employees group.");
            Clients.Caller.showMessage("system", "Your message was sent at " + DateTime.Now.ToString("h:mm tt"));
        }
    }
}