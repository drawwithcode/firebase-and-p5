let nameInput;
let submitButton;
let button;
let score;
// firebase global variables
let db;
let database;

async function preload() {
  // load firebase app module
  const fb_app = "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  const { initializeApp } = await import(fb_app);

  // loading firebase database module
  const fb_database =
    "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
  db = await import(fb_database);

  // Your web app's Firebase configuration
  // You can get this information from the firebase console
  const firebaseConfig = {
    apiKey: "AIzaSyAwsN7oQEiDugs-Lob4fhr7Uq68oJ0ZdTw",
    authDomain: "p5-firebase-2022-01.firebaseapp.com",
    databaseURL:
      "https://p5-firebase-2022-01-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "p5-firebase-2022-01",
    storageBucket: "p5-firebase-2022-01.appspot.com",
    messagingSenderId: "424585230807",
    appId: "1:424585230807:web:85db369eb5c308cd2f7392",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Database
  database = db.getDatabase(app);
}

function setup() {
  createCanvas(400, 400);
  score = 0;
  createP("Click the button to get points");
  button = createButton("click");
  button.mousePressed(increaseScore);
  nameInput = createInput("name");
  submitButton = createButton("submit");
  submitButton.mousePressed(submitScore);
}

function draw() {
  background(200);
  textSize(100);
  textAlign(CENTER);
  text(score, width / 2, height / 2);
}

function increaseScore() {
  score++;
}

function submitScore() {
  let data = {
    name: nameInput.value(),
    score: score,
  };

  // link to node
  const scoreRef = db.ref(database, "scores");
  // create a new entry
  const newScore = db.push(scoreRef);
  // add the data to it
  db.set(newScore, data);
  // initialize score variable
  score = 0;
}
