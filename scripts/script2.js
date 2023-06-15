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
      offset: 0.33,
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
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 50,
    marginRight: 50,
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
        labelOffset: 70,
      }),
      Plot.axisY({ 
        tickSize: 0,
        grid: true, 
        labelOffset: 70,
    }),
    ],
    color: {
        // range: ['#2639BA', '#F640C3', '#1BC5B2'], //'#F58017': naranja, '#801ED4': violeta, #F640C3: rosa
        range: ['#801ED4', '#E8750E', '#1FD7C3'], // #D10E31: rojo
    },
    x: {
      //   ticks: 0,
        label: key,
        axis: "bottom",
        labelOffset: 40,
    },
    style: {
        fontSize: 13,
        fontFamily: 'Tahoma',
        fontWeight: 400,
        backgroundColor: 'black',
        color: 'white'
    },
  });

  d3.select("#scrolly2 figure svg").remove();
  d3.select("#scrolly2 figure").append(() => chart);
}
