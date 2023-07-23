import { doc, getDoc } from "firebase/firestore";
import { db } from "server/config";

export const getPostUser = async uid => {
  const user = (await getDoc(doc(db, "users", uid))).data();
  return user;
};
