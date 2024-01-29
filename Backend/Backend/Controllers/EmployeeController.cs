using System.Collections.Generic;
using Domain;
using Domain.Model;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepo _employeeRepo;
        public EmployeeController()
        {
            _employeeRepo = new EmployeeRepo();
        }

        [HttpGet("employees")]
        public async Task<List<Employee>> GetEmployees()
        {
            return await _employeeRepo.GetEmployees();
        }

        [HttpGet("managers")]
        public async Task<List<Employee>> GetManagers()
        {
            List<Employee> managers = await _employeeRepo.GetEmployees();
            for (int i = managers.Count - 1; i >= 0; i--)
            {
                if (!managers[i].Role.ToLower().Contains("manag"))
                {
                    managers.RemoveAt(i);
                }
            }
            return managers;
        }

        [HttpGet("os-employees")]
        public async Task<List<Employee>> GetOsEmployees()
        {
            List<Employee> employees = await _employeeRepo.GetEmployees();
            for (int i = employees.Count - 1; i >= 0; i--)
            {
                if (employees[i].Role.ToLower() != ("os employee"))
                {
                    employees.RemoveAt(i);
                }
            }
            return employees;
        }

        [HttpPost("create")]
        public async Task CreateEmployee(Employee employee)
        {
            await _employeeRepo.CreateEmployee(employee);
        }

        [HttpPut("delete")]
        public async Task DeleteEmployee(Employee employee)
        {
            await _employeeRepo.DeleteEmployee(employee);
        }

        [HttpPut("update")]
        public async Task UpdateEmployee(Employee employee)
        {
            await _employeeRepo.UpdateEmployee(employee);
        }
    }
}
