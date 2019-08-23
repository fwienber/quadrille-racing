import {Vector} from "../geometry/Vector.js";
import {Polyline} from "../geometry/Polyline.js";
import {Course} from "../game/Course.js";
import {Line} from "../geometry/Line.js";
import {QUADRILLE_SIZE_PX} from "../game/CourseRenderer.js";

let svgPathToPolyline = (path, scaleX, scaleY) => {
  let line = [];
  let cursor = null;
  for (let i = 0; i < path.pathSegList.length; ++i) {
    let svgPoint = path.pathSegList.getItem(i);
    if (svgPoint.pathSegTypeAsLetter === "M" || svgPoint.pathSegTypeAsLetter.toLowerCase() === "l" || svgPoint.pathSegTypeAsLetter.toLowerCase() === "c") {
      let coursePoint = new Vector(svgPoint.x * scaleX, svgPoint.y * scaleY);
      if (isLowerCase(svgPoint.pathSegTypeAsLetter)) {
        coursePoint = cursor.add(coursePoint);
      }
      cursor = coursePoint;
      line.push(coursePoint);
    }
  }
  return line;
};

let isLowerCase = (char) => {
  return char.toLowerCase() === char;
}

export function readCourseFromSvg(url, callback) {
  fetch(url)
          .then(response => response.text())
          .then(str => {
            let svgContainer = document.createElement("div");
            svgContainer.innerHTML = str;

            let svg = svgContainer.getElementsByTagName("svg").item(0);
            let width = svg.viewBox.baseVal.width || svg.width.baseVal.value;
            let height = svg.viewBox.baseVal.height || svg.height.baseVal.value;
            let scaleX = 1280 / QUADRILLE_SIZE_PX / width;
            let scaleY = 720 / QUADRILLE_SIZE_PX / height;

            let paths = svgContainer.getElementsByTagName("path");

            let indexOuterBorder = 0; // the first...
            let indexStartLine = paths.length -1; // ... the last ... eternity

            let outerBorder = new Polyline(...svgPathToPolyline(paths.item(0), scaleX, scaleY));
            let islands = []; // array of Polylines
            for (let i = indexOuterBorder+1; i<indexStartLine; i++) {
              let island = new Polyline(...svgPathToPolyline(paths.item(i), scaleX, scaleY));
              islands.push(island);
            }
            let startLine = svgPathToPolyline(paths.item(indexStartLine), scaleX, scaleY);

            let course = new Course(new Line(startLine[0], startLine[1]), outerBorder, islands);

            callback(course);
          });
}
