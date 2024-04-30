import Point2D from "./doNotTouch/point2D";
import RectHV from "./doNotTouch/rectHV";
import TreeNode from "./TreeNode";

enum Direction {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal"
}

class KDTree {
  root: TreeNode | null = null;
  treeSize: number;
  // you might or might not need to put some parameters for the constructor
  public constructor() {
    this.treeSize = 0;
  }

  public isEmpty(): boolean {
    return this.root === null;
  }

  public size(): number {
    return this.treeSize;
  }

  public insert(p: Point2D): void {
    if (p === null) throw new Error("argument to insert() is null");

    this.root = this.put(this.root, p, Direction.VERTICAL)
  }

  public put(x: any, p: Point2D, direction: any) {
    if (x === null) {
      this.treeSize++;
      return new TreeNode(p, direction);
    }

    const nodePoint = x.getPoint();
    if (nodePoint.equals(p)) {
      return x;
    }

    const cmp = x.compareTo(p);
    if (cmp < 0) {
      x.setLeft(this.put(x.getLeft(), p, direction));
    } else {
      x.setRight(this.put(x.getRight(), p, direction));
    }
    return x;
  }

  public contains(p: Point2D): boolean {
    return true;
  }

  getDirection(x: TreeNode | null, p: Point2D) {
    if (x === null) return null;
    const cmp = x.compareTo(p);
    if (cmp < 0) {
      return this.getDirection(x.getLeft(), p);
    } else if (cmp > 0) {
      return this.getDirection(x.getRight(), p);
    } else {
      return x.getDirection();
    }
  }

  public range(rect: RectHV): Point2D[] {
    let queue: Point2D[] = [];
    //Question: does this modify the queue?
    this.inRect(this.root, new RectHV(0, 0, 1, 1), rect, queue);
    // i dunno
    return queue;
  }

  // possible cause of concern
  public inRect(node: TreeNode | null, nodeRect: RectHV, rect: RectHV, queue: Point2D[]) {
    if (node !== null && nodeRect.intersects(rect)) {
      if (rect.contains(node.p)) {
        //possible error
        queue.unshift(node.p);
      }
      this.inRect(node.getLeft(), this.getChildRect(node, nodeRect, true), rect, queue);
      this.inRect(node.getRight(), this.getChildRect(node, nodeRect, false), rect, queue);
    }
    return queue;
  }

  getChildRect(x: TreeNode | null, rect: RectHV, left: boolean) {
    if (x!.isVertical()) {
      if (left) {
        return new RectHV(rect.xmin, rect.ymin, x!.p.x, rect.ymax);
      } else {
        return new RectHV(x!.p.x, rect.ymin, rect.xmax, rect.ymax);
      }
    } else {
      if (left) {
        return new RectHV(rect.xmin, rect.ymin, rect.xmax, x!.p.y);
      } else {
        return new RectHV(rect.xmin, x!.p.y, rect.xmax, rect.ymax);
      }
    }
  }
}

export default KDTree;