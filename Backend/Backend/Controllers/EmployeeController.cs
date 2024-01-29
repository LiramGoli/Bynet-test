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
            return await _employeeRepo.GetManagers();
        }

        [HttpGet("os-employees")]
        public async Task<List<Employee>> GetOsEmployees()
        {
            return await _employeeRepo.GetOSEmployees();
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
