import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [count, setCount] = React.useState(50);
  const [error, setError] = React.useState(null);

  const onDraw = () => {
    parent.postMessage(
      { pluginMessage: { type: 'create-confetti', count } },
      '*',
    );
  };

  React.useEffect(() => {
    window.onmessage = (event) => {
      const message = event.data.pluginMessage;

      if (message.type === 'error') {
        setError(message.value);
      }
    };
  });

  return (
    <div>
      <p>
        <label htmlFor="number">Number of rectangles:</label>
        <input
          id="number"
          value={count}
          onChange={(e) => {
            const value = e.target.value;
            setCount(parseInt(value, 10));
          }}
        />
      </p>

      <b id="errors" style={{ color: 'tomato' }}>
        {error}
      </b>

      <p>
        <button onClick={onDraw}>Draw Confetti</button>
      </p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
