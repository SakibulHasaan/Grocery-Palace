import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Orders = () => {
    const [loggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("https://stark-lowlands-37567.herokuapp.com/orders")
            .then((res) => res.json())
            .then((data) => {
                const specificUserData = data.filter(
                    (user) => user.email === loggedInUser.email
                );
                setOrders(specificUserData);
            });
    }, [orders,loggedInUser.email]);

    const deleteOrder = (id) => {
        fetch('https://stark-lowlands-37567.herokuapp.com/deleteOrder/' + id, {
            method: 'DELETE'
        })
        .then(res => console.log('deleted ' + id))

    }

    return (
        <div className="container" style={{width: '100%'}}>
            <h1>Here is your Orders</h1>

            <table style={{width:"100%"}}>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>weight</th>
                    <th>Date of Order</th>
                    <th></th>
                </tr>

                {orders.map((order) => 
                    <tr>
                        <td>{order.name}</td>
                        <td>{order.price}</td>
                        <td>{order.weight}</td>
                        <td>{order.date}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteOrder(order._id)}>Delete</button>
                        </td>
                    </tr>
                )}
            </table>


        </div>
    );
};

export default Orders;
