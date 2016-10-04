using NewsApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NewsApplication.Controllers
{
    public class HomeController : Controller
    {
        NewsRepository repo = new NewsRepository();

        public ActionResult Index()
        {
            var news = repo.GetAllNews().OrderByDescending(x => x.DateCreated).Take(10);
            return View(news);
        }

        [HttpGet]
        public ActionResult Edit(int? id)
        {
            if (id.HasValue)
            {
                int realID = id.Value;
                var model = repo.GetNewsById(realID);

                if (model == null)
                {
                    return View("Error");
                }

                NewsViewModel t = new NewsViewModel();
                t.ID = model.Id;
                t.Title = model.Title;
                t.Text = model.Text;
                t.DateCreated = model.DateCreated;
                t.Category = model.Category;

                return View(t);
            }
            else
            {
                return View("Error");
            }
        }

        [HttpPost]
        public ActionResult Edit(NewsViewModel s)
        {
            if (ModelState.IsValid)
            {
                NewsItem t = new NewsItem();
                t.Id = s.ID;
                t.Title = s.Title;
                t.Text = s.Text;
                t.DateCreated = s.DateCreated;
                t.Category = s.Category;
                repo.UpdateNews(t);
                return RedirectToAction("Index");
            }
            else
            {
                return View(s);
            }
        }

        [HttpGet]
        public ActionResult Create()
        {
            return View(new NewsViewModel());
        }

        [HttpPost]
        public ActionResult Create(NewsViewModel s)
        {
            if (ModelState.IsValid)
            {
                NewsItem t = new NewsItem();
                t.Id = s.ID;
                t.Title = s.Title;
                t.Text = s.Text;
                t.DateCreated = s.DateCreated;
                t.Category = s.Category;
                repo.AddNews(t);
                return RedirectToAction("Index");
            }
            else
            {
                return View(s);
            }
        }

        
    }
}