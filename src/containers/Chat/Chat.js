import React, {Component} from 'react';
import './Chat.scss';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Message from '../../components/Chat/Message/Message';
import ProductsSearch from '../../components/Chat/ProductsSearch/ProductsSearch';
import axiosProducts from '../../axios/axios-products';
import Products from '../../components/Products/Products';
import ChatOrder from '../../components/Chat/ChatOrder/ChatOrder';

class Chat extends Component {
  state = {
    allProducts: {},
    searchValue: '',
    searchedProducts: {},
    order: {
      products: {} // id: qty
    }
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
            price: product.price,
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

  searchProductsHandler = (event) => {
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
    });
  }

  chatOrderRemoveProductsHandler = (productId) => {
    this.setState((prevstate, props) => {
      let prevProducts = {...prevstate.order.products};
      let prevProduct = prevProducts[productId];
      prevProducts[productId] = --prevProduct;

      if (prevProducts[productId] === 0) {
        delete prevProducts[productId];
      }

      return {
        order: {
          products: prevProducts
        }
      }
    });
  }

  render() {
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
            />
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
