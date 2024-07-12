export interface IToken {
    title: string,
    image: number | number

}
export interface IAppDropDown {
    tokens: IToken[],
    onSelect: (item: IToken, index: number) => void,
    activeToken: IToken,
    style?: {
    }
}