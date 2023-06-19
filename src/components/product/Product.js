import React from 'react'
import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { useAlert } from 'react-alert';



const Product = ({ product, col }) => {
    // Hàm để cắt chuỗi và thêm dấu ba chấm khi cần thiết
    function truncateString(str, maxLength) {
        if (str.length > maxLength) {
            return str.substring(0, maxLength - 3) + '...';
        }
        return str;
    }


    return (

        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className="card card p-3 rounded">
                <Link to={`/product/${product._id}`} className="image-link">
                    <img className="card-img-top mx-auto" src={product.images[0].url} alt='' />
                    {product.discount !== 0 && <div className="corner-text" >
                        <span className="discount">Giảm</span>
                        <span className="percent"> {product.discount * 100}%</span>
                    </div>}
                </Link>


                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`} title={product.name}>
                            <span className="product-name">{truncateString(product.name, 30)}</span>
                        </Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} đánh giá)</span>
                    </div>
                    <div className="price">
                        {product.discount !== 0 ? (
                            <>
                                <span className="card-text">{(product.price).toLocaleString()}đ</span>
                                <span className="card-text">{((product.price) - (product.price * product.discount)).toLocaleString()}đ</span>
                            </>
                        ) : (<span className="nodiscount">{(product.price).toLocaleString()}đ</span>
                        )}
                    </div>

                </div>
            </div>
        </div>


    )
}

export default Product
