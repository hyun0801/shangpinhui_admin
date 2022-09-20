/**
 * 品牌管理相关的接口函数
 */
//ts枚举的 使用,使用灭据类型可以为一组数值赋予友好的名字,让常量更加规范,统一

import request from '@/utils/request'
import type {
  GetTrademarkListApiResponse,
  trademarkItem,
} from './modules/trademarkModel'

//定义接口地址
enum Api {
  getTrademarkList = '/admin/product/baseTrademark', //获取品牌分页列表
  addTrademarkList = '/admin/product/baseTrademark/save', //添加品牌
  updateTrademark = '/admin/product/baseTrademark/update', //修改品牌
  deleteTrademark = '/admin/product/baseTrademark/remove', //删除品牌
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
/**
 * 修改品牌数据的接口函数
 * @param param
 * @id 要修改的图片的id
 * @logoUrl 要修改的图片的logoUrl
 * @tmName 要修改的品牌名称
 * @returns
 */
export const reqUpdateTrademark = ({ id, logoUrl, tmName }: trademarkItem) => {
  return request.put(Api.updateTrademark, {
    //修改图片的请求体参数
    id,
    logoUrl,
    tmName,
  })
}
/**
 *
 * @param id 要删除数据id
 * @returns
 */
export const reqDeleteTrademark = (id: number) => {
  return request.delete(`${Api.deleteTrademark}/${id}`)
}
