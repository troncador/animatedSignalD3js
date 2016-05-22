(function() {
  'use strict';

  var OsciloscopeKnov = function() {} ;

  OsciloscopeKnov.prototype = Object.create(Ui.prototype);

  OsciloscopeKnov.prototype.createElement = function() {
    var scaleOption = {
        drawScale: false,
        drawDial: true,
        radius: this.width / 2.6
      },
      scale = new Ui.Scale(this.merge(this.options, scaleOption)),
      pointer = new Ui.Pointer({
        type: 'Rect',
        pointerWidth: 3,
        pointerHeight: this.width / 5,
        offset: this.width / 2 - this.width / 3.3 - this.width / 10
      }),
       circle = new Ui.El.Circle(this.width / 3.3, this.width / 2,
          this.height / 2);

    Ui.prototype.createElement.apply(this, arguments);

    this.el.node.appendChild(circle.node);
    //this.addComponent(new Ui.Text());
    this.addComponent(pointer);
    this.addComponent(scale);
    this.el.node.setAttribute('class', 'osciloscopeKnov');

  };
  this.OsciloscopeKnov = OsciloscopeKnov;

}.call(this));
