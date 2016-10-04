using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HRPaver_Social_Media.Models;
using HRPaver_Social_Media.Models.Entity;


namespace HRPaver_Social_Media.Service
{
    public class PhotoService
    {
        #region Member variables and constructor
        private readonly IAppDataContext _db;

        public PhotoService(IAppDataContext dbContext)
        {
            _db = dbContext ?? new ApplicationDbContext();
        }
        #endregion


        //Photo for user
        public Photo GetPhotoForUser(int Id)
        {
            var result = (from x in _db.Photos
                          where x.Id == Id
                          select x).SingleOrDefault();

            return result;
        }

        //Photo for contact 
        public Photo GetPhotoForContact(string Id)
        {
            var result = (from f in _db.Contacts
                          where f.User.Id == Id
                          join p in _db.Photos on f.Id equals p.Id
                          select p).SingleOrDefault();

            return result;
        }

        //Photo for inbox 
        public List<Photo> GetPhotoForInbox(int Id)
        {
            var result = (from i in _db.Inbox
                          where i.Id == Id
                          join p in _db.Photos on i.Id equals p.Id
                          select p).ToList();

            return result;  
        }
        //Photo for group
        public List<Photo> GetPhotoForGroup(int Id)
        {

            var result = (from g in _db.Groups
                          where g.Id == Id
                          join p in _db.Photos on g.Photo.Id equals p.Id
                          select p).ToList();

            return result;
        }
        //Photo for event
        public List<Photo> GetPhotoForEvent(int Id)
        {
            var result = (from p in _db.Photos
                          where p.Id == Id
                          join e in _db.Events on p.Id equals e.Id
                          select p).ToList();

            return result;
        }

        //Photo for comment
        public List<Photo> GetPhotoForComment(int Id)
        {
            var result = (from c in _db.Comments
                          where c.Id == Id
                          join p in _db.Photos on c.Id equals p.Id
                          select p).ToList();

            return result;
        }

        //Photo for post 
        public List<Photo> GetPhotoForPost(int Id)
        {
            var result = (from post in _db.Posts
                          where post.Id == Id
                          join p in _db.Photos on post.Id equals p.Id
                          select p).ToList();

            return result;
        }


        //Add & remove 

        public void AddPhoto(Photo s)
        {
            _db.Photos.Add(s);
            _db.SaveChanges();
        }

        public void RemovePhoto(Photo s)
        {
            _db.Photos.Remove(s);
            _db.SaveChanges();
        }





       
    }
}