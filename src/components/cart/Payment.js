import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'

import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

import axios from 'axios'

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = ({ history }) => {

    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState('card');


    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder)



    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    // cart, ship info
    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice)  // total price
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        document.querySelector('#pay_btn').disabled = true;

        let res;
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            if (paymentMethod === 'card') {
                res = await axios.post('/api/v1/payment/process', paymentData, config);

                const clientSecret = res.data.client_secret;

                console.log(clientSecret);

                if (!stripe || !elements) {
                    return;
                }

                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                        billing_details: {
                            name: user.name,
                            email: user.email
                        }
                    }
                });

                if (result.error) {
                    alert.error(result.error.message);
                    document.querySelector('#pay_btn').disabled = false;
                } else {
                    if (result.paymentIntent.status === 'succeeded') {
                        order.paymentInfo = {
                            id: result.paymentIntent.id,
                            status: result.paymentIntent.status
                        }
                        order.paymentMethod = 'card'
                        dispatch(createOrder(order));
                        history.push('/success');
                    } else {
                        alert.error('Có một số vấn đề trong khi xử lý thanh toán');
                    }
                }
            } else if (paymentMethod === 'cod') {
                order.paymentInfo = {
                    status: 'pending' // Cập nhật trạng thái thanh toán thành công khi thanh toán khi nhận hàng
                }
                dispatch(createOrder(order));
                history.push('/success');
            }
        } catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            alert.error(error.response.data.message);
        }
    }



    return (
        <Fragment>
            <MetaData title={'Thông tin thẻ'} />

            <CheckoutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>

                        <div className="form-group">
                            <label htmlFor="payment_method">Phương thức thanh toán</label>
                            <select
                                id="payment_method"
                                className="form-control"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                value={paymentMethod}
                            >
                                <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                                <option value="card">Thanh toán bằng thẻ</option>

                            </select>
                        </div>
                        {paymentMethod === 'card' && ( // Chỉ hiển thị form thông tin thẻ khi paymentMethod là 'card'
                            <Fragment>
                                <h1 className="mb-4">Thông tin thẻ</h1>
                                <div className="form-group">
                                    <label htmlFor="card_num_field">Số thẻ</label>
                                    <CardNumberElement
                                        type="text"
                                        id="card_num_field"
                                        className="form-control"
                                        options={options}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="card_exp_field">Hạn thẻ</label>
                                    <CardExpiryElement
                                        type="text"
                                        id="card_exp_field"
                                        className="form-control"
                                        options={options}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="card_cvc_field">Số CVC</label>
                                    <CardCvcElement
                                        type="text"
                                        id="card_cvc_field"
                                        className="form-control"
                                        options={options}
                                    />
                                </div>
                            </Fragment>
                        )}
                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Thanh toán {` - ${(orderInfo && orderInfo.totalPrice).toLocaleString()}`}đ

                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Payment
