function processData(input) {

    input = input.trim().split("\n");

    let pointer = 0;
    const count = parseInt(input[pointer++]);

    let records = [];

    for (let i = 0; i < count; i++) {
        let [label, value] = input[pointer++].split(" ");
        records.push({
            key: i + 1,
            label: label,
            value: Number(value)
        });
    }

    const addLabel = input[pointer++].trim();
    const addValue = Number(input[pointer++]);

    const removeKey = Number(input[pointer++]);


    function calculateTotals(arr) {
        const data = arr.reduce(
            (acc, item) => {
                if (item.value > 0) acc.totalIncome += item.value;
                else acc.totalExpense += item.value;
                return acc;
            },
            { totalIncome: 0, totalExpense: 0 }
        );

        return {
            income: data.totalIncome,
            expense: Math.abs(data.totalExpense)
        };
    }

    function addEntry(label, value, arr) {
        if (!label || value === 0) return arr;

        const highestKey = arr.length
            ? Math.max(...arr.map(obj => obj.key))
            : 0;

        const newEntry = {
            key: highestKey + 1,
            label,
            value
        };

        return [...arr, newEntry];
    }

    function removeEntry(arr, key) {
        return arr.filter(obj => obj.key !== key);
    }

    function formatList(arr) {
        return arr.map(obj => `${obj.label} : ${obj.value}`);
    }


    records = addEntry(addLabel, addValue, records);
    records = removeEntry(records, removeKey);

    const summary = calculateTotals(records);
    const display = formatList(records);


    const finalResult = {
        transactions: records,
        totals: summary,
        renderedList: display
    };

    console.log(JSON.stringify(finalResult, null, 2));
}


process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";

process.stdin.on("data", function (chunk) {
    _input += chunk;
});

process.stdin.on("end", function () {
    processData(_input);
});