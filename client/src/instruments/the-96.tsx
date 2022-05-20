// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';

import React, { useEffect } from 'react';
import { RecursivePartial } from "tone/Tone/core/util/Interface";
import { OmniOscillatorOptions } from "tone/Tone/source/oscillator/OscillatorInterface";


// project imports
import { Instrument, InstrumentProps } from '../Instruments';

interface XyloBarProps {
    note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
    duration?: string;
    synth?: Tone.Synth; // Contains library code for making sound
    minor?: boolean; // True if minor key, false if major key
    octave: number;
    index: number; // octave + index together give a location for the piano key
    colors: List<String>;
  }
  

  export function XylophoneBar({
    note,
    synth,
    minor,
    index,
    octave,

  }: XyloBarProps): JSX.Element {
    /**
     * This React component corresponds to either a major or minor key in the piano.
     * See `PianoKeyWithoutJSX` for the React component without JSX.
     */
    
    const colors = ['red','orange','yellow','green','blue','violet','purple'];
    return (
      // Observations:
      // 1. The JSX refers to the HTML-looking syntax within TypeScript.
      // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
      // 3. The curly braces `{` and `}` should remind you of string interpolation.
      <div
        onMouseDown={() =>
          {
            synth?.triggerAttack(`${note}`);
          }
        } // Question: what is `onMouseDown`?
        onMouseUp={() =>synth?.triggerRelease('+0.01') } // Question: what is `onMouseUp`?
        className={classNames('ba pointer absolute dim', {


        })}
        style={{
          // CSS
          // top: 0,
          // left: `${index * 2}rem`,
          // zIndex: minor ? 1 : 0,
          // margin: minor ? '0rem':'6rem',
          
          // width: minor ? '2rem' : '2rem',
          // marginLeft: minor ? '0rem' : 0,
          top: `${-3 + index*0.2}rem`,
          left: `${-5 + index * 2}rem`,
          background:  colors[(((index-(octave/7)) | 0) + 1) % (colors.length)],
          height: `${24 -(index*0.4)}rem`,
          width: '1.8rem',
          marginLeft: '-15rem',
        }}
        
      >
         <div
        style={{
          position: 'relative',
          top: '1rem',
          left: '35%',
          height: '0.5rem',
          width: '0.5rem',
          borderRadius: '50%',
          background: 'black',
        }}
      ></div>
      <div
        style={{
          position: 'relative',
          top: `${24 -(index*0.4)-2}rem`,
          left: '35%',
          height: '0.5rem',
          width: '0.5rem',
          borderRadius: '50%',
          background: 'black',
        }}
      ></div>
      </div>
      
    );
  }
  
  
  function PianoType({ title, onClick, active }: any): JSX.Element {
    return (
      <div
        onClick={onClick}
        className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
          'b--black black': active,
          'gray b--light-gray': !active,
        })}
      >
        {title}
      </div>
    );
  }
  
  function Xylophone({ synth, setSynth }: InstrumentProps): JSX.Element {
    const keys = List([
      { note: 'C', idx: 0 },
      { note: 'Db', idx: 1 },
      { note: 'D', idx: 2 },
      { note: 'Eb', idx: 3 },
      { note: 'E', idx: 4 },
      { note: 'F', idx: 5 },
      { note: 'Gb', idx: 6 },
      { note: 'G', idx: 7 },
      { note: 'Ab', idx: 8 },
      { note: 'A', idx: 9 },
      { note: 'Bb', idx: 10 },
      { note: 'B', idx: 11 },
    ]);
    const colors = List(['red','orange','yellow','green','blue','violet','purple']);
    const setOscillator = () => {
      setSynth(oldSynth => {
          oldSynth.disconnect();
          return new Tone.Synth({
            "volume": 0,
            "detune": 0,
            "portamento": 0.05,
            "envelope": {
              "attack": 0.01,
              "attackCurve": "exponential",
              "decay": 0.4,
              "decayCurve": "exponential",
              "release": 0.6,
              "releaseCurve": "exponential",
              "sustain": 0.2
            },
            "oscillator": {
              "type":"square2"
            }
          } ).toDestination();
      }
      );
  };

    const oscillators: List<OscillatorType> = List([
      
    ]) as List<OscillatorType>;
  useEffect(setOscillator, [setSynth]);
    return (
      <div className="pv4">
        <div className="relative dib h4 w-100 ml4">
          {Range(1, 4).map(octave =>
            keys.map(key => {
              const isMinor = key.note.indexOf('b') !== -1;
              const note = `${key.note}${octave+4}`;
              return (
                <XylophoneBar
                  key={note} //react key
                  note={note}
                  synth={synth}
                  minor={isMinor}
                  octave={octave}
                  colors= {colors}
                  index={(octave ) * 12 + key.idx}
                />
              );
            }),
          )}
        </div>
        <div className={'pl4 pt4 flex'}>
          {oscillators.map(o => (
            <PianoType
              key={o}
              title={o}
              onClick={() => setOscillator()}
              active={synth?.oscillator.type === o}
            />
          ))}
        </div>
      </div>
    );
  }
  
  export const XyloInstrument = new Instrument('Xylophone (the-96)', Xylophone);
  