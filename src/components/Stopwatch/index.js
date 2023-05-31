import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {
    isRunning: false,
    timeInMinutes: 0,
    timeInSeconds: 0,
    intervalId: null,
  }

  FormatTime = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const formattedminutes =
      timeInMinutes > 9 ? timeInMinutes : `0${timeInMinutes}`
    const formattedseconds =
      timeInSeconds > 9 ? timeInSeconds : `0${timeInSeconds}`

    return `${formattedminutes}:${formattedseconds}`
  }

  startTime = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      const intervalId = setInterval(() => {
        const {timeInSeconds} = this.state
        if (timeInSeconds < 59) {
          this.setState(prevState => ({
            timeInSeconds: prevState.timeInSeconds + 1,
          }))
        } else {
          this.setState(prevState => ({
            timeInSeconds: 0,
            timeInMinutes: prevState.timeInMinutes + 1,
          }))
        }
      }, 1000)
      this.setState({intervalId})
    }
    this.setState({isRunning: true})
  }

  stopTime = () => {
    const {intervalId, isRunning} = this.state
    if (isRunning) {
      clearInterval(intervalId)
      this.setState({
        isRunning: false,
      })
    }
  }

  resetTime = () => {
    const {intervalId} = this.state
    clearInterval(intervalId)
    this.setState({
      timeInMinutes: 0,
      timeInSeconds: 0,
      isRunning: false,
      intervalId: null,
    })
  }

  render() {
    return (
      <div className="bg-container">
        <h1>Stopwatch</h1>
        <div className="timer">
          <p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
            />
            Timer
          </p>
          <h1>{this.FormatTime()}</h1>
          <button
            type="button"
            className="btn btn-start"
            onClick={this.startTime}
          >
            Start
          </button>
          <button
            type="button"
            className="btn btn-stop"
            onClick={this.stopTime}
          >
            Stop
          </button>
          <button
            type="button"
            className="btn btn-reset"
            onClick={this.resetTime}
          >
            Reset
          </button>
        </div>
      </div>
    )
  }
}

export default Stopwatch
