import React from 'react'
import { Link } from 'react-router-dom'
//thêm module nhà sản xuất
//update category
const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i class="bi bi-browser-safari"></i> Tổng quan</Link>
                    </li>
                    <li>
                        <Link to="/admin/products"><i
                            className="fa fa-product-hunt"></i> Quản lý sản phẩm</Link>
                    </li>

                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Quản lý đơn hàng</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Quản lý người dùng</Link>
                    </li>

                    <li>
                        <Link to="/admin/reviews"><i class="bi bi-chat-dots-fill"></i> Quản lý bình luận</Link>
                    </li>
                    <li>
                        <Link to="/admin/categories"><i class="bi bi-chat-dots-fill"></i> Quản lý danh mục</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
