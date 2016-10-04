using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentApplication.Models
{
	public class Student
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public string Email { get; set; }
		public DateTime DateOfBirth { get; set; }

		public Student( )
		{
			DateOfBirth = DateTime.Now;
		}
	}
}