import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [row, setRow] = useState([]) 

  useEffect(()=>{
    console.log('mount or update');

    return () => {
      console.log('unmount');
    };
  });

  useEffect(() => { 
    console.log('mount only');
//    fetchData()
    setLoading(true)
    fetch("http://openapi.seoul.go.kr:8088/5749526a7a6c796839366771704459/json/RealtimeCityAir/1/25")
      .then(res => res.json())
      .then(data => {
        setRow(data.RealtimeCityAir.row)
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
      })
      
  },[]);
  
  

  useEffect(()=> {
    console.log('update only',row);
  },[row])
  
  const [loading, setLoading] = useState(false)

  /* function fetchData() {
    setLoading(true)
    fetch("http://openapi.seoul.go.kr:8088/5749526a7a6c796839366771704459/json/RealtimeCityAir/1/25")
      .then(res => res.json())
      .then(data => {
        setRow(data.RealtimeCityAir.row)
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
      })
  } */
  console.log(row)

  return (
    <>  
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {loading ? (
        <button disabled>Loading...</button>
      ) : (
        <button >Load data</button>
      )}
      <br></br>
      <table>
        <thead>
          <tr>
          <th>이름</th>
          <th>PM</th>
          <th>O3</th>
          <th>상태</th>
          </tr>
        </thead>
        <tbody>
          { // 여기서부터 javascript 시작한다는 의미의 중괄호
            row.map((gu,index) => {
              return <tr key={index}>
                <td>{gu.MSRSTE_NM}</td>
                <td>{gu.PM10}</td>
                <td>{gu.O3}</td>
                <td>{gu.IDEX_NM}</td>
              </tr>
            })
          }
          </tbody>

      </table>

      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div> */}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
