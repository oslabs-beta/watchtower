const mongoose = require('mongoose');
const { Schema } = mongoose;

export const connectDB = async () => {
  const mongoURI: string =
    'mongodb+srv://jcoen96:kDGH1thFNIOa7Dgo@users.ph8ddwn.mongodb.net/';
  try {
    const connect = await mongoose.connect(mongoURI, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      dbName: 'Users',
    });
    console.log('Connected to MongoDB');
    // console.log(`MongoDb Connect: ${connect.connection.host}`);
    // console.log('mongoose connection:', mongoose.connection.readyState);
    // console.log('process', process);
    // console.log('process.env', process.env);
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
