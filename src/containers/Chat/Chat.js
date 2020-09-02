import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import './Chat.scss';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Message from '../../components/Chat/Message/Message';
import ProductsSearch from '../../components/Chat/ProductsSearch/ProductsSearch';
import axiosProducts from '../../axios/axios-products';
import Products from '../../components/Chat/Products/Products';

class Chat extends Component {
  state = {
    allProducts: null,
    searchValue: '',
    searchedProducts: []
  }

  componentDidMount() {
    axiosProducts.get('/')
      .then(response => {
        // TODO: add check if no products
        const data = response.data.map(product => {
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

          return productData;
        });

        this.setState((state, props) => {
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

    const allProducts = [...this.state.allProducts];
    const searchedProducts = allProducts.filter(product => {
      const searchValues = searchVal.toLowerCase().split(' ');
      for (const word of searchValues) {
        if (product.name.toLowerCase().includes(word)) {
          return true;
        }
      }

      return false;
    });

    this.setState((state, props) => {
      return {
        searchValue: searchVal,
        searchedProducts: searchVal.length > 1 ? searchedProducts : []
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
            <Message type="human">
              {['Hi neighbor robot!!', 'What is the availability for these products?']}
            </Message>
          </main>
          <footer>
            <Products products={this.state.searchedProducts} />
            {
              this.state.allProducts
                ? <ProductsSearch
                  searchProductsHandler={this.searchProductsHandler}
                  searchValue={this.state.searchValue}
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

Chat.propTypes = {};

export default Chat;
