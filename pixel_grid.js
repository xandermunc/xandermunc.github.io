let a = 5;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < a; j++) {
      let r = random(255);
      let g = random(255);
      let b = random(255);
      fill(r, g, b);
      noStroke();
      rect(i*80, j*80, 80, 80);
    }
  }

frameRate(10);
}