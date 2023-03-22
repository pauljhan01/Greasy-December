import { useEffect, useState } from 'react';

function App3() {
    const [data, setData] = useState([{}])
  
    useEffect( () => {
      fetch("/login/stephen").then(
        res => res.json()
      ).then(
        data => {
            setData(data)
            console.log(data)
        }
      )
    }, [] )
    return (
      <div>
        {(data.length <= 1) ?  (
          <p>Loading User Data...</p>
        ) : (
          <p>{data}</p>
      )}
        
      </div>
    );
  }

  export default App3;