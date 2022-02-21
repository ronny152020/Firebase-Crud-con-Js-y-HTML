// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { 
    getFirestore,
    collection,
    addDoc,
    getDocs,
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAFUHFMocxhE3U0tt8WY-OVLL2X6y2ta8",
    authDomain: "fir-javascript-crud-f9453.firebaseapp.com",
    projectId: "fir-javascript-crud-f9453",
    storageBucket: "fir-javascript-crud-f9453.appspot.com",
    messagingSenderId: "577505482231",
    appId: "1:577505482231:web:705f9c3c59c63cd9ba8af2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export const saveTask = (title, description) => 
    addDoc(collection(db, `tasks`),{title, description});

export const getTasks = () => getDocs(collection(db,`tasks`));

export const onGetTasks = (callback) => onSnapshot(collection(db,`tasks`),callback);


export const deleteTasks = id=> deleteDoc(doc(db, `tasks`,id));

export const getTask = id => getDoc(doc(db,`tasks`,id));

export const updateTask = (id, newFields) => 
    updateDoc(doc(db,"tasks",id), newFields)

