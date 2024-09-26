import React, { useEffect, useState } from 'react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees');
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete employee');
        fetchEmployees(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/edit/${id}`;
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => {
    const { name, email, id, createdAt } = employee;
    const date = new Date(createdAt).toLocaleDateString();
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      id.toString().includes(searchTerm) ||
      date.includes(searchTerm)
    );
  });

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-5">Employee List</h2>
      
      {/* Flex container for search and total count */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name, email, ID, or date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
        {/* Total Count Display */}
        <div>Total Employees: {filteredEmployees.length}</div>
      </div>

      <table className="min-w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Image</th>
            <th className='border p-2'>Id</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Mobile No</th>
            <th className="border p-2">Designation</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Courses</th>
            <th className="border p-2">Created Date/Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td className="border p-2">
                {employee.imageBase64 ? (
                  <img
                    src={employee.imageBase64}
                    alt={employee.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td className="border p-2">{employee.id}</td>
              <td className="border p-2">{employee.name}</td>
              <td className="border p-2">{employee.email}</td>
              <td className="border p-2">{employee.mobileNo}</td>
              <td className="border p-2">{employee.designation}</td>
              <td className="border p-2">{employee.gender}</td>
              <td className="border p-2">{employee.courses.join(', ')}</td>
              <td className="border p-2">
                {new Date(employee.createdAt).toLocaleDateString()}
                <div className="mt-1">
                  <button
                    onClick={() => handleEdit(employee._id)}
                    className="bg-teal-600 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="bg-teal-950 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
