const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const height = width = Math.min(document.body.clientWidth, document.body.clientHeight);

canvas.height = height;
canvas.width = width;

/**
 * Compute the vertices of a regular n-sided polygon.
 * @param {number} n - Number of sides.
 * @param {number} R - Radius of the circumscribed circle.
 * @param {Object} center - The center of the polygon.
 * @return {Array} Array of vertices {x, y}.
 */
const computeOuterVertices = function(n, R, center) {
  let vertices = [];
  for (let i = 0; i < n; i++) {
      let theta = 2 * Math.PI * i / n;
      let x = center.x + R * Math.cos(theta);
      let y = center.y + R * Math.sin(theta);
      vertices.push({x, y, r: 5, color: "#000000"});
  }
  return vertices;
}

const drawVertices = function(vertices) {
  vertices.forEach(v => {
    ctx.beginPath();
    ctx.arc(v.x, v.y, v.r, 0, 2 * Math.PI);
    ctx.fillStyle = v.color;
    ctx.fill();
  });
}

const clearCanvas = () => ctx.clearRect(0, 0, width, height);

let sidesInput = document.querySelector("#sides");
let iterationsInput = document.querySelector("#iterations");
let opacityInput = document.querySelector("#opacity");

const main() = function(){
  clearCanvas();
  const numSides = parseInt(sidesInput.value);

  // Define the vertices of the equilateral triangle
  let outerVertices = computeOuterVertices(numSides, (Math.min(width, height)-200)/2, {x: width/2, y: height/2});

  // Plot the triangle vertices
  drawVertices(outerVertices);

  // Random initial point close to the triangle (center of the triangle for simplicity)
  let currentPoint = {
    x: Math.random()*width,
    y: Math.random()*height,
    r: 5,
    color: "#ff0000"
  };

  drawVertices([currentPoint]);

  const colors = ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"];

  // Define the number of iterations
  const iterations = parseInt(iterationsInput.value);

  ctx.fillStyle = "blue";
  ctx.globalAlpha = parseFloat(opacityInput.value);
  while(i < iterations) {
    const batch;
    for(j = 0; j < 1000; j++){
      batch = []
      // Randomly select one of the vertices
      const selectedIndex = Math.floor(Math.random() * numSides);
      const selectedVertex = vertices[selectedIndex];

      // Compute the next point, which is halfway between the current point and the selected vertex
      currentPoint = {
        x: (currentPoint.x + selectedVertex.x) / 2,
        y: (currentPoint.y + selectedVertex.y) / 2,
        r: 1,
        color: colors[selectedIndex]
      };
      batch.push(currentPoint);
    }
  }
  drawVertices(batch);
}

main();

sidesInput.addEventListener("input", main);
iterationsInput.addEventListener("input", main);
opacityInput.addEventListener("input", main);
