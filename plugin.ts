import pack from 'pack-spheres';

drawPack();
figma.closePlugin();

function drawPack() {
  // Make sure the user has only selected one node
  if (figma.currentPage.selection.length !== 1) {
    console.error('select a frame to render into');
  }

  const frameNode = figma.currentPage.selection[0] as FrameNode;

  // Ensure that the selected node is a frame
  if (frameNode.type !== 'FRAME') {
    console.error('select a frame to render into');
  }

  const width = frameNode.width;
  const height = frameNode.height;

  const scale = Math.min(width, height);
  const frameBounds = [0, width, 0, height];
  console.log(frameBounds);

  const randomRange = (low: number, high: number): number => Math.floor(Math.random() * high) + low;

  const circles = pack({
    dimensions: 2,
    packAttempts: 500,
    maxCount: 1000,
    bounds: scale,
    minRadius: 0.02 * scale,
    maxRadius: 0.5 * scale,
    padding: 0.0025 * scale,
    sample: () => [
      randomRange(0, width),
      randomRange(0, height),
    ],
    outside: (position, radius) => {
      const xInBounds = (position[0] - radius >= 0) && (position[0] + radius <= width);
      const yInBounds = (position[1] - radius >= 0) && (position[1] + radius <= height);
      return !xInBounds || !yInBounds;
    }
  });

  const shapes = {
    circle: drawCircle,
    square: drawSquare,
  };

  for (let circle of circles) {
    const node = shapes[figma.command](circle);
    frameNode.appendChild(node);
  }
}

function drawCircle(circle) {
  const node = figma.createEllipse();

  node.x = circle.position[0] - circle.radius;
  node.y = circle.position[1] - circle.radius;
  node.resize(circle.radius * 2, circle.radius * 2);

  node.fills = [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2 } }];

  return node;
}

function drawSquare(circle) {
  const node = figma.createRectangle();

  const radius = circle.radius * (2 ** 0.5) / 2;

  node.x = circle.position[0] - radius;
  node.y = circle.position[1] - radius;
  node.resize(radius * 2, radius * 2);

  node.fills = [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2 } }];

  return node;
}