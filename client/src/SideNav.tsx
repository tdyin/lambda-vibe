// 3rd party library imports
import classNames from 'classnames'
import { List } from 'immutable'
import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import {
  RadioButton20,
  RadioButtonChecked20,
  Music20,
} from '@carbon/icons-react'

// project imports
import { DispatchAction } from './Reducer'
import { AppState } from './State'
import { Instrument } from './Instruments'
import { Visualizer } from './Visualizers'
import { useState } from 'react'
import { useEffect } from 'react'

/** ------------------------------------------------------------------------ **
 * SideNav component
 ** ------------------------------------------------------------------------ */

type SideNavProps = {
  state: AppState
  dispatch: React.Dispatch<DispatchAction>
}

export function SideNav({ state, dispatch }: SideNavProps): JSX.Element {
  /**
   *
   * SideNav
   * |-----------------|
   * | Nameless App    |
   * | |-----------|   |
   * | |           |   |
   * | |-----------|   |
   * |                 |
   * | InstrumentsNav  |
   * | |-----------|   |
   * | |           |   |
   * | |-----------|   |
   * |                 |
   * | VisualizersNav  |
   * | |-----------|   |
   * | |           |   |
   * | |-----------|   |
   * |                 |
   * | SongsNav        |
   * | |-----------|   |
   * | |           |   |
   * | |-----------|   |
   * |                 |
   * |-----------------|
   */

  return (
    <div className='absolute top-0 left-0 bottom-0 w10 z-1 shadow-1 bg-white flex flex-column'>
      <div className='h3 fw7 f5 flex items-center pl3 bb b--light-gray'>
        The Pure
      </div>
      <div className='flex-auto'>
        <InstrumentsNav state={state} dispatch={dispatch} />
        <VisualizersNav state={state} dispatch={dispatch} />
        <SongsNav state={state} dispatch={dispatch} />
      </div>
    </div>
  )
}

/** ------------------------------------------------------------------------ **
 * SideNav Sub-Components
 ** ------------------------------------------------------------------------ */

function InstrumentsNav({ state }: SideNavProps): JSX.Element {
  /**
   *  InstrumentsNav
   *  |-----------------|
   *  | Section         |
   *  | |-------------| |
   *  | | RadioButton | |
   *  | |-------------| |
   *  | | RadioButton | |
   *  | |-------------| |
   *  |      ...        |
   *  |-----------------|
   */

  const instruments: List<Instrument> = state.get('instruments')
  const activeInstrument = state.get('instrument')?.name
  const location = useLocation()

  return (
    <Section title='Instruments'>
      {instruments.map((i) => (
        <RadioButton
          key={i.name}
          to={`/${i.name}${location.search}`}
          text={i.name}
          active={i.name === activeInstrument}
          onClick={() => console.log(i.name)}
        />
      ))}
    </Section>
  )
}

function VisualizersNav({ state }: SideNavProps): JSX.Element {
  /**
   *  VisualizersNav
   *  |-----------------|
   *  | Section         |
   *  | |-------------| |
   *  | | RadioButton | |
   *  | |-------------| |
   *  | | RadioButton | |
   *  | |-------------| |
   *  |      ...        |
   *  |-----------------|
   */

  const visualizers: List<Visualizer> = state.get('visualizers')
  const activeVisualizer = state.get('visualizer')?.name
  const location = useLocation()

  return (
    <Section title='Visualizers'>
      {visualizers.map((v) => (
        <RadioButton
          key={v.name}
          to={{
            pathname: location.pathname,
            search: `?visualizer=${v.name}`,
          }}
          text={v.name}
          active={v.name === activeVisualizer}
          onClick={() => console.log(v.name)}
        />
      ))}
    </Section>
  )
}

function SongsNav({ state, dispatch }: SideNavProps): JSX.Element {
  /**
   *
   *  SongsNav
   *  |-----------------|
   *  | Section         |
   *  | |-------------| |
   *  | | Music20     | |
   *  | |-------------| |
   *  | | Music20     | |
   *  | |-------------| |
   *  |      ...        |
   *  |-----------------|
   */

  const [search, setSearch] = useState('')
  const songs: List<any> = state.get('songs', List())
  const [filteredSongs, setFilteredSongs] = useState(songs)

  useEffect(() => {
    search === ''
      ? setFilteredSongs(songs)
      : setFilteredSongs(
          songs.filter((song) =>
            song.get('songTitle').toLowerCase().includes(search.toLowerCase()) ||
            song.get('artist').toLowerCase().includes(search.toLowerCase()) ||
            song.get('album').toLowerCase().includes(search.toLowerCase()) ||
            song.get('genre').toLowerCase().includes(search.toLowerCase())
          )
        )
  }, [songs, search, setFilteredSongs])

  return (
    <Section title='Playlist'>
      <div className='flex items-center'>
        <Music20 />
        <input
          className='ma1 mr2 w-100'
          type='text'
          name='search'
          placeholder='Search song, artist, or genre'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className='mt1 mr2'>
        <thead>
          <tr className='f6'>
            <th>Title</th>
            <th>Album</th>
            <th>Artist</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {filteredSongs.map((song) => (
            <tr
              key={song.get('id')}
              className='f7 pointer underline items-center no-underline i dim'
              onClick={() =>
                dispatch(
                  new DispatchAction('PLAY_SONG', { id: song.get('id') })
                )
              }
            >
              <td>{song.get('songTitle')}</td>
              <td>{song.get('album')}</td>
              <td>{song.get('artist')}</td>
              <td>{song.get('genre')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      { songs.map((song) => (
        <div
          key={song.get('id')}
          className='f6 pointer underline flex items-center no-underline i dim'
          onClick={() =>
            dispatch(new DispatchAction('PLAY_SONG', { id: song.get('id') }))
          }
        >
        </div>
      )) }
    </Section>
  )
}

/** ------------------------------------------------------------------------ **
 * Auxilliary components
 ** ------------------------------------------------------------------------ */

/** ------------------------------------- **
 * Radio Button
 ** ------------------------------------- */

type RadioButtonProps = {
  to: any
  text: string
  active: boolean
  onClick: () => void
}

function RadioButton({
  to,
  text,
  active,
  onClick,
}: RadioButtonProps): JSX.Element {
  return (
    <Link to={to} className='no-underline'>
      <div
        className={classNames('f6 flex items-center black', { fw7: active })}
        onClick={onClick}
      >
        {active ? (
          <RadioButtonChecked20 className='mr1' />
        ) : (
          <RadioButton20 className='mr1' />
        )}
        <div className='dim'>{text}</div>
      </div>
    </Link>
  )
}

/** ------------------------------------- **
 * Section
 ** ------------------------------------- */

const Section: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className='flex flex-column h-25 bb b--light-gray pa3'>
      <div className='fw7 mb2'>{title} </div>
      <div className='flex-auto overflow-scroll'>{children}</div>
    </div>
  )
}
