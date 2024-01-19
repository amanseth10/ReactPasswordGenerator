
import { useCallback, useEffect, useState, useRef } from "react"
import "./App.css"

function App() {
  const [length,setLength] =useState(6);
  const [charAllow,setCharAllow] =useState(false);
  const [numAllow,setNumAllow] =useState(false);
  const [pass,setPass]=useState("")
  const passRef=useRef(null)

  const generatePassword = useCallback(()=>{
    let str=""
    let possibleChar="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllow) possibleChar+="1234567890"
    if(charAllow) possibleChar+="!@#$%^&*()-_[]{}\~";
    
    for(let i=0;i<length;i++)
    {
      let index=Math.floor(Math.random()*possibleChar.length)
      str+=possibleChar.charAt(index)
    }
    setPass(str)
  } ,[length,charAllow,numAllow,setPass])

  useEffect(()=>{generatePassword()},[length,charAllow,numAllow,setPass,generatePassword])

  const copyToClip= useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(pass)
  },[pass])

  return (
    <>
    <div className="container">
    <div>
      <input type="text" placeholder="password" value={pass} readOnly ref={passRef}></input>

      <button onClick={copyToClip}>copy</button>
      </div>
      <div>
        <input type="range" min={1} max={100} value={length} onChange={(e)=>{setLength(e.target.value)}}></input>

        <label>Length={length}</label>


        <input type="checkbox" defaultChecked={numAllow} onChange={()=>{setNumAllow((prev)=>!prev)}}></input>
        <label>Number</label>


        <input type="checkbox" defaultChecked={charAllow} onChange={()=>{setCharAllow((prev)=>!prev)}}></input>
        <label>Character</label>
      </div>
    </div>
    </>
  )
}

export default App
