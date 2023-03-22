import { useEffect, useState } from 'react';

function App2() {
    const [data, setData] = useState([{}])
  
    useEffect( () => {
      fetch("/HWSets").then(
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
        {(typeof data.HWSet1 === 'undefined') ?  (
          <p>Loading HWSets...</p>
        ) : (
          data.HWSet1.map((member, i) => (
            <p key={i}>{member}</p>
          ))
      )}
      </div>
    );
  }

  export default App2;