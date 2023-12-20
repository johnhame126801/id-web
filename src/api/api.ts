import ajax from '@/api/ajax'


/**
 * 封装请求，隔离具体第三方库，提升可拓展性
 * @param path 请求路径
 * @param method 请求方法
 * @param params 请求参数
 * @param headers 请求头
 */
const request = (path: string, method: string, params: any, headers: any) => {
  return ajax.request({
    url: path,
    method: method,
    data: params,
    headers: headers
  });
}

/**
 * 获取所有订单
 * @returns 请求结果
 */
export const getAllOrder = (): Promise<any> => {
  return request('/order/all', 'get', {}, {})
}

/**
 * 生成订单
 * @param order 参数
 * @returns Promise 
 */
export const createOrder = (order: any): Promise<any> => {
  return request('/order/batch', 'post', order, {})
}

/**
 * 删除订单
 * @param ids  订单id列表 
 * @returns  Promise
 */
export const deleteOrder = (ids: any): Promise<any> => {
  return request('/order', 'delete', { ids }, {})
}

/**
 * 获取订单苹果ID列表
 * @param orderId 订单ID
 * @returns Promise
 */
export const getOrderAppleIDList = (orderId: string): Promise<any> => {
  return request('/order/id?id=' + orderId, 'get', {}, {})
}

export const clearEmailApi = (): Promise<any> => {
  return request('/email/clear', 'delete', {}, {})
}

export const clearCardApi = (): Promise<any> => {
  return request('/card/clear', 'delete', {}, {})
}

export const clearIdApi = (): Promise<any> => {
  return request('/id/clear', 'delete', {}, {})
}

export const clearOrderApi = (): Promise<any> => {
  return request('/order/clear', 'delete', {}, {})
}

export const getStatisticInfoApi = (): Promise<any> => {
  return request('/statistic', 'get', {}, {})
}
