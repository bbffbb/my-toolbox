using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FractionTest
{
    class Program
    {
        static void Main(string[] args)
        {
            String strAction = String.Empty;
            String strFractionA = String.Empty;
            String strFractionB = String.Empty;

            do
            {
                Console.WriteLine("Enter +, -, * or / (q to quit)");
                strAction = Console.ReadLine();

                if (!(strAction == "q" || strAction == "Q"))
                {
                    Console.WriteLine("Enter the first fraction (example: 1/2):");
                    strFractionA = Console.ReadLine();
                    Console.WriteLine("Enter the second fraction (example: 5/9):");
                    strFractionB = Console.ReadLine();

                    Fraction A = new Fraction(strFractionA);
                    Fraction B = new Fraction(strFractionB);
                    Fraction result = new Fraction();

                    switch (strAction)
                    {
                        case "+":
                            result = A + B;
                            break;
                        case "-":
                            result = A - B;
                            break;
                        case "*":
                            result = A * B;
                            break;
                        case "/":
                            result = A / B;
                            break;
                    }

                    Console.WriteLine("The result is: " + result);
                }
            }
            while (!(strAction == "q" || strAction == "Q"));
        }
    }
}