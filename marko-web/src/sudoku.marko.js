// Compiled using marko@4.7.4 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_component = ({
    NewSquareArray: function (size) {
        var array = new Array(size);
        for (var i = 0; i < size; i++) {
            array[i] = new Array(size);
            array[i].fill({
                num: '',
                variable: true
            });
        }
        return array;
    },
    NewSudoku: function () {
        var init = this.NewSquareArray(9);
        init[4][0] = {
            num: '5',
            variable: false
        };
        init[6][0] = {
            num: '6',
            variable: false
        };
        init[7][0] = {
            num: '2',
            variable: false
        };
        init[8][0] = {
            num: '7',
            variable: false
        };
        init[2][1] = {
            num: '6',
            variable: false
        };
        init[3][1] = {
            num: '9',
            variable: false
        };
        init[8][1] = {
            num: '1',
            variable: false
        };
        init[0][2] = {
            num: '7',
            variable: false
        };
        init[1][2] = {
            num: '4',
            variable: false
        };
        init[2][2] = {
            num: '2',
            variable: false
        };
        init[3][2] = {
            num: '6',
            variable: false
        };
        init[0][3] = {
            num: '5',
            variable: false
        };
        init[3][3] = {
            num: '1',
            variable: false
        };
        init[2][4] = {
            num: '9',
            variable: false
        };
        init[3][4] = {
            num: '3',
            variable: false
        };
        init[4][4] = {
            num: '4',
            variable: false
        };
        init[5][4] = {
            num: '2',
            variable: false
        };
        init[6][4] = {
            num: '5',
            variable: false
        };
        init[5][5] = {
            num: '9',
            variable: false
        };
        init[8][5] = {
            num: '2',
            variable: false
        };
        init[5][6] = {
            num: '4',
            variable: false
        };
        init[6][6] = {
            num: '8',
            variable: false
        };
        init[7][6] = {
            num: '5',
            variable: false
        };
        init[8][6] = {
            num: '6',
            variable: false
        };
        init[0][7] = {
            num: '4',
            variable: false
        };
        init[5][7] = {
            num: '6',
            variable: false
        };
        init[6][7] = {
            num: '1',
            variable: false
        };
        init[0][8] = {
            num: '1',
            variable: false
        };
        init[1][8] = {
            num: '6',
            variable: false
        };
        init[2][8] = {
            num: '7',
            variable: false
        };
        init[4][8] = {
            num: '3',
            variable: false
        };
        return init;
    },
    onCreate: function () {
        this.state = { squares: this.NewSudoku() };
    },
    handleInput: function (event, el) {
        console.log('change!');
        alert('!!!');
    }
}),
    marko_componentType = "/marko-web$1.0.0/src/sudoku.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_forEachWithStatusVar = require("marko/src/runtime/helper-forEachWithStatusVar"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_attr = marko_helpers.a,
    marko_escapeXml = marko_helpers.x;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<link rel=\"stylesheet\" type=\"text/css\" href=\"index.css\"><div class=\"su-grid\">");

  marko_forEachWithStatusVar(state.squares, function(row, y) {
    out.w("<div class=\"su-row\">");

    marko_forEachWithStatusVar(row, function(sq, x) {
      if (sq.variable) {
        out.w("<div class=\"su-square\"><button" +
          marko_attr("data-marko", {
            onclick: __component.d("handleInput")
          }, false) +
          ">click</button></div>");
      } else {
        out.w("<div class=\"su-square sq-input\"><b>" +
          marko_escapeXml(sq.num) +
          "</b></div>");
      }
    });

    out.w("</div>");
  });

  out.w("</div>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    id: "/marko-web$1.0.0/src/sudoku.marko",
    component: "./sudoku.marko"
  };
