import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Doughnut, Line, Radar } from "react-chartjs-2";

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'

import { getAdminProducts } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { allUsers } from '../../actions/userActions'
import ChartIncome from './ChartIncome';

const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)

    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })
    // status order
    let da_dat_hang = 0;
    let dang_van_chuyen = 0;
    let da_giao_hang = 0;
    orders &&
        orders.forEach((order) => {
            if (order.orderStatus === "Đã đặt hàng") {
                da_dat_hang += 1;
            }
            if (order.orderStatus === "Đang vận chuyển") {
                dang_van_chuyen += 1;
            }
            if (order.orderStatus === "Đã giao hàng") {
                da_giao_hang += 1;
            }
        });

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
    }, [dispatch]);

    let totalAmountall = 0;
    orders &&
        orders.forEach((product) => {
            totalAmountall += product.totalPrice;
        });
    // Chart Line tính tổng doanh thu
    const lineState = {
        labels: ["Số tiền ban đầu", "Tổng danh thu hiện tại"],
        datasets: [
            {
                label: "TỔNG DANH THU",
                backgroundColor: ["blue"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmountall],
            },
        ],
    };
    // Doughnut tính số lượng hàng còn và hết hàng
    const doughnutState = {
        labels: ["Hết hàng", "Còn hàng"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#FF1493", "#FFD700"],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };
    // Doughnut thống kê trạng thái đơn hàng
    const doughnutStateOrder = {
        labels: ["Đã đặt hàng", "Đang vận chuyển", "Đã giao hàng"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4", "#FF7F50"],
                hoverBackgroundColor: ["#FF1493", "#00FA9A", "#FFD700"],
                data: [da_dat_hang, dang_van_chuyen, da_giao_hang],
            },
        ],
    };
    // radar chart
    let giay_sneaker = 0;
    let giay_casual = 0;
    let giay_sandal = 0;
    let giay_boots = 0;
    let giay_cong_so = 0;
    let giay_cho_tre_em = 0;
    products &&
        products.forEach((product) => {
            if (product.category === "Việt Nam") {
                giay_casual += 1;
            }
            if (product.category === "Trung Quốc") {
                giay_sandal += 1;
            }
            if (product.category === "Hàn Quốc") {
                giay_boots += 1;
            }
            if (product.category === "Nhật Bản") {
                giay_cong_so += 1;
            }
        });
    const data = {
        labels: [
            'Việt Nam',
            'Trung Quốc',
            'Hàn Quốc',
            'Nhật Bản'
        ],
        datasets: [{
            label: 'Danh mục sản phẩm',
            data: [giay_sneaker, giay_casual, giay_sandal, giay_boots, giay_cong_so, giay_cho_tre_em],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    };
    //chuyển đổi tiền tệ
    function formatCurrency(number) {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
        return formatter.format(number);
    }
    return (
        <Fragment>
            <div class="grid-bg ba-grid anim">
                <div class="inner">
                    <div className="row">
                        <div className="col-12 col-md-2">
                            <Sidebar />
                        </div>

                        <div className="col-12 col-md-10">
                            <h1 className="my-4">Tổng quan</h1>

                            {loading ? <Loader /> : (
                                <Fragment>
                                    <MetaData title={'Admin Dashboard'} />

                                    <div className="row pr-4">
                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-black bg-light o-hidden h-100">
                                                <div className="card-body">
                                                <div className="text-center card-font-size">Tổng danh thu<br /> 
                                                <b>{formatCurrency(totalAmount)}</b>                                                    
                                                </div>
                                                </div>
                                                <Link className="card-footer text-black clearfix small z-1" to="/admin/orders">
                                                    <span className="float-left">Xem chi tiết</span>
                                                    <span className="float-right">
                                                        <i className="fa fa-angle-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-black bg-light o-hidden h-100">
                                                <div className="card-body">
                                                    <div className="text-center card-font-size">Tổng sản phẩm<br /> <b>{products && products.length}</b></div>
                                                </div>
                                                <Link className="card-footer text-black clearfix small z-1" to="/admin/products">
                                                    <span className="float-left">Xem chi tiết</span>
                                                    <span className="float-right">
                                                        <i className="fa fa-angle-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>


                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-black bg-light o-hidden h-100">
                                                <div className="card-body">
                                                    <div className="text-center card-font-size">Tổng hóa đơn<br /> <b>{orders && orders.length}</b></div>
                                                </div>
                                                <Link className="card-footer text-black clearfix small z-1" to="/admin/orders">
                                                    <span className="float-left">Xem chi tiết</span>
                                                    <span className="float-right">
                                                        <i className="fa fa-angle-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>


                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-black bg-light o-hidden h-100">
                                                <div className="card-body">
                                                    <div className="text-center card-font-size">Tổng người dùng<br /> <b>{users && users.length}</b></div>
                                                </div>
                                                <Link className="card-footer text-black clearfix small z-1" to="/admin/users">
                                                    <span className="float-left">Xem chi tiết</span>
                                                    <span className="float-right">
                                                        <i className="fa fa-angle-right"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-white bg-light o-hidden h-100">
                                                <div className="card-body">
                                                    {/* Doughnut Chart */}
                                                    <h6 className='text-dark'>Tình trạng số lượng hàng</h6>
                                                    <div className="doughnutChart">
                                                        <Doughnut data={doughnutState} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-3 col-sm-6 mb-3">
                                            <div className="card text-white bg-light o-hidden h-100">
                                                <div className="card-body">
                                                    {/* Doughnut Chart */}
                                                    <h6 className='text-dark'>Tình trạng đơn hàng</h6>
                                                    {/* Doughnut Chart */}
                                                    <div className="doughnutChart">
                                                        <Doughnut data={doughnutStateOrder} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-sm-12 mb-3">
                                            <div className="card text-white bg-light o-hidden h-100">
                                                <div className="card-body">
                                                    <h6 className='text-dark'>Tổng doanh thu</h6>
                                                    {/* Line chart */}
                                                    <div className="lineChart">
                                                        <Line
                                                            data={lineState}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </Fragment>
                            )}

                            <div className='row'>

                                <div className='col-md-6'>
                                    <ChartIncome />
                                </div>
                                {/* <div className='radar col-md-5 card text-white bg-light'>

                                    <Radar
                                        data={data}
                                    />
                                </div> */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </Fragment >
    )
}

export default Dashboard
