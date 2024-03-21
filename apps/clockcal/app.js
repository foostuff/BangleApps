Bangle.loadWidgets();

var s = Object.assign({
  counter0:10,
  counter1:20,
  max0:15,
  max1:25
}, require('Storage').readJSON("counter2.json", true) || {});

var counter = 0;
var drag;

screenwidth = g.getWidth();
screenheight = g.getHeight();
halfwidth = screenwidth / 2;
halfheight = screenheight / 2;

counter = [];
counter[0] = s.counter0;
counter[1] = s.counter1;
defaults = [];
defaults[0] = s.max0;
defaults[1] = s.max1;

function saveSettings() {
  s.counter0 = counter[0];
  s.counter1 = counter[1];
  s.max0 = defaults[0];
  s.max1 = defaults[1];
  require('Storage').writeJSON("counter2.json", s);
}

ignoreonce = false;
var dragtimeout;

function updateScreen() {
  g.setBgColor('#f00');
  g.clearRect(0, 0, halfwidth, screenheight);
  g.setBgColor('#00f');
  g.clearRect(halfwidth, 0, screenwidth, screenheight);
  g.setColor('#fff');
  g.setFont("Vector", 60).setFontAlign(0, 0);
  g.drawString(Math.floor(counter[0]), halfwidth * 0.5, halfheight);
  g.drawString(Math.floor(counter[1]), halfwidth * 1.5, halfheight);
  saveSettings()
}

Bangle.on("drag", e => {
  c = (e.x < halfwidth) ? 0 : 1;
  if (!drag) {
    if (ignoreonce) {
      ignoreonce = false;
      return;
    }
    drag = { x: e.x, y: e.y };
    dragtimeout = setTimeout(function () { resetcounter(c); }, 600); //if dragging for 500ms, reset counter
  }
  else if (drag && !e.b) { // released
      adjust = 0;
      const dx = e.x - drag.x, dy = e.y - drag.y;
      if (Math.abs(dy) > Math.abs(dx) + 30) {
        adjust = (dy > 0) ? -1 : 1;
      } else {
        adjust = (e.y > halfwidth) ? -1 : 1;
      }
      counter[c] += adjust;
      updateScreen();
      drag = undefined;
      clearTimeout(dragtimeout);
    }
});

function resetcounter(which) {
  counter[which] = defaults[which];
  console.log("resetting counter ", which);
  updateScreen();
  drag = undefined;
  ignoreonce = true;
  Bangle.buzz();
}

Bangle.loadWidgets();
Bangle.drawWidgets();
updateScreen();

Bangle.setUI("clock");
