import React, { Component } from 'react';
import Item  from '../component/item'
const api = `https://applicant-dev.misfitsmarket.com/api/test/v1`
const customerToken = 721028102

class ItemContainer extends Component {
  state = {
    selectedItemID: null,
    availableProduct: [],
    itemSubmitted: false,
    selectedItemName: null,
  }

  componentDidMount(){
    fetch(api)
    .then( resp => {
      if (!resp.ok) { throw Error(resp.statusText) }
      return resp.json()
    })
    .then( response => {
      this.setState({
        availableProduct: response.data.items
      })
    })
    .catch( error => {
      alert("Please try again at a later time.")
      //redirect to homepage?
    })
  }

  //deselect an item if clicked again
  updateSelectedItem = (id, name) => {
    if (this.state.itemSubmitted) { return }

    if (this.state.selectedItemID === id){
      this.setState({ selectedItemID: null })
    } else {
      this.setState({
        selectedItemID: id,
        selectedItemName: name
      })
    }
  }

  //decide to render items or message depending on request.
  cartStatus = () => {
    if (this.state.availableProduct.length === 0){
      return (<h2>Sold out!</h2>)
    } else {
      return ( this.renderItems() )
    }
  }

  renderItems = () => {
    return this.state.availableProduct.map( item => {
      return (<Item
        key={item.id}
        currentItemId={this.state.selectedItemID}
        item={item}
        updateSelectedItem={this.updateSelectedItem}/>)
    })
  }

  renderButtonOrMessage = () => {
    if (this.state.itemSubmitted) {
      return (<p id="submitted-response">{`${this.state.selectedItemName} was added to cart!`}</p>)
    } else if (this.state.selectedItemID) {
      return <button className="submitted-response" onClick={this.handleClick}>Add to Cart</button>
    }
  }

  //handle item request
  handleClick = () => {
    fetch(`${api}/${this.state.selectedItemID}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Customer-Token": customerToken
      }
    })
    .then( resp =>{
      if (!resp.ok) { throw Error(resp.statusText) }
      return resp.json()
    })
    .then( resp => {
      this.setState({
        itemSubmitted: true
      })
    })
    .catch( error => {
      alert("Please try again at a later time.")
    })

  }

  //only show submit button after selectedItemID is not null.
  render() {
    return (
      <div>
        {this.state.availableProduct.length > 0 && <h2> Please Select Only One to Add to Cart </h2>}
        {this.cartStatus()}
        {this.renderButtonOrMessage()}
      </div>
    )
  }

}

export default ItemContainer
