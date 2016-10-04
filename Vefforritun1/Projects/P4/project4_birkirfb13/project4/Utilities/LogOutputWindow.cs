using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace project4.Utilities
{
    public class LogOutputWindow : LogMedia
    {
        public override void LogMessage(string message)
        {
            try
            {
                System.Diagnostics.Debug.WriteLine(message);
            }
            catch (MyException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}