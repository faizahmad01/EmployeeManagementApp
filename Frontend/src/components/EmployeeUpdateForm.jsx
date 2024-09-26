import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeUpdateForm = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    courses: [],
    image: null,
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${id}`);
        if (!response.ok) throw new Error('Failed to fetch employee');
        const data = await response.json();
        
        // Set form data
        setFormData({
          ...data,
          courses: data.courses || [], // Ensure courses is an array
        });
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        courses: checked
          ? [...prevData.courses, value]
          : prevData.courses.filter((course) => course !== value),
      }));
    } else if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        image: e.target.files[0],
      }));
    } else {
      // Update only if the value is not empty
      if (value !== '') {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('mobileNo', formData.mobileNo);
    formDataToSend.append('designation', formData.designation);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('courses', JSON.stringify(formData.courses));
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Failed to update employee');
      const result = await response.json();
      console.log(result);
      navigate('/'); // Redirect to employee list after updating
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-5">Update Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Mobile No</label>
          <input
            type="tel"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Designation</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Gender</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="M"
                checked={formData.gender === 'M'}
                onChange={handleChange}
                className="mr-2"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="F"
                checked={formData.gender === 'F'}
                onChange={handleChange}
                className="mr-2"
              />
              Female
            </label>
          </div>
        </div>

        <div>
          <label className="block mb-1">Course</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="checkbox"
                name="courses"
                value="MCA"
                checked={formData.courses.includes('MCA')}
                onChange={handleChange}
                className="mr-2"
              />
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                name="courses"
                value="BCA"
                checked={formData.courses.includes('BCA')}
                onChange={handleChange}
                className="mr-2"
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                name="courses"
                value="BSC"
                checked={formData.courses.includes('BSC')}
                onChange={handleChange}
                className="mr-2"
              />
              BSC
            </label>
          </div>
        </div>

        <div>
          <label className="block mb-1">Image Upload</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EmployeeUpdateForm;
