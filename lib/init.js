(function() {
  'use strict';
  var init = function() {
    var svg = d3.select('#signalInput'),
        signalFormula = d3.select('#signalFormula'),
        voltsByDiv = d3.select('#voltsByDiv'),
        voltsByDivOptions = [5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01],
        knobVoltsByDiv,
        voltsOfset = d3.select('#voltsOfset'),
        voltsOfsetOptions = [5, 3, 4, 2, 1, 0, -1, -2, -3, -4, -5],
        knobVoltsOfset,
        input = new Graph(svg, [350, 300], [20, 20, 20, 20], 100),
        strFormula = 'cos(2*pi*i/20)*2',
        i = 0
        ;

    voltsByDiv.attr('data-labels', voltsByDivOptions);
    knobVoltsByDiv = new Knob(voltsByDiv.node(), new OsciloscopeKnov());
    knobVoltsByDiv.update(voltsByDivOptions.indexOf(1));

    voltsOfset.attr('data-labels', voltsOfsetOptions);
    knobVoltsOfset = new Knob(voltsOfset.node(), new OsciloscopeKnov());
    knobVoltsOfset.update(voltsOfsetOptions.indexOf(0));

    signalFormula.attr('value', strFormula);
    signalFormula.on('change', function() {
      strFormula = this.value;
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
    },40);
  };

  this.init = init;

}.call(this));
