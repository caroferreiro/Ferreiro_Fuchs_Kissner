d3.csv('datos.csv', d3.autoType).then(data => {
  var parseTime = d3.timeParse('%Y-%m-%d');
  var formatMonth = d3.timeFormat('%m');
  var formatDay = d3.timeFormat('%d');
  
  data.forEach(function(d) {
    d.fecha = parseTime(d.Fecha);
    d.mes = formatMonth(d.Fecha);
    d.dia = formatDay(d.Fecha);
  });

  console.log(data)

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
        Plot.barY(data, 
          Plot.groupX({y: 'sum'}, {
            // x: 'msPlayed', 
            x: d => d.dia + "/" + d.mes, 
            filter: (d) => d.Fecha = '2023-05-27',  
            thresholds: d3.timeWeek,
            fill: 'Fuente',
            // strokeOpacity: 0.2,
            // strokeWeight: 0.2,
            legend: true,
            sort: 'Fuente',
            //title: (d) =>
            //`${d.nacionalidad}`
            //Horas de misión: ${(d.mision_hs).toFixed(2)} horas`,
          })),
        // Plot.barX(data, 
        //     Plot.groupY({x: 'sum'}, {
        //       x: (d) => d.msPlayed/(60000*60), 
        //       y: 'Fuente',
        //       fill: 'Fuente',
        //       // strokeOpacity: 0.2,
        //       // strokeWeight: 0.2,
        //       legend: true,
        //       sort: 'Fuente',
        //       //title: (d) =>
        //       //`${d.nacionalidad}`
        //       //Horas de misión: ${(d.mision_hs).toFixed(2)} horas`,
        //     })),
      ],
      facet: {
        data: 'Fuente',
      },
      color: {
        // range: ['#', '#', '#'],
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
