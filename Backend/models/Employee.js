import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  courses: { type: [String], required: true },
  image: { type: Buffer }, // Store image data as Buffer
}, { timestamps: true,
    toJSON: { virtuals: true }, 
  toObject: { virtuals: true }
 });

// Virtual field to get image as Base64 string
employeeSchema.virtual('imageBase64').get(function() {
    return this.image ? `data:image/png;base64,${this.image.toString('base64')}` : null;
  });
  

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
