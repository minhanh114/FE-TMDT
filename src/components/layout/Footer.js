import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer">
        {/* Footer Top */}
        <br/>
        <div className="footer-top section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer about">
                 <div className='logo'>
                    <a href="index.html">SNEAKER SHOP</a>
                    </div>
                  <p className="text">Hãy ghé thăm Sneaker Shop ngay hôm nay và tham gia cùng chúng tôi trong cuộc phiêu lưu thời trang đầy phong cách và sự sáng tạo!</p>
                  <p className="text">Liên hệ với chúng tôi: <span><a href="tel:123456789">+0123 456 789</a></span></p>
                </div>
                {/* End Single Widget */}
              </div>
              
              <div className="col-lg-2 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer links">
                  <h6>GIỚI THIỆU</h6>
                  <ul>
                    <li><Link to=''>Về chúng tôi</Link></li>
                    <li><Link to=''>Hướng dẫn mua hàng</Link></li>
                    <li><Link to=''>Chính sách giao hàng</Link></li>
                    <li><Link to=''>Chính sách đổi trả</Link></li>
                    <li><Link to=''>Chính sách bảo hành</Link></li>
                    <li><Link to=''>Chính sách bảo mật</Link></li>
                    
                  </ul>
                </div>
                {/* End Single Widget */}
              </div>

              <div className="col-lg-2 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer links">
                  <h6>THƯƠNG HIỆU</h6>
                  <ul>
                    <li><Link to=''>Việt Nam</Link></li>
                    <li><Link to=''>Trung Quốc</Link></li>
                    <li><Link to=''>Hàn Quốc</Link></li>
                    <li><Link to=''>Nhật Bản</Link></li>
                  </ul>
                </div>
                {/* End Single Widget */}
              </div>
              
              <div className="col-lg-3 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer social">
                  <h6>THÔNG TIN LIÊN HỆ</h6>
                  {/* Single Widget */}
                  <div className="contact">
                    <ul>
                      <li>Số 2 Trường Sa, TP Hồ Chí Minh</li>
                      <li>Nhóm ...</li>
                      <li className="text">
                        <span>
                        <a href="+012 3456 7890">
                        +012 3456 7890
                        </a>
                        </span>
                      </li>
                    </ul>
                  </div>
                  {/* End Single Widget */}
                  <ul>
                  </ul>
                </div>
                {/* End Single Widget */}
              </div>
            </div>
          </div>
        </div>
        {/* End Footer Top */}
        <div className="copyright">
          <div className="container">
            <div className="inner">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="text-center">
                    <p>Copyright © 2023 By ...</p>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="right">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  )
}

export default Footer
