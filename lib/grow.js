growth = new Array();

function grow() {

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
