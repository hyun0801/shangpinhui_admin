/**
 * 商品分类接口相关函数
 */
import request from '@/utils/request'
import type { CategoryList } from './modules/categoryModel'
enum Api {
  getCategoryList1 = '/admin/product/getCategory1',
  getCategoryList2 = '/admin/product/getCategory2',
  getCategoryList3 = '/admin/product/getCategory3',
}
/**
 * 一级分类列表的接口函数
 * @returns
 */
export const reqGetCategoryList1 = () => {
  return request.get<any, CategoryList>(Api.getCategoryList1)
}
/**
 * 二级分类列表的接口函数
 * @param category1Id 一级分类列表的Id
 * @returns
 */
export const reqGetCategoryList2 = (category1Id: number) => {
  return request.get<any, CategoryList>(
    `${Api.getCategoryList2}/${category1Id}`,
  )
}
/**
 * 二级分类列表的接口函数
 * @param category2Id 二级分类列表的Id
 * @returns
 */
export const reqGetCategoryList3 = (category2Id: number) => {
  return request.get<any, CategoryList>(
    `${Api.getCategoryList2}/${category2Id}`,
  )
}
