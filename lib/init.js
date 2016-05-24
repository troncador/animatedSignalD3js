(function() {
  'use strict';
  var init = function() {
    var container = d3.select('#signalInput'),
        voltsByDiv = d3.select('#voltsByDiv'),
        voltsOffset = d3.select('#voltsOffset'),
        timeOffset = d3.select('#timeOffset'),
        timeByDiv = d3.select('#timeByDiv'),
        styleRetro = d3.select('#styleRetro'),
        voltByDivOptions = [5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01],
        voltOffsetOptions = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5],
        timeByDivOptions = [3, 2.75, 2.5, 2.25,  2, 1.5, 1.25, 1, 0.75, 0.5, 0.25],
        timeOffsetOptions = [0.5, 0.4, 0.3, 0.2, 0.1, 0, -0.1, -0.2, -0.3, -0.4, -0.5],
        input = new Graph(container, {width:350, height:300},
          {top:20, right:20, bottom:20, left:20 }, 40),
        signalFormula = d3.select('#signalFormula'),
        strFormula = signalFormula.attr('value'),
        i = 0
        ;

    // VoltsByDiv
    voltsByDiv.attr('data-labels', voltByDivOptions)
              .on('change', function() {
                input.changeVoltsByDiv(voltByDivOptions[this.value]);
              });
    new Knob(voltsByDiv.node(), new OsciloscopeKnov())
      .update(voltByDivOptions.indexOf(1));

    // VoltsOffset
    voltsOffset.attr('data-labels', voltOffsetOptions)
               .on('change', function() {
                 input.changeVoltsOffset(voltOffsetOptions[this.value]);
               });
    new Knob(voltsOffset.node(), new OsciloscopeKnov())
      .update(voltOffsetOptions.indexOf(0));

    // TimeByDiv
    timeByDiv.attr('data-labels', timeByDivOptions)
              .on('change', function() {
                input.changeTimeByDiv(timeByDivOptions[this.value]);
              });
    new Knob(timeByDiv.node(), new OsciloscopeKnov())
      .update(timeByDivOptions.indexOf(1));

    // TimeOffset
    timeOffset.attr('data-labels', timeOffsetOptions)
               .on('change', function() {
                 input.changeTimeOffset(timeOffsetOptions[this.value]);
               });
    new Knob(timeOffset.node(), new OsciloscopeKnov())
      .update(timeOffsetOptions.indexOf(0));

    // Signal
    signalFormula.on('change', function() {
      strFormula = this.value;
    });

    // styleRetro
    styleRetro.on('click', function() {
      var i = styleRetro.select('i');
      if (i.classed('fa-check')) {
        i.classed('fa-check', false);
        i.classed('fa-times', true);
        container.classed('styleRetro', false);
        container.classed('styleNoRetro', true);

      } else {
        i.classed('fa-check', true);
        i.classed('fa-times', false);
        container.classed('styleRetro', true);
        container.classed('styleNoRetro', false);
      }
    });

    setInterval(function() {
      var value = 0;
      try {
        value = math.eval(strFormula,{i:i});
        signalFormula.classed('field-error', false);
      } catch (e) {
        signalFormula.classed('field-error', true);
      }
      input.step(value);
      i++;
    }, 1);
  };

  this.init = init;

}.call(this));
