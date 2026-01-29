import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

export default function ProfileIcon(){
  const { state } = useContext(AuthContext);

  const malePic = "./assets/male.png";
  const femalePic = "./assets/female.jpeg"
  return(
    <img className="h-full w-full"
      src={state.user?.gender === "male" ? malePic : femalePic}
    />
  );
}