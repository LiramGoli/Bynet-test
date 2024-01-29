using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Model;

namespace Domain
{
    public interface IEmployeeRepo
    {
        Task<List<Employee>> GetEmployees();

        Task<List<Employee>> GetManagers();

        Task<List<Employee>> GetOSEmployees();

        Task CreateEmployee(Employee employee);

        Task DeleteEmployee(Employee employee);

        Task UpdateEmployee(Employee employee);
    }
}
