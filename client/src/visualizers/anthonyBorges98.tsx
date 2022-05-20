// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';
import { StereoFeedbackEffect } from 'tone/build/esm/effect/StereoFeedbackEffect';
import { isWhiteSpaceLike } from 'typescript';

// project imports
import { Visualizer } from '../Visualizers';


export const anthonyBorges98V = new Visualizer(
    'anthonyBorges98V',
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        const dim = Math.min(width, height);

        p5.background(0, 0, 0, 255);

        p5.strokeWeight(dim * 0.01);
        // p5.ellipse(height / 2, width / 2, 100, 100);
        // p5.stroke(255);
        // p5.fill(255);

        const values = analyzer.getValue();
        p5.translate(width / 2, height / 2)
        p5.beginShape();
        p5.ellipse(height / 2, width / 2, 100, 100);
        p5.stroke(255);
        p5.fill(255);
        for (let i = 0; i < values.length; i++) {
            const r = values[i] as number;
            const x = r * Math.cos(i) * width;
            const y = r * Math.sin(i) * height;
            // Place vertex
            p5.vertex(x, y);
        }
        p5.endShape();
    },
);
