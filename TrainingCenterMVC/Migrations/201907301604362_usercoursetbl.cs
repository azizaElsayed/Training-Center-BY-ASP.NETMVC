namespace TrainingCenterMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class usercoursetbl : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UserCourses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Message = c.String(),
                        JoinData = c.DateTime(nullable: false),
                        CourseId = c.Int(nullable: false),
                        UserId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Courses", t => t.CourseId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
                .Index(t => t.CourseId)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserCourses", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.UserCourses", "CourseId", "dbo.Courses");
            DropIndex("dbo.UserCourses", new[] { "UserId" });
            DropIndex("dbo.UserCourses", new[] { "CourseId" });
            DropTable("dbo.UserCourses");
        }
    }
}
