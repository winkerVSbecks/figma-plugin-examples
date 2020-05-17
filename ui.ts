document.getElementById('draw')!.onclick = () => {
  const countEl = document.getElementById('number') as HTMLInputElement;
  const count = parseInt(countEl.value, 10);

  parent.postMessage(
    { pluginMessage: { type: 'create-confetti', count } },
    '*',
  );
};

function showError(errorMessage: string) {
  document.getElementById('errors')!.textContent = 'error:' + errorMessage;
}

window.onmessage = (event) => {
  const message = event.data.pluginMessage;

  if (message.type === 'error') {
    showError(message.value);
  }
};
