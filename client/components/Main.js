import React from 'react'
import Title from './Title'
import Display from './Display'
import Labels from './Labels'
import Power from './Power'
import Volume from './Volume'
import Set from './Set'
import DrumPads from './DrumPads'

class Main extends React.Component {
  render() {
    return (
      <div>
        <Title />
        <Display {...this.props} />
        <Labels />
        <Power {...this.props} />
        <Volume {...this.props} />
        <Set {...this.props} />
        <DrumPads {...this.props} />
      </div>
    )
  }
}

export default Main;
