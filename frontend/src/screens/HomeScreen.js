import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Product from '../components/Product';
import Message from '../components/message';
import Loader from '../components/loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { listProducts, clearProductsList } from '../actions/productActions';
import ProductCarousel from '../components/ProductCarousel';


const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();
    const { loading, error, products, pages, page } = useSelector(state => state.productList);

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));

        //it will execute only once component dispose
        return () => {
            dispatch(clearProductsList());
        }
    }, [dispatch, keyword, pageNumber]);

    return (
        <>

            <h1>Latest products</h1>
            {
                loading
                    ? <Loader />
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        : (
                            <>
                                <Meta />
                                {
                                    !keyword ? <ProductCarousel /> : (<Link to='/' className='btn btn-light'>Go Back</Link>)
                                }
                                <Row>
                                    {
                                        products.map(product =>
                                        (
                                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                                <Product product={product} />
                                            </Col>
                                        ))
                                    }
                                </Row>
                                <Paginate
                                    pages={pages}
                                    page={page}
                                    keyword={keyword ? keyword : ''}
                                />
                            </>
                        )
            }

        </>
    )
}

export default HomeScreen
