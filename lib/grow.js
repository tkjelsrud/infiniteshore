growth = new Array();


  function grow() {
    s = u / 4;
    if(growth.last && growth.frm % 20 == 0) {
      let g = new Graphics();
      //rectangle.lineStyle(4, 0xFF3300, 1);
      let loc = {x: growth.x, y: growth.y};

      g.beginFill(0xFFFFFF);
      g.drawRect(loc.x, loc.y, s, s);
      //rot += 0.5; //Math.random() * 360;
      //console.log(rot);
      rot = 45;
      //rotate(g, rot);
      g.endFill();
      growth.cont.addChild(g);
      growth.last = g;

      growth.x = loc.x - (Math.cos(growth.itr) * u);
      growth.y = loc.y - (Math.sin(growth.itr) * u);
      growth.itr++;
    }
    if(growth.last == null) {
      let g = new Graphics();
      //rectangle.lineStyle(4, 0xFF3300, 1);
      g.beginFill(0xFFFFFF);
      g.drawRect(11*u, 15*u, s, s);
      growth.x = 11*u;
      growth.y = 15*u;
      g.endFill();
      growth.cont.addChild(g);
      growth.last = g;
    }
    growth.frm++;
  }

function addElement() {

  let rectangle = new Graphics();
  //rectangle.lineStyle(4, 0xFF3300, 1);
  rectangle.beginFill(0x66CCFF);
  rectangle.drawRect(0, 0, w*u, u);
  rectangle.endFill();
  //rectangle.x = 170;
  //rectangle.y = 170;
  app.stage.addChild(rectangle);
}
