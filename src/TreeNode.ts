import Point2D from "./doNotTouch/point2D";

enum Direction {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal"
}

export default class TreeNode {
  p: Point2D;
  direction: any;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(p: Point2D, direction: Direction) {
    this.p = p;
    this.direction = direction;
    this.left = null;
    this.right = null;
  }

  getPoint(): Point2D {
    return this.p;
  }

  getDirection(): any {
    return this.direction;
  }

  isVertical(): boolean {
    return this.direction === Direction.VERTICAL;
  }


  getLeft(): TreeNode | null {
    return this.left;
  }

  setLeft(left: TreeNode): void {
    this.left = left;
  }

  getRight(): TreeNode | null {
    return this.right;
  }

  setRight(right: TreeNode): void {
    this.right = right;
  }

  compareTo(that: Point2D): number {
    if (that === null) throw new Error("argument to compareTo() is null");

    if (this.p.y === that.y && this.p.x === that.x) {
      return 0;
    }

    if (this.isVertical() && this.p.x > that.x) {
      return -1;
    } 
    if (!this.isVertical() && this.p.y > that.y) {
      return 1;
    }
    return +1;
  }

  getX(): number {
    return this.p.x;
  }

  getY(): number {
    return this.p.y;
  }
}