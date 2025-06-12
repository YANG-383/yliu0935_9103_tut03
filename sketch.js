//let referenceImg; //Pictures to be copied

let scaleFactor = 1;//set window scale to 1 max
let imgSize = 500;
let padding = 150; 

//An array used to store the circular area 
//of ​​the main body and its decorate of the screen
let basicCircles = []; //basic circle parts 
let ringFills = [];    //Line ring decoration of the core
let pinkCurveSet;      //Pink curve
let innerDotRings = [];//Dot ring decoration of the core
let dotRings = [];     //Dot ring decoration of the body to edge of circle
let spokeRings = [];   //Spoke rings decoration

//An array of chains that fill the gaps between circles
let chains = [];

//each position dot color map
const dotRingColorMap = {
//line one
  "71,64"   : "#231775",
  "366,-3"  : "#F11006",
//line two
  "19,204"  : "#231775", 
  "169,177" : "#177822", 
  "319,137" : "#CC90DF", 
  "475,101" : "#073575",
//line three
  "-20,353" : "#0C9482", 
  "280,278" : "#D0363F",
  "428,242" : "#EC660F",
//line four
  "80,458"  : "#F31D14",
  "230,423" : "#D8196D",
  "370,390" : "#207AB9",
//line five
  "335,530" : "#F23C32",
  "480,510" : "#5CC272"
};
// Interaction 1: controls the Perlin noise offset for DotRing color animation
let dotRingNoiseOffset = 0; 
// Interaction 1: controls the Perlin noise offset for ChainLink color animation
let chainNoiseOffset = 0;

// Interaction 2: controls the Perlin noise offset for PinkCurveSet animation
let pinkCurveNoiseOffset = 0;

function preload() {
  //referenceImg = loadImage('image/Group_Pic.jpg');
}

function setup() {
  createCanvas(imgSize * 2 + padding, imgSize);
  //referenceImg.resize(imgSize, imgSize); // make both 500
  // Interaction 1:Removed or commented out noLoop() to allow the draw() function to execute continuously

  //set circle and its decoration
  setupCircle();
  setupDotRings();
  setupInnerDotRings()
  setupSpokeRings();
  setupRingFill()
  setupPinkCurveSet();
  //set chain
  setupChains();
  
}

//window resize
function windowResized() {
  const availableWidth = windowWidth;
  scaleFactor = min(availableWidth / (imgSize * 2 + padding), 1);
  resizeCanvas(windowWidth, imgSize * scaleFactor);
  redraw();
}

//
function draw() {
  background(255);
  scale(scaleFactor); // window scale
  // draw part
  noStroke();
  fill('#2D5574');
  rect(0, 0, imgSize, imgSize);

  // Interaction 1:to control the speed of DotRing colors.
  dotRingNoiseOffset += 0.008;
  // Interaction 1:to control the speed of ChainLink colors.
  chainNoiseOffset += 0.008;
  // Interaction 2: to control the speed of PinkCurveSet animation
  pinkCurveNoiseOffset += 0.01;

  //draw each part array
  for (let basicCircle of basicCircles) {
    basicCircle.display();
  }
  for (const idr of innerDotRings) idr.display();

  for (const dr of dotRings) dr.display();

  for (const sr of spokeRings) sr.display();

  for (let rf of ringFills) rf.display();
  
  for (let ch of chains) ch.display();

  pinkCurveSet.display();

  // blank area
  noStroke();
  fill(255);
  rect(imgSize, 0, padding, imgSize);  
  
  // Reference pic
  //image(referenceImg, imgSize + padding, 0);

}

//Set function for each part
function setupCircle(){ // basic circle positon, core color and main color set
//layout reference up to down, left to right
//line one 
  basicCircles.push(new BasicCircle(71, 64, 0, 'w'));
  basicCircles.push(new BasicCircle(217, 27, 0 ));
  basicCircles.push(new BasicCircle(366, -3, 0, 'w'));
//line two
  basicCircles.push(new BasicCircle(19, 204, 1));
  basicCircles.push(new BasicCircle(169, 177, 0, 'w'));
  basicCircles.push(new BasicCircle(319, 137, 1));
  basicCircles.push(new BasicCircle(475, 101, 1));
//line three
  basicCircles.push(new BasicCircle(-20, 353, 0, 'w'));
  basicCircles.push(new BasicCircle(125, 318, 1));
  basicCircles.push(new BasicCircle(280, 278, 0, 'w'));
  basicCircles.push(new BasicCircle(428, 242, 0, 'w'));
//line four
  basicCircles.push(new BasicCircle(80, 458, 0, 'w'));
  basicCircles.push(new BasicCircle(230, 423, 1));
  basicCircles.push(new BasicCircle(370, 390, 1));
  basicCircles.push(new BasicCircle(515, 367, 0));
//line five
  basicCircles.push(new BasicCircle(335, 530, 1, 'w'));
  basicCircles.push(new BasicCircle(480, 510, 1, 'w'));
}

function setupDotRings() {//Dot set for main area
  const skip = new Set(['217,27', '125,318', '515,367']); //skip drawing these position

  //Traverse all basic circles and generate DotRing
  for (const bc of basicCircles) { 
    if (skip.has(bc.x + ',' + bc.y)) continue;
    //The Continue statement can skip the loop and enter the next loop. 

    //According to map to set each position's color
    const col = dotRingColorMap[bc.x + ',' + bc.y];
    dotRings.push(
      new DotRing(
        bc.x, bc.y,
        bc.innerRadius, bc.outerRadius,
        5, 6, col
      )
    );
  }
}

function setupSpokeRings() {//Spoke Rings setting
  const rings = [
    // spoke in main area
    { x: 217, y: 27, inner: 35, outer: 70, col: "#EE1D02" },  // spoke in main area
    { x: 125, y: 318, inner: 35, outer: 70, col: "#EE1D02" },
    { x: 515, y: 367, inner: 35, outer: 70, col: "#EE1D02" },

    // spoke in core area
    { x: 280, y: 278, inner: 10, outer: 35, col: "#FD603A" }, 
  ];

  //set each spoke ring according to above data
  for (const r of rings) {
    spokeRings.push(new SpokeRing(r.x, r.y, r.inner, r.outer, 40, 2, r.col));
  }
}

function setupInnerDotRings() {//Set dot in core part, include pos and col
  innerDotRings.push(new DotRing(217, 27, 15, 35, 3, 6, '#FA5F21'));
  innerDotRings.push(new DotRing(19, 204, 15, 35, 3, 6, '#FA5F21'));
  innerDotRings.push(new DotRing(475, 101, 15, 35, 3, 6, '#F5DCF4'));
  innerDotRings.push(new DotRing(125, 318, 15, 35, 3, 6, '#F01318'));
  innerDotRings.push(new DotRing(335, 530, 15, 35, 3, 6, '#5CB677'));
}

function setupRingFill(){//set core line ring pos and col
  ringFills.push(new RingFill(71, 64, 'g'));
  ringFills.push(new RingFill(169, 177,'r'));
  ringFills.push(new RingFill(319, 137, 'b'));
  ringFills.push(new RingFill(428, 242, 'g'));
  ringFills.push(new RingFill(80, 458, 'b'));
  ringFills.push(new RingFill(370, 390, 'r'));
  ringFills.push(new RingFill(515, 367, 'g'));
}

function setupPinkCurveSet() {//set pink curve pos
  const curvePairs = [
    [[ 71,  64], [100, 146]],
    [[169, 177], [245, 119]],
    [[-10, 353], [ 52, 301]],
    [[370, 300], [280, 278]],
    [[366,  -3], [451,  28]],
    [[428, 242], [496, 180]],
    [[ 80, 458], [176, 481]]
  ];

  pinkCurveSet = new PinkCurveSet(curvePairs, 35);
}

function setupChains() {//set each chain pos, step num, step size
//line1
  chains.push(new ChainLink([5,3], [-10,114], 5, 4));
  chains.push(new ChainLink([131,4], [160,91], 6, 6));
  chains.push(new ChainLink([-10,114], [89,147], 4, 4));
  chains.push(new ChainLink([160,91], [89,147], 4, 5));
  chains.push(new ChainLink([160,91], [230,113], 3, 6));
  chains.push(new ChainLink([297,55], [230,113], 4, 5));
  chains.push(new ChainLink([297,55], [287,-10], 4, 5));
  chains.push(new ChainLink([297,55], [387,80], 5, 3));
  chains.push(new ChainLink([469,0], [387,80], 7, 6));
//line2
  chains.push(new ChainLink([101,232], [89,147], 4, 5));
  chains.push(new ChainLink([101,232], [40,289], 4, 6));
  chains.push(new ChainLink([-11,277], [40,289], 4, 6));
  chains.push(new ChainLink([101,232], [189,263], 5, 3));
  chains.push(new ChainLink([256,195], [189,263], 4, 5));
  chains.push(new ChainLink([256,195], [230,113], 3, 6));
  chains.push(new ChainLink([256,195], [345,220], 4, 4));
  chains.push(new ChainLink([405,155], [345,220], 5, 5));
  chains.push(new ChainLink([405,155], [387,80], 3, 9));
  chains.push(new ChainLink([405,155], [500,190], 4, 4));
//line 3
chains.push(new ChainLink([63,375], [40,289], 3, 5));
chains.push(new ChainLink([63,375], [0,435], 5, 2));
chains.push(new ChainLink([0,490], [0,435], 1, 4));
chains.push(new ChainLink([63,375], [147,402], 4, 3));
chains.push(new ChainLink([207,338], [147,402], 4, 4));
chains.push(new ChainLink([207,338], [189,263], 3, 5));
chains.push(new ChainLink([207,338], [290,362], 4, 6));
chains.push(new ChainLink([360,305], [290,362], 5, 2));
chains.push(new ChainLink([360,305], [345,220], 3, 4));
chains.push(new ChainLink([360,305], [435,330], 4, 6));
chains.push(new ChainLink([498,283], [435,330], 2, 6));
//line4
chains.push(new ChainLink([170,495], [147,402], 4, 5));
chains.push(new ChainLink([308,444], [290,362], 4, 2));
chains.push(new ChainLink([308,444], [253,510], 4, 4));
chains.push(new ChainLink([170,495], [253,510], 4, 4));
chains.push(new ChainLink([308,444], [399,475], 4, 2));
chains.push(new ChainLink([450,430], [399,475], 3, 3));
chains.push(new ChainLink([450,430], [435,330], 4, 2));
chains.push(new ChainLink([450,430], [513,440], 4, 2));
chains.push(new ChainLink([405,510], [399,475], 3, 3));
}


//Circle Part
//Circle Part
//Circle Part
class BasicCircle {
  constructor(x, y, colorFlag = 0, outerType = '') {
    this.x = x;
    this.y = y;
    this.outerRadius = 70; //Outer circle radius
    this.innerRadius = 35; //Inner circle radius, main circle area is 35-70
    this.colorFlag = colorFlag; // 0 = green, 1 = red
    this.outerType = outerType; // '' | 'w' | 'y'
  }

  display() {
    noStroke();

    // Outer circle (based on outerType) 35-70
    if (this.outerType === 'w') {
      fill('#ffffff'); // white
    } else if (this.outerType === 'y') {
      fill('#FEA80F'); // yellow
    } else {
      fill('#FEA80F'); // default
    }
    circle(this.x, this.y, this.outerRadius * 2);

    // Draw inner circle in fixed purple
    fill('#A9639C');
    circle(this.x, this.y, this.innerRadius * 2);

    // Outer colored ring
    let ringFill = this.colorFlag === 0 ? '#00cc66' : '#cc3333';
    stroke(0);
    strokeWeight(6);
    fill(ringFill);
    circle(this.x, this.y, 20); // radius 10

    // center gray dot overlay
    noStroke();
    fill(150);
    circle(this.x, this.y, 10); // radius 5
  }
}

class RingFill {//set line ring circle logic
  constructor(x, y, colorFlag = 'r', innerRadius = 10, outerRadius = 35, count = 5) {
    this.x = x;
    this.y = y;
    this.innerRadius = innerRadius;
    this.outerRadius = outerRadius;
    this.count = count; //Number of rings

    //Set stroke color based on flag , g is green b is blue
    if (colorFlag === 'g') {
      this.color = color(0, 204, 102); // green
    } else if (colorFlag === 'b') {
      this.color = color(0, 102, 255); // blue
    } else {
      this.color = color(255, 51, 51); // red as default
    }
  }

  display() { //draw a the ring outlines
    noFill();
    stroke(this.color);
    strokeWeight(3);

    //Draw count number of rings
    for (let i = 0; i < this.count; i++) {
      let r = map(i, 0, this.count - 1, this.innerRadius, this.outerRadius);
      circle(this.x, this.y, r * 2);
    }
  }
}

class PinkCurveSet {//set pink curve log
  constructor(curvePairs, offset = 40) {
    this.curvePairs = curvePairs; //List of point pairs
    this.offset     = offset; //point vertical offset
  }

  // Interaction 2: Add a display method to traverse and draw all curves
  display() {
    for (let i = 0; i < this.curvePairs.length; i++) {
      const pair = this.curvePairs[i];
      // Interaction 2: Calculate a offset for each curve
      let noiseVal = noise(pinkCurveNoiseOffset + i * 0.1); 
      let dynamicOffset = map(noiseVal, 0, 1, -this.offset * 1.5, this.offset * 1.5);
      this.drawPinkCurve(pair[0], pair[1], dynamicOffset);
    }
  }

  //Draw pink curve between two points using quadratic curve
  // Interaction 2: Modify the drawPinkCurve method to receive dynamic offset
  drawPinkCurve(start, end, dynamicOffset) {
    const [x1, y1] = start;
    const [x4, y4] = end;
    const midX = (x1 + x4) / 2;
    const midY = (y1 + y4) / 2;

    //Flip control direction for specific pairs
    const downSet = new Set([
      '71,64,100,146',
      '80,458,176,481',
      '366,-3,451,28'
    ]);

    //Compute pos to define curve bending
    const key = `${x1},${y1},${x4},${y4}`;
    // Interaction 2: Replace this.offset with dynamicOffset
    const dir = downSet.has(key) ? +dynamicOffset : -dynamicOffset;
    const ctrlY = midY + dir;
    const ctrlX = midX - Math.sign(x4 - x1) * dynamicOffset * 0.2; 

    //using quadraticVertex
    // WE learned about this code through interaction with the teacher in class,
    //  and decided to use it after checking the p5.js website and interacting with chatgpt. 
    // The principle itself is to use two coordinates for the starting point,
    //  two coordinates for the stretching position, 
    // and two coordinates for the end point.
    push();
    stroke(255, 28, 90);
    strokeWeight(5);
    strokeCap(ROUND);
    noFill();

    beginShape();
    vertex(x1, y1); //Start point
    quadraticVertex(ctrlX, ctrlY, x4, y4);
    endShape();

    pop();
  }
}


class DotRing {//set dot circle logic
  constructor(
    x,
    y,
    innerR,
    outerR,
    rows = 5,
    dotDiam = 6,
    col = '#05127E'
  ) {
    this.x = x;
    this.y = y;
    this.innerR = innerR;
    this.outerR = outerR;
    this.rows = rows;
    this.dotDiam = dotDiam;
    this.col = col;
    //Interaction 1:Store the original color to be used as a base for color variations.
    this.originalColor = color(col); 
  }

  display() { //set what look like
    push();
    noStroke();

    for (let i = 0; i < this.rows; i++) {
      // The radius of the current circle
      const r = lerp(
        this.innerR + this.dotDiam * 0.5,
        this.outerR - this.dotDiam * 0.5,
        i / (this.rows - 1)
      );

      // Interaction 1:Calculate Perlin noise input
      let noiseSeed = dotRingNoiseOffset + (r / this.outerR) * 0.7; 
      let noiseVal = noise(noiseSeed);
      // Interaction 1: Let noise value to a larger color component modulation range
      let colorMod = map(noiseVal, 0, 1, -255, 255); 

      // Interaction 1: Get original color's RGB components and apply the color modulation
      let rVal = red(this.originalColor) + colorMod;
      let gVal = green(this.originalColor) + colorMod;
      let bVal = blue(this.originalColor) + colorMod;

      // Interaction 1: Constrain RGB values to ensure they stay within the 0-255 range
      rVal = constrain(rVal, 0, 255);
      gVal = constrain(gVal, 0, 255);
      bVal = constrain(bVal, 0, 255);

      // Interaction 1: Fill the dot with the newly calculated color
      fill(rVal, gVal, bVal);

      // Calculate how many points are needed in this circle based on the circumference
      const numDots = floor((TWO_PI * r) / (this.dotDiam * 1.6));

      for (let j = 0; j < numDots; j++) { //the calculated function was help by chatgpt
        const ang = (TWO_PI * j) / numDots; //Calculate the angle of each point to ensure equal spacing
        //Calculate the position by using polar coordinates to Cartesian coordinates
        const dx = this.x + r * cos(ang);
        const dy = this.y + r * sin(ang);
        circle(dx, dy, this.dotDiam);
      }
    }
    pop();
  }
}

class SpokeRing {//set spoke ring logic
  constructor(
    x, y,
    innerR, outerR,
    nSpikes = 50,
    sw = 2,
    col = '#FF9933'
  ) {
    this.x = x;
    this.y = y;
    this.innerR = innerR;
    this.outerR = outerR;
    this.nSpikes = nSpikes;
    this.sw = sw;
    this.col = col;
  }

  display() {//Set up drawing style
    push();
    noFill();
    stroke(this.col);
    strokeWeight(this.sw);
    strokeCap(ROUND);
    strokeJoin(ROUND);

    //Offset for inner and outer points to avoid overflow due to stroke(Ai suggest)
    const outerOffset = 1 * this.sw;
    const innerOffset = 1 * this.sw;

    //Calculate number of vertices and angle step(Help by chatgpt)
    const totalVerts = this.nSpikes * 2;
    const step = TWO_PI / totalVerts;

    //Draw
    beginShape();
    for (let i = 0; i < totalVerts; i++) {
      const ang = i * step;
      const radius =
        i % 2 === 0
          ? this.outerR - outerOffset
          : this.innerR + innerOffset;
// When thinking about how to implement this complex code, 
// We learned about the vertex() code through a conversation with chatgpt. 
// When searching the p5.js related website, 
// I found that this is a good choice. 
// By calculating the arc, the coordinates of each vertex can
// be obtained to form a perfect spoke pattern.
      vertex(
        this.x + radius * cos(ang),
        this.y + radius * sin(ang)
      );
    }
    endShape(CLOSE);
    pop();
  }
}

//Chain Part
//Chain Part
//Chain Part
//Chain Part
class ChainLink {
  constructor(p1, p2, steps = 6, thickness = 5) {
    this.p1 = createVector(...p1); // vector from first endpoint
    this.p2 = createVector(...p2); // vector from second endpoint
    this.steps = steps;            // how many step between two point
    this.thickness = thickness;    // step size
  }

  display() {
    //Prepare ellipse chain direction and size info
    let dir = p5.Vector.sub(this.p2, this.p1);
    let totalDist = dir.mag();
    let segmentLength = totalDist / this.steps;
    let ellipseWidth = segmentLength; 

    //Loop to draw ellipse chain links
    for (let i = 0; i < this.steps; i++) {
      let t = (i + 0.5) / this.steps;
      let pos = p5.Vector.lerp(this.p1, this.p2, t);
      push();

      //Make sure the connection fill ellipse orientation shape is correct
      translate(pos.x, pos.y);
      rotate(dir.heading());
      stroke('#D26728');
      strokeWeight(1.5);

      // Interaction 1:Temporarily switch to HSB color mode to generate richer, more varied colors.
      colorMode(HSB, 360, 100, 100); 

      // Interaction 1: Generate smoothly changing colors for each small circle
      // Interaction 1: Use the global chain noise offset and the current small circle's index
      let hNoise = noise(chainNoiseOffset + i * 0.1 ); 
      let sNoise = noise(chainNoiseOffset + i * 0.1 + 2000);
      let bNoise = noise(chainNoiseOffset + i * 0.1 + 2000); 
      // Map noise values to HSB ranges
      let hVal = map(hNoise, 0, 1, 0, 360);
      let sVal = map(sNoise, 0, 1, 70, 100);
      let bVal = map(bNoise, 0, 1, 80, 100);

      fill(hVal, sVal, bVal); 

      ellipse(0, 0, ellipseWidth, this.thickness);//The course did not mention elliptic functions in detail,
      //but p5 actually provides them and they are used similarly to circle or other graphic functions.
      pop();
    }
    // draw anchor dots at both ends
    this.drawAnchorDot(this.p1);
    this.drawAnchorDot(this.p2);
  }
  //anchor dot drawing Para
  drawAnchorDot(p) {
    noStroke();
    fill('#DE6E2C');
    circle(p.x, p.y, 15);
    stroke(0);
    strokeWeight(2);
    fill(255);
    circle(p.x, p.y, 10);
  }
}