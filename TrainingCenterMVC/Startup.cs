using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Owin;
using TrainingCenterMVC.Models;

[assembly: OwinStartupAttribute(typeof(TrainingCenterMVC.Startup))]
namespace TrainingCenterMVC
{
    public partial class Startup
    {
        ApplicationDbContext db = new ApplicationDbContext();
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            CreateUsers();
        }

        public void CreateUsers()
        {
            var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db));

            var User = new ApplicationUser();
            User.Email = "aziza22@gmail.com";
            User.UserName = "Aziza";
            var check = userManager.Create(User, "aziza95@gmail.com");
            if (check.Succeeded)
            {
              
                userManager.AddToRole(User.Id, "admin");
                
            }

     




        }

    }
}
