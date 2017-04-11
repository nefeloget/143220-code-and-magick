 'use strict';

window.renderStatistics = function(ctx, names, times) {
  // Функция рисования облака
  var drawCloud = function(x, y, width, heigth, color) {
    // Рисуем тень
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x + 10, y + 10, width, heigth);
    // А затем само облако
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, heigth);
  };

  // Переставляет Игрока и его время на первое место в массиве
  function setYourPlayerFirst() {
    for (var i = 0, length = names.length; i < length; i++) {
      if (names[i] === 'Вы') {
        var playerIndex = i;
        break;
      }
    }

    if (playerIndex !== 0) {
      var temp = names[0];
      names[0] = names[playerIndex];
      names[playerIndex] = temp;

      temp = times[0];
      times[0] = times[playerIndex];
      times[playerIndex] = temp;
    }
  }

  // Функция рисования cтолбцов
  var drawHistograms = function(color) {

    var max = maxElemArr(times);
    var histogramHeight = 150;        // px;
    var step = histogramHeight / max; // px;
    var barWidth = 40;                // px;
    var indentX = 90;                 // px;
    var indentY = 0;                  // px;
    var fieldHeight = 240;            // px;
    var initialX = 130;               // px;
    var tabBarBottom = 10;            // px;
    var tabBarTop = 15;               // px;

    for(var i = 0, length = times.length; i < length; i++) {

      setColumnStyle(i);

      indentY = fieldHeight - times[i] * step;
      ctx.fillRect(initialX, indentY, barWidth, times[i] * step);

      drawText(Math.ceil(times[i]), initialX, indentY - tabBarTop, '#000');
      drawText(names[i], initialX, fieldHeight + tabBarBottom, '#000');

      initialX += indentX;
    }
  };

  // Отрисовка цветного текста по координатам
  var drawText = function(text, x, y, color) {
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  };

  // Раскрашиваем колонки
  var setColumnStyle = function (index) {
    if (names[index] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(39, 0, 255, ' + Math.random() + ')';
    }
  };

  // Поиск максимального элемента массива
  var maxElemArr = function(arr) {
    var max = arr[0];

    for (var i = 0, length = arr.length; i < length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  };

  drawCloud(100, 10, 420, 270, 'white');
  setYourPlayerFirst();
  drawText('Ура, вы победили!', 110, 30, '#000');
  drawText('Список результатов:', 110, 50, '#000');
  drawHistograms();

}
