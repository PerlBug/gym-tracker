import mongoose from "mongoose";

/**
 * @description holds user model
 */

 /**
  * User interface
  */
export interface IUser extends mongoose.Document {
  id: string;
  name: string;
  password: string;
  email: string;
  transform: () => IUser;
}
/* Validates email */
const validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

/**
 * user schema
 */
const schema: any = {
  name: { type: mongoose.SchemaTypes.String, required: true, unique: true },
  password: { type: mongoose.SchemaTypes.String, required: true },
  email: {
    type: String,
    trim: Boolean,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  }
};

// user collection name
const collectionName: string = "user";

const userSchema: mongoose.Schema = new mongoose.Schema(schema);

/**
 * transforms user object, removes password and 
 * changes _id to id
 */
userSchema.methods.transform = function() {
  var obj = this.toObject();
  delete obj.password;

  var id = obj._id;
  delete obj._id;
  obj.id = id;

  return obj;
}

/**
 * creates user model
 * @param conn database connection
 * @returns user model
 */
const UserModel = (conn: mongoose.Connection): mongoose.Model<IUser> =>
  conn.model(collectionName, userSchema);

export default UserModel;