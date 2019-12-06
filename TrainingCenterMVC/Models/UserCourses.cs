using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TrainingCenterMVC.Models
{
    public class UserCourses
    {
        public int Id{ get; set; }
        public string UserType { get; set; }
        public string Message { get; set; }
        public DateTime JoinData { get; set; }
       
        public int CourseId { get; set; }
        public string UserId { get; set; }

        public virtual Courses course { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}