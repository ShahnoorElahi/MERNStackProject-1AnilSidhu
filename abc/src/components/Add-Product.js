import React from 'react'

const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);

  const addProduct = async () => {
    console.warn(name, price, category, company);
    if(!name || !price || !category || !company){
      setError(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
          authorization: `Ali ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();

    console.warn(result);
  }

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input type="text" placeholder="Enter product name" className="inputbox"
        value={name} onChange={(e) => { setName(e.target.value) }} />
      {error && !name && <span className="invalid-input">Enter valid name</span>}
      <br />
      <input type="text" placeholder="Enter product price" className="inputbox"
        value={price} onChange={(e) => { setPrice(e.target.value) }} />
      {error && !price && <span className="invalid-input">Enter valid price</span>}
      <br/>
      <input type="text" placeholder="Enter product category" className="inputbox"
        value={category} onChange={(e) => { setCategory(e.target.value) }} />
      {error && !category && <span className="invalid-input">Enter valid category</span>}
      <br/>
      <input type="text" placeholder="Enter product company" className="inputbox"
        value={company} onChange={(e) => { setCompany(e.target.value) }} />
      {error && !company && <span className="invalid-input">Enter valid company</span>}
      <br/>
      <button onClick={addProduct} className="appButton">Add Product</button>
      <img src='../logo1.jpg' />
    </div>
  );
}

export default AddProduct;