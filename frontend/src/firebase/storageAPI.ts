import { storage } from "./firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

interface UploadToStorageParams {
  contentPost: Blob;
  contentName: string;
}

export default async function uploadToStorage({
  contentPost,
  contentName,
}: UploadToStorageParams): Promise<string> {
  try {
    if (!contentPost || !contentName) {
      throw new Error("Invalid content or contentName");
    }

    const storageRef = ref(storage, contentName);
    await uploadBytes(storageRef, contentPost);
    const url = await getDownloadURL(ref(storage, contentName));
    return url || "";
  } catch (err) {
    console.log(err);
    throw err; // Re-throw the error to be handled by the calling function
  }
}
