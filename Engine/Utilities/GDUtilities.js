class GDUtilities {
    
    // Code referenced: https://www.toolbox.com/tech/devops/question/random-number-generator-needs-to-exclude-two-values-121014/ 
    static getRandomInRangeExcluding(min, max, excluding) {
        let value = excluding;

        while (value == excluding) {
            value = Math.floor(Math.random() * (max - min + 1) + min);
        }

        return value;
    }
}