import axios from 'axios';
import Cookies from 'js-cookie';
// thêm module nhà sản xuất
export const getProducers = (keyword = '', currentPage = 1, price, category, rating = 0) => async (dispatch) => {
    try {

        dispatch({ type: 'ALL_PRODUCTS_REQUEST' })

        let link = `https://be-tmdt.vercel.app/api/v1/producers?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if (category) {
            link = `https://be-tmdt.vercel.app/api/v1/producers?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
        }

        const { data } = await axios.get(link)

        dispatch({
            type: 'ALL_PRODUCTS_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({
            type: 'ALL_PRODUCTS_FAIL',
            payload: error.response.data.message
        })
    }
}

export const newCategory = (categoryData) => async (dispatch) => {
    try {

        dispatch({ type: 'NEW_CATEGORY_REQUEST' })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: Cookies.get('token')
            }
        }
        //update category

        const { data } = await axios.post(`https://be-tmdt.vercel.app/api/v1/admin/category/new`, categoryData, config)

        dispatch({
            type: 'NEW_CATEGORY_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({
            type: 'NEW_CATEGORY_FAIL',
            payload: error.response.data.message
        })
    }
}

export const getAdminCategory = () => async (dispatch) => {
    try {

        dispatch({ type: 'ADMIN_CATEGORY_REQUEST' })
        const config = {
            headers: {
                authorization: Cookies.get('token')
            }
        }

        const { data } = await axios.get(`https://be-tmdt.vercel.app/api/v1/admin/category`, config)

        dispatch({
            type: 'ADMIN_CATEGORY_SUCCESS',
            payload: data.category
        })

    } catch (error) {

        dispatch({
            type: 'ADMIN_CATEGORY_FAIL',
            payload: error.response.data.message
        })
    }
}

export const updateCategory = (id, categoryData) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_CATEGORY_REQUEST' })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: Cookies.get('token')
            }
        }

        const { data } = await axios.put(`https://be-tmdt.vercel.app/api/v1/admin/category/${id}`, categoryData, config)

        dispatch({
            type: 'UPDATE_CATEGORY_SUCCESS',
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: 'UPDATE_CATEGORY_FAIL',
            payload: error.response.data.message
        })
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'DELETE_CATEGORY_REQUEST' })
        const config = {
            headers: {
                authorization: Cookies.get('token')
            }
        }
        const { data } = await axios.delete(`https://be-tmdt.vercel.app/api/v1/admin/category/${id}`, config)

        dispatch({
            type: 'DELETE_CATEGORY_SUCCESS',
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: 'DELETE_CATEGORY_FAIL',
            payload: error.response.data.message
        })
    }
}

export const getCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'CATEGORY_DETAILS_REQUEST' })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: Cookies.get('token')
            }
        }
        const { data } = await axios.get(`https://be-tmdt.vercel.app/api/v1/admin/category/${id}`, config)

        dispatch({
            type: 'CATEGORY_DETAILS_SUCCESS',
            payload: data.category
        })

    } catch (error) {
        dispatch({
            type: 'CATEGORY_DETAILS_FAIL',
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: 'CLEAR_ERRORS'
    })
}