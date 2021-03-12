import AuthAip from '../request/auth';
import {SET_MEMBER_INFO, SET_TO_LOGIN_PAGE, SET_TOKEN} from './mutation-types';

// birthday: "2009-05-31T16:00:00.000+00:00"
// city: "上海"
// createTime: "2018-08-02T10:35:44.000+00:00"
// gender: 1
// id: 1
// integration: 5000
// job: "学生"
// memberLevelId: 4
// nickname: "windir"
// password: "$2a$10$NZ5o7r2E.ayT2ZoxgjlI.eJ6OEYqjH7INR/F.mXDbjZJi9HF0YCVG"
// personalizedSignature: "test"
// phone: "18061581849"
// status: 1
// username: "test"
export const loginAction = function login({commit, state}, loginInfo) {
    return new Promise((resolve, reject) => {
        AuthAip.login({
            username: loginInfo.username,
            password: loginInfo.password
        }).then(res => {
            console.log('getMemberInfo', res)
            const tokenStr = res.tokenHead + res.token
            commit(SET_TOKEN, tokenStr)
            AuthAip.getMemberInfo().then(res => {
                commit(SET_MEMBER_INFO, res)
                commit(SET_TO_LOGIN_PAGE, false)
                resolve()
            }).catch(err => {
                reject('会员信息获取失败')
            })
        }).catch(err => {
            reject(err)
        })
    })
}
