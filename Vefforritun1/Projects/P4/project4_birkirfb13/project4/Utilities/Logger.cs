using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace project4.Utilities
{
    public class Logger
    {
        private static Logger theInstance = null;

        private List<LogMedia> loggers = new List<LogMedia>();

        public static Logger Instance
        {
            get
            {
                if (theInstance == null)
                {
                    theInstance = new Logger();
                }
                return theInstance;
            }
        }
        private Logger()
        {
            loggers.Add(new LogOutputWindow());
            loggers.Add(new LogTextFile());
            loggers.Add(new LogEmail());
        }
        public void LogException(Exception ex)
        {
            foreach (var log in loggers)
            {
                log.LogMessage(ex.Message);
            }
        }
        
    }
}