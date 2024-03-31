export class Sort {
    name: string
    label: string

    constructor(name: string, label: string) {
        this.name = name
        this.label = label
    }
}

export class Sorts {

    list: Record<string, Sort> = {default: new Sort("", "Best match")}

    get default() {
        return this.list.default.name
    }

    constructor() {
        this.add.bind(this)
    }

    add(name: string, label: string) {
        if (name !== "default" && name !== "") {
            const sort = new Sort(name, label)
            this.list[sort.name] = sort
        }
        return this
    }
}