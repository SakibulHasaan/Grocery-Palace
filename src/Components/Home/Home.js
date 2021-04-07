import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';

const Home = () => {
    const [products, setProducts] = useState();
    useEffect(() =>{
        fetch('https://stark-lowlands-37567.herokuapp.com/allproducts')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    return (
        <div className="container"  style={{width:"100%"}}>
           {
               products ?  <div className="row w-100">
               {
                   products.map(product => <Product product={product}></Product>)
               }
           </div> :
           <div style={{textAlign: 'center'}}>
               <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
           </div>
           }
        </div>
    );
};

export default Home;