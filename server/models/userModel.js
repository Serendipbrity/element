import mongoose from "mongoose";
// to hash passwords
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// before saving, hash password
userSchema.pre("save", async function (next) {
  // if the password isnt changed
  if (!this.isModified("password")) {
    // move on
    next();
  }
  // salt is a key to hash passwords. 10 characters
  const salt = await bcrypt.genSalt(10);
  // hash the password before it is saved into database
  this.password = await bcrypt.hash(this.password, salt);
});

// match sent password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) { 
    // return true or false based on these two comparisons
    return await bcrypt.compare(enteredPassword, this.password);
 }

// name the Use model 'User'
const User = mongoose.model("User", userSchema);

export default User;
