import P5 from 'p5'
import * as Tone from 'tone'

import { Visualizer } from '../Visualizers'

const X = window.innerWidth * 0.4
const Y = window.innerHeight * 0.25
const speed = 0.005
const radius = window.innerHeight / 16
const background = 'grey'
let black = 'black'
let white = 'white'

let startAngle = 90
let endAngle = 270
let whiteAngle = 270
let blackAngle = 90
let whiteInnerAngle = 90
let blackInnerAngle = 270

export const YinYangVisualizer = new Visualizer(
  'Yin Yang (tdyin)',
  (p5: P5, analyzer: Tone.Analyser) => {
    // Setup
    p5.angleMode('degrees')
    p5.background(background)

    let diameterL = radius * 4
    let diameterM = radius * 2
    let diameterS = radius * 0.7
    const values = analyzer.getValue()

    p5.beginShape()
    for (let i = 0; i < values.length; i++) {
      const amplitude = (values[i] as number) * 2
      
      diameterL += amplitude
      diameterM += amplitude
      diameterS += amplitude

      // Big circle
      p5.fill(black)
      p5.fill(white)
      p5.ellipse(X, Y, diameterL)

      // Arc
      p5.fill(black)
      p5.arc(X, Y, diameterL, diameterL, startAngle, endAngle)
      startAngle -= speed
      endAngle -= speed

      // White large circle
      p5.fill(white)
      let largeWhiteX = X + radius * p5.cos(whiteAngle)
      let largeWhiteY = Y + radius * p5.sin(whiteAngle)
      p5.ellipse(largeWhiteX, largeWhiteY, diameterM)
      whiteAngle -= speed

      // Black large circle
      p5.noStroke()
      p5.fill(black)
      let largeBlackX = X + radius * p5.cos(blackAngle)
      let largeBlackY = Y + radius * p5.sin(blackAngle)
      p5.ellipse(largeBlackX, largeBlackY, diameterM)
      blackAngle -= speed

      // White inner circle
      p5.fill(white)
      let smallWhiteX = X + radius * p5.cos(whiteInnerAngle)
      let smallWhiteY = Y + radius * p5.sin(whiteInnerAngle)
      p5.ellipse(smallWhiteX, smallWhiteY, diameterS)
      whiteInnerAngle -= speed

      // Black inner circle
      p5.fill(black)
      let smallBlackX = X + radius * p5.cos(blackInnerAngle)
      let smallBlackY = Y + radius * p5.sin(blackInnerAngle)
      p5.ellipse(smallBlackX, smallBlackY, diameterS)
      blackInnerAngle -= speed
    }
    p5.endShape()
  }
)
