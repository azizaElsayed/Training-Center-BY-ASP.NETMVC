namespace TrainingCenterMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addusertype : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserCourses", "UserType", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.UserCourses", "UserType");
        }
    }
}
