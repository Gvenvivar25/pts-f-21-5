import { Component } from '/react/newVersion/Component'

class Bundle extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // debugger
    // console.log('kek', this.props.item.item_type)

    const { item_type, nation_icon, type_icon, tier_name, name, value } =
      this.props.item

    const type =
      item_type === 'premium' ? ' days of ' : item_type === 'bonus' ? 'x ' : ' '

    return (
      <ul class="bundle_description_list">
        {item_type === 'vehicle' ? (
          <li class="description_list_item">
            <span
              class="icon"
              style={{ backgroundImage: `url(${nation_icon})` }}
            >
              {' '}
            </span>
            <span class="icon" style={{ backgroundImage: `url(${type_icon})` }}>
              {' '}
            </span>
            <span class="tier">{tier_name}</span> {name}
          </li>
        ) : (
          <li class="description_list_item">
            {value} {type} {name}
          </li>
        )}
      </ul>
    )
  }
}

export default Bundle
