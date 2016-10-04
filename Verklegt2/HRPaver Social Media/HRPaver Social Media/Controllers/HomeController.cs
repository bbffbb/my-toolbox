using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Drawing;
using Microsoft.AspNet.Identity;

using HRPaver_Social_Media.Service;
using HRPaver_Social_Media.Models;
using HRPaver_Social_Media.Models.Entity;


namespace HRPaver_Social_Media.Controllers
{
    public class HomeController : Controller
    {
		private ApplicationDbContext myDbContext = new ApplicationDbContext();

		[Authorize]
        public ActionResult Index()
        {
			var postService = new PostService(myDbContext);
			var photeService = new PhotoService(myDbContext);
			var userService = new UserService(myDbContext);
			var groupService = new GroupService(myDbContext);
			var commentService = new CommentService(myDbContext);
				
			var id = User.Identity.GetUserId();
			var currentUser = userService.GetUser(id);
			
			if (currentUser.Photo != null)
			{
				ViewBag.UserPhotoPath = currentUser.Photo.Path;
			}
			else
			{
				//Default user photo
				ViewBag.UserPhotoPath = "http://www.lcfc.com/images/common/bg_player_profile_default_big.png";
			}
				
			var posts = postService.GetAllPostsByUserId(id).OrderByDescending(x => x.PostTime);
			var postViewModel = new List<PostViewModel>();

			foreach (var p in posts)
			{
				var post = new PostViewModel();
				post.Id = p.Id;
				post.PostText = p.PostText;
				post.PostTime = p.PostTime;

				var user = userService.GetUser(p.User.Id);

				if(p.UserAnonymous)
				{
					post.Author = "Anonymous";
				}
				else
				{
					
					post.Author = user.FullName;
					post.AuthorId = user.Id;
				}

				if(p.UserAnonymous || user.Photo == null)
				{
					post.AuthorPhotoFileName = "http://www.lcfc.com/images/common/bg_player_profile_default_big.png"; //MYND!
				}
				else
				{
					post.AuthorPhotoFileName = user.Photo.Path;
				}

				if(p.GroupId != null)
				{
					post.GroupId = p.GroupId.Id;
					post.GroupName = p.GroupId.Name;
				}

				post.StatusOrQuestion = p.StatusOrQuestion;
				post.UserAnonymous = p.UserAnonymous;
				post.Rateing = p.Rating;

				var comments = commentService.GetCommentsforPost(p.Id);
				post.Replies = new List<PostViewModel>();
				
				foreach (var c in comments)
				{
					var comment = new PostViewModel();
					comment.Id = c.Id;
					comment.PostText = c.Body;
					comment.PostTime = c.PostTime;
					comment.Author = c.Author;
					comment.AuthorPhotoFileName = c.AuthorPhotoFileName;
					comment.AuthorId = c.AuthorId;
					comment.UserAnonymous = c.UserAnonymous;
					comment.Rateing = c.Rating;
					post.Replies.Add(comment);
				}
				postViewModel.Add(post);
			}

			if( postViewModel != null)
			{
				return View(postViewModel);
			}

			return View();
        }

		[Authorize]
		public ActionResult About()
		{
			ViewBag.Message = "Your application description page.";

			return View();
		}

		[Authorize]
		public ActionResult UpVotePost(int? Id)
		{
			if(Id.HasValue)
			{
				var postId = Id.Value;
				var postService = new PostService(myDbContext);
				var post = postService.GetPostById(postId);
				post.Rating += 1;
				postService.UpdateRatePost(post);

				return RedirectToAction("Index");
			}
			return View("Error");
		}

		[Authorize]
		public ActionResult DownVotePost(int? Id)
		{
			if (Id.HasValue)
			{
				var postId = Id.Value;
				var postService = new PostService(myDbContext);
				var post = postService.GetPostById(postId);
				post.Rating -= 1;
				postService.UpdateRatePost(post);
				return RedirectToAction("Index");
			}
			return View("Error");
		}

		[Authorize]
        public ActionResult ViewProfile(string Id)
        {
            if (Id == null || Id == "CurrentUser")
            {
                Id = User.Identity.GetUserId();
            }

            var userService = new UserService(myDbContext);
            var profile = userService.GetUser(Id);
            var currentUser = userService.GetUser(User.Identity.GetUserId());
            var userViewModel = new UserViewModel();

            userViewModel.Id = profile.Id;
            userViewModel.Name = profile.FullName;
            userViewModel.Email = profile.Email;
            userViewModel.isFriend = userService.AreFriends(currentUser.Id, Id);
            userViewModel.PhoneNumber = profile.PhoneNumber;

            if (Id == currentUser.Id)
            {
                ViewBag.isApplicationUser = true;
            }
            else
            {
                ViewBag.isApplicationUser = false;
            }

            if (profile.Photo != null)
            {
                userViewModel.PhotoPath = profile.Photo.Path;
            }
            else
            {	//Default profile photo
                userViewModel.PhotoPath = "http://www.lcfc.com/images/common/bg_player_profile_default_big.png";
            }

            userViewModel.BirthDate = profile.BirthDate;

            return View(userViewModel);
        }

		[Authorize]
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

		[Authorize]
		[HttpGet]
		public ActionResult Create()
		{
			return View(new PostViewModel());
		}

		[Authorize]
		[HttpPost]
		public ActionResult Create(PostViewModel post)
		{
			if (ModelState.IsValid)
			{
                if (post.PostText != null)
                {
					var userService = new UserService(myDbContext);
					var postService = new PostService(myDbContext);

                    Post p = new Post();

                    p.PostText = post.PostText;
                    p.PostTime = DateTime.Now;
                    p.User = userService.GetUser(User.Identity.GetUserId());
                    postService.AddPost(p);
                }
               
				return RedirectToAction("Index");
                
			}
			else
			{
				return View(post);
			}
		}

		[Authorize]
		[HttpPost]
		public ActionResult AddComment(FormCollection collection)
		{
			string postId = collection["postId"];
			string commentText = collection["commenttext"];
			int id = Int32.Parse(postId);
			
			if (String.IsNullOrEmpty(commentText))
			{
				return RedirectToAction("Index", "Home");
			}
			
			var userService = new UserService(myDbContext);
			var user = userService.GetUser(User.Identity.GetUserId());

			var comment = new Comment();

			comment.Body = commentText;
			comment.PostTime = DateTime.Now;
			comment.Author = user.FullName;
			comment.AuthorId = user.Id;

			if(user.Photo != null)
			{
				comment.AuthorPhotoFileName = user.Photo.Path;
			}
			else
			{	//Default profile photo
				comment.AuthorPhotoFileName = "http://www.lcfc.com/images/common/bg_player_profile_default_big.png"; //MYND!
			}

			var postService = new PostService(myDbContext);
			comment.Post = postService.GetPostById(id);
			comment.UserAnonymous = false;
			comment.CommentOrQuestion = false;

			var commentService = new CommentService(myDbContext);
			commentService.AddComment(comment);

			return RedirectToAction("Index", "Home");
		}

		[Authorize]
		public ActionResult ViewAllUsers()
		{
			var id = User.Identity.GetUserId();
            
			var userService = new UserService(myDbContext);
			var currentUser = userService.GetUser(id);
			var users = userService.GetAllUsers(id);

            var userViewModels = new List<UserViewModel>();

            foreach (var user in users)
            {
                var userViewModel = new UserViewModel();

				userViewModel.Id = user.Id;
				userViewModel.Name = user.FullName;
				userViewModel.Email = user.Email;
				userViewModel.PhoneNumber = user.PhoneNumber;
				userViewModel.isFriend = userService.AreFriends(currentUser.Id, user.Id);

                if(user.Photo != null)
                {
					userViewModel.PhotoPath = user.Photo.Path;
                }
                else
                {
					userViewModel.PhotoPath = "http://www.lcfc.com/images/common/bg_player_profile_default_big.png";
                }

				userViewModels.Add(userViewModel);
            }

			return View(userViewModels);
		}

		[Authorize]
		public ActionResult Friend(string Id)
		{
			var userService = new UserService(myDbContext);
			var user = userService.GetUser(User.Identity.GetUserId());
			var user2 = userService.GetUser(Id);

			var contact = new Contact();
			contact.User = user;
			contact.Friend = user2;
            contact.IsFriend = true;
			userService.AddContact(contact);

			var contact2 = new Contact();
			contact2.User = user2;
			contact2.Friend = user;
            contact2.IsFriend = true;
			userService.AddContact(contact2);

			return RedirectToAction("Index");
		}

		[Authorize]
        public ActionResult UnFriend(string Id)
        {
            var userService = new UserService(myDbContext);
            var user = userService.GetUser(User.Identity.GetUserId());
			var user2 = userService.GetUser(Id);
            
            Contact contact1 = userService.GetContact(user.Id, user2.Id);
            userService.RemoveContact(contact1);
            Contact contact2 = userService.GetContact(user2.Id, user.Id);
            userService.RemoveContact(contact2);
            return RedirectToAction("ViewAllUsers");
        }

		public Size NewImageSize(Size imageSize, Size newSize)
		{
			Size finalSize;
			double tempval;
			if (imageSize.Height > newSize.Height || imageSize.Width > newSize.Width)
			{
				if (imageSize.Height > imageSize.Width)
					tempval = newSize.Height / (imageSize.Height * 1.0);
				else
					tempval = newSize.Width / (imageSize.Width * 1.0);

				finalSize = new Size((int)(tempval * imageSize.Width), (int)(tempval * imageSize.Height));
			}
			else
				finalSize = imageSize; // image is already small size

			return finalSize;
		}
		private void SaveToFolder(Image img, string fileName, string extension, Size newSize, string pathToSave)
		{
			// Get new resolution
			Size imgSize = NewImageSize(img.Size, newSize);
			using (System.Drawing.Image newImg = new Bitmap(img, imgSize.Width, imgSize.Height))
			{
				newImg.Save(Server.MapPath(pathToSave), img.RawFormat);
			}
		}

		[Authorize]
		[HttpGet]
		public ActionResult CreatePhoto()
		{
			var photo = new Photo();
			return View(photo);
		}

		[Authorize]
		[HttpPost]
		public ActionResult CreatePhoto(Photo photo, IEnumerable<HttpPostedFileBase> files)
		{
			if (!ModelState.IsValid)
				return View(photo);
			if (files.Count() == 0 || files.FirstOrDefault() == null)
			{
				ViewBag.error = "Please choose a file";
				return View(photo);
			}

			var model = new Photo();
			foreach (var file in files)
			{
				if (file.ContentLength == 0) continue;

				var fileName = Guid.NewGuid().ToString();
				var extension = System.IO.Path.GetExtension(file.FileName).ToLower();

				using (var img = System.Drawing.Image.FromStream(file.InputStream))
				{
					
					model.Path = String.Format("/Images/{0}{1}", fileName, extension);

					// Save large size image, 800 x 800
					SaveToFolder(img, fileName, extension, new Size(220, 220), model.Path);
				}

				// Save record to database
				var photoService = new PhotoService(myDbContext);
				var userService = new UserService(myDbContext);
				var user = userService.GetUser(User.Identity.GetUserId());

				photoService.AddPhoto(model);
				userService.UpdateUser(user, model);
				UpdateUsersCommentPhoto(model.Path);
			}

			return RedirectPermanent("/home");
		}

		[Authorize]
        public ActionResult Chat()
        {
            return View();
        }

		[Authorize]
		public void UpdateUsersCommentPhoto(string photopath)
		{
			var userService = new UserService(myDbContext);
			var user = userService.GetUser(User.Identity.GetUserId());
			var commentService = new CommentService(myDbContext);
			commentService.UpdatePhotoPath(photopath, user);
		}

		[Authorize]
		[HttpGet]
		public ActionResult SearchUsers(string searchTerm)
		{
			if (String.IsNullOrEmpty(searchTerm))
			{
				return View();
			}
			var userService = new UserService(myDbContext);

			var currentUser = userService.GetUser(User.Identity.GetUserId());
			var foundUsers = userService.GetUsersBySearchTerm(searchTerm).Where(g => g.Id != currentUser.Id);

			var userViewModel = new List<UserViewModel>();
			foreach (var user in foundUsers)
			{
				var u = new UserViewModel();
				u.Id = user.Id;
				u.Name = user.FullName;
				u.Email = user.Email;
				u.BirthDate = user.BirthDate;
				u.isFriend = userService.AreFriends(currentUser.Id, user.Id);
				if(user.Photo != null)
				{
					u.PhotoPath = user.Photo.Path;
				}
				else 
				{
					u.PhotoPath = "http://www.lcfc.com/images/common/bg_player_profile_default_big.png";
				}
				userViewModel.Add(u);
			}
			return View(userViewModel);
		}
    }
}