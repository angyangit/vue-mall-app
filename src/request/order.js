import axios from './http' // 导入http中创建的axios实例
import ApiConstant from './constant'
import qs from 'qs';

const OrderCarAip = {
    generateConfirmOrder(data) {
        return axios.post(ApiConstant.ORDER_CONFIRM, data)
    }
}


export default OrderCarAip

