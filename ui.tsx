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
    <div style={{ margin: 16 }}>
      <p className="input">
        <label className="label" htmlFor="number">
          Number of rectangles:
        </label>
        <input
          id="number"
          type="number"
          className="input__field"
          value={count}
          onChange={(e) => {
            const value = e.target.value;
            setCount(parseInt(value, 10));
          }}
        />
      </p>

      <b className="type type--small type--medium" style={{ color: 'tomato' }}>
        {error}
      </b>

      <p>
        <button className="button button--primary" onClick={onDraw}>
          Draw Confetti
        </button>
      </p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
