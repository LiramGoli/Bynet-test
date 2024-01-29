using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Domain.Model;
using Microsoft.Data.SqlClient;

namespace Infrastructure
{
    public class EmployeeRepo : IEmployeeRepo
    {

        public async Task<List<Employee>> GetEmployees()
        {
            try
            {
                List<Employee> employees = new List<Employee>();
                await using SqlConnection connection = new("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=EmployeesDB;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
                await using SqlCommand command = connection.CreateCommand();

                command.CommandText = "dbo.GetEmployees";
                command.CommandType = System.Data.CommandType.StoredProcedure;

                await connection.OpenAsync();
                await using var reader = await command.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    Employee employee = new Employee()
                    {
                        Id = int.Parse(reader["Id"].ToString()),
                        Name = reader["Name"].ToString(),
                        IdNumber = reader["IdNumber"].ToString(),
                        Role = reader["Role"].ToString(),
                        Manager = reader["Manager"] == DBNull.Value ? string.Empty : reader["Manager"].ToString(),
                    };
                    employees.Add(employee);
                }
                return employees;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async Task CreateEmployee(Employee employee)
        {
            try
            {
                int role = HelperClass.GetEnumValue(employee.Role);
                if (role == -1)
                {
                    throw new Exception("role doesnt exist");
                }
                using SqlConnection connection = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=EmployeesDB;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
                await using SqlCommand command = connection.CreateCommand();

                command.CommandText = "dbo.CreateEmployee";
                command.CommandType = System.Data.CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@Name", employee.Name);
                command.Parameters.AddWithValue("@IdNumber", employee.IdNumber);
                command.Parameters.AddWithValue("@Role", role);
                command.Parameters.AddWithValue("@Manager", string.IsNullOrEmpty(employee.Manager) ? (object)DBNull.Value : int.Parse(employee.Manager));

                await connection.OpenAsync();
                int rowsAffected = await command.ExecuteNonQueryAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }

        }

        public async Task DeleteEmployee(Employee employee)
        {
            try
            {
                using SqlConnection connection = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=EmployeesDB;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
                await using SqlCommand command = connection.CreateCommand();

                command.CommandText = "dbo.DeleteEmployee";
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@IdNumber", employee.IdNumber);
                await connection.OpenAsync();
                int rowsAffected = await command.ExecuteNonQueryAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
           
        }

        public  async Task UpdateEmployee(Employee employee)
        {
            try
            {
                int role = HelperClass.GetEnumValue(employee.Role);
                if (role == -1)
                {
                    throw new Exception("role doesnt exist");
                }
                using SqlConnection connection = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=EmployeesDB;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
                await using SqlCommand command = connection.CreateCommand();

                command.CommandText = "dbo.UpdateEmployee";
                command.CommandType = System.Data.CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@Name", employee.Name);
                command.Parameters.AddWithValue("@IdNumber", employee.IdNumber);
                command.Parameters.AddWithValue("@Role", role);
                command.Parameters.AddWithValue("@Manager", string.IsNullOrEmpty(employee.Manager) ? (object)DBNull.Value : employee.Manager);

                await connection.OpenAsync();
                int rowsAffected = await command.ExecuteNonQueryAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }
    }
}