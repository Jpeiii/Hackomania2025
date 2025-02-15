import { db } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
} from "firebase/firestore";

export const addData = async (collectionName: string, data: any) => {
  try {
    await addDoc(collection(db, collectionName), data).then(() => {
      console.log("Saved post to firebase's cloud:", data);
      return true;
    });
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

export const setData = async (
  collectionName: string,
  id: string,
  data: any
) => {
  try {
    await setDoc(doc(db, collectionName, id), data);
    return true;
  } catch (e) {
    console.error("Error patching the document: ", e);
    return false;
  }
};

export const getData = async (collectionName: string, id: string) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
};

export const getAllPostsData = async (
  action?: string,
  keywords?: string,
  user_id?: string | number,
) => {
  try {
    const collectionName = "posts";
    console.log("FETECHING POSTS FROM FIREBASE CLOUD");
    let querySnapshot;
    if (action === "desc") {
      querySnapshot = await getDocs(
        query(collection(db, collectionName), orderBy("date", "desc"))
      );
    } else if (action === "asc") {
      querySnapshot = await getDocs(
        query(collection(db, collectionName), orderBy("date", "asc"))
      );
    } else if (action === "filter" && keywords) {
      querySnapshot = await getDocs(
        query(
          collection(db, collectionName),
          where("keywords", "array-contains", keywords)
        )
      );
    } else {
      querySnapshot = await getDocs(collection(db, collectionName));
    }
    const postData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const usersSnapshot = await getDocs(collection(db, "users"));
    const usersData = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const dataWithName = postData.map((post) => {
      const postUser = usersData.find((user) => user.id === post.user_id);
      const postUserName = postUser?.username;
      return {
      ...post,
      user_name: postUserName
      };
    });

    const likesSnapshot = await getDocs(collection(db, "likes"));
    const likesData = likesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const bookmarksSnapshot = await getDocs(collection(db, "bookmarks"));
    const bookmarksData = bookmarksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const signedUserId = user_id; 
    const data = dataWithName.map((post) => {
      const isLiked = likesData.some(
        (like) => like.post_id === post.id && like.user_id === signedUserId
      );
      const isBookmarked = bookmarksData.some(
        (bookmark) =>
          bookmark.post_id === post.id && bookmark.user_id === signedUserId
      );

      return {
        ...post,
        isLiked,
        isBookmarked,
      };
    });
    return data;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};
