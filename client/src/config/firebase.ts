// firebase.ts (or firebaseConfig.ts)
// import { initializeApp } from 'firebase/app';
// import { getFirestore} from 'firebase/firestore';
// const firebaseConfig = {
//   apiKey: 'AIzaSyBfF95sKzoPEvgwgN5vynIOj0eoEcs2vg8',
//   authDomain: 'collab-6b735.firebaseapp.com',
//   projectId: 'collab-6b735',
//   storageBucket: 'collab-6b735.firebasestorage.app',
//   messagingSenderId: '503286308144',
//   appId: '1:503286308144:web:0f68f3b0061d6890df3cf5',
// };
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);




// firebase.ts
import { initializeApp } from 'firebase/app'; 
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBfF95sKzoPEvgwgN5vynIOj0eoEcs2vg8",
  authDomain: "collab-6b735.firebaseapp.com",
  projectId: "collab-6b735",
  storageBucket: "collab-6b735.firebasestorage.app",
  messagingSenderId: "503286308144",
  appId: "1:503286308144:web:0f68f3b0061d6890df3cf5",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const uploadFile = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `uploads/${file.name}`);

  try {
    await uploadBytes(storageRef, file);
    const fileUrl = await getDownloadURL(storageRef);
    return fileUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('File upload failed');
  }
};
export { uploadFile };

