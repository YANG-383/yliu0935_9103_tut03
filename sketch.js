// 变量声明
let img;
let numSegments = 50;
let segments = [];
let drawSegments = true;

// 预加载图像
function preload() {
  img = loadImage('assets/Mona_Lisa_by_Leonardo_da_Vinci_500_x_700.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;

  // 分割图像
  for (let segYPos = 0; segYPos < img.height; segYPos += segmentHeight) {
    for (let segXPos = 0; segXPos < img.width; segXPos += segmentWidth) {
      let segmentColour = img.get(segXPos + segmentWidth / 2, segYPos + segmentHeight / 2);
      let segment = new ImageSegment(
        segXPos, segYPos, 
        segmentWidth, segmentHeight, 
        segmentColour
      );
      segments.push(segment);
    }
  }
}

function draw() {
  background(0);
  if (drawSegments) {
    // 先绘制所有基础内容
    for (const segment of segments) {
      segment.drawBase();
    }
    // 再绘制所有悬停效果（在最上层）
    for (const segment of segments) {
      if (segment.isMouseOver(mouseX, mouseY)) {
        segment.drawHover();
      }
    }
  } else {
    image(img, 0, 0);
  }
}

function mousePressed() {
  for (const segment of segments) {
    if (segment.isMouseOver(mouseX, mouseY)) {
      segment.isVisible = !segment.isVisible;
      break;
    }
  }
}

class ImageSegment {
  constructor(x, y, w, h, col) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = col;
    this.isVisible = true;
  }

  drawBase() {
    // 绘制黑色边框
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.h);
    
    // 绘制内容
    if (this.isVisible) {
      noStroke();
      fill(this.color);
      rect(this.x, this.y, this.w, this.h);
    } else {
      noStroke();
      image(img, this.x, this.y, this.w, this.h, this.x, this.y, this.w, this.h);
    }
  }

  drawHover() {
    // 绘制红色悬停边框（在最上层）
    noFill();
    stroke(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  isMouseOver(x, y) {
    return x > this.x && x < this.x + this.w &&
           y > this.y && y < this.y + this.h;
  }
}