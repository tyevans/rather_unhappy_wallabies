"use strict";

/**
 * Copyright (C) 2014 All Right Reserved, Tyler Evans
 * ==================================================
 *
 */

function Body(options) {
    this.state = {
        position: options["position"], // {x: 1, y:10}
        geometry: options["geometry"], // [[0,0], [0,1], [1,1], [1,0]]
        drawable: options["drawable"], // something with a .draw(canvas) method
        mass: options["mass"], // 10
        velocity: options["initial_velocity"] || {x: 0, y:0}
    };
}

Body.prototype = Object.create(Object.prototype);

Body.prototype.step = function (delta) {
    this.state.position.x += this.velocity.x * delta;
    this.state.position.y += this.velocity.y * delta;
};

Body.prototype.draw = function (canvas) {
    this.state.drawable.draw(canvas);
};

function RectDrawable(options) {
    this.state = {
        width: options.width,
        height: options.height
    };
}
RectDrawable.prototype = Object.create(Object.prototype);

RectDrawable.prototype.draw = function (canvas) {
    canvas.strokeRect(0, 0, this.width, this.height);
};


var wallaby = (function () {

    var canvas_element,
        running = false,
        lasttime = 0;

    return {
        "init": function(canvas_el) {
            canvas_element = canvas_el;

        }
        "run": function () {
            function mainloop(runtime) {
                var dt = runtime - lasttime;
                lasttime = runtime;
                world.step(dt);
                world.draw();
                if (running) {
                    requestAnimationFrame(mainloop);
                }
            }
            running = true;
            requestAnimationFrame(mainloop);
        },
    }
}());