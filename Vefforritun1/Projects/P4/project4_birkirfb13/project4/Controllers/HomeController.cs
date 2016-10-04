using project4.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace project4.Controllers
{
    public class HomeController : ParentController
    {
        public ActionResult Index()
        {
          
            RedirectToAction("Index");
          
            Random RandNumber = new Random();

            int randomnr = RandNumber.Next(1000);
            
            if(randomnr % 5 == 0)
            {
                throw new MyException("This is a random excpetion");
            }
            return View();
        }

       
    }
}