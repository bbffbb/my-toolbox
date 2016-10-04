namespace HRPaver_Social_Media.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Comments", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Comments", new[] { "User_Id" });
            AddColumn("dbo.Comments", "Author", c => c.String());
            DropColumn("dbo.Comments", "User_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Comments", "User_Id", c => c.String(nullable: false, maxLength: 128));
            DropColumn("dbo.Comments", "Author");
            CreateIndex("dbo.Comments", "User_Id");
            AddForeignKey("dbo.Comments", "User_Id", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
    }
}
