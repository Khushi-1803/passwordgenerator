//import logo from './logo.svg';
import { useState,useCallback, useEffect,useRef } from 'react';
import './App.css';

function App() {
  const[length,setLength] = useState(8)
  const[number,setNumber] = useState(false)
  const[character,setCharacter] = useState(false)
  const[password,setPassword]=useState("")
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = " "
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str+="0123456789"
    if(character) str+="!@#$^&*()_+$"
    for(let i=1; i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,number,character,setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=> {
    passwordGenerator()
  },[length,number,character,passwordGenerator])
  return (
    <>
   <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4  text-orange-500 bg-gray-500 text-center my-60'>
   <h1 className='text-white text-center mb-3 text-3xl'>Password Generator</h1>
   <div className='flex shadow-rounded-lg overflow-hidden mb-4'>
   <input
     type='text'
     value={password}
     className="outline-none w-full py-1 px-3 rounded-lg"
     placeholder="password"
     readOnly
      ref={passwordRef}/>
     <button 
     onClick={copyPasswordToClipboard}
     className='hover:font-bold rounded-lg outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 h-8'>copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
     <div className='flex items-center gap-x-1 font-medium text-xl'>
      <input type="range"
      min={6}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e)=>{setLength(e.target.value)}}
      
      />
      <label>length: {length}</label>
     </div>
     <div className='flex items-center gap-x-1 font-medium text-xl'>
      <input
      type="checkbox"
      defaultChecked={number}
      id="numberInput"
      onChange={()=>{
        setNumber((prev) => !prev)
      }}
      />
      <label htmlFor='numberInput'>Numbers</label>
     </div>
     <div className='flex items-center gap-x-1 font-medium text-xl'>
     <input
      type="checkbox"
      defaultChecked={number}
      id="characterInput"
      onChange={()=>{
        setCharacter((prev) => !prev)
      }}
      />
      <label htmlFor='characterInput'>character</label>
     </div>
     </div>
     </div>
    </>
  );
}

export default App;
