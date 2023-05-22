import './App.css'
import { useRandom } from './hooks/useRandom'


function App() {
 
  const query = useRandom();


  return (
    <div className='App App-header'>
     {
      query.isLoading
      ? (
        <h2>Cargando...</h2>
      )
      : (
        <h2>Numero aleatorio: { query.data }</h2>
      )
     }

     {
      !query.isLoading && query.isError && <h3>{ `${ query.error }` }</h3>
     }

     <button onClick={ () => query.refetch() } disabled={ query.isLoading }>
      {
        query.isLoading ? '...' : 'Nuevo numero'
      }
     </button>
    </div>
  )
}

export default App
