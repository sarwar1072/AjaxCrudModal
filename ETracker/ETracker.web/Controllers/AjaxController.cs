using ETracker.web.Models;
using Microsoft.AspNetCore.Components.Web;
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
        public JsonResult Delete(int id)
        {
            var data = _context.Employees.Where(x => x.Id == id).SingleOrDefault();
            _context.Employees.Remove(data);
            _context.SaveChanges();
            return new JsonResult("Data is deleted");
        }
        public JsonResult Edit(int id)
        {
            var data = _context.Employees.Where(x => x.Id == id).SingleOrDefault();
            return new JsonResult(data);
        }

        [HttpPost]
        public JsonResult Edit(Employee employee)
        {
            _context.Employees.Update(employee);
            _context.SaveChanges();
            return new JsonResult("Successfully updates");
        }
    }
}
