import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import "./CheckOutProduct.css"

const CheckOutProduct = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    let { id } = useParams();
    const [productData, setProductData] = useState({})

    useEffect(() => {
        fetch('http://localhost:4000/find/' + id)
            .then((response) => response.json())
            .then(data => {
                // console.log(data);
                setProductData(data[0])
            })

    }, [id])

    const handleOrder = () => {
        const date = new Date();
        const just_date = date.toDateString('dd/MM/yyyy')
        const UserOrder = { ...loggedInUser, ...productData ,  date: just_date }
        fetch('http://localhost:4000/order', {
            method: 'POST',
            headers: { "content-Type": 'application/json' },
            body: JSON.stringify(UserOrder)
        })
    }

    return (
        <div className="container">
            <div className="CheckOutProduct">
                <div>
                    <img className="img-fluid" src={productData.image} alt="" />
                </div>
                <div className="pl-3">
                    <h2>Your Selected Product is {productData.name}</h2>
                    <h3>Price ${productData.price}</h3>
                    <h4>Weight {productData.weight}</h4>
                    <button onClick={handleOrder} className="btn btn-info">Place Order</button>
                </div>
            </div>
            
        </div>
    );
};

export default CheckOutProduct;