import Base from '../base';
// @ts-ignore
import { Cartesian3 } from 'Cesium';

import { PolygonStyle } from '../interface';

export default class Polygon extends Base {
  points: Cartesian3[] = [];

  constructor(cesium: any, viewer: any, style?: PolygonStyle) {
    super(cesium, viewer, style);
    this.cesium = cesium;
    this.setState('drawing');
    this.onDoubleClick();
      this.hintText = "单击开始绘制";
  }

  getType(): 'polygon' | 'line' {
    return 'polygon';
  }

  /**
   * Add points only on click events
   */
  addPoint(cartesian: Cartesian3) {
    this.points.push(cartesian);
      this.hintText = "单击继续添加点，双击结束绘制";
    if (this.points.length === 1) {
      this.onMouseMove();
    }
  }

  /**
   * Draw a shape based on mouse movement points during the initial drawing.
   */
  updateMovingPoint(cartesian: Cartesian3) {
    const tempPoints = [...this.points, cartesian];
    this.setGeometryPoints(tempPoints);
    if (tempPoints.length === 2) {
      this.addTempLine();
    } else {
      this.removeTempLine();
      this.drawPolygon();
    }
  }

  /**
   * In edit mode, drag key points to update corresponding key point data.
   */
  updateDraggingPoint(cartesian: Cartesian3, index: number) {
    this.points[index] = cartesian;
    this.setGeometryPoints(this.points);
    this.drawPolygon();
  }

  getPoints() {
    return this.points;
  }
}
