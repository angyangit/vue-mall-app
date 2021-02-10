import axios from './http' // 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块
import ApiConstant from './constant'

const HomeAip = {
    homeInfo() {
        return axios.get(ApiConstant.HOME_INFO)
    },
    recommendProductList(params) {
        return axios.get(ApiConstant.RECOMMEND_PRODUCT_LIST, {params})
    },
    articleDetail(id, params) {
        return axios.get(`${base.sq}/topic/${id}`, {
            params: params,
        })
    },
    login(params) {
        return axios.post(`${base.sq}/accesstoken`, qs.stringify(params))
    },
}


export default HomeAip
