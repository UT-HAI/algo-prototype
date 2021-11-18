import { scaleLinear } from "d3-scale"

// create a function that takes a number [0,1] and returns a color along the gradient defined by steps (i.e. steps = [#000000, #FFFFFF] is grayscale)
export const createGradient = (steps) => scaleLinear().domain(steps.map((_,i) => i / (steps.length - 1))).range(steps)