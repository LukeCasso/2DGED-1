class GDUtilities {

    static getRandomInRangeExcluding(min, max, excluding) {
        let value = excluding;

        while (value == excluding) {
            value = Math.floor(Math.random() * (max - min + 1) + min);
        }

        return value;
    }
}