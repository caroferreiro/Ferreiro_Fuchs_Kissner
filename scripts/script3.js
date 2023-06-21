// using d3 for convenience
let main = d3.select("main");
let scrolly = main.select("#scrolly");
let $figure = scrolly.select(".fotos");
let wChart = 1000;
let hChart = 400;
let dataChart = [];
let $step;

// initialize the scrollama
let scroller = scrollama();

// fetch data
d3.dsv(";", "/data/datos-graficos.csv", d3.autoType).then(function (data) {
  dataChart = data;
  // kick things off
  init();
});

function handleStepExit(response) {
  d3.select(response.element).classed("is-active", false);
}

// scrollama event handlers
function handleStepEnter(response) {
  $step = d3.select(response.element);

  $step.classed("is-active", true);

  $step.style("background", "#ffffff00");

  // create new image
  const key = $step.attr("data-step");

  createImage(key);
}

function handleStepProgress(response) {
  // TODO: Handle step progress if needed
}

function init() {
  // setup the scroller passing options
  // this will also initialize trigger observations
  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.7,
      debug: false,
      progress: true,
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit)
    .onStepProgress(handleStepProgress);
}

/* DataViz */
function createImage(key) {
  $figure.selectAll("*").remove();

  const imageMapping = {
    A: "perfilA.jpg",
    B: "perfilB.jpg",
    C: "perfilC.jpg"
  };

  const activeImage = imageMapping[key];

  $figure
    .append("img")
    .attr("src", "./imgs/" + activeImage)
    .attr("width", wChart)
    .attr("height", hChart);
}
