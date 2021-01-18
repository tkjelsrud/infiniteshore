class AnimTree extends Animator {
  constructor(id) {
    super(id);
    this.size = 1;
    this.maxSize = 4;
    this.maxLeaves = 64 + (Math.random() * 32);
    this.active = false;
    this.label = "no text";
  }

  setLabel(text) {
    this.label = text;
  }

  getStageObjects() {
    return new Array(this.leaves, this.tree);
  }

  /*move(x, y) {
    this.tree.position.x += u*x;
    this.tree.position.y += u*y;
    this.leaves.x = this.tree.position.x;
    this.leaves.y = this.tree.position.y;
    for(i = 0; i < this.leaves.children.length; i++) {
      this.leaves.children[i].x += u*x;
      this.leaves.children[i].y += u*y;
    }
  }*/

  start(x, y) {
    let treeTexture = PIXI.Texture.fromImage("resources/tree-1.png");
    this.tree = new PIXI.Sprite(treeTexture, u*16, u*24);
    this.tree.scale.x = 0.8;
    this.tree.scale.y = 1.0;
    this.tree.position.x = u*x;
    this.tree.position.y = u*y;
    this.tree.tint = 0.5 * 0x000000;

    this.leaves = new Container();
    this.leaves.x = this.tree.position.x;
    this.leaves.y = this.tree.position.y;

    let text = new PIXI.Text(this.label, {fontFamily : 'Arial', fontSize: 256, fill : 0xffffff});
    text.position.x = u* (x + 1);
    text.position.y = u* (y - 8);
    text.alpha = 0.8;
    //text.scale.x = 2;
    //text.scale.y = 2;
    this.leaves.addChild(text);

    //TODO: fix calling global
    app.stage.addChild(this.tree);
    app.stage.addChild(this.leaves);

    this.active = true;
    this.itr = 0;
  }

  frame() {
    if(this.size >= 0) {
      if(this.every(15) && !this.isGrown()) {
        this.grow();
      }
      if(this.isGrown() && !this.hasMaxLeaves()) {
        if(this.every(2)) this.growLeave();
      }
      //if(this.isAt(400))
      //  this.startRegress(); // HMM
    }
    else {
      if(this.isDead()) {
        this.active = false;
        return;
      }
      if(this.every(20)) {
        this.regress();
      }
      if(this.every(2)) this.leaveFall();
    }


    super.frame();
  }

  grow() {
    var treeTexture = PIXI.Texture.fromImage("resources/tree-" + (this.size + 1) + ".png");
    this.tree.texture = treeTexture;
    this.size++;
  }

  growLeave() {
    var leavesTexture = PIXI.Texture.fromImage("resources/leaves.png");

    var l = new PIXI.extras.TilingSprite(leavesTexture, u*4, u*4);
    l.tilePosition.x = u * Math.floor(Math.random() * 3);
    l.tilePosition.y = u * Math.floor(Math.random() * 3);
    l.scale.x = 0.5;
    l.scale.y = 0.5;
    l.position.x = u * (4 + Math.floor(Math.random() * 10));
    l.position.y = u * (4 + Math.floor(Math.random() * 10));
    l.rotation = Math.floor(Math.random() * 360);

    this.leaves.addChild(l);
  }

  hasMaxLeaves() {
    return (this.leaves.children.length >= this.maxLeaves);
  }

  leaveFall() {
    let f = 0.1;

    for(i = 0; i < this.leaves.children.length; i++) {
      this.leaves.children[i].x -= u * (Math.random() * 4) * f;
      this.leaves.children[i].y += u * (Math.random() * 1) * f;
      this.leaves.children[i].rotation += (Math.random() * 0.5) * f;
      this.leaves.children[i].alpha -= (Math.random() * 1) * f;
      this.leaves.children[i].tint = 0xffff00;
    }

  }

  isGrown() {
    return (this.size >= 4);
  }

  startRegress() {
    this.size = -1;
  }

  regress() {
    this.tree.alpha -= 0.3;
    this.tree.position.y += u * 0.5;
    this.tree.scale.x -= 0.02;
    this.tree.scale.y -= 0.02;
    this.tree.tint = 0.5 * 0x000000;
  }

  isDead() {
    return (this.tree.alpha <= 0);
  }

  destroy() {
    //console.log("destory!!!1" + this.id);
    this.active = false;
    app.stage.removeChild(this.tree);
    app.stage.removeChild(this.leaves);

    this.leaves.destroy({children:true, texture:true, baseTexture:true});
    this.tree.destroy({children:true, texture:true, baseTexture:true});

  }
}
