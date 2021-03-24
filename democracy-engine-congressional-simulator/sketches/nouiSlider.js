function setup() {
  textSize(15);
  noStroke();
  let canvas = createCanvas(windowWidth * .8, windowHeight * .8);
  canvas.parent('vote');
  dWidth = width;
  dHeight = height;
  sliders();
}

function sliders() {
  // NOui slider slides
  var range = document.getElementById('slider');

  noUiSlider.create(slider, {
    start: [4000, 5000, 8000],
    range: {
      'min': [2000],
      'max': [10000]
    },
    cssPrefix: 'noUi-',
    tooltips: true,
    pips: {
      mode: 'range',
      density: 'range',
    },
    step: 1,
    format: wNumb({
      decimals: 0
    })
  });

  var toolTip = slider.querySelectorAll('.noUi-tooltip');
  var classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];

  for (var i = 0; i < toolTip.length; i++) {
    toolTip[i].classList.add(classes[i]);
  }

  //connecting values to html, each tab value is stored in an array
  var rangeSliderValueElement = document.getElementById('slider-value');

  slider.noUiSlider.on('update', function(values, handle) {
    rangeSliderValueElement.innerHTML = values[0] + " " + values[1];
  });

}
