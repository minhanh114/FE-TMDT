import { useState, useEffect, Fragment } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { newCategory, clearErrors } from '../../actions/categoryActions'
//update Category
const NewCategory = ({ history }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, success } = useSelector(state => state.newCategory);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/categories');
            alert.success('Thêm loại sản phẩm thành công');
            dispatch({ type: 'NEW_CATEGORY_RESET' })
        }

    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('description', description);

        dispatch(newCategory(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Thêm nhà thể loại sản phẩm mới'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Thông tin danh mục sản phẩm</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Tên:</label>
                                    <input type="text" id="name" className="form-control" value={name} onChange={e => setName(e.target.value)} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description_field">Mô tả:</label>
                                    <textarea className="form-control" id="description_field" value={description} onChange={e => setDescription(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-block py-3">Thêm mới</button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default NewCategory;