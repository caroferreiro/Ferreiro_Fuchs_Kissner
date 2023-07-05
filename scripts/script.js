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
          label: 'Horas escuchadas', 
          labelOffset: 70,
      }),
      Plot.barY(data, 
        Plot.groupX({y: 'sum'}, {
          x: (d) => d.dia + "-" + d.mes, 
          y: (d) => d.msPlayed/(60000*60),
          fill: 'Fuente',
          stroke: 'Fuente',
          fillOpacity: 1,
          strokeOpacity: 0,
          strokeWeight: 0.5,
          legend: true,
          sort: 'Fuente',
        })),
      ],
      facet: {
        data: 'Fuente',
        legend: true
      },
      color: { 
        range: ['#f2871d', '#5ad16e', '#b27be3']
      },
      x: {
        tickFormat: 'd',
        label: null,
      },
      style: {
        fontSize: 13,
        fontFamily: 'Halyard Display',
        fontWeight: 400,
        source : './tipografias/Halyard Display.ttf'
      },
      marginLeft: 70,
      marginBottom: 70,
      height: 280,
      insetBottom: 5,
      insetTop: 20,
      width: 600,     
      backgroundColor: '#06151b',
    })
    d3.select('#chart').append(() => chart)
  })