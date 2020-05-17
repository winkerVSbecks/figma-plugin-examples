figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  let status;

  if (msg.type === 'create-confetti' && typeof msg.count == 'number') {
    status = createConfetti(msg.count);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  if (status !== 'error') {
    figma.closePlugin();
  }
};

function createConfetti(count: number): string {
  // Make sure the user has only selected one node
  if (figma.currentPage.selection.length !== 1) {
    figma.ui.postMessage({
      type: 'error',
      value: 'select a frame to render into',
    });

    return 'error';
  }

  const frameNode = figma.currentPage.selection[0];

  // Ensure that the selected node is a frame
  if (frameNode.type !== 'FRAME') {
    figma.ui.postMessage({
      type: 'error',
      value: 'select a frame to render into',
    });

    return 'error';
  }

  const colors = [
    { r: 0.094, g: 0.627, b: 0.984 },
    { r: 0.482, g: 0.38, b: 1 },
    { r: 1, g: 0, b: 1 },
    { r: 0.105, g: 0.768, b: 0.49 },
    { r: 0.949, g: 0.282, b: 0.133 },
    { r: 1, g: 0.921, b: 0 },
  ];

  const width = frameNode.width;
  const height = frameNode.height;

  const randomRange = (low: number, high: number): number => Math.floor(Math.random() * high) + low;
  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

  for (let index = 0; index < count; index++) {
    // Create a rectangle
    const rect = figma.createRectangle();

    // Assign a random width and height to the rectangle
    const w = randomRange(width * 0.01, width * 0.05);
    const h = randomRange(height * 0.01, height * 0.05);
    rect.resize(w, h);

    // Randomly position the rectangle within the frame
    rect.x = randomRange(0, width);
    rect.y = randomRange(0, height);

    // Set a random color
    rect.fills = [
      {
        type: 'SOLID',
        color: randomColor(),
      },
    ];

    // Add the rectangle to the frame
    frameNode.appendChild(rect);
  }
  return 'success';
}
