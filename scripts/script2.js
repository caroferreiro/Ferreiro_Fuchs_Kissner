// using d3 for convenience
let main = d3.select("main");
let scrolly = main.select("#scrolly2");
let $figure = scrolly.select("figure");
let wChart = 600
let hChart = 280;
let dataChart = [];
let $step;

// initialize the scrollama
let scroller2 = scrollama();

// fetch data
d3.dsv(";","/data/datos-graficos.csv", d3.autoType).then(function (data) {
  dataChart = data;
  // kick things off
  init();
});

function handleStepExit(response) {
  // if ($step) {
  console.count("classed");
  d3.select(response.element).classed("is-active", false);
  // }
}

// scrollama event handlers
function handleStepEnter(response) {
  // console.log(response);
  $step = d3.select(response.element);

  // add color to current step only
  // if ($step) {
  $step.classed("is-active", true);
  console.count("classed");
  // }

  $step.style("background", "#ffffff00");

  // create new chart
  const key = $step.attr("data-step");

  // console.log("response.element", response.element);
  // console.log("$step", $step);
  // console.log("key", key);

  createChart(key);
}

function handleStepProgress(response) {
  // console.log(response);
  // $figure.style("opacity", response.progress);
  // $step = d3.select(response.element);
  // console.log($step.attr("data-step"));
//   $step.select(".progress").text(d3.format(".1%")(response.progress));
}

function init() {
  // 1. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 2. bind scrollama event handlers (this can be chained like below)
  scroller2
    .setup({
      step: "#scrolly2 article .step2",
      offset: 0.66,
      debug: false,
      progress: true,
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit)
    .onStepProgress(handleStepProgress);
}

/* DataViz */
function createChart(key) {
  let chart = Plot.plot({
    width: wChart,
    height: hChart,
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 50,
    marginRight: 50,
    fill: 'Fuente',
    stroke: 'Fuente',
    fillOpacity: 1,
    strokeOpacity: 0.9,
    strokeWeight: 1,
    marks: [
      Plot.barX(dataChart, {
          y: 'Fuente',
          x: key,
          fill: 'Fuente',
        },
      ),
      Plot.axisX({ 
        label: null, 
        fontWeight: 500,
      }),
      Plot.axisY({ 
        tickSize: 0,
        grid: true, 
        labelOffset: 70,
    }),
    ],
    color: {
        range: ['#f2871d', '#63d476', '#b27be3'], 
    },
    x: {
        label: key,
        axis: "bottom",
        labelOffset: 40,
    },
    style: {
        fontSize: 13,
        fontFamily: 'Halyard Display',
        fontWeight: 400,
        color: '#8d8d8d',
        backgroundColor: '#06151b',
        source: './tipografias/Halyard Display.ttf'

    },
  });

  d3.select("#scrolly2 figure svg").remove();
  d3.select("#scrolly2 figure").append(() => chart);
}
