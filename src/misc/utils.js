const utils = {
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

    randomSelect: (tableSize, memorySize) => {

        const resultSet = [];
        var numbers = Array.from({length: tableSize * tableSize}, (_, i) => 1 + i);

        for (var i = 0; i < memorySize; i++) {
            var idx = Math.floor(Math.random() * numbers.length);
            resultSet.push(numbers[idx]);
            numbers = numbers.filter( n => n !== numbers[idx]);
        }
        console.log("Answer", resultSet);
        return resultSet;
    },

    tdIdGenerator: (tableSize, trKey, tdKey) => {
        return (trKey - 1) * tableSize + tdKey;
    },

};

export default utils;