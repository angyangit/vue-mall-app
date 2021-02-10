import axios from './http' // 导入http中创建的axios实例
import ApiConstant from './constant'

const CateAip = {
    cateList() {
        return axios.get(ApiConstant.CATEGORY_TREELIST)
    },
}


export default CateAip

