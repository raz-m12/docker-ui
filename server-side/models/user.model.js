// user.model.js
import mongoose from 'mongoose';

// Setup schema
const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: String,
});

export default mongoose.model('user', userSchema);
