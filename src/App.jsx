import React, { useState } from 'react'
import { CChart } from '@coreui/react-chartjs'

function App() {

  const [data, setData] = useState({})
  const [conteo, setConteo] = useState(0)

  const query = async () => {
    try {
      const res = await fetch(
        'https://cmebackend.herokuapp.com/top_productos', 
        { method: 'POST' })
      const result = await res.json()


      const etiquetas = []
      const cantidades = []

      for (let item of result.data) {
        etiquetas.push(item.producto)
        cantidades.push(item.cantidad)
      }

      const pre = {
        labels: etiquetas,
        datasets: [
          {
            label: '',
            data: cantidades,
            backgroundColor: ['#03a9f4', '#d32f2f', '#00897b', '#ffb300', '#afb42b']
          }
        ]
      }
      setData(pre)
      setConteo(conteo+1)
    } catch (error) {
      console.log(`Esto es un error: ${error}`)
    }
  }

  const handleSubmit = () => {
    query()

  }

  return (
    <div className="main">
      <h1>Colegio Técnico María Elvinia</h1>
      <h2>Programación grado 11º-1 y 11º-2</h2>
      <h3>React con Chart.js</h3>

      <button type="button" onClick={handleSubmit}>Consultar</button>
      <h2>A continuación un TOP5 de productos mas vendidos</h2>
      <div className={ conteo > 0 ? "grafica" : ""}>
        { conteo > 0 ? <CChart  type='bar' datasets={data.datasets} labels={data.labels} /> : ''} 
      </div>
      <div className={ conteo > 0 ? "grafica" : ""}>
        { conteo > 0 ? <CChart type='pie' datasets={data.datasets} labels={data.labels} /> : ''}
        </div>
    </div>
  );
}

export default App;
