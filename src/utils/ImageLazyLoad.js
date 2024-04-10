const lazyLoad = function () {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if ( entry.intersectionRatio > 0 ) {
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target)
            }
        })
    })
    Array.from(document.getElementsByTagName('img')).forEach(el => {
        observer.observe(el)
    })
} 
// tips：利用 IntersectionObserver() 构造器创建并返回一个IntersectionObserver对象，通过观察 intersectionRatio 的状态来确定目标是否在视口内。