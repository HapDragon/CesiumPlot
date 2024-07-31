import Base from '../base';
// @ts-ignore
import { Cartesian3 } from 'Cesium';
import { PolygonStyle } from '../interface';

export default class FreehandLine extends Base {
  points: Cartesian3[] = [];
  freehand: boolean;

  constructor(cesium: any, viewer: any, style?: PolygonStyle) {
    super(cesium, viewer, style);
    this.cesium = cesium;
    this.freehand = true;
    this.setState('drawing');
      this.hintText = "单击开始绘制";
      this.minPointsForShape = 2;
  }

  getType(): 'polygon' | 'line' {
    return 'line';
  }

  /**
   * Add points only on click events
   */
  addPoint(cartesian: Cartesian3) {
    this.points.push(cartesian);
      this.hintText = "双击结束绘制";
    if (this.points.length < 2) {
      this.onMouseMove();
    } else {
      this.finishDrawing();
    }
  }

  /**
   * Draw a shape based on mouse movement points during the initial drawing.
   */
  updateMovingPoint(cartesian: Cartesian3) {
    this.points.push(cartesian);
    this.setGeometryPoints(this.points);
    this.drawLine();
    this.eventDispatcher.dispatchEvent('drawUpdate', cartesian);
  }

  /**
   * In edit mode, drag key points to update corresponding key point data.
   */
  updateDraggingPoint(cartesian: Cartesian3, index: number) {
    this.points[index] = cartesian;
    this.setGeometryPoints(this.points);
    this.drawLine();
  }

  getPoints() {
    return this.points;
  }
}
