using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(HRPaver_Social_Media.Startup))]
namespace HRPaver_Social_Media
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
