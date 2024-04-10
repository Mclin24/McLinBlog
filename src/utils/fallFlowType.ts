export interface flowProps {
    gap: number
    column: number
    bottom: number
    list: imageInfo[]
}

// 用于记录每个卡片的信息
export interface flowItemInfo {
    width: number // 瀑布流卡片的宽度
    height: number // 瀑布流卡片的宽度
    imageHeight: number // 瀑布流卡片内图片的宽度
    x: number // 瀑布流卡片的x坐标偏移量
    y: number // 瀑布流卡片的y坐标偏移量
}

export interface imageInfo {
    id: string | number
    url: string
    width: number
    height: number
    title: string
    author: string
    [key: string]: any
}
