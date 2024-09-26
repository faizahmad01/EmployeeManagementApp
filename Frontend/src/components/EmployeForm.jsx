import React, { useState } from 'react';

const EmployeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    courses: [],
    image: null,
  });

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
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Succefully Created")
    
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
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg ">
      <h2 className="text-xl font-semibold mb-5">Create Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
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
            required
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
            required
          />
        </div>

        <div>
          <label className="block mb-1">Designation</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeForm;
