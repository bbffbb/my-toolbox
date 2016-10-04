using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using HRPaver_Social_Media.Service;
using HRPaver_Social_Media.Models;
using HRPaver_Social_Media.Models.Entity;

namespace HRPaver_Social_Media.Controllers
{
    public class GroupController : Controller
    {
        private ApplicationDbContext myDbContext = new ApplicationDbContext();

		[Authorize]
		public ActionResult Index()
		{
			var groupService = new GroupService(myDbContext);
			var userService = new UserService(myDbContext);
			var groupListService = new GroupListService(myDbContext);
			var user = userService.GetUser(User.Identity.GetUserId());
			var usersGroups = groupService.GetAllGroupsByUser(user);
			var otherGroups = groupService.GetAllGroupsUsersNotIn(user).Where(g => g.Type == 1).Take(150);
			var usersGroupsViewModel = new List<GroupViewModel>();
			var otherGroupsViewModel = new List<GroupViewModel>();


			foreach (var group in usersGroups)
			{
				var groupViewModel = new GroupViewModel();

				groupViewModel.Id = group.Id;
				groupViewModel.Creator = group.Creator;
				groupViewModel.Description = group.Description;
				groupViewModel.Name = group.Name;
				groupViewModel.Type = Convert.ToString(group.Type);

				if(group.Photo == null)
				{	//default group photo
					groupViewModel.photoPath = "http://goodshepherdchurch.net/wp-content/uploads/2014/06/icon_2554.png";
				}
				else
				{
					groupViewModel.photoPath = group.Photo.Path;
				}

				groupViewModel.Members = groupListService.GetAllUsersInGroup(group.Id);

				usersGroupsViewModel.Add(groupViewModel);
			}
			foreach (var group in otherGroups)
			{
				var groupViewModel = new GroupViewModel();

				groupViewModel.Id = group.Id;
				groupViewModel.Creator = group.Creator;
				groupViewModel.Description = group.Description;
				groupViewModel.Name = group.Name;
				groupViewModel.Type = Convert.ToString(group.Type);

				if (group.Photo == null)
				{	//Default group photo
					groupViewModel.photoPath = "http://goodshepherdchurch.net/wp-content/uploads/2014/06/icon_2554.png";
				}
				else
				{
					groupViewModel.photoPath = group.Photo.Path;
				}

				groupViewModel.Members = groupListService.GetAllUsersInGroup(group.Id);

				otherGroupsViewModel.Add(groupViewModel);
			}

			return View(Tuple.Create(usersGroupsViewModel.ToList(), otherGroupsViewModel.ToList()));
		}

		[Authorize]
		public ActionResult SearchGroups(string searchTerm)
		{
			if(String.IsNullOrEmpty(searchTerm))
			{
				return View();
			}

			var groupService = new GroupService(myDbContext);
			var foundGroups = groupService.GetGroupsBySearchTerm(searchTerm).Where(g => g.Type == 1);

			var foundGroupViewModels = new List<GroupViewModel>();

			foreach(var group in foundGroups)
			{
				var groupViewModel = new GroupViewModel();
				groupViewModel.Creator = group.Creator;
				groupViewModel.Description = group.Description;
				groupViewModel.Id = group.Id;
				groupViewModel.Name = group.Name;

				if (group.Photo == null)
				{	//Default group photo
					groupViewModel.photoPath = "http://goodshepherdchurch.net/wp-content/uploads/2014/06/icon_2554.png";
				}
				else
				{
					groupViewModel.photoPath = group.Photo.Path;
				}

				groupViewModel.Type = Convert.ToString(group.Type);
				foundGroupViewModels.Add(groupViewModel);

			}
			return View(foundGroupViewModels);
		}

		[Authorize]
		public ActionResult JoinGroup(int Id)
		{
			var userService = new UserService(myDbContext);
			var groupListService = new GroupListService(myDbContext);
			var userId = User.Identity.GetUserId();
			var user = userService.GetUser(userId);

			if (groupListService.getGroupList(Id, user) != null)
			{
				return RedirectToAction("Index");
			}

			var groupList = new GroupList();
			var groupService = new GroupService(myDbContext);

			groupList.Group = groupService.GetGroup(Id);
			groupList.User = user;
			groupListService.AddGroupToList(groupList);

			return RedirectToAction("Index");
		}

		[Authorize]
		public ActionResult LeaveGroup(int Id)
		{
			var userService = new UserService(myDbContext);
			var groupListService = new GroupListService(myDbContext);
			var userId = User.Identity.GetUserId();
			var user = userService.GetUser(userId);
			var groupList = groupListService.getGroupList(Id, user);
			groupListService.LeaveGroup(groupList);
			return RedirectToAction("Index");
		}

		[Authorize]
        public ActionResult detail(int? Id)
        {
			
            if (Id.HasValue)
            {
				var groupId = Id.Value;
				
				var photeService = new PhotoService(myDbContext);
				var userService = new UserService(myDbContext);
				var groupService = new GroupService(myDbContext);
				var groupListService = new GroupListService(myDbContext);
				var group = groupService.GetGroup(groupId);

				if(group == null)
				{
					return View("Error");
				}

				var currentUser = userService.GetUser(User.Identity.GetUserId());

				ViewBag.Id = Id;

				if (currentUser.Photo != null)
				{
					ViewBag.UserPhotoPath = currentUser.Photo.Path;
				}
				else
				{	//Default profile photo
					ViewBag.UserPhotoPath = "http://www.lcfc.com/images/common/bg_player_profile_default_big.png";
				}

				

				ViewBag.GroupName = group.Name;
				ViewBag.GroupType = group.Type;

				var postService = new PostService(myDbContext);
				var posts = postService.GetAllPostsByGroupId(groupId).OrderByDescending(p => p.PostTime);

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
					}

					if (user.Photo == null || p.UserAnonymous)
					{	//Anonymous profile photo
						post.AuthorPhotoFileName = "http://www.lcfc.com/images/common/bg_player_profile_default_big.png";
					}
					else
					{
						post.AuthorPhotoFileName = user.Photo.Path;
					}

					post.PhotoFilename = photeService.GetPhotoForPost(p.Id).Select(x => x.Path).ToList();
					post.UserAnonymous = p.UserAnonymous;
					post.Rateing = p.Rating;
					post.StatusOrQuestion = p.StatusOrQuestion;

					var commentService = new CommentService(myDbContext);
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
						comment.UserAnonymous = c.UserAnonymous;
						comment.Rateing = c.Rating;
						post.Replies.Add(comment);
					}

					postViewModel.Add(post);
				}

				return View(postViewModel);
			}

			return RedirectToAction("Index");
        }

		[Authorize]
		[HttpPost]
		public ActionResult CreatePost(PostViewModel s, int Id)
		{
			if (ModelState.IsValid)
			{
				var userService = new UserService(myDbContext);
				var groupService = new GroupService(myDbContext);
				var postService = new PostService(myDbContext);
				var group = groupService.GetGroup(Id);

				Post p = new Post();

				p.PostText = s.PostText;
				p.PostTime = DateTime.Now;
				p.GroupId = group;
				p.UserAnonymous = s.UserAnonymous;
				p.User = userService.GetUser(User.Identity.GetUserId());
				p.StatusOrQuestion = s.StatusOrQuestion;
				
				postService.AddPost(p);

				return RedirectToAction("detail", new { id = Id });
			}
			else
			{
				return View(s);
			}
		}

		[Authorize]
		[HttpPost]
		public ActionResult AddComment(FormCollection collection)
		{
			string postId = collection["postId"];
			string commentText = collection["commenttext"];
			string groupId = collection["groupId"];
			int gId = Convert.ToInt32(groupId);
			int id = Int32.Parse(postId);

			if (String.IsNullOrEmpty(commentText))
			{
				return RedirectToAction("detail", "Group", new { id = gId });
			}

			var userService = new UserService(myDbContext);
			var postService = new PostService(myDbContext);
			var commentService = new CommentService(myDbContext);

			var user = userService.GetUser(User.Identity.GetUserId());

			var comment = new Comment();

			comment.Body = commentText;
			comment.PostTime = DateTime.Now;
			comment.Author = user.FullName;
			comment.AuthorId = user.Id;

			if (user.Photo != null)
			{
				comment.AuthorPhotoFileName = user.Photo.Path;
			}
			else
			{
				comment.AuthorPhotoFileName = "http://www.lcfc.com/images/common/bg_player_profile_default_big.png"; //USERMYND
			}
			
			comment.Post = postService.GetPostById(id);
			comment.UserAnonymous = false;
			comment.CommentOrQuestion = false;

			commentService.AddComment(comment);

			return RedirectToAction("detail", "Group", new { id = gId });
		}

		[Authorize]
        public ActionResult CreateNewGroup()
        {
            return View(new GroupViewModel());
        }

		[Authorize]
        [HttpPost]
        public ActionResult CreateNewGroup(GroupViewModel s)
        {
            if (ModelState.IsValid)
            {
                var photoService = new PhotoService(myDbContext);
                var groupService = new GroupService(myDbContext);
                var groupListService = new GroupListService(myDbContext);
                var userService = new UserService(myDbContext);


                Group g = new Group();

                g.Name = s.Name;
                g.Creator = userService.GetUser(User.Identity.GetUserId());
                g.Type = Convert.ToInt32(s.Type);
                g.Description = s.Description;

                groupService.AddGroup(g);

                GroupList gl = new GroupList();

                gl.User = g.Creator;
                gl.Group = g;

                groupListService.AddGroupToList(gl);

                return RedirectToAction("Index");
            }
            else
            {
                return View(s);
            }
        }   
    }
}
