using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MultiplecationTable
{
    class Program
    {
        static void Main(string[] args)
        {
            int number = Convert.ToInt32(args[0]);
            if (number < 1 || number > 20)
            {
                throw new Exception("Error! Your number has to be between 1 and 20.");
            }
            else
            {
                string result = @"<?xml version=""1.0"" encoding=""utf-8""?><!DOCTYPE html PUBLIC ""-//W3C//DTD XHTML 1.0 Strict//EN"" ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd""><html xmlns=""http://www.w3.org/1999/xhtml"">";
                Console.WriteLine(result);
                Console.WriteLine("<head>" + "<title> Multiplication Table </title>" + "</head>");
                Console.WriteLine("<body>");
                Console.WriteLine("<p>" + "Multiplication table for number: " + number + "</p>");
                Console.WriteLine("<table>");
                Console.WriteLine("<tr>" + "\n" + "<th>" + "</th>" + "\n" + "</tr>");
                Console.WriteLine("<tr>" + "\n" + "<td>" + "1*" + number + "=" + number * 1 + "</td>" + "\n" + "</tr>");
                Console.WriteLine("<tr>" + "\n" + "<td>" + "2*" + number + "=" + number * 2 + "</td>" + "\n" + "</tr>");
                Console.WriteLine("<tr>" + "\n" + "<td>" + "3*" + number + "=" + number * 3 + "</td>" + "\n" + "</tr>");
                Console.WriteLine("<tr>" + "\n" + "<td>" + "4*" + number + "=" + number * 4 + "</td>" + "\n" + "</tr>");
                Console.WriteLine("<tr>" + "\n" + "<td>" + "5*" + number + "=" + number * 5 + "</td>" + "\n" + "</tr>");
                Console.WriteLine("<tr>" + "\n" + "<td>" + "6*" + number + "=" + number * 6 + "</td>" + "\n" + "</tr>");
                Console.WriteLine("<tr>" + "\n" + "<td>" + "7*" + number + "=" + number * 7 + "</td>" + "\n" + "</tr>");
                Console.WriteLine("<tr>" + "\n" + "<td>" + "8*" + number + "=" + number * 8 + "</td>" + "\n" + "</tr>");
                Console.WriteLine("<tr>" + "\n" + "<td>" + "9*" + number + "=" + number * 9 + "</td>" + "\n" + "</tr>");
                Console.WriteLine("<tr>" + "\n" + "<td>" + "10*" + number + "=" + number * 10 + "</td>" + "\n" + "</tr>");
                Console.WriteLine("</table>");
                Console.WriteLine("</body>");
                Console.WriteLine("</html>");
            }
        }
    }
}
