import { useCallback, useState, useEffect, useRef } from "react"


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(0);

  // useRef hook
  const passwordRef = useRef() 

  let passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      str += "123456789"
    }
    if(charAllowed){
      str += "!@#$%&"
    }

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length +1)  
      pass += str.charAt(char)
    }

    setPassword(pass)


  },[length, numberAllowed, charAllowed, setPassword])

  // password copy in clipboard function
  let copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,3)  // how much text to copy from input
    window.navigator.clipboard.writeText(password);
    // console.log(window.navigator.clipboard.read());
    window.navigator.clipboard.read()
    .then((data)=>{
      // console.log(data.length)
      // console.log(data)
      setCopied(data.length)
      setTimeout(() => {
        setCopied(0)
      }, 3000);
    })
  },[[password]])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, setPassword])

  return (
      <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-8 text-orange-500 bg-gray-700">
          <h1 className="text-center text-2xl text-orange-500">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden m-5">
          <input type="text"
          value={password}
          className="outline-none w-full py-2 px-3 selection:bg-gray-700 selection:text-white"
          placeholder="password"
          readOnly
          ref={passwordRef}
          />

          {copied>=1 && 
          <button onClick={copyPasswordToClipboard} className="outline-none bg-green-500 font-semibold text-white px-3 py-0.5 shrink-0">Copied</button> 
          || copied>=0 && <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 font-semibold">Copy</button>}
        </div>

        <div className="flex justify-center text-sm gap-x-5">

          <div className="flex items-center space-x-2">
            <input 
            onChange={(e)=>{setLength(e.target.value)}} 
            type="range" min={6} max={100} 
            value={length} 
            className="cursor-pointer"
            id="passInput"
            />
            <label htmlFor="passInput">Length: {length}</label>
          </div>

          <div className="flex items-center space-x-2">
            <input 
            type="checkbox" 
            defaultChecked={numberAllowed} 
            id="numberInput" 
            onChange={()=>{
              setNumberAllowed(prev=>!prev);
              }}/>
              <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center space-x-2">
            <input 
            type="checkbox" 
            defaultChecked={charAllowed} 
            id="charInput" 
            onChange={()=>{
              setCharAllowed(prev=>!prev);
              }}/>
              <label htmlFor="charInput">Characters</label>
          </div>

        </div>

      </div>
      </>
  )
}

export default App
