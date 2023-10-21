let numBlueDots = 50;
let dotSize = 5;
let lineProgress = 0;
let lineGrowing = true;
let dotsSpawned = false;
let rKeyPressed = false;

let blueDots = [];

let rotationX = 0;
let rotationY = 0;
let zoom = 1.0;

let lineColor;
let bgColor;

function setup() {
  createCanvas(500, 500, WEBGL);
  lineColor = color(0, 0, 255);
  bgColor = color(255);
  background(bgColor);
  strokeWeight(1);
  frameRate(30);
}

function draw() {
  background(bgColor);

  scale(zoom);
  rotateX(rotationX);
  rotateY(rotationY);
  translate(-width / 2, -height / 2);

  if (!dotsSpawned) {
    let redX = width / 2;
    let redY = height / 2;
    let redZ = 0;
    fill(lineColor);
    ellipse(redX, redY, dotSize, dotSize);

    for (let i = 0; i < numBlueDots; i++) {
      let blueX = random(width);
      let blueY = random(height);
      let blueZ = random(-200, 200);
      blueDots.push(createVector(blueX, blueY, blueZ));
    }

    dotsSpawned = true;
  }

  let redX = width / 2;
  let redY = height / 2;
  let redZ = 0;

  for (let blueDot of blueDots) {
    let lineX = lerp(redX, blueDot.x, lineProgress);
    let lineY = lerp(redY, blueDot.y, lineProgress);
    let lineZ = lerp(redZ, blueDot.z, lineProgress);

    stroke(lineColor);
    line(redX, redY, redZ, lineX, lineY, lineZ);
  }

  if (lineGrowing) {
    lineProgress += 0.01;
    if (lineProgress >= 1) {
      lineProgress = 1;
      lineGrowing = false;
    }
  } else {
    lineProgress -= 0.01;
    if (lineProgress <= 0) {
      lineProgress = 0;
      lineGrowing = true;
    }
  }
}

function mouseDragged() {
  let rotationSpeed = 0.01;
  rotationX += (pmouseY - mouseY) * rotationSpeed;
  rotationY += (mouseX - pmouseX) * rotationSpeed;
}

function mouseWheel(event) {
  let zoomSpeed = 0.1;
  let delta = event.delta;
  zoom -= delta * zoomSpeed;
  zoom = max(0.5, zoom);
}

function keyPressed() {
  if (key === 'v') {
    resetSketch();
  } else if (key === 'z') {
    rotationX = random(TWO_PI);
    rotationY = random(TWO_PI);
    zoom = random(0.5, 40.0);
  } else if (key === 'x') {
    lineColor = color(random(255), random(255), random(255));
    bgColor = color(random(255), random(255), random(255));
  } else if (key === 'c') {
    rotationX = random(TWO_PI);
    rotationY = random(TWO_PI);
    zoom = random(0.5, 40.0);
    lineColor = color(random(255), random(255), random(255));
    bgColor = color(random(255), random(255), random(255));
  } 
}

function resetSketch() {
  blueDots = [];
  dotsSpawned = false;
  lineProgress = 0;
  lineGrowing = true;
}
