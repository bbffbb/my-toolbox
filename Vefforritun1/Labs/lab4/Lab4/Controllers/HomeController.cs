using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StudentApplication.Models;

namespace Lab4.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            StudentRepository repository = new StudentRepository();
            var model = repository.GetAllStudents();
            return View(model);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpGet]
        public ActionResult Create()
        {
            return View(new Student());
        }


        [HttpGet]
        public ActionResult Edit(int? id)
        {
            if (id.HasValue)
            {
                int realid = id.Value;
             
                StudentRepository repository = new StudentRepository();
                var item = repository.GetStudentById(realid);
                
                if (item != null)
                {
                    return View(item);
                } 
            }
            return View("NotFound"); 
        }
        
        [HttpPost]
        public ActionResult Edit(Student student)
        {
            StudentRepository repository = new StudentRepository();
            Student s = repository.GetStudentById(student.ID);

            if(s != null)
            {
                s.Name = student.Name;
                s.Email = student.Email;
                s.DateOfBirth = student.DateOfBirth;

                repository.UpdateStudent(student);

                return RedirectToAction("Index");
            }
            else
            {
                return View("NotFound");
            }
        }

        [HttpPost]
        public ActionResult Create(FormCollection formdata)
        {
            Student s = new Student();
            UpdateModel(s);
            StudentRepository repository = new StudentRepository();
            repository.AddStudent(s);
            return RedirectToAction("Index");
        }
    }
}