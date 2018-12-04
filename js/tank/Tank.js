export class Tank {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }

    getPos() {
        return this.position;
    }

    getName() {
        return this.name;
    }
}