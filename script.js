d3.csv('datos.csv', d3.autoType).then(data => {
//     const fs = require('fs');
//     const csv = require('csv-parser');
//     const data = [];

//     fs.createReadStream('datos.csv')
//       .pipe(csv())
//       .on('data', (row) => {
//       data.push(row);
//     })
//       .on('end', () => {
    
//         // Objeto para almacenar la suma de msPlayed por día y fuente
//     const sumByDayAndSource = {};

//     // Iterar sobre los datos y realizar la suma
//     for (const item of data) {
//       const { Fecha, msPlayed, Fuente } = item;

//       // Crear una clave única para identificar cada combinación de Fecha y Fuente
//       const key = `${Fecha}-${Fuente}`;

//       // Si la clave no existe, inicializar la suma en 0
//       if (!sumByDayAndSource[key]) {
//         sumByDayAndSource[key] = 0;
//       }

//       // Sumar los msPlayed al valor existente
//       sumByDayAndSource[key] += parseInt(msPlayed);
//     }

//     // Imprimir los resultados
//     for (const key in sumByDayAndSource) {
//       const [Fecha, Fuente] = key.split("-");
//       const msPlayedSum = sumByDayAndSource[key];

//       console.log(`Fecha: ${Fecha}, Fuente: ${Fuente}, Suma de msPlayed: ${msPlayedSum}`);
//     }
//   });
    // const parseTime = d3.timeParse('%Y-%m-%d')
    // data.forEach(function(d) {
    //     d.Fecha = parseTime(d.Fecha);
    // });
    // let data2 = d3.bin()
    //   .value(d => d.diff)(data)
    //   .map(d => {
    //     return {cant: d.length, diffDesde: d.x0, diffHasta: d.x1}
    //   })
    //   .sort((a, b) => b.diffHasta - a.diffDesde)
    // console.log(data2)
    let chart = Plot.plot({
      marks: [
        Plot.axisY({ 
          anchor: "Left",
          tickSize: 0,
          label: null, 
          labelOffset: 45,
          fontSize: 13,
          fontWeight: 500,
        }),
        Plot.axisX({ 
            anchor: "Bottom",
            grid: true, 
            label: 'Horas escuchadas por semana', 
            labelOffset: 40,
            fontSize: 12,
          }),
        // Plot.rectX(data, 
        //   Plot.binY({x: 'count'}, {
        //     // x: 'msPlayed', 
        //     y: d => d3.timeParse('%Y-%m-%d')(d.Fecha),
        //     filter: (d) => d.Fecha = '2023-05-27',  
        //     thresholds: d3.timeWeek,
        //     fill: 'Fuente',
        //     // strokeOpacity: 0.2,
        //     // strokeWeight: 0.2,
        //     legend: true,
        //     sort: 'Fuente',
        //     //title: (d) =>
        //     //`${d.nacionalidad}`
        //     //Horas de misión: ${(d.mision_hs).toFixed(2)} horas`,
        //   })),
        Plot.barX(data, 
            Plot.groupY({x: 'sum'}, {
              x: (d) => d.msPlayed/(60000*60), 
              y: 'Fuente',
              fill: 'Fuente',
              // strokeOpacity: 0.2,
              // strokeWeight: 0.2,
              legend: true,
              sort: 'Fuente',
              //title: (d) =>
              //`${d.nacionalidad}`
              //Horas de misión: ${(d.mision_hs).toFixed(2)} horas`,
            })),
        // Plot.text(
        //   datos_2016,
        //   Plot.groupX(
        //   { y: 'sum' },
        //   {
        //   x: 'anio_mision',
        //   y: 'mision_hs',
        //   fill: 'black',
        //   sort: 'nacionalidad',
        //   fontWeight: 'bold',
        //   fontSize: 12,
        //   text: d => {
        //   // d: es el grupo de astronautas de todos los países
        //   console.log(d)
        //   let sumaHs = d3.sum(d, d2 => d2.mision_hs)
        //   return d3.format('d')(sumaHs)
        //   },
        //   dy: -10,
        //   })),
      ],
      color: {
        range: ['#', '#', '#'],
      },
      x: {
        tickFormat: 'd',
        label: null,
      },
      style: {
        fontSize: 12,
        fontFamily: 'Tahoma',
        fontWeight: 400,
      },
      marginLeft: 70,
      marginBottom: 70,
      height: 280,
      width: 500,     
    })
    d3.select('#chart').append(() => chart)
  })
