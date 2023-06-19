import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productActions';

import Sliderr from '../components/layout/Slider'
import { getAdminCategory } from '../actions/categoryActions';






const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000000])
    const [categoryi, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    //const categories = [
    //  'Giày Sneakers',
    //'Giày Casual',
    //'Giày Sandal',
    //'Giày Boots',
    //'Giày công sở',
    //'Giày cho trẻ em',
    //]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)
    const { category } = useSelector(state => state.category);
    const keyword = match.params.keyword

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }

        dispatch(getProducts(keyword, currentPage, price, categoryi, rating));
        dispatch(getAdminCategory()); // update category

    }, [dispatch, alert, error, keyword, currentPage, price, categoryi, rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount
    }


    return (
        <Fragment>
            <slideCategoryy />
            <Sliderr />
            <br />
            <h3 className='text-center'>Danh mục sản phẩm</h3>
            <div id="products_heading" className='container container-fluid'>
                <ul id="ul_top_hypers">
                    {category.map(categoryid => (
                        <li
                            style={{
                                cursor: 'pointer',
                                listStyleType: 'none'
                            }}
                            key={categoryid._id}
                            onClick={() => setCategory(categoryid._id)}//update category
                        >
                            <div className="button">
                                <p className="btnText">{categoryid.name}</p>
                                {/* <div className="btnTwo">
                                    <p className="btnText2">Chọn!</p>
                                </div> */}

                            </div>

                        </li>
                    ))}
                </ul>
            </div>
            <br />
            {/* <br />
            <div className="button">
                <p className="btnText">{category}</p>
                <div className="btnTwo">
                    <p className="btnText2">GO!</p>
                </div>
            </div> */}
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Sneaker Shop'} />

                    <h1 id="products_heading" className="container container-fluid">&emsp;&emsp;&emsp;</h1>
                    <h3 className='text-center'>Sản phẩm</h3>

                    <section id="products" className="container mt-5">
                        {<div className="row">

                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">

                                        <div className="px-5">
                                            <h4 className="mb-5">
                                                Khoảng giá
                                            </h4>
                                            <Range
                                                marks={{
                                                    100000: '100.000',
                                                    10000000: '10.000.000'
                                                }}
                                                min={100000}
                                                max={10000000}
                                                defaultValue={[100000, 10000000]}
                                                tipFormatter={value => `${value}`}
                                                tipProps={{
                                                    placement: 'top',
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />

                                            <br />
                                            <hr className="my-3" />

                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Đánh giá
                                                </h4>

                                                <ul className="pl-0">
                                                    {[5, 4, 3, 2, 1].map(star => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={star}
                                                            onClick={() => setRating(star)}
                                                        >
                                                            <div className="rating-outer">
                                                                <div className="rating-inner"
                                                                    style={{
                                                                        width: `${star * 20}%`
                                                                    }}
                                                                >
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                products.map(product => (
                                    <Product key={product._id} product={product} col={3} />
                                ))
                            )}

                        </div>}
                    </section>

                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Tiếp'}
                                prevPageText={'Trở về'}
                                firstPageText={'Đầu tiên'}
                                lastPageText={'Cuối cùng'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}

                </Fragment>
            )}

        </Fragment>
    )
}

export default Home
