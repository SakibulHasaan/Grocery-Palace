import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import ManageProducts from '../ManageProducts/ManageProducts';

const AddProduct = () => {
    const [imageURL, setImageURL] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const [manageProductClicked, setManageProductClicked] = useState(false);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const productInfo = {
            name: data.name,
            price: data.price,
            weight: data.weight,
            image: imageURL
        }

        fetch('https://stark-lowlands-37567.herokuapp.com/addProduct', {
            method: 'POST',
            headers: { "content-Type": 'application/json' },
            body: JSON.stringify(productInfo)

        })
            .then(res => {
                console.log(res);
            })

        reset();
    };

    const handleImageUpload = (event) => {
        const imageData = new FormData();
        imageData.set('key', '4c0e7ebed82e54bf1ad6b9fa0109d8d8');
        imageData.append('image', event.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
                setIsDisabled(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="p-5 mt-5">
            <div>
                {
                    manageProductClicked ? <button onClick={() => setManageProductClicked(!manageProductClicked)} className="btn btn-info ml-5">ADD Product</button>
                    : <button onClick={() => setManageProductClicked(!manageProductClicked)} className="btn btn-info ml-5">Manage Product</button>
                }
            </div>

            {
                manageProductClicked ?  
                <div>
                    <ManageProducts></ManageProducts>
                </div>
                :
                <div className="w-50">
                <h1 style={{ color: 'navy' }}>Add a product to database</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input name="name" {...register("name")} required type="text" className="form-control" placeholder="Product Name" /><br />
                    <input name="price"  {...register("price")} type="text" className="form-control" placeholder="Product Price" /><br />
                    <input name="weight" {...register("weight")} type="text" className="form-control" placeholder="Product Weight" /><br />
                    <input type="file" className="form-control-file" onChange={handleImageUpload} /><br />
                    <input type="submit" disabled={isDisabled} className="btn btn-primary" />
                </form>
            </div>

            }
        </div>
    );
};

export default AddProduct;