// all the things you will use in your sketch
let circles;
let addCircles;

// Load and initialize Firebase
async function firebaseSetup() {
  // load firebase modules using import("url")
  const fb_app = "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
  const fb_database =
    "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
  const { initializeApp } = await import(fb_app);
  const { getDatabase, ref, push, set, onValue } = await import(fb_database);

  // Your web app's Firebase configuration
  // You can get this information from the firebase console
  const firebaseConfig = {
    apiKey: "AIzaSyC3B6mMVI8xVoqrL98RuuOkBYI_qkzokSw",
    authDomain: "cc2021-2100a.firebaseapp.com",
    projectId: "cc2021-2100a",
    storageBucket: "cc2021-2100a.appspot.com",
    messagingSenderId: "636015390074",
    appId: "1:636015390074:web:17dacedc2294d5ae603ac3",
    // add your database
    databaseURL:
      "https://cc2021-2100a-default-rtdb.europe-west1.firebasedatabase.app/",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Database
  const database = getDatabase(app);

  // The reference to database key where we store circles
  // we use this both for reading and writing
  const circlesRef = ref(database, "shapes/circles");

  // Retrieves circles on load and automatically on every database update (realtime database)
  onValue(circlesRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(data) // Uncomment to see the data
    circles = data; // window.allCircles becomes a global variable
  });

  // Function for adding a new circle to the database
  addCircle = function (properties) {
    // generate a new key in the database
    const newCircleRef = push(circlesRef);
    // set the content of that key
    set(newCircleRef, properties);
  };
}

firebaseSetup();