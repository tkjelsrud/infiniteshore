class Animator {
  constructor() {
    this.itr = 0;
    this.obj = null;
  }
  frame() {
    this.itr++;
  }
  isAt(frame) {
    return (this.itr == frame);
  }
  every(frame) {
    return (this.itr % frame == 0);
  }
}
