/**
 * 这个文件是用来定义属性管理的接口类型
 */
export interface categoryItem {
  id: number
  name: string
}
//整个响应数据的类型
export type CategoryList = categoryItem[]
