type IProps = {
    list: any
    property: string
    order: string
}

function orderListByPropertyAscAndDesc({ list, property, order }: IProps) {
    list.sort(function (a: any, b: any) {
        var comparador = a[property] - b[property]
        return order === 'desc' ? -comparador : comparador
    })
    return list
}

export { orderListByPropertyAscAndDesc }
