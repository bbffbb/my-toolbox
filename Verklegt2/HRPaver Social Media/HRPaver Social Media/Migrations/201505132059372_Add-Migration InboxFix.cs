namespace HRPaver_Social_Media.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMigrationInboxFix : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Photos", "Inbox_Id", "dbo.Inboxes");
            DropIndex("dbo.Photos", new[] { "Inbox_Id" });
            AddColumn("dbo.Inboxes", "MessageTitle", c => c.String());
            AddColumn("dbo.Inboxes", "State", c => c.Int(nullable: false));
            DropColumn("dbo.Photos", "Inbox_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Photos", "Inbox_Id", c => c.Int());
            DropColumn("dbo.Inboxes", "State");
            DropColumn("dbo.Inboxes", "MessageTitle");
            CreateIndex("dbo.Photos", "Inbox_Id");
            AddForeignKey("dbo.Photos", "Inbox_Id", "dbo.Inboxes", "Id");
        }
    }
}
