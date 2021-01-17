class AnimTree extends Animator {
  constructor() {
    super();
    this.size = 1;
    this.maxSize = 4;
    this.maxLeaves = 32 + (Math.random() * 32);

    var treeTexture = PIXI.Texture.fromImage("resources/tree-1.png");
    this.tree = new PIXI.Sprite(treeTexture, u*16, u*24);
    this.tree.scale.x = 1.3;
    this.tree.scale.y = 1.3;
    this.tree.position.x = u*12;
    this.tree.position.y = u*6;

    this.leaves = new Container();
    this.leaves.x = this.tree.position.x;
    this.leaves.y = this.tree.position.y;

    //TODO: fix calling global
    app.stage.addChild(this.tree);
    app.stage.addChild(this.leaves);
  }

  frame() {
    if(this.size >= 0) {
      if(this.every(30) && this.size < this.maxSize) {
        this.grow();
      }
      if(this.isGrown()) {
        if(this.every(10)) this.growLeave();
      }
      if(this.isAt(600))
        this.startRegress(); // HMM
    }
    else {
      if(this.every(20)) {
        this.regress();
      }
      if(this.every(5)) this.leaveFall();
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
    l.scale.x = 1.0;
    l.scale.y = 1.0;
    l.position.x = u * (8 + Math.floor(Math.random() * 10));
    l.position.y = u * (6 + Math.floor(Math.random() * 10));
    l.rotation = Math.floor(Math.random() * 360);

    this.leaves.addChild(l);

    if(this.leaves.children.length >= this.maxLeaves)
      this.startRegress();
  }

  leaveFall() {
    for(i = 0; i < this.leaves.children.length; i++) {
      this.leaves.children[i].x -= u * (Math.random() * 3);
      this.leaves.children[i].y += u * (Math.random() * 1);
      this.leaves.children[i].alpha -= (Math.random() * 0.2);
      this.leaves.children[i].tint = 0xFFFF00;
    }

  }

  isGrown() {
    return (this.size >= 4);
  }

  startRegress() {
    this.size = -1;
  }

  regress() {
    this.tree.alpha -= 0.1;
  }
}
