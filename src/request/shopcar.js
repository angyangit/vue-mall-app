import axios from './http' // 导入http中创建的axios实例
import ApiConstant from './constant'
import qs from 'qs';

const ShopCarAip = {
    addShopCar(data) {
        return axios.post(ApiConstant.ADD_SHOP_CAR, data)
    },
    getCartList() {
        return axios.get(ApiConstant.SHOP_CAR_LIST)
    },
    shopCarUpdateQuantity(data) {
        return axios.get(ApiConstant.SHOP_CAR_UPDATE_QUANTITY, {params: data})
    },
    deleteCartItems(data) {
        return axios.post(ApiConstant.SHOP_CAR_DELETE, qs.stringify({ids: data}, {arrayFormat: 'repeat'}))
    },
    clearCart() {
        return axios.post(ApiConstant.SHOP_CAR_CLEAR)
    },
}


export default ShopCarAip

