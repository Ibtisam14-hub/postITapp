import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
    name: {
      type: String,
     
    },
    email: {
      type: String,   
 
    },
    password: {
      type: String,
    },
    profilePic: {
      type: String,
    },
  });
  const UserModel = mongoose.model("userInfos", UserSchema);
  export default UserModel;
  
  