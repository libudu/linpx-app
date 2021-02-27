class Storage {
  constructor(name) {
    this.name = name
		this.storage = uni.getStorageSync(this.name) || {};
  }
  // 设置缓存
  setStorage() {
    uni.setStorageSync(this.name, this.storage);
  }
  // 插入数据
  insert(url, path) {
    this.storage[url] = path
    this.setStorage()
  }
  // 删除数据
  delete(url) {
		delete this.storage[url];
		console.log('delete storage record');
    this.setStorage();
  }
  // 查询数据
  select(url) {
    return this.storage[url];
  }
}

export default new Storage('imgcache')

console.log(uni.getStorageSync('imgcache'));