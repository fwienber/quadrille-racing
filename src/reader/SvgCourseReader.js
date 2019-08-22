import {Vector} from "../geometry/Vector.js";
import {Polyline} from "../geometry/Polyline.js";
import {Course} from "../game/Course.js";
import {Line} from "../geometry/Line.js";
import {QUADRILLE_SIZE_PX} from "../game/CourseRenderer.js";

let svgPathToPolyline = (path, scale) => {
  let line = [];
  let cursor = null;
  for (let i = 0; i < path.pathSegList.length; ++i) {
    let svgPoint = path.pathSegList.getItem(i);
    if (svgPoint.pathSegTypeAsLetter === "M" || svgPoint.pathSegTypeAsLetter === "l" || svgPoint.pathSegTypeAsLetter === "c") {
      let coursePoint = new Vector(svgPoint.x * scale, svgPoint.y * scale);
      if (svgPoint.pathSegTypeAsLetter !== "M") {
        coursePoint = cursor.add(coursePoint);
      }
      cursor = coursePoint;
      line.push(coursePoint);
    }
  }
  return line;
};

export function readCourseFromSvg(url, callback) {
  fetch(url)
          .then(response => response.text())
          .then(str => {
            let svgContainer = document.createElement("div");
            svgContainer.innerHTML = str;

            let svg = svgContainer.getElementsByTagName("svg").item(0);
            let scale = 600 / QUADRILLE_SIZE_PX / svg.viewBox.baseVal.width;

            let paths = svgContainer.getElementsByTagName("path");

            let outerBorder = new Polyline(...svgPathToPolyline(paths.item(0), scale));
            let innerBorder = new Polyline(...svgPathToPolyline(paths.item(1), scale));
            let startLine = svgPathToPolyline(paths.item(2), scale);

            let course = new Course(new Line(startLine[0], startLine[1]), innerBorder, outerBorder);

            callback(course);
          });
}
