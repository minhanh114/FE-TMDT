import { useEffect, useState, Fragment } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getCategoryDetails, updateCategory } from "../../actions/categoryActions";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

const UpdateCategory = ({ match, history }) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');


    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, category } = useSelector(state => state.categoryDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.udCategory)

    const categoryId = match.params.id;

    useEffect(() => {

        if (category && category._id !== categoryId) {
            dispatch(getCategoryDetails(categoryId))
            dispatch(clearErrors())
        } else {
            setName(category.name);
            setDescription(category.description);
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }

        if (isUpdated) {

            alert.success('Categoty updated successfully')
            history.push('/admin/categories')
            dispatch({ type: 'UPDATE_CATEGORY_RESET' })
            dispatch({ type: 'CATEGORY_DETAILS_RESET' })

        }

    }, [dispatch, error, alert, updateError, isUpdated, history, category, categoryId])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('description', description);

        dispatch(updateCategory(category._id, formData))
    }

    return (
        <Fragment>
            <MetaData title={'Cập nhật thông tin thể loại'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Thông tin thể loại</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Tên:</label>
                                    <input type="text" id="name" className="form-control" value={name} onChange={e => setName(e.target.value)} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description_field">Mô tả:</label>
                                    <textarea className="form-control" id="description_field" value={description} onChange={e => setDescription(e.target.value)} />
                                </div>
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    Cập nhật
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateCategory;