import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "server/config";

export const fetchData = async () => {
  const q = query(collection(db, "contents"), orderBy("time", "desc"));
  const querySnapshot = await getDocs(q);

  const data = [];

  querySnapshot.forEach(docu => {
    const content = {
      id: docu.id,
      ...docu.data()
    };
    data.push(content);
  });
  return data;
};

export const getDetail = async id => {
  if (!id) return;
  const snapContent = await getDoc(doc(db, "contents", id));
  snapContent.exists();
  console.log(snapContent.data());
  return snapContent.data();
};
