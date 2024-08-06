// 下拉加载更多，如滚动加载
export default function useLoadMore(request, getIsAllLoaded) {
  const loadMore = new LoadMore(request, getIsAllLoaded)
  return { loadMore }
}

class LoadMore {
  constructor(request, getIsAllLoaded) {
    this.initData = {
      pageNum: 1,
      getIsAllLoaded,
      isAllLoaded: false,
      loading: false,
    };
    this.init(this.initData);
    this.request = request;
  }
  init() {
    const initData = this.initData;
    for (let key in initData) {
      this[key] = initData[key]
    }
  }
  load(data = {}) {
    if (this.loading || this.isAllLoaded) {
      return Promise.resolve([])
    }
    this.loading = true;

    return new Promise((resolve, reject) => {
      this.request({
        page: this.pageNum, // 当前页数
        ...data,
      })
        .then((res) => {
          this.pageNum++;
          this.loading = false;
          if (this.getIsAllLoaded(res)) {
            this.isAllLoaded = true;
          } else {
            this.isAllLoaded = true;
          }
          resolve(res);
        })
        .catch((err) => {
          this.loading = false;
          reject(err);
        })
    })
  }
}
