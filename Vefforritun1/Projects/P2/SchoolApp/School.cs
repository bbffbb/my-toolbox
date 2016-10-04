using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolApp
{
    class School
    {
         private string school_name;
        private List<Student> m_student = new List<Student>();

        public School(string Name)
        {
            school_name = Name;
        }
        public void AddStudent(Student nemandi)
        {
            m_student.Add(nemandi);
        }
        public override string ToString()
        {
            string result = "School: " + school_name + System.Environment.NewLine;
            result += "Number of students: " + m_student.Count + System.Environment.NewLine;
            foreach (Student nemi in m_student)
            {
                result += nemi + System.Environment.NewLine;
            }
            return result;
        }
    }
}
