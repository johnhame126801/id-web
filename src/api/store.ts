/***
 * 本地存储(封装，方便后续拓展存储组件)
 * */

const set = (key: string, item: any) => localStorage.setItem(key, item)
const get = (key: string): any => localStorage.getItem(key)
const remove = (key: string) => localStorage.removeItem(key)

export const Store = {
  set: set,
  get: get,
  remove: remove
}
