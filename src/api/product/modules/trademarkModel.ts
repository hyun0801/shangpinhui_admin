/**
 * 这个文件是用来定义品牌管理的接口类型
 */
//单个响应品牌的接口类型
interface trademarkItem {
  id: number //单个品牌的Id
  tmName: string //单个品牌的名字
  logoUrl: string //单个品牌的图片地址
}
//整个品牌列表的接口类型
export type trademarkList = trademarkItem[]
//定义整个获取品牌分类类表的接口类型
export interface GetTrademarkListApiResponse {
  records: trademarkList
  total: number //数据总条数
}
