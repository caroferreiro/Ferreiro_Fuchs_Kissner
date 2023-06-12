d3.csv('/data/datos.csv', d3.autoType).then(data => {
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
      Plot.axisX({ 
        tickSize: 0,
        label: null, 
        labelOffset: 0,
        fontWeight: 500,
      }),
      Plot.axisY({ 
          tickSize: 4,
          grid: true, 
          label: 'Horas escuchadas por día', 
          labelOffset: 70,
      }),
      Plot.barY(data, 
        Plot.groupX({y: 'sum'}, {
          x: (d) => d.dia + "-" + d.mes, 
          // y: (d) => d.msPlayed/(60000*60),
          // thresholds: d3.timeWeek,
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
        fontSize: 13,
        fontFamily: 'Tahoma',
        fontWeight: 400,
      },
      marginLeft: 70,
      marginBottom: 70,
      height: 280,
      insetBottom: 5,
      width: 600,     
    })
    d3.select('#chart').append(() => chart)
  })