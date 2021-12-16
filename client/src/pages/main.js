import router, { subscriber } from '../react/react'
import { Component } from '/react/newVersion/Component'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = { search: router.getSearch() }
  }

  updateSearch() {
    if (this.state.search !== router.search) {
      this.setState({ search: router.search })
    }
  }

  componentDidMount() {
    subscriber.push(this.updateSearch.bind(this))
  }

  componentDidUpdate() {
    // debugger
  }

  render() {
    return (
      <div className="grid">
        <div>
          <h2>MAIN</h2>
          <h3>Search state: {this.state.search}</h3>
        </div>
      </div>
    )
  }
}

export default Main
