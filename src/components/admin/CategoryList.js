import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, deleteCategory } from '../../actions/categoryActions'
import { getAdminCategory } from '../../actions/categoryActions'
//update category
const ProducersList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isDeleted } = useSelector(state => state.udCategory);

    const { loading, error, category } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(getAdminCategory());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Category deleted successfully');
            history.push('/admin/categories');
            dispatch({ type: 'DELETE_CATEGORY_RESET' })
        }

    }, [dispatch, alert, error, history, isDeleted])

    const deleteCategoryHandler = (id) =>{
        dispatch(deleteCategory(id));
    }

    const setProducers = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Tên loại sản phẩm',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Mô tả',
                    field: 'description',
                    sort: 'asc'
                },  
                {
                    label: 'Hành động',
                    field: 'actions',
                },
            ],
            rows: []
        };
    
        category.forEach(producer => {
            data.rows.push({
                id: producer._id,
                name: producer.name,
                description: producer.description,
                actions: <Fragment>
                    <Link to={`/admin/category/${producer._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target="#exampleModal" >
                        <i className="fa fa-trash"></i>
                    </button>
                    {/* model delete */}
                    <div>
                        <div className="modal fade show" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Thông báo!</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        Bạn có muốn xóa không
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteCategoryHandler(producer._id)} data-dismiss="modal">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            })
        })

        return data;
    }

    // const deleteProductHandler = (id) => {
    //     dispatch(deleteProduct(id))
    // }

    return (
        <Fragment>
            <MetaData title={'Tất cả loại sản phẩm'} />

            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Tất cả loại sản phẩm</h1>
                        <Link to='/admin/category'><button type="button" className="btn btn-primary">Thêm mới</button></Link>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducers()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProducersList
