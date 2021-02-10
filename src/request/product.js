import axios from './http' // 导入http中创建的axios实例
import ApiConstant from './constant'

const ProductAip = {
    productSearch(params) {
        return axios.get(ApiConstant.PRODUCT_SEARCH, {params})
    },
    productDetail(id) {
        return axios.get(ApiConstant.PRODUCT_DETAIL + `/${id}`)
    },
}


export default ProductAip

