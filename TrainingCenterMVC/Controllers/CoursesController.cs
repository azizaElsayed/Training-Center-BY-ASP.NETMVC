using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TrainingCenterMVC.Models;
using System.IO;
using Microsoft.AspNet.Identity;

namespace TrainingCenterMVC.Controllers
{
    [Authorize (Users = "aziza95@gmail.com")]
    public class CoursesController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Courses
        public ActionResult Index()
        {
            var courses = db.Courses.Include(c => c.Category);
            return View(courses.ToList());
        }


        public ActionResult retriveallCRS()
        {
            var UserId = User.Identity.GetUserId();
            var courses = db.UserCourses.Where(a => a.UserId == UserId);

            return View(db.UserCourses.Where(a => !a.User.Email.Contains("aziza95@gmail.com")).ToList());
        }

        // GET: Courses/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Courses courses = db.Courses.Find(id);
            if (courses == null)
            {
                return HttpNotFound();
            }
            return View(courses);
        }


        public ActionResult DetailsUserApplied(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserCourses courses = db.UserCourses.Find(id);
            if (courses == null)
            {
                return HttpNotFound();
            }
            return View(courses);
        }

        // GET: Courses/Create
        public ActionResult Create()
        {
            ViewBag.CategoryId = new SelectList(db.Categories, "Id", "CategoryName");
            return View();
        }

        // POST: Courses/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Courses courses,HttpPostedFileBase upload)
        {
            string path = Path.Combine(Server.MapPath("~/Upload"), upload.FileName);
            upload.SaveAs(path);
            if (ModelState.IsValid)
            {
                courses.Image = upload.FileName;
                db.Courses.Add(courses);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.CategoryId = new SelectList(db.Categories, "Id", "CategoryName", courses.CategoryId);
            return View(courses);
        }

        // GET: Courses/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Courses courses = db.Courses.Find(id);
            if (courses == null)
            {
                return HttpNotFound();
            }
            ViewBag.CategoryId = new SelectList(db.Categories, "Id", "CategoryName", courses.CategoryId);
            return View(courses);
        }

        // POST: Courses/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Courses courses,HttpPostedFileBase upload)
        {
            if (ModelState.IsValid)
            {
                //string oldpath = Path.Combine(Server.MapPath("~/Upload"),courses.Image);

                //if (upload != null)
                //{
                //    System.IO.File.Delete(oldpath);
                   string path = Path.Combine(Server.MapPath("~/Upload"), upload.FileName);
                    upload.SaveAs(path);
                    courses.Image = upload.FileName;


             //   }

                db.Entry(courses).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.CategoryId = new SelectList(db.Categories, "Id", "CategoryName", courses.CategoryId);
            return View(courses);
        }

        // GET: Courses/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Courses courses = db.Courses.Find(id);
            if (courses == null)
            {
                return HttpNotFound();
            }
            return View(courses);
        }

        // POST: Courses/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Courses courses = db.Courses.Find(id);
            db.Courses.Remove(courses);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }


        public ActionResult DeleteUserCRS(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserCourses courses = db.UserCourses.Find(id);
            if (courses == null)
            {
                return HttpNotFound();
            }
            return View(courses);
        }

        // POST: Courses/Delete/5
        [HttpPost, ActionName("DeleteUserCrs")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteUserconfirm(int id)
        {
            UserCourses courses = db.UserCourses.Find(id);
            db.UserCourses.Remove(courses);
            db.SaveChanges();
            return RedirectToAction("retriveallCRS");
        }











    }
}
