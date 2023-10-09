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
const computeVertices = function(n, R, center) {
  let vertices = [];
  for (let i = 0; i < n; i++) {
      let theta = 2 * Math.PI * i / n;
      let x = center.x + R * Math.cos(theta);
      let y = center.y + R * Math.sin(theta);
      vertices.push({x, y});
  }
  return vertices;
}

let sidesInput = document.querySelector("#sides");
let iterationsInput = document.querySelector("#iterations");
let opacityInput = document.querySelector("#opacity");

const computePath = function(){
  ctx.clearRect(0, 0, width, height);
  const numSides = parseInt(sidesInput.value);

  // Define the vertices of the equilateral triangle
  let vertices = computeVertices(numSides, (Math.min(width, height)-200)/2, {x: width/2, y: height/2});

  // Plot the triangle vertices
  vertices.forEach(v => {
    ctx.beginPath();
    ctx.arc(v.x, v.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
  });

  // Random initial point close to the triangle (center of the triangle for simplicity)
  let currentPoint = {
    x: Math.random()*width,
    y: Math.random()*height
  };

  ctx.beginPath();
  ctx.arc(currentPoint.x, currentPoint.y, 2, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();

  // Define the number of iterations
  const iterations = parseInt(iterationsInput.value);

  ctx.fillStyle = "blue";
  ctx.globalAlpha = parseFloat(opacityInput.value);
  for (let i = 0; i < iterations; i++) {
    // Randomly select one of the vertices
    const selectedVertex = vertices[Math.floor(Math.random() * numSides)];

    // Compute the next point, which is halfway between the current point and the selected vertex
    currentPoint = {
      x: (currentPoint.x + selectedVertex.x) / 2,
      y: (currentPoint.y + selectedVertex.y) / 2
    };

    ctx.beginPath();
    ctx.arc(currentPoint.x, currentPoint.y, 0.5, 0, 2 * Math.PI);
    ctx.fill();
  }
}

computePath();

sidesInput.addEventListener("input", computePath);
iterationsInput.addEventListener("input", computePath);
opacityInput.addEventListener("input", computePath);
