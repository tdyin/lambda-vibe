// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const visualization = new Visualizer(
  'Flower (the-96)',
  (p5: P5, analyzer: Tone.Analyser) => {    
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);
    p5.stroke(0,255,255, 255);
    p5.noFill();
    
    p5.beginShape();
    const values = analyzer.getValue();
    for(let i = 0; i <= 50; i++) {
        let amplitude = values[i] as number;
        let radius = p5.map(amplitude * 450, 90, 200, 40, 200);
        let x = width/3 + radius * Math.sin(i);
        let y = height/4 + radius * Math.cos(i);
        
        p5.vertex(x, y);
    }
    p5.endShape();
  },
);
