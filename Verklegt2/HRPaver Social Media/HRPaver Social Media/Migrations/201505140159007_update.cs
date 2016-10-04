namespace HRPaver_Social_Media.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Comments", "AuthorId", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Comments", "AuthorId");
        }
    }
}
