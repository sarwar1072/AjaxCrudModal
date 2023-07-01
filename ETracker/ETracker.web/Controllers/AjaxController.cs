using ETracker.web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace ETracker.web.Controllers
{
    public class AjaxController : Controller
    {
        private readonly ApplicationDbContext _context;
        public AjaxController(ApplicationDbContext context)
        {
            _context = context;
        }
    
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult EmployeeList()
        {
            var data = _context.Employees.ToList();
            return new JsonResult(data);
        }
        [HttpPost]
        public JsonResult AddEmployee(Employee employee)
        {
            var emp = new Employee()
            {
                Name = employee.Name,
                City = employee.City,
                State = employee.State,
                Salary = employee.Salary,
            };
            _context.Employees.Add(emp);    
            _context.SaveChanges();
            return new JsonResult("Data is saved");   
        }

    }
}
