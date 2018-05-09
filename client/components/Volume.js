import React from 'react';

var volumeSwitchWidth
var volumeGrooveWidth
var leftStart
var leftEnd
var gap
var startxAssigned = false
var mouseDown

class Volume extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    volumeSwitchWidth = document.getElementById('volumeSwitch').clientWidth
    volumeGrooveWidth = document.getElementById('volumeGroove').clientWidth
    leftStart = document.getElementById('volumeSliderArea').offsetLeft
    leftEnd = leftStart + volumeGrooveWidth - volumeSwitchWidth
  }
  handleMouseMove(e) {
    if (mouseDown) {
      var switchLeft = document.getElementById('volumeSwitch').offsetLeft
      var offsetLeft = e.target.offsetLeft
      var x = e.clientX
      if (!startxAssigned) {
        startxAssigned = true
        gap = x - switchLeft
      }
      if (switchLeft >= leftStart && switchLeft <= leftEnd) {
        var vol = (x - gap - leftStart) / (leftEnd - leftStart)
        if (vol > 1) vol = 1
        if (vol < 0) vol = 0
          this.props.changeVol(vol)
          this.props.changeText('VOL ' + this.fillZero(Math.round(vol * 100) / 100))
          this.liveVolumeChange(vol)
      }
    }
  }
  fillZero(num) {
    var str = '' + num
    if (str.length === 4) return str
    if (str.length === 3) return str + '0'
    if (str.length === 2) return str + '00'
    if (str.length === 1) return str + '.00'
  }
  liveVolumeChange(vol) {
    const map = 'QWEASDZXC'
    for (let i = 0; i < map.length; i++) {
      document.getElementById(map[i]).volume = vol
    }
  }
  handleMouseDown(e) {
    window.addEventListener('mousemove', this.handleMouseMove.bind(this))
    window.addEventListener('mouseup', this.handleMouseUp.bind(this))
    mouseDown = true
  }
  handleMouseUp() {
    window.removeEventListener('mousemove', this.handleMouseMove.bind(this))
    window.removeEventListener('mouseup', this.handleMouseUp.bind(this))
    mouseDown = false
    startxAssigned = false
  }
  handleKeyDown(e) {
    e.preventDefault()
    var vol = this.props.volume
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      vol -= 0.01
      if (vol < 0) vol = 0
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      vol += 0.01
      if (vol > 1) vol = 1
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      this.props.changeVol(vol)
      this.props.changeText('VOL ' + this.fillZero(Math.round(vol * 100) / 100))
      this.liveVolumeChange(vol)
    }
  }
  render() {
    var style
    if (volumeGrooveWidth && volumeSwitchWidth) {
      const left = this.props.volume * (volumeGrooveWidth - volumeSwitchWidth)
      style = {left: left}
    }
    return (
      <div id='volumeSliderArea'>
        <div id='volumeGroove'></div>
        <div id='volumeSwitch' style={style} onMouseDown={this.handleMouseDown.bind(this)}></div>
      </div>
    )
  }
}

export default Volume;
