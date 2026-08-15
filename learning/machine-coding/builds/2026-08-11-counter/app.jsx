// Component:
// <Button/> props: count;
//           state: count;
//  handlerFunction: onClickHandler => for increment and decrement;

function App() {
  const [count, setCount] = useState(0);

  function onClickHandler(value) {
    if (value === 'dec') {
      setCount((prev) => (prev > 0 ? --prev : 0));
    } else {
      setCount((prev) => (prev < 10 ? ++prev : 10));
    }
  }
  return (
    <div>
      <h1>{count}</h1>
      <div className="buttonContainer">
        <button onClick={() => onClickHandler('dec')} disabled={count === 0}>
          Decrease
        </button>
        <button onClick={() => onClickHandler('inc')} disabled={count === 10}>
          Increase
        </button>
      </div>
    </div>
  );
}
