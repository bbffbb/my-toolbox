using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NewsApplication.Models
{
    public class NewsViewModel
    {
        public NewsViewModel()
        {
            DateCreated = DateTime.Now;
            Categories = new List<SelectListItem>();
            Categories.Add(new SelectListItem { Text = "Sports", Value = "Sports" });
            Categories.Add(new SelectListItem { Text = "News", Value = "News" });
            Categories.Add(new SelectListItem { Text = "Politics", Value = "Politics" });
            Categories.Add(new SelectListItem { Text = "Education", Value = "Education" });
            Categories.Add(new SelectListItem { Text = "-Select-", Value = "", Selected = true });
        }

        public int ID { get; set; }

        [Required(ErrorMessage = "Title required")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Text required")]
        public string Text { get; set; }

        public DateTime DateCreated { get; set; }

        [Required(ErrorMessage = "You have to choose a category")]
        public string Category { get; set; }

        public List<SelectListItem> Categories { get; set; }

    }
}