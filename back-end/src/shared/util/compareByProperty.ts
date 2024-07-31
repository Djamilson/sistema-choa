type IProps = {
    array: any[]
    property: string
}

export function compareByProperty({ array, property }: IProps) {
    const list: any[] = []
    const values: any[] = []

    array.forEach(object => {
        const valueProperty = object[property]
        if (!values.includes(valueProperty)) {
            values.push(valueProperty)
            list.push(object)
        }
    })

    return list
}
