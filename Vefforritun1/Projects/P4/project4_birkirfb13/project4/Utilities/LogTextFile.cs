using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace project4.Utilities
{
    public class LogTextFile : LogMedia
    {
        public override void LogMessage(string Message)
        {
            string strLogFile = ConfigurationManager.AppSettings["LogFile"];
            
            try 
            {
                using (StreamWriter writer = new StreamWriter(strLogFile, true, Encoding.Default))
                {
                    writer.WriteLine(Message);
                }
            }
            
            catch (MyException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

    }
}