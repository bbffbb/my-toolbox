using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using HRPaver_Social_Media.Models.Entity;

namespace HRPaver_Social_Media.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
		public DateTime BirthDate { get; set; }
		public String FullName { get; set; }
		public virtual Photo Photo { get; set; }
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
    }
	public interface IAppDataContext
	{
		IDbSet<ApplicationUser> Users { get; set; }
		IDbSet<Post> Posts { get; set; }
		IDbSet<Group> Groups { get; set; }
		IDbSet<Photo> Photos { get; set; }
		IDbSet<Event> Events { get; set; }
		IDbSet<Comment> Comments { get; set; }
		IDbSet<EventList> EventsList { get; set; }
		IDbSet<GroupList> GroupList { get; set; }
		IDbSet<Contact> Contacts { get; set; }
		IDbSet<Inbox> Inbox { get; set; }
		int SaveChanges();
	}

	public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IAppDataContext
    {
		public IDbSet<Post> Posts { get; set; }
		public IDbSet<Group> Groups { get; set; }
		public IDbSet<Photo> Photos { get; set; }
		public IDbSet<Event> Events { get; set; }
		public IDbSet<Comment> Comments { get; set; }
		public IDbSet<EventList> EventsList { get; set; }
		public IDbSet<GroupList> GroupList { get; set; }
		public IDbSet<Contact> Contacts { get; set; }
		public IDbSet<Inbox> Inbox { get; set; }
		public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
	}
}