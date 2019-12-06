namespace TrainingCenterMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class delete : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.UserCourses", "Image");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserCourses", "Image", c => c.String());
        }
    }
}
