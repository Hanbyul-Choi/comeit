import { collection, getDocs, query } from "firebase/firestore";
import { db } from "server/config";

export const fetchData = async () => {
  const q = query(collection(db, "contents"));
  const querySnapshot = await getDocs(q);

  const data = [];

  querySnapshot.forEach(doc => {
    const content = {
      id: doc.id,
      ...doc.data()
    };
    data.push(content);
  });
  return data;
};
