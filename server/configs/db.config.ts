const mongoose = require('mongoose');
const { Schema } = mongoose;

export const connectDB = async (): Promise<void> => {
  const mongoURI: string =
    'mongodb+srv://jcoen96:kDGH1thFNIOa7Dgo@users.ph8ddwn.mongodb.net/';
  try {
    await mongoose.connect(mongoURI, {
      dbName: 'Users',
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export const User = mongoose.model('User', UserSchema);
