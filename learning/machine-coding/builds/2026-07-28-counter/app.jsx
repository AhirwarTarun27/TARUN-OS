// Component
// 
// Counter props: count, incrementHandler, decrementHandler
// 
// State: count
// 
// Handlers: incrementHandler, decrementHandler
function Counter({count, incrementHandler,decrementHandler}){
  return <>
   <h1>{count}</h1>
  <button onClick={decrementHandler}>Decrease</button><button onClick={incrementHandler}>Increase</button>
  </>
  }

function App(){
  const [count,setCount] = useState(0);
  
  const decrementHandler = ()=> {
     setState(prev => prev < 0 ? 0 : prev - 1);
    }
  const incrementHandler = ()=> {
    setState(prev => prev >= 10 ? 10 : prev + 1);
    }
  
  return <>
          <Counter count={count} decrementHandler={decrementHandler} incrementHandler={incrementHandler}/>
        </>
  }


