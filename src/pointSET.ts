import p5 from "p5";
import Point2D from "./doNotTouch/point2D";
import RectHV from "./doNotTouch/rectHV";

class PointSET {
  set: Set<Point2D>;

  // construct an empty set of points
  public constructor() {
    this.set = new Set<Point2D>();
  }

  // is the set empty?
  public isEmpty(): boolean {
    return this.set.size === 0;
  }

  // number of points in the set
  public size(): number {
    return this.set.size;
  }

  // add the point to the set (if it is not already in the set)
  public insert(p: Point2D): void {
    this.set.add(p);
  } 

  // does the set contain point p?
  public contains(p: Point2D): boolean {
    if (p === null) throw new Error("argument to contains() is null")
    return this.set.has(p);
  }

  // draw all points to p5
  public draw(p: p5): void {
    for (let point of this.set) {
      point.draw(p);
    }
  }

  // all points that are inside the rectangle (or on the boundary)
  public range(rect: RectHV): Point2D[] {
    let stack: Point2D[] = [];
    for (let point of this.set) {
      if (point.x >= rect.xmin && point.x <= rect.xmax && point.y >= rect.ymin && point.y <= rect.ymax) {
        stack.push(point);
      }
    }
    return stack;
  } 
}

export default PointSET;