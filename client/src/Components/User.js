import { useSelector } from "react-redux";
import user from "../Images/user.png";



const User = () => {
  const { user } = useSelector((state) => state.users);
 
  return (
    <div>
      <img src={user} className="userImage" alt=""/>
      
      <h6>{user?.name}</h6>
      <h6>{user?.email}</h6>
    </div>
  );
};

export default User;
