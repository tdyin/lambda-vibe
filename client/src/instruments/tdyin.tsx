import * as Tone from 'tone'
// import classNames from 'classnames'
import { List } from 'immutable'
import { Instrument, InstrumentProps } from '../Instruments'

interface BassFretProps {
  note: string
  stringIdx: number
  duration?: string
  synth?: Tone.Synth | Tone.PluckSynth
  octave: number
  index: number
}

export function BassFret({
  note,
  stringIdx,
  synth,
  index,
}: BassFretProps): JSX.Element {
  return (
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)}
      onMouseUp={() => synth?.triggerRelease('+0.25')}
      className={'pointer absolute dim black'}
      style={{
        background: index === 0 ? 'transparent' : '#9D3C27',
        borderRight: '3px #848482 solid',
        left: `${index * 5}rem`,
        height: '1.6rem',
        width: '5rem',
      }}
    >
      {/* String */}
      <div
        style={{
          position: 'absolute',
          height: '0.15rem',
          width: '100%',
          top: '50%',
          background: '#C9C0BB',
        }}
      ></div>
      {/* Dot */}
      <div
        style={{
          position: 'relative',
          top: '-0.1rem',
          left: '40%',
          height: '0.6rem',
          width: '0.6rem',
          borderRadius: '50%',
          background:
            [3, 5, 7, 9, 15, 17, 19].includes(index) && stringIdx === 3
              ? 'white'
              : 'transparent',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          left: '40%',
          top: '-0.1rem',
          height: '0.6rem',
          width: '0.6rem',
          borderRadius: '50%',
          background:
            index === 12 && (stringIdx === 2 || stringIdx === 4)
              ? 'white'
              : 'transparent',
        }}
      ></div>
    </div>
  )
}

// function BassType({ title, onClick, active }: any): JSX.Element {
//   return (
//     <div
//       onClick={onClick}
//       className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
//         'b--black black': active,
//         'gray b--light-gray': !active,
//       })}
//     >
//       {title}
//     </div>
//   )
// }

function Bass({ synth, setSynth }: InstrumentProps): JSX.Element {
  const plucky = new Tone.PluckSynth({
    volume: 10,
    dampening: 100,
    resonance: 0.98,
  }).toDestination()

  const firstString = List([
    { note: 'G', idx: 0 },
    { note: 'Ab', idx: 1 },
    { note: 'A', idx: 2 },
    { note: 'Bb', idx: 3 },
    { note: 'B', idx: 4 },
    { note: 'C', idx: 5 },
    { note: 'Db', idx: 6 },
    { note: 'D', idx: 7 },
    { note: 'Eb', idx: 8 },
    { note: 'E', idx: 9 },
    { note: 'F', idx: 10 },
    { note: 'Gb', idx: 11 },
    { note: 'G', idx: 12 },
  ])
  const secondString = List([
    { note: 'D', idx: 0 },
    { note: 'Eb', idx: 1 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'Gb', idx: 4 },
    { note: 'G', idx: 5 },
    { note: 'Ab', idx: 6 },
    { note: 'A', idx: 7 },
    { note: 'Bb', idx: 8 },
    { note: 'B', idx: 9 },
    { note: 'C', idx: 10 },
    { note: 'Db', idx: 11 },
    { note: 'D', idx: 12 },
  ])
  const thirdString = List([
    { note: 'A', idx: 0 },
    { note: 'Bb', idx: 1 },
    { note: 'B', idx: 2 },
    { note: 'C', idx: 3 },
    { note: 'Db', idx: 4 },
    { note: 'D', idx: 5 },
    { note: 'Eb', idx: 6 },
    { note: 'E', idx: 7 },
    { note: 'F', idx: 8 },
    { note: 'Gb', idx: 9 },
    { note: 'G', idx: 10 },
    { note: 'Ab', idx: 11 },
    { note: 'A', idx: 12 },
  ])
  const fourthString = List([
    { note: 'E', idx: 0 },
    { note: 'F', idx: 1 },
    { note: 'Gb', idx: 2 },
    { note: 'G', idx: 3 },
    { note: 'Ab', idx: 4 },
    { note: 'A', idx: 5 },
    { note: 'Bb', idx: 6 },
    { note: 'B', idx: 7 },
    { note: 'C', idx: 8 },
    { note: 'Db', idx: 9 },
    { note: 'D', idx: 10 },
    { note: 'Eb', idx: 11 },
    { note: 'E', idx: 12 },
  ])

  // const setOscillator = (newType: Tone.ToneOscillatorType) => {
  //   setSynth((oldSynth) => {
  //     oldSynth.disconnect()

  //     return new Tone.Synth({
  //       envelope: {
  //         attack: 1,
  //         decay: 1,
  //         sustain: 1,
  //       },
  //       oscillator: { type: newType } as Tone.OmniOscillatorOptions,
  //     }).toDestination()
  //   })
  // }

  // const oscillators: List<OscillatorType> = List([
  //   'sine',
  //   'sawtooth',
  //   'square',
  //   'triangle',
  //   'fmsine',
  //   'fmsawtooth',
  //   'fmtriangle',
  //   'amsine',
  //   'amsawtooth',
  //   'amtriangle',
  // ]) as List<OscillatorType>

  return (
    <div className='pv4'>
      <div className='relative dib h1 w-100 ml4'>
        {firstString.map((string) => {
          const octave = string.idx < 5 ? 2 : 3
          const note = `${string.note}${octave}`
          return (
            <BassFret
              key={note}
              note={note}
              stringIdx={1}
              synth={plucky}
              octave={octave}
              index={string.idx}
            />
          )
        })}
      </div>
      <div className='relative dib h1 w-100 ml4'>
        {secondString.map((string) => {
          const octave = string.idx < 10 ? 2 : 3
          const note = `${string.note}${octave}`
          return (
            <BassFret
              key={note}
              stringIdx={2}
              note={note}
              synth={plucky}
              octave={octave}
              index={string.idx}
            />
          )
        })}
      </div>
      <div className='relative dib h1 w-100 ml4'>
        {thirdString.map((string) => {
          const octave = string.idx < 3 ? 1 : 2
          const note = `${string.note}${octave}`
          return (
            <BassFret
              key={note}
              note={note}
              stringIdx={3}
              synth={plucky}
              octave={octave}
              index={string.idx}
            />
          )
        })}
      </div>
      <div className='relative dib h2 w-100 ml4'>
        {fourthString.map((string) => {
          const octave = string.idx < 8 ? 1 : 2
          const note = `${string.note}${octave}`
          return (
            <BassFret
              key={note}
              note={note}
              stringIdx={4}
              synth={plucky}
              octave={octave}
              index={string.idx}
            />
          )
        })}
      </div>
      {/* <div className={'pl4 pt4 flex'}>
        {oscillators.map((o) => (
          <BassType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div> */}
    </div>
  )
}

export const BassInstrument = new Instrument('Bass (tdyin)', Bass)
