import React, {Component} from 'react';
import './Chat.scss';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Message from '../../components/Chat/Message/Message';
import ProductsSearch from '../../components/Chat/ProductsSearch/ProductsSearch';
import axiosProducts from '../../axios/axios-products';
import Products from '../../components/Products/Products';
import ChatOrder from '../../components/Chat/ChatOrder/ChatOrder';
import OrderConfirmed from "../../components/OrderConfirmed/OrderConfirmed";

class Chat extends Component {
  state = {
    allProducts: {},
    searchValue: '',
    searchedProducts: {},
    order: {
      products: {} // id: qty
    },
    orderSubmitted: false,
    orderConfirmed: false
  }

  componentDidMount() {
    // TODO: Cache data in localstorage https://gist.github.com/ryanflorence/1345787
    axiosProducts.get('/')
      .then(response => {
        // TODO: add check if no products and show error message

        let data = {};
        for (const product of response.data) {
          let productData = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: Number(product.price),
            regularPrice: product.regular_price,
            onSale: product.on_sale,
            images: []
          };

          if (product.images.length > 0) {
            for (let image of product.images)
              productData.images.push({
                src: image.src,
                alt: image.name
              });
          }

          data[product.id] = productData;
        }

        this.setState((prevstate, props) => {
          return {
            allProducts: data
          }
        });
      })
      .catch(error => {
        console.log(error);
        // TODO: handle error
      })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.orderConfirmed) {
      return false;
    }

    if (! this.state.orderSubmitted) {
      return false;
    }

    setTimeout(this.confirmOrderHandler, 8000);
  }

  searchProductsHandler = (event) => {
    event.preventDefault();
    const searchVal = event.target.value;

    const allProducts = {...this.state.allProducts};
    const searchedProducts = Object.values(allProducts).filter(product => {
      const searchValues = searchVal.toLowerCase().split(' ');
      for (const word of searchValues) {
        if (product.name.toLowerCase().includes(word)) {
          return true;
        }
      }

      return false;
    });

    searchedProducts.map(product => product.qty = 0);

    this.setState((prevstate, props) => {
      return {
        searchValue: searchVal,
        searchedProducts: searchVal.length > 1 ? {...searchedProducts} : {}
      }
    });
  }

  clearProductSearchHandler = () => {
    this.setState((prevState, props) => {
      return {
        searchValue: '',
        searchedProducts: {}
      }
    });

  }

  chatOrderAddProductsHandler = (productId) => {
    this.setState((prevstate, props) => {
      let prevProducts = {...prevstate.order.products};
      let prevProduct = prevProducts[productId];
      if (typeof prevProduct !== 'undefined') {
        prevProducts[productId] = ++prevProduct;
      } else {
        prevProducts[productId] = 1;
      }

      return {
        order: {
          products: prevProducts
        }
      }
    }, this.updateQtyForSearchedProductsHandler);
  }

  chatOrderRemoveProductsHandler = (productId) => {
    this.setState((prevState, props) => {
      let prevProducts = {...prevState.order.products};
      let prevProduct = prevProducts[productId];
      prevProducts[productId] = --prevProduct;

      return {
        order: {
          products: prevProducts
        }
      }
    }, () => {
      this.updateQtyForSearchedProductsHandler();
      this.removeOrderedProductsHandler();
    });
  }

  updateQtyForSearchedProductsHandler = () => {
    const orderProducts = {...this.state.order.products};
    let searchedProducts = Object.values({...this.state.searchedProducts}).map(product => {
      if (typeof orderProducts[product.id] === "undefined") {
        return {...product};
      }

      let newProduct = {...product};
      newProduct.qty = orderProducts[product.id];
      return newProduct;
    });

    this.setState((prevState, props) => {
      return {
        searchedProducts: {...searchedProducts}
      }
    });
  }

  removeOrderedProductsHandler =() => {
    const orderProducts = {...this.state.order.products};

    // Remove products that have 0 qty from ordered products
    for (let productId of Object.keys(orderProducts)) {
      if (orderProducts[productId] === 0) {
        delete orderProducts[productId];
      }
    }

    this.setState((prevState, props) => {
      return {
        order: {
          products: orderProducts
        }
      }
    });

  }

  submitOrderHandler = () => {
    this.setState((prevState, props) => {
      return {
        orderSubmitted: true
      }
    }, this.clearProductSearchHandler);

  }

  confirmOrderHandler = () => {
    this.setState((prevState, props) => {
      return {
        orderConfirmed: true
      }
    });
  }

  render() {

    const orderSubmittedMessage = this.state.orderSubmitted
      ? <Message type="robot">
        {[
            'Thanks Mate! I\'ll check the supplies and confirm the list asap!',
            'I\'ll send you a confirmation here.',
        ]}
      </Message>
      : '';

    return (
      <React.Fragment>
        <Backdrop show={true} />
        <div className="Chat">
          <header><h1>Your food bag</h1></header>
          <main>
            <Message type="robot">
              {['Hi, I\'m your robot neighbor!', 'What groceries are you looking for?']}
            </Message>
            <ChatOrder
              allProducts={this.state.allProducts}
              products={this.state.order.products}
              onClickProductCallback={this.chatOrderRemoveProductsHandler}
              onClickSubmitOrderCallback={this.submitOrderHandler}
              orderConfirmed={this.state.orderSubmitted}
            />
            {orderSubmittedMessage}
            {
              this.state.orderConfirmed
                ? <OrderConfirmed
                  allProducts={this.state.allProducts}
                  products={this.state.order.products}
                />
                : null
            }
          </main>
          <footer>
            <Products
              products={this.state.searchedProducts}
              show={Object.values(this.state.searchedProducts).length > 0}
              onClickProductCallback={this.chatOrderAddProductsHandler}
              message="Tap on the product to order it!"
            />
            {
              this.state.allProducts
                ? <ProductsSearch
                  searchProductsHandler={this.searchProductsHandler}
                  searchValue={this.state.searchValue}
                  buttonClickHandler={this.clearProductSearchHandler}
                />
                : <p>Loading products...</p>
            }
            <small>@online neighbor 2020</small>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

export default Chat;
