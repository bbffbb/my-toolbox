using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QueryApp
{
    class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int CategoryID { get; set; }
        public decimal Price { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }

    class Category
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }

    class Program
    {
        public static IEnumerable<int> GetNumbers()
        {
            int[] arrNumbers = { 10, 7, 4, 8, 3, 2, 11, 27, 55, 12, 10, 23 };
            return arrNumbers;
        }

        public static IEnumerable<Product> GetProducts()
        {
            List<Product> products = new List<Product>();
            products.Add(new Product { Name = "Milk", Price = 90, CategoryID = 4, ID = 1 });
            products.Add(new Product { Name = "Cheese", Price = 130, CategoryID = 4, ID = 2 });
            products.Add(new Product { Name = "Butter", Price = 110, CategoryID = 4, ID = 3 });

            products.Add(new Product { Name = "Apple juice", Price = 230, CategoryID = 1, ID = 4 });
            products.Add(new Product { Name = "Grape juice", Price = 240, CategoryID = 1, ID = 5 });
            products.Add(new Product { Name = "Beetroot juice", Price = 300, CategoryID = 1, ID = 6 });
            products.Add(new Product { Name = "Carrot juice", Price = 190, CategoryID = 1, ID = 7 });
            products.Add(new Product { Name = "Ginger ale", Price = 990, CategoryID = 1, ID = 8 });

            products.Add(new Product { Name = "Oregano", Price = 500, CategoryID = 2, ID = 9 });
            products.Add(new Product { Name = "Salt", Price = 550, CategoryID = 2, ID = 10 });
            products.Add(new Product { Name = "Pepper", Price = 490, CategoryID = 2, ID = 11 });

            products.Add(new Product { Name = "Carrots", Price = 300, CategoryID = 3, ID = 12 });
            products.Add(new Product { Name = "Spinach", Price = 250, CategoryID = 3, ID = 13 });
            products.Add(new Product { Name = "Onion", Price = 200, CategoryID = 3, ID = 14 });
            products.Add(new Product { Name = "Garlic", Price = 150, CategoryID = 3, ID = 15 });
            products.Add(new Product { Name = "Tomatoes", Price = 100, CategoryID = 3, ID = 16 });

            return products;
        }

        public static IEnumerable<Category> GetCategories()
        {
            List<Category> categories = new List<Category>();

            categories.Add(new Category { ID = 1, Name = "Beverages" });
            categories.Add(new Category { ID = 2, Name = "Condiments" });
            categories.Add(new Category { ID = 3, Name = "Vegetables" });
            categories.Add(new Category { ID = 4, Name = "Dairy products" });

            return categories;
        }

        static void Main(string[] args)
        {
            // a)
            IEnumerable<int> numbers = GetNumbers();
            var query1 = (from x in numbers
                          orderby x
                          select x).First();
            Console.WriteLine(query1);
            // Remove this line and repace it with the result of your first query

            // b)
            var query2= (from x in numbers
                           where (x % 2 == 1)
                           select x).Average();
            Console.WriteLine(query2);
            // Remove this line and repace it with the result of your second query

            // c)
            var query3 = (from x in GetProducts()
                           orderby x.Price
                           select x).First();

            Console.WriteLine(query3);
            // Remove this line and repace it with the result of your third query

            // d)
            var query4 = (from x in GetProducts()
                           where x.Price <= 120
                           orderby x.Price
                           select x).Last();
            Console.WriteLine(query4);
            // Remove this line and repace it with the result of your fourth query

            // e)
            Console.WriteLine("No answer");

           /* var query5 = (from x in GetProducts()
                           join y in GetCategories() on x.CategoryID equals y.ID
                           where y.Name == "Beverages" 
                           select x);
            
            foreach (var z in query5)
            {
                Console.Write(z.Name + ", ");
            }
            */


            // Remove this line and repace it with the result of your fifth query

            
        }
    }
}
