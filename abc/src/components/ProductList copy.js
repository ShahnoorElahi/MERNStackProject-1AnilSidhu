import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch('http://localhost:5000/products',{
      headers:{
        authorization: `Ali ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    console.log("result: ", result.result);

    if ((result.result != 'No Products found')) {
      setProducts(result);
      console.log("resultsetProduct: ", result);
    }
    // console.log("result: ",result.result);

  }

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
      headers:{
        authorization: `Ali ${JSON.parse(localStorage.getItem('token'))}`
      }
    });

    result = await result.json();

    if (result) {
      getProducts();
    }
  };
  const searchHandle = async (event) => {
    let key = event.target.value;
    console.warn("key: ",key);
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`,{
        headers:{
          authorization: `Ali ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
  
      if (result) {
        setProducts(result);
      }
    } else{
      getProducts();
    }
  };


  console.log('Products', products)

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input type="text" className="search-product-box" placeholder="Search Product"
        onChange={searchHandle} />
      <ul>
        <li>S. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>${item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
            <Link to={"/update/" + item._id}>UpDate</Link>
          </li>
        </ul>
      ))   :
      <h1>No result found</h1>
      }
    </div>
  );

};

export default ProductList;