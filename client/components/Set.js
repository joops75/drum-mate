import React from 'react';

var style

class Set extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }
  flickSwitch() {
    const element = document.getElementById('setSwitch')
    const setButtonHeight = document.getElementById('setSwitch').clientHeight
    const top = this.props.set === 2 ? -2 * setButtonHeight : -setButtonHeight
    style = {top: top}
    this.display()
  }
  display() {
    const text = this.props.set === 2 ? 'SET 1' : 'SET 2'
    this.props.changeText(text)
    this.props.changeSet()
  }
  handleKeyDown(e) {
    if (e.key.toLowerCase() === 'o') this.flickSwitch()
  }
  render() {
    return (
      <div className='powerSliderArea'>
        <div className='powerGroove'></div>
        <div id='setSwitch' style={style} onClick={this.flickSwitch.bind(this)}></div>
      </div>
    )
  }
}

export default Set;
