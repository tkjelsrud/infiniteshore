class Animator {
  constructor(id) {
    this.id = id;
    this.itr = 0;
    this.obj = null;
    this.active = true;
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
