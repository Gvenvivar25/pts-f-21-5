import { Component } from '/react/newVersion/Component'
import './item.scss'

class ShoppingCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.data)

        return (
            <>
                <input className="checkbox_input" id="checkbox_id" type="checkbox"/>
                <label className="checkbox_label" htmlFor="checkbox_id"></label>
                <div className="item_conteiner">
                    <div className="description">
                        <h2>name</h2>
                    </div>
                    <span>currency price</span>
                    <button className="purchase">PURSHACE</button>
                </div>
            </>
        )
    }
}

export default ShoppingCard