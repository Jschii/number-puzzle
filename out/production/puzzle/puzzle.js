if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'puzzle'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'puzzle'.");
}
var puzzle = function (Kotlin) {
  'use strict';
  var _ = Kotlin.defineRootPackage(function () {
    var tmp$0, tmp$1;
    this.canvas = Kotlin.isType(tmp$0 = document.getElementById('canvas'), HTMLCanvasElement) ? tmp$0 : Kotlin.throwCCE();
    this.context = Kotlin.isType(tmp$1 = _.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$1 : Kotlin.throwCCE();
    this.rowSize = 3;
    this.pieces = [8, 7, 6, 5, 4, 3, 2, 1, 0];
    this.pieceSize = 100.0;
    this.cornerRadius = 20.0;
  }, /** @lends _ */ {
    main_kand9s$f: function (it) {
      _.onClick_9ojx7i$(it);
    },
    main_kand9s$: function (args) {
      _.drawBoard();
      _.canvas.addEventListener('click', _.main_kand9s$f);
    },
    drawBoard: function () {
      _.context.clearRect(0.0, 0.0, _.canvas.width, _.canvas.height);
      var $receiver = _.pieces;
      var tmp$2;
      var index = 0;
      for (tmp$2 = 0; tmp$2 !== $receiver.length; ++tmp$2) {
        var item = $receiver[tmp$2];
        var index_0 = index++;
        if (item !== 0) {
          var x = index_0 % 3 * _.pieceSize;
          var y = (index_0 / 3 | 0) * _.pieceSize;
          _.context.fillStyle = '#333';
          _.context.lineJoin = 'round';
          _.context.lineWidth = _.cornerRadius;
          _.context.strokeRect(x + _.cornerRadius / 2, y + _.cornerRadius / 2, _.pieceSize - _.cornerRadius, _.pieceSize - _.cornerRadius);
          _.context.fillRect(x + _.cornerRadius / 2, y + _.cornerRadius / 2, _.pieceSize - _.cornerRadius, _.pieceSize - _.cornerRadius);
          _.context.fillStyle = '#ee1';
          _.context.font = '50pt Calibri';
          _.context.textAlign = 'center';
          _.context.textBaseline = 'middle';
          _.context.fillText(item.toString(), x + _.pieceSize / 2, y + _.pieceSize / 2);
        }
      }
    },
    onClick_9ojx7i$: function (e) {
      var tmp$0;
      var event = Kotlin.isType(tmp$0 = e, MouseEvent) ? tmp$0 : Kotlin.throwCCE();
      var rect = _.canvas.getBoundingClientRect();
      var x = (event.clientX - rect.left) / (rect.right - rect.left) * _.canvas.width;
      var y = (event.clientY - rect.top) / (rect.bottom - rect.top) * _.canvas.height;
      var xIndex = Math.floor(x / _.pieceSize);
      var yIndex = Math.floor(y / _.pieceSize);
      if (0 <= xIndex && xIndex <= _.rowSize && 0 <= yIndex && yIndex <= _.rowSize) {
        var index = xIndex + yIndex * 3;
        var item = _.pieces[index];
        if (item !== 0) {
          var indexOfZero = Kotlin.kotlin.collections.indexOf_tb5gmf$(_.pieces, 0);
          if (index + 1 === indexOfZero || index - 1 === indexOfZero || index + _.rowSize === indexOfZero || index - _.rowSize === indexOfZero) {
            _.pieces[indexOfZero] = item;
            _.pieces[index] = 0;
            var $receiver = _.pieces;
            var tmp$2;
            var index_0 = 0;
            var accumulator = true;
            for (tmp$2 = 0; tmp$2 !== $receiver.length; ++tmp$2) {
              var element = $receiver[tmp$2];
              accumulator = (accumulator && (element === index_0++ + 1 || element === 0));
            }
            var solved = accumulator;
            if (solved) {
              Kotlin.println('Congratulation!!');
            }
            _.drawBoard();
          }
        }
      }
    }
  });
  Kotlin.defineModule('puzzle', _);
  _.main_kand9s$([]);
  return _;
}(kotlin);
