const ApiConstant = {
    //首页内容页信息展示
    HOME_INFO: '/home/content',
    //分页获取推荐商品
    RECOMMEND_PRODUCT_LIST: '/home/recommendProductList',
    //获取首页商品分类
    PRODUCT_CATE_LIST: '/home/productCateList',
    //根据分类获取专题
    SUBJECT_LIST: '/home/subjectList',
    //分页获取人气推荐商品
    HOT_PRODUCT_LIST: '/home/hotProductList',
    //分页获取新品推荐商品
    NEW_PRODUCT_LIST: '/home/newProductList',

    //以树形结构获取所有商品分类
    CATEGORY_TREELIST: '/product/categoryTreeList',
    //综合搜索、筛选、排序
    PRODUCT_SEARCH: '/product/search',
    //获取前台商品详情
    PRODUCT_DETAIL: '/product/detail',

    //添加商品到购物车
    ADD_SHOP_CAR: '/cart/add',
    //获取某个会员的购物车列表
    SHOP_CAR_LIST: '/cart/list',
    SHOP_CAR_UPDATE_QUANTITY: '/cart/update/quantity',
    SHOP_CAR_DELETE: '/cart/delete',
    SHOP_CAR_CLEAR: '/cart/clear',

    //会员登录
    LOGIN: '/sso/login',
    //获取会员信息
    MEMBER_INFO: '/sso/info',

    //根据购物车信息生成确认单信息
    ORDER_CONFIRM:'/order/generateConfirmOrder'


}
export default ApiConstant
