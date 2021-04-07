import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Product = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    

    const {name, image, price, weight, _id} = props.product;
    return (
        <div className="col-md-4 col-sm-12 pb-3">
            <div className="product">
            <img className="img-fluid" src={image} alt=""/>
            <h4>{name}</h4>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h5>৳{price}</h5>
            <Link to={`/checkout/${_id}`}> <button className="btn btn-primary">Buy Now</button> </Link>
            </div>
        </div>
        </div>
    );
};

export default Product;