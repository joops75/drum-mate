import React from 'react';

var style

class Power extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }
  flickSwitch() {
    const powerButtonHeight = document.getElementById('powerSwitch').clientHeight
    const top = this.props.display ? -powerButtonHeight : -2 * powerButtonHeight
    style = {top: top}
    this.display()
    this.stopAudio()
  }
  display() {
    const text = this.props.display ? 'OFF' : 'ON'
    this.props.changeText(text)
    this.props.changeDisplay()
  }
  stopAudio() {
    const map = 'QWEASDZXC'
    for (let i = 0; i < map.length; i++) {
      document.getElementById(map[i]).pause()
    }
  }
  handleKeyDown(e) {
    if (e.key.toLowerCase() === 'p') this.flickSwitch()
  }
  render() {
    return (
      <div className='powerSliderArea'>
        <div className='powerGroove'></div>
        <div id='powerSwitch' style={style} onClick={this.flickSwitch.bind(this)}></div>
      </div>
    )
  }
}

export default Power;
