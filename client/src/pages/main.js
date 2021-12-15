import router from '../react/react'
import { Component } from '/react/newVersion/Component'

class Main extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h2>MAIN</h2>
        <h3>Search: {this.props.search.type}</h3>
      </div>
    )
  }
}

export default Main
