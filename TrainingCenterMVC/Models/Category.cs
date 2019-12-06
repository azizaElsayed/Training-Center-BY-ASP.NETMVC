using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TrainingCenterMVC.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        [Display(Name = "Category Type")]
        public string CategoryName { get; set; }
        [Required]
        [Display(Name = "Category Description")]

        public string CategoryDesc { get; set; }

        public virtual ICollection<Courses>courses { get; set; }

    }
}