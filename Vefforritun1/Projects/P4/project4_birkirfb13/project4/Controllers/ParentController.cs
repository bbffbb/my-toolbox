using project4.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace project4.Controllers
{
    public class ParentController : Controller
    {
        protected override void OnException(ExceptionContext fc)
        {
           

            base.OnException(fc);

            Exception ex = fc.Exception;

            Logger.Instance.LogException(ex);

            
        }
    }
}