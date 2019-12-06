using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using TrainingCenterMVC.Models;

namespace TrainingCenterMVC.Controllers
{
    public class HomeController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();


        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ViewCourses()
        {
            var list = db.Categories.ToList();
            return View(list);
        }


        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
           
            return View();
        }

        [HttpPost]
        public ActionResult Contact(Contact contact)
        {
            var mail = new MailMessage();
            var loginInfo = new NetworkCredential("azizaeltohamy@gmail.com", "azizaelsayed1995");
            mail.From = new MailAddress(contact.Email);
            mail.To.Add(new MailAddress("azizaeltohamy@gmail.com"));
            mail.Subject = contact.Subject;
            mail.Body = contact.Message;

          //  var smtpClient = new SmtpClient("smtp.google.com", 587);
           // smtpClient.EnableSsl = true;
          //  smtpClient.Credentials = loginInfo;
          //  smtpClient.Send(mail);

            
            return View("Index");
        }



        public ActionResult Details(int CourseId)
        {
            
            var course = db.Courses.Find(CourseId);
            if (course == null)
            {
                return HttpNotFound();
            }
            Session["CourseId"] = CourseId;
            return View(course);


        }


        [Authorize]
        public ActionResult Apply()
        {
            
            ViewBag.UserType = new SelectList(db.Courses.ToList(), "Namecourse", "Namecourse",2);


            return View();
        }

        [HttpPost]
        public ActionResult Apply(string Message)
        {
            ViewBag.UserType = new SelectList(db.Courses.ToList(), "NameCourse", "NameCourse",2);
            var UserId = User.Identity.GetUserId();
            var CourseId = (int)Session["CourseId"];
            var check = db.UserCourses.Where(a => a.CourseId == CourseId && a.UserId == UserId).ToList();

            if (check.Count < 1)
            {

                var course = new UserCourses();


                course.UserId = UserId;
                course.CourseId = CourseId;
                course.Message = Message;
                course.JoinData = DateTime.Now;

                  db.UserCourses.Add(course);
                db.SaveChanges();
                ViewBag.Result = " thanks for you to join in course.";
                return View();

            }

            else
            {
                ViewBag.Result = "You aplay befor on this job thanks for you.";
                return View();
            }


            
        }


        [Authorize]
        public ActionResult GetAllCourses()
        {
            var UserId = User.Identity.GetUserId();
            var Courses = db.UserCourses.Where(a => a.UserId == UserId);
            return View(Courses.ToList());

        }
        
        //Detaile of course that user applied

            [Authorize]
        public ActionResult DetailCourseapplied(int Id)
        {
            var course = db.UserCourses.Find(Id);
            if (course == null)
            {
                return HttpNotFound();
            }
             return View(course);
        }

        [Authorize]
       
        public ActionResult DeleteCourseapplied(int Id)
        {
            var course = db.UserCourses.Find(Id);
            if (course == null)
            {
                return HttpNotFound();
            }
            return View(course);
        }

        // POST: Home/Edit/5
        [HttpPost]
        public ActionResult DeleteCourseapplied(UserCourses role)
        {
            try
            {
                // TODO: Add delete logic here
                var myrole = db.UserCourses.Find(role.Id);
                db.UserCourses.Remove(myrole);
                db.SaveChanges();

                return RedirectToAction("GetAllCourses");
            }
            catch
            {
                return View(role);
            }
        }

      
        [Authorize]
        public ActionResult EditCourseapplied(int  Id)
        {
            var course = db.UserCourses.Find(Id);
            if (course == null)
            {
                return HttpNotFound();
            }
            return View(course);

        }

        // POST: Home/Delete/5
        [HttpPost]

        public ActionResult EditCourseapplied(UserCourses course)
        {
             // TODO: Add update logic here

                if (ModelState.IsValid)
                {
                    db.Entry(course).State = EntityState.Modified;
                course.JoinData = DateTime.Now;
                    db.SaveChanges();
                    return RedirectToAction("GetAllCourses");
                }

                return View(course);

            
            
        }


        public ActionResult Search()
        {

            return View();

        }

        [HttpPost]
        public ActionResult Search(string searchName)
        {
               var result =

                 db.Courses.Where(a => a.NameCourse.Contains(searchName)

                || a.Category.CategoryName.Contains(searchName)
                || a.Category.CategoryDesc.Contains(searchName)).ToList();

           

                return View(result);
            }
          
        




        //Forget Password

        public ActionResult ForgotPassword()
        {
            return View();
        }
     



















    }
}