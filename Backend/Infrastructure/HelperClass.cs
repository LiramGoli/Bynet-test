using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Model;

namespace Infrastructure
{
    internal class HelperClass
    {
        public enum Code
        {
            Employee = 5543,
            Manager = 664,
            Senior_Management = 322,
            OS_Employee = 876
        }

        public static int GetEnumValue(string input)
        {
            foreach (Code code in Enum.GetValues(typeof(Code)))
            {
                if (string.Equals(code.ToString(), input, StringComparison.OrdinalIgnoreCase))
                {
                    return (int)code;
                }
            }

            return -1;
        }

    }
}
