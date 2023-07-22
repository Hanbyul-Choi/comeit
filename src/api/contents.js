import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "server/config";

export const fetchData = async () => {
  const q = query(collection(db, "contents"), orderBy("time", "desc"));
  const querySnapshot = await getDocs(q);

  const data = [];

  querySnapshot.forEach(docu => {
    const content = {
      postId: docu.id,
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
  return snapContent.data();
};
