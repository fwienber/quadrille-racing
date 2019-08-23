import {QuadrilleLayer} from "./QuadrilleLayer.js";
import {CourseLayer} from "./CourseLayer.js";
import {RacersLayer} from "./RacersLayer.js";
import {FeedbackLayer} from "./FeedbackLayer.js";

export function createPaper(width, height, gameSettings, course, racers) {
  return {
    width: width,
    height: height,
    quadrilleLayer: new QuadrilleLayer(width, height),
    courseLayer: new CourseLayer(width, height, course),
    racersLayer: new RacersLayer(width, height, gameSettings, racers),
    feedbackLayer: new FeedbackLayer(width, height, gameSettings, racers)
  }
}
