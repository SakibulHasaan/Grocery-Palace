import React, { useEffect, useState } from 'react';

const ManageProducts = () => {
    const [products, setProducts] = useState();

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [products])


    const deleteProduct = (id) => {
        fetch('http://localhost:4000/delete/' + id, {
            method: 'DELETE'
        })
        .then(res => console.log('delete ' + id))
    }

    return (
        <div>
            <h1>Manage Product</h1>
            {
                products ? <table style={{ width: "100%" }}>

                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>weight</th>
                        <th>Delete</th>
                    </tr>

                    {
                        products.map((product) =>

                            <tr>

                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.weight}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteProduct(product._id)}>Delete</button>
                                </td>
                            </tr>


                        )}

                </table>
                    :
                    <div style={{ textAlign: 'center' }}>
                        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                    </div>
            }
        </div>
    );
};

export default ManageProducts;