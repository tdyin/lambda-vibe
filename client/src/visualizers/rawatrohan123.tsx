// 3rd party library imports
import { Translate32 } from '@carbon/icons-react';
import P5 from 'p5';
import * as Tone from 'tone';
import { SideNav } from '../SideNav';

// project imports
import { Visualizer } from '../Visualizers';

export const BarVisualizer = new Visualizer(
  'Sun (rawatrohan123)',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);
    const X = window.innerWidth * 0.4
    const Y = window.innerHeight * 0.25
    const radius = window.innerHeight / 16;

    const details = analyzer.get();

    p5.background(0, 0, 0, 255);

    //p5.strokeWeight(dim * 0.01);
    //p5.stroke(255, 255, 255, 255);
    //p5.noFill();
    p5.beginShape();
    let begin = 90
    let end = 270
    const vals = analyzer.get();
    const values = analyzer.getValue();
    //console.log(vals)
    let c = p5.color(255, 204, 0)
    p5.fill(c)
    p5.angleMode("degrees")
    //p5.rect(X, Y , 10, 100)
    //p5.rect(X + i * 20, Y + y/2, 10, 100)
    const offset = 10;
    let degree = 0;
    let duration = 0;
    for (let i = 0; i < values.length; i++) {
      //console.log(details["smoothing"]);
      //console.log(values)
      
      degree += 1
      const amplitude = values[i] as number;
      if (amplitude == 0){
        if (duration != 0){
          duration -= 0.1
        }
      }
      else{
        duration += 0.1
      }
      const x = p5.map(i, 0, values.length - 1, 0, width);
      const y = height / 2 + amplitude * height;
      const modifiedAmp = amplitude * height / 5
      p5.ellipse(X, Y, 100 + 1 * modifiedAmp);
      
      //p5.vertex(x, y)
      //p5.rect(X * Math.cos(degree), Y * Math.sin(degree) - offset, 25, 50)

      // top rect
      
      p5.rect(X - 13.5, Y - 75 - offset, 25, -50  - modifiedAmp)
      // top left rect

      p5.rect(0, 0, 25, -50 - modifiedAmp)
      //p5.translate(X - 20.25, Y - 75 - offset)
      
     
      
      //bottom rect
      p5.rect(X - 13.5, Y + 75 + offset, 25, 50 + modifiedAmp)
      //left rect
      p5.rect(X - 75 - offset, Y - 13.5, -50 - modifiedAmp, 25 )
      //right rect
      p5.rect(X + 75 + offset, Y - 13.5, 50 + modifiedAmp, 25 )
      
     
      //p5.rect(x +125 + offset, Y, 50, -25 )
      //p5.rect(X + 75 + offset , Y - 13.5, 50, 25)
      //x, y height, width
      //p5.rect(i * 100, height, 100, -100 * Math.abs(y/200) - i )
      



      // for (let j = 0 ; j < width ; j += 50){
      //   //p5.vertex(x, y);
      //   //p5.beginShape();
      //   p5.vertex(30, 20);
      //   p5.vertex(85, 20);
      //   p5.vertex(85, 75);
      //   p5.vertex(30, 75);
      //   //p5.endShape();
      // }
      
      
      // for (let j = 0 ; j < width ; j += 50){
      //     let c = p5.color(255, 204, 0)
      //     p5.fill(c)
      //     p5.rect(j, Y / 2 + y, 50, 100)
          
        // x, y, width, height
       
      //}
      

      //p5.vertex(X + 50, Y + 50);
      //p5.vertex(X + 30, X + 75);
      //p5.vertex(X + 50, X + 75);
      //p5.vertex(X + 50, X + 20);


      // Place p5.vertex
      //p5.vertex(x, y);
    }
    p5.endShape();
   
  },
);
