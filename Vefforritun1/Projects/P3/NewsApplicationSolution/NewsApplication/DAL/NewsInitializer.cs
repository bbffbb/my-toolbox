using NewsApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NewsApplication.DAL
{
    public class NewsInitializer : System.Data.Entity.DropCreateDatabaseAlways<NewsContext>
    {
        protected override void Seed(NewsContext context)
        {
            var news = new List<NewsItem>
            {
                new NewsItem{
                    Title="MSc-nám í klínískri sálfræði hefst í HR í haust",
                    Text="Námið hefur öðlast viðurkenningu mennta- og menningamálaráðuneytisins og uppfyllir kröfur íslenskra laga um starfsemi sálfræðinga. Dr. Jón Friðrik Sigurðsson er nýráðinn forstöðumaður námsins.",
                    Category="Education",
                    DateCreated=DateTime.Parse("2014-02-20 14:30:00")
                },
                new NewsItem{
                    Title="Veðrið er al­veg snældu­vit­laust",
                    Text="„Ástandið er gott og slæmt. Gott að því leyti að við erum búin að ná öllu fólki niður,“ seg­ir Sæv­ar Logi Ólafs­son hjá Hjálp­ar­sveit skáta í Hvera­gerði. Hann var við björg­un­ar­störf á Hell­is­heiði og Sand­skeiði í óveðrinu „Veðrið hérna er al­veg snældu­vit­laust.“ ",
                    Category="News",
                    DateCreated=DateTime.Parse("2014-02-20 14:30:00")
                },
                new NewsItem{
                    Title="Ísland - Sviss, staðan er 0:1",
                    Text="„ Ísland og Sviss eig­ast við í dag kl. 15 í Al­gar­ve-bik­arn­um í knatt­spyrnu kvenna í Lagos í Portúgal. Þetta er fyrsti leik­ur B-riðils en þar leika einnig Nor­eg­ur og Banda­rík­in. ",
                    Category="Sports",
                    DateCreated=DateTime.Parse("2014-02-20 14:30:00")
                },
                new NewsItem{
                    Title="Sirk­usmark Guðmund­ar mark mánaðar­ins",
                    Text="Guðmund­ur Árni Ólafs­son, hornamaður hjá Mors-Thy, skoraði mark mánaðar­ins í dönsku úr­vals­deild­inni í hand­knatt­leik í síðasta mánuði.",
                    Category="Sports",
                    DateCreated=DateTime.Parse("2014-02-20 14:30:00")
                },
                new NewsItem{
                    Title="Ólaf­ur Stef­áns­son tek­ur fram skóna ",
                    Text=" Ólaf­ur Stef­áns­son hef­ur tekið til­boði danska meist­araliðsins KIF Kol­d­ing um að hefja æf­ing­ar með því.",
                    Category="Sports",
                    DateCreated=DateTime.Parse("2014-02-20 14:30:00")
                },
                new NewsItem{
                    Title="Vig­dís Hauks sel­ur Gyðju stíg­vél",
                    Text="Þingmaður­inn Vig­dís Hauks­dótt­ir var að taka til í skáp­un­um heima hjá sér og fann í til­tekt­inni bleik leður­stíg­vél frá Gyðja Col­lecti­on.",
                    Category="Politics",
                    DateCreated=DateTime.Parse("2014-02-20 14:30:00")
                },
                new NewsItem{
                    Title="Maj­ónesið verður ekki gult ef það er blandað",
                    Text="Mat­argyðjan Mar­entza Poul­sen er hrifn­ust af brauðtert­um með sjáv­ar­rétt­um. Hún seg­ir að brauðtert­ur hafi margt um­fram ann­an brauðmat í veisl­ur - sér­stak­lega það að auðvelt er að gera þær dag­inn áður. ",
                    Category="News",
                    DateCreated=DateTime.Parse("2014-02-20 14:30:00")
                },
                new NewsItem{
                    Title="Stúd­ent­ar sam­einaðir gegn LÍN",
                    Text="Öll stúd­enta­fé­lög há­skóla­nema á Íslandi, auk Sam­bands ís­lenskra náms­manna er­lend­is, hafa nú gerst aðilar að stefnu Stúd­entaráðs Há­skóla Íslands gegn ís­lenska rík­inu og Lána­sjóði ís­lenskra náms­manna, vegna breyt­inga á kröf­um um lág­marks­náms­fram­vindu.",
                    Category="Education",
                    DateCreated=DateTime.Parse("2014-02-20 14:30:00")
                },
                new NewsItem{
                    Title="Ró­leg þrátt fyr­ir lottóvinn­ing",
                    Text="Kona mætti til Íslenskr­ar get­spár í dag til að vitja vinn­ings síns í lottó­inu síðasta laug­ar­dag. Hún er ann­ar fjög­urra vinn­ings­hafa stóra potts­ins sem kem­ur að vitja vinn­ings­ins.",
                    Category="News",
                    DateCreated=DateTime.Parse("2014-02-20 14:30:00")
                },
                new NewsItem{
                    Title="Skyggni nán­ast ekk­ert",
                    Text="Nán­ast ekk­ert skyggni er á Hell­is­heiðinni en þar er skafrenn­ing­ur og mjög hvasst. ",
                    Category="News",
                    DateCreated=DateTime.Parse("2014-02-20 14:30:00")
                },
            };

            news.ForEach(s => context.News.Add(s));
            context.SaveChanges();
        }
    }
}