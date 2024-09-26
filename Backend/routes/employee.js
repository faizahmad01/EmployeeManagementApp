import express from 'express';
import Employee from '../models/Employee.js';
import multer from 'multer';

const router = express.Router();

// File upload configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create new employee
router.post('/', upload.single('image'), async (req, res) => {
  const { name, email, mobileNo, designation, gender, courses } = req.body;
  const image = req.file ? req.file.buffer : null;

  try {
    const newEmployee = new Employee({
      name,
      email,
      mobileNo,
      designation,
      gender,
      courses: JSON.parse(courses),
      image,
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully', newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update an employee
router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, email, mobileNo, designation, gender, courses } = req.body;
  const image = req.file ? req.file.buffer : null;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        name,
        email,
        mobileNo,
        designation,
        gender,
        courses: JSON.parse(courses),
        image,
      },
      { new: true } // return the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

export default router;
