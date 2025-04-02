

















import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {

  const [img, setImg] = useState('');
  const formdata = new FormData()
  formdata.append("user_file", img)
  
  
  useEffect(() => {
    getProducts();
  }, []);



  const imageHandle = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:5000/upload", {
      method: "post",
      body: formdata,
    })
      .then((res) => {
        console.log("hogiya", res);
        getProducts();

      })
      .catch((err) => {
        console.log(err);
      })
  };




const [products, setProducts] = useState([]);

  const getProducts = async () => {
    let result = await  fetch('http://localhost:5000/products',{
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










  const handleDelete = async (filename) => {
    try {
      const response = await fetch(`http://localhost:5000/delete/${filename}`, { method: 'DELETE' }); 
      if (response.ok) { 
        getProducts();
        console.log('file Deleted successfully:', await response.text()); 
      } else {
        console.error('Error deleting file:', await response.text()); 
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };



  // const deleteProduct = async (id) => {
  //   let result = await fetch(`http://localhost:5000/delete/${id}`, {
  //     method: "DELETE",
  //     headers:{
  //       authorization: `Ali ${JSON.parse(localStorage.getItem('token'))}`
  //     }
  //   });

  //   result = await result.json();

  //   if (result) {
  //     getProducts();
  //   }
  // };


  return (
    <div>
      <div>
        <h3>Upload Image</h3>
        <input type="file" onChange={(e) => (setImg(e.target.files[0]))} />
        <button onClick={imageHandle}>Upload</button>
      </div>
      {products.length > 0 ? products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li><img src={"/img/"+item.filename} /></li>
          {/* <li>${item.filename}</li> */}
          <li><button onClick={() => {handleDelete(item.filename)}}>Delete</button>
            <Link to={"/update/" + item._id}>UpDate</Link>
          </li>
        </ul>
      )) :
        <>
        <h1>No result found</h1>
        <img src="/img/1Capture.JPG" />
        </>
      }
    </div>
  );

};

export default ProductList;