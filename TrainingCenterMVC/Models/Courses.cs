using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TrainingCenterMVC.Models
{
    public class Courses
    {
        public int Id { get; set; }
        [DisplayName("NameCourse")]         
        public string NameCourse { get; set; }
        [DisplayName("Image")]
        public string Image{ get; set; }
        [DisplayName("Price")]
       public int Price{ get; set; }
        [DisplayName("Hours")]
        public int Hours { get; set; }

        [DisplayName("Category Course")]
        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }

    }
}