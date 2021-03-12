import axios from './http' // 导入http中创建的axios实例
import ApiConstant from './constant'
import qs from 'qs';

const AuthAip = {
    login(loginInfo) {
        return axios.post(ApiConstant.LOGIN, qs.stringify(loginInfo))
    },
    getMemberInfo() {
        return axios.get(ApiConstant.MEMBER_INFO)
    }
}


export default AuthAip

