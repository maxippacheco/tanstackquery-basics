import { useEffect, useState, useReducer } from 'react'
import './App.css'

const getRandomNumberFromApi = async():Promise<number> => {
  const res = await fetch("https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new");
  const numberString = await res.text();

  return +numberString;
}

function App2() {
  const [number, setNumber] = useState<number>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [key, forceRefetch] = useReducer(x => x + 1, 0);

  useEffect(() => {
    setIsloading( true );
    getRandomNumberFromApi()
    .then( setNumber )
    .catch( error => setError( error.message ) );
  }, [key])
  
  useEffect(() => {
    if( number ) setIsloading( false );
  }, [ number ])

  useEffect(() => {
    
    if( error ) setIsloading(false);

  }, [ error ]);
  
  


  return (
    <div className='App App-header'>
     {
      isLoading
      ? (
        <h2>Cargando...</h2>
      )
      : (
        <h2>Numero aleatorio: { number }</h2>
      )
     }

     {
      !isLoading && error && <h3>{ error }</h3>
     }

     <button onClick={forceRefetch} disabled={ isLoading }>
      {
        isLoading ? '...' : 'Nuevo numero'
      }
     </button>
    </div>
  )
}

export default App2