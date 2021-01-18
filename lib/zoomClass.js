class AnimZoom extends Animator {
  constructor(id) {
    super(id);
    this.direction = 0;
    this.steps = 0;
    this.maxSteps = 20;
    this.scale = 0.003;
    this.loc = {'x': 0, 'y': 0};
  }

  start(x, y) {
    // start zooming in
    this.loc = {'x': x, 'y': y};
    this.direction = 1;
    this.steps = 0;
  }

  startRegress() {
    // zoom back
    if(this.direction == 1) {
      this.direction = -1;
      this.steps = 0;
    }
  }

  frame() {
    super.frame();

    if(this.every(2) && this.isZooming()) {
      app.stage.scale.x += 0.003 * this.direction;
      app.stage.scale.y += 0.003 * this.direction;
      app.stage.x -= 0.5 * this.direction;
      app.stage.y -= 2 * this.direction;
      this.steps++;
    }
  }

  isZooming() {
    return (this.steps < this.maxSteps);
  }

  isZoomReady() {
    return (!this.isZooming() && (this.direction == 0 || this.direction == -1));
  }
}
