function setup() {
  createCanvas(windowWidth, windowHeight);
}
const description = `Demonstration of Firebase Realtime Database\nin the context of a P5 sketch.\nClick and drag to make "pallozzi"!\n`;
function draw() {
  background(220);

  // circles is a JSON dictionary
  if (circles) {
    // you can iterate through properties of the dictionary
    // for instance "-MpMVl3JPWaplJmTwxcx" is a property (or 'key')
    for (key in circles) {
      const c = circles[key];
      push();
      noStroke();
      fill(color(c.fill.r, c.fill.g, c.fill.b));
      ellipse(c.x, c.y, c.size);
      pop();
    }
    // you can transform the dictionary into an array
    // and interate through it, this is more convenient
    const circlesArray = Object.values(circles);
    push();
    textAlign(CENTER);
    text(circlesArray.length + " nice circles", width/2, height/2 + 50);
    pop();
  }

  if (tempCircle) {
    push();
    noStroke();
    fill(color(tempCircle.fill.r, tempCircle.fill.g, tempCircle.fill.b));
    ellipse(tempCircle.x, tempCircle.y, tempCircle.size);
    pop();
  }

  push();
  textAlign(CENTER);
  text(description, width / 2, height / 2);
  pop();
}

let tempCircle = null;
function mousePressed() {
  tempCircle = {
    x: mouseX,
    y: mouseY,
    size: 10,
    fill: { r: random(255), g: random(255), b: random(255) },
  };
  // prevent default
  return false;
}

function mouseDragged() {
  const _distance = dist(tempCircle.x, tempCircle.y, mouseX, mouseY) * 2;
  tempCircle.size = min(max(5, _distance), 75);
}

function mouseReleased() {
  addCircle(tempCircle);
  tempCircle = null;
  // prevent default
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
