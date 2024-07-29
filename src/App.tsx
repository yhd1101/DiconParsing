import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import * as dicomParser from  "dicom-parser"
import './App.css'

function App() {
  const [file, setFile] = useState<File|undefined>(undefined)

  const [meta, setMeta] = useState({})
  const getDicomData =async () => {
    if(file) {
      console.log('+++++++++++', file)
      const arrayBuffer = await file.arrayBuffer();
      console.log("sdsdasdasdad",arrayBuffer)
      const byteArray = new Uint8Array(arrayBuffer);
      console.log("dsda2222222", byteArray)

      const dataSet = dicomParser.parseDicom(byteArray)

      const studyInstanceUid = dataSet.string("x0020000d")
      const menufacturer = dataSet.string("x00080070")
      console.log("2313144", menufacturer)
      setMeta({
        studyInstanceUid,
        menufacturer
      })

  
    }
  }


  useEffect(() =>{
    getDicomData()
  },[])
  

  return (
   <div>
    <input type='file' onChange={(e) => setFile(e.target.files?.[0])} />

   </div>
  )
}

export default App
