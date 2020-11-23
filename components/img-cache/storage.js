class Storage {
  constructor(name) {
    this.name = name
  }
  // 获取缓存
  getStorage() {
    return uni.getStorageSync(this.name) || []
  }
  // 设置缓存
  setStorage(data = []) {
    if (data.length) uni.setStorageSync(this.name, data)
    return data
  }
  // 插入数据
  insert(...arg) {
    let storage = this.getStorage()
    storage.push(...arg)
    this.setStorage(storage)
    return storage
  }
  // 删除数据
  delete(obj = {}) {
    const origin = this.getStorage()
    const storage = origin.filter(ele => !Object.keys(obj).some(k => obj[k] === ele[k]))
    this.setStorage(storage)
    return storage
  }
  // 查询数据
  select(obj = {}) {
    const origin = this.getStorage()
    const storage = origin.filter(ele => Object.keys(obj).every(k => obj[k] === ele[k]))
    return storage
  }
}

export default new Storage('imgcache')
