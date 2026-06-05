import "./App.css";
import { useState } from "react";

function App() {
  let [data, setData] = useState(0);

  function funcPuls() {
    setData(data + 1);
  }

  function funcMinus() {
    setData(data - 1);
  }
  function funcreset(){
    setData(data = 0)
  }

  return (
    <div className="katta">
      <div className="kichik"> 
       <h1>counter</h1>
      <h2 className="son">{data}</h2>
      <div className="btns"> 
             <button className="btn btn1" onClick={() => funcPuls()}>+</button>
               <button className="btn btn3" onClick={() => funcreset()}>reset</button>
      <button className="btn btn2" onClick={() => funcMinus()}>-</button>
    
      </div>
      </div>
    </div>
  );
}

export default App;