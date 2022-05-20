// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { BassInstrument } from './instruments/tdyin';
import { YinYangVisualizer } from './visualizers/tdyin';
import { XyloInstrument } from './instruments/the-96';
import { WaveformVisualizer } from './visualizers/Waveform';
import { anthonyBorges98V } from './visualizers/anthonyBorges98';
import { FluteInstrument } from './instruments/rawatrohan123';
import { BarVisualizer } from './visualizers/rawatrohan123';
import { anthonyBorges98I } from './instruments/anthonyBorges98';
import { visualization } from './visualizers/the-96';

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, anthonyBorges98I, XyloInstrument, BassInstrument, FluteInstrument]);       // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, anthonyBorges98V, visualization, YinYangVisualizer, BarVisualizer]);    // similar to Visualizer[]   // similar to Visualizer[]


/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});