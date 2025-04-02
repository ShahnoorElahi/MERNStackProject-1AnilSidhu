import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const params = useParams('');
  const navigate=useNavigate();
  useEffect(() => {
    getProductDetails(params.id);
  }, []);

  const getProductDetails = async (id) => {

    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      headers: {
         authorization: `Ali ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();

    setName(result.name);
    setCategory(result.category);
    setCompany(result.company);
    setPrice(result.price);
  }

  const updateProduct = async () => {
    console.warn(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      method: 'put',
      body: JSON.stringify({name, price, category, company}),
      headers: {
        'Content-Type': 'application/json',
         authorization: `Ali ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    console.log("result",result);
    navigate('/');
  }
  return (
    <div className="product">
      <h1>Update Product</h1>
      <input type="text" placeholder="Enter product name" className="inputbox"
        value={name} onChange={(e) => { setName(e.target.value) }} />
      <br />
      <input type="text" placeholder="Enter product price" className="inputbox"
        value={price} onChange={(e) => { setPrice(e.target.value) }} />
      <br />
      <input type="text" placeholder="Enter product category" className="inputbox"
        value={category} onChange={(e) => { setCategory(e.target.value) }} />
      <br />
      <input type="text" placeholder="Enter product company" className="inputbox"
        value={company} onChange={(e) => { setCompany(e.target.value) }} />
      <br />
      <button onClick={updateProduct} className="appButton">Update Product</button>
    </div>
  );
}

export default UpdateProduct;