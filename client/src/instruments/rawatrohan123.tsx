// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, { useEffect } from 'react';


// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Flute.
 ** ------------------------------------------------------------------------ */

interface FluteKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the Flute key
}

export function FluteKey({
  note,
  synth,
  minor,
  index,
}: FluteKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the Flute.
   * See `FluteKeyWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        'bg-black black h3': minor, // minor keys are black
        'black bg-brown h4': !minor, // major keys are white
      })}
      style={{
        // CSS
        position: "absolute",
        top: 0,
        background: "darkgoldenrod",
        left: `${index * 1.8}rem`,
        zIndex: 1,
        width:  `${1.5}rem`,
        height: `${3 + index * 0.4}rem`,
        marginLeft: '1.1rem',
      }}
    ></div>
  );
}

// eslint-disable-next-line

// function FluteKeyWithoutJSX({
//   note,
//   synth,
//   minor,
//   index,
// }: FluteKeyProps): JSX.Element {
//   /**
//    * This React component for pedagogical purposes.
//    * See `FluteKey` for the React component with JSX (JavaScript XML).
//    */
//   return React.createElement(
//     'div',
//     {
//       onMouseDown: () => synth?.triggerAttack(`${note}`),
//       onMouseUp: () => synth?.triggerRelease('+0.25'),
//       className: classNames('ba pointer absolute dim', {
//         'bg-black black h3': minor,
//         'black bg-white h4': !minor,
//       }),
//       style: {
//         top: 0,
//         left: `${index * 2}rem`,
//         zIndex: minor ? 1 : 0,
//         width: minor ? '1.5rem' : '2rem',
//         marginLeft: minor ? '0.25rem' : 0,
//       },
//     },
//     [],
//   );
// }


function FluteType({ title, onClick, active }: any): JSX.Element {
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

function Flute({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0 },
    //{ note: 'Db', idx: 0.5 },
    { note: 'D', idx: 1 },
    //{ note: 'Eb', idx: 1.5 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    //{ note: 'Gb', idx: 3.5 },
    { note: 'G', idx: 4 },
    //{ note: 'Ab', idx: 4.5 },
    { note: 'A', idx: 5 },
    //{ note: 'Bb', idx: 5.5 },
    { note: 'B', idx: 6 },
  ]);

  const setOscillator = () => {
    setSynth(oldSynth => {
      oldSynth.disconnect();
      return new Tone.Synth({
        "volume": 0,
	"detune": 0,
	"portamento": 0.05,
	"envelope": {
		"attack": 5,
		"attackCurve": "exponential",
		"decay": 0.2,
		"decayCurve": "exponential",
		"release": 1.5,
		"releaseCurve": "exponential",
		"sustain": 0.2
	},
	"oscillator": {
		"partials": [],
		"phase": 0,
		"harmonicity": 5,
		"modulationType": "sine",
	}
      } ).toDestination();
  }
  )
      ;
};

  const oscillators: List<OscillatorType> = List([
    // 'sine',
    // 'sawtooth',
    // 'square',
    // 'triangle',
    // 'fmsine',
    // 'fmsawtooth',
    // 'fmtriangle',
    // 'amsine',
    // 'amsawtooth',
    // 'amtriangle',
  ]) as List<OscillatorType>;
  useEffect(setOscillator, [setSynth]);
  //<img src={require('../img/flute2.png')} />
  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
      
        {Range(2, 4).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave + 1.7}`;
            return (
              <FluteKey
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + key.idx}
              />
            );
          }),
        )}
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <FluteType
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

export const FluteInstrument = new Instrument('Pan Flute (rawatrohan123)', Flute);
