using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace project4.Utilities
{
    public class LogEmail : LogMedia
    {
        public override void LogMessage(string Message)
        {
            string strEmail = ConfigurationManager.AppSettings["Email"];


            try
            {
                using (MailMessage message = new MailMessage())
                {

                    message.To.Add(strEmail);
                    message.Subject = "Error found";
                    message.Body = Message;
                    using (SmtpClient client = new SmtpClient())
                    {
                        client.EnableSsl = true;
                        client.Send(message);
                    }
                }
            }
            catch (MyException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}