using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentApplication.Models
{
	/// <summary>
	/// This class takes care of interacting with the datastore. Currently, we are just
	/// using an in-memory list of students, but we will change this class later
	/// so it will use a database instead.
	/// </summary>
	public class StudentRepository
	{
		// Note: don't let the "static" keyword fool you, this is just here
		// so we can emulate a database! Variables should otherwise never
		// be static!
		private static List<Student> m_students = new List<Student>( );

		/// <summary>
		/// Returns a list of all students.
		/// </summary>
		/// <returns></returns>
		public List<Student> GetAllStudents( )
		{
			if ( m_students.Count == 0 )
			{
				m_students.Add( new Student { ID = 1,  Name = "Alexandra Guðrún Jónsdóttir", Email = "alexandraj09@ru.is", DateOfBirth = new DateTime( 1986, 1, 10 ) } );
				m_students.Add( new Student { ID = 2,  Name = "Alexandra Mahlmann",          Email = "alexandram11@ru.is", DateOfBirth = new DateTime( 1986, 2, 11 ) } );
				m_students.Add( new Student { ID = 3,  Name = "Alma Ósk Melsted",            Email = "alma11@ru.is",       DateOfBirth = new DateTime( 1985, 3, 12 ) } );
				m_students.Add( new Student { ID = 4,  Name = "Amjad Shakoor",               Email = "amjad11@ru.is",      DateOfBirth = new DateTime( 1989, 4, 13 ) } );
				m_students.Add( new Student { ID = 5,  Name = "Andrew Markús Cubero",        Email = "andrewc11@ru.is",    DateOfBirth = new DateTime( 1985, 5, 14 ) } );
				m_students.Add( new Student { ID = 6,  Name = "Andri Björn Ólafsson",        Email = "andrio10@ru.is",     DateOfBirth = new DateTime( 1989, 6, 15 ) } );
				m_students.Add( new Student { ID = 7,  Name = "Andri Valgeirsson",           Email = "andriv11@ru.is",     DateOfBirth = new DateTime( 1989, 5, 16 ) } );
				m_students.Add( new Student { ID = 8,  Name = "Andri Víðisson",              Email = "andriv10@ru.is",     DateOfBirth = new DateTime( 1990, 4, 17 ) } );
				m_students.Add( new Student { ID = 9,  Name = "Anton Sigurðsson",            Email = "antons11@ru.is",     DateOfBirth = new DateTime( 1989, 3, 18 ) } );
				m_students.Add( new Student { ID = 10, Name = "Arnar Már Loftsson",          Email = "arnarl11@ru.is",     DateOfBirth = new DateTime( 1989, 2, 19 ) } );
			}

			return m_students;
		}

		/// <summary>
		/// Returns a single student with the given ID, or null if no such student can be found.
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public Student GetStudentById( int id )
		{
			var result = (from student in m_students
						 where student.ID == id
						 select student).SingleOrDefault( );

			return result;
		}

		/// <summary>
		/// Adds a new student to the repository. Note that no validation is performed
		/// at this moment.
		/// </summary>
		/// <param name="s"></param>
		public void AddStudent( Student s )
		{
			// "Poor man's autoincrement" :-)
			s.ID = ( from student in m_students
					 select student.ID ).Max( ) + 1;

			m_students.Add( s );
		}

		/// <summary>
		/// Updates an existing student.
		/// </summary>
		/// <param name="s"></param>
		public void UpdateStudent( Student s )
		{
			for ( int i = 0; i < m_students.Count; i++ )
			{
				if ( s.ID == m_students[i].ID )
				{
					m_students[i] = s;
					break;
				}
			}
		}
	}
}