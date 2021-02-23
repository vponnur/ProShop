import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import Message from '../components/message';
import Loader from '../components/loader';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../actions/actionTypes';
import FormContianer from '../components/FormContainer';

const ProductEditScreen = (props) => {
    const productId = props.match.params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const { loading, error, product } = useSelector(state => state.productDetails);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(state => state.productUpdate);

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            props.history.push('/admin/productlist');
        }
        else {
            if (product._id !== productId || !product.name) {
                dispatch(listProductDetails(productId));
            }
            else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [dispatch, product, productId, successUpdate, props.history])

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }));
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]; // first items in an array as uploading single file
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data);
            setUploading(false);
        }
        catch (error) {
            console.log(error);
            setUploading(false);
        }

    }
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            <FormContianer>
                <h1>Edit Product</h1>
                {
                    loading
                        ? <Loader />
                        : error
                            ? <Message variant='danger'>{error}</Message>
                            : (
                                <Form onSubmit={submitHandler}>

                                    <Form.Group controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder="Enter name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='price'>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder="Enter price value"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='image'>
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder="Enter image URL"
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                        ></Form.Control>
                                        <Form.File
                                            id='image-file'
                                            label='choose file'
                                            custom
                                            onChange={uploadFileHandler}
                                        >
                                            {uploading && <Loader />}
                                        </Form.File>
                                    </Form.Group>

                                    <Form.Group controlId='brand'>
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder="Enter brand"
                                            value={brand}
                                            onChange={(e) => setBrand(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='countInStock'>
                                        <Form.Label>Count in Stock</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder="Enter Count in Stock"
                                            value={countInStock}
                                            onChange={(e) => setCountInStock(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='category'>
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder="Enter category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='description'>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder="Enter description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Button type='submit' variant='primary' >Update</Button>
                                </Form>
                            )
                }

            </FormContianer>
        </>
    )
}

export default ProductEditScreen;
