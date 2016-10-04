using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace project4.Utilities
{
    public class MyException : ApplicationException
    {
        public string message;

        public MyException(string message)
        {
            this.message = message;
        }

        public override string Message
        {  
            get
            {
                return "Custom exception: " + this.message + Environment.NewLine + base.Message + Environment.NewLine + base.Source + Environment.NewLine + DateTime.Now + Environment.NewLine + Environment.NewLine + base.StackTrace;
            }
        }
    }
}