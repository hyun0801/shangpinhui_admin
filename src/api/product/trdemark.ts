/**
 * 品牌管理相关的接口函数
 */
//ts枚举的 使用,使用灭据类型可以为一组数值赋予友好的名字,让常量更加规范,统一

import request from '@/utils/request'
import type { GetTrademarkListApiResponse } from './modules/trademarkModel'

//定义接口地址
enum Api {
  getTrademarkList = '/admin/product/baseTrademark',
  addTrademarkList = '/admin/product/baseTrademark/save',
}
/**
 * 获取品牌分页列表
 * @param page 当前页码
 * @param limit 每页记录数
 * @returns
 * @GetTrademarkListApiResponse 请求回来的数据类型
 *
 */
export const reqGetTrademarkList = (page: number, limit: number) => {
  return request.get<any, GetTrademarkListApiResponse>(
    `${Api.getTrademarkList}/${page}/${limit}`,
  )
}
/**
 * 添加品牌的接口函数
 * @param logoUrl 品牌LOGO Url
 * @param tmName  //品牌名称
 * @returns   除了获取请求有返回值，其他修改，添加，删除都没有返回值，都是null
 */
export const reqAddTrademarkList = (logoUrl: string, tmName: string) => {
  return request.post<any, null>(Api.addTrademarkList, {
    //添加图片的请求体参数
    logoUrl,
    tmName,
  })
}
