import React from 'react';
import * as sets from '../data/localSamples';

const map = {q: 0, w: 1, e: 2, a: 3, s: 4, d: 5, z: 6, x: 7, c: 8}

class DrumPads extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    window.addEventListener('keyup', this.handleKeyUp.bind(this))
  }
  handleKeyDown(e) {
    this.handleKeyMouse(e, 'down', 'key')
  }
  handleKeyUp(e) {
    this.handleKeyMouse(e, 'up', 'key')
  }
  handleMouseDown(e) {
    this.handleKeyMouse(e, 'down', 'mouse')
  }
  handleMouseUp(e) {
    this.handleKeyMouse(e, 'up', 'mouse')
  }
  handleMouseOut(e) {
    this.handleKeyMouse(e, 'up', 'mouse')
  }
  handleKeyMouse(e, dir, type) {
    const key = type === 'key' ? e.key.toLowerCase() : e.target.id
    const index = map[key]
    if (index !== undefined) {
      if (dir === 'down' && !this.props.keys[index]) {
        this.props.keySwitch(index)
        this.play(key, index)
        this.moveKey(key, 'down')
      } else if (dir === 'up' && this.props.keys[index]) {
        this.props.keySwitch(index)
        this.moveKey(key, 'up')
      }
    }
  }
  moveKey(key, dir) {
    const element = document.getElementById(key)
    var top = +window.getComputedStyle(element).getPropertyValue("top").split('px')[0]
    var left = +window.getComputedStyle(element).getPropertyValue("left").split('px')[0]
    top += dir === 'down' ? 5 : -5
    left += dir === 'down' ? 5 : -5
    element.style.top = top + 'px'
    element.style.left = left + 'px'
    element.style.boxShadow = dir === 'down' ? '0px 0px 0px black' : '5px 5px 2.5px black'
  }
  play(key, index) {
    if (this.props.display) {
      const element = document.getElementById(key.toUpperCase())
      element.volume = this.props.volume
      element.currentTime = 0
      element.play()
      const message = this.props.set === 1 ? sets.setOne[index].id : sets.setTwo[index].id
      this.props.changeText(message)
    }
  }
  render() {
    const pads = [['Q', 'W', 'E'], ['A', 'S', 'D'], ['Z', 'X', 'C']]
    return (
      <div id='drumPads'>
        {
          pads.map((row, i) =>
            <div key={i}>
              {
                row.map((pad, j) => {
                  const src = this.props.set === 1 ? sets.setOne[+i * 3 + +j].url : sets.setTwo[+i * 3 + +j].url
                  return <div key={pad} id={pad.toLowerCase()} className='drum-pad' onMouseDown={this.handleMouseDown.bind(this)} onMouseUp={this.handleMouseUp.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
                    <audio id={pad} className='clip' src={src} type='audio/mpeg'></audio>
                    {pad}
                  </div>
                })
              }
            </div>
          )
        }
      </div>
    )
  }
}

export default DrumPads;
