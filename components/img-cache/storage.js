class Storage {
  constructor(name) {
    this.name = name
  }
  // 获取缓存
  getStorage() {
    return uni.getStorageSync(this.name) || {}
  }
  // 设置缓存
  setStorage(data = {}) {
    uni.setStorageSync(this.name, data)
    return data
  }
  // 插入数据
  insert(url, path) {
    let storage = this.getStorage()
    storage[url] = path
    this.setStorage(storage)
    return storage
  }
  // 删除数据
  delete(url) {
    const storage = this.getStorage()
	delete storage[url]
    this.setStorage(storage)
    return storage
  }
  // 查询数据
  select(url) {
    const storage = this.getStorage()
    return storage[url]
  }
}

export default new Storage('imgcache')
