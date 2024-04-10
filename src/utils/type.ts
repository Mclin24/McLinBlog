export interface waterFallProps {
    gap: number; // 卡片之间的空隙
    column: number; // 父组件定义显示多少列
    bottom: number; // 触底加载更多的高度
    pageSize: number;
    request: (page: number, pageSize: number) => Promise<imageCardItem[]>;
}
export interface imageCardItem {
    id: string | number;
    url: string;
    width: number;
    height: number;
    title: string;
    author: string;
    [key: string]: any;
}
export interface imageCardPos {
    width: number;
    height: number; // 卡片高度
    imageHeight: number; // 图片高度
    x: number;
    y: number;
}