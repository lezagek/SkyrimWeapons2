newStats.getResultLogOpr = function(valueLeft, opr, valueRight) {
    if (opr == '==') {
        return valueLeft == valueRight;
    }
    if (opr == '!=') {
        return valueLeft != valueRight;
    }
    if (opr == '>') {
        return valueLeft > valueRight;
    }
    if (opr == '<') {
        return valueLeft < valueRight;
    }
    if (opr == '>=') {
        return valueLeft >= valueRight;
    }
    if (opr == '<=') {
        return valueLeft <= valueRight;
    }
};

newStats.where = function(arr) {
    if (arr.length == 0) return;
    let indexTrue = [];
    for (let i in this[arr[0]["key"]])
        indexTrue.push(parseInt(i));
    for (let i in arr) {
        arrTrue = [];
        for (let j = 0; j < this[arr[i]["key"]].length; j++) {
            if (this.getResultLogOpr(this[arr[i]["key"]][j],arr[i]["operation"],arr[i]["value"])){
                arrTrue.push(j);
            }
        }
        indexTrue = intersection(indexTrue, arrTrue);
    }
    let keysThis = this.getAllKey();
    for (let k in keysThis) {
        let newValue = [];
        for (let i in indexTrue) {
            newValue.push(this[keysThis[k]][indexTrue[i]]);
        }
        this[keysThis[k]] = newValue;
    }
}

function intersection (arr1, arr2) {
    let result = [];
    for(let i in arr1)
    {
        if(arr2.includes(arr1[i])) result.push(arr1[i]);
    }
    return result;
};

function buttonFilter() {
    let arr = [];
    if (document.getElementById("WeaponNameFilter").value !== "") {
        let object = {
            key: "WeaponName",
            operation: "==",
            value: document.getElementById("WeaponNameFilter").value
        }
        arr.push(object);
    }
    if (document.getElementById("TypeFilter").value !== "No") {
        let object = {
            key: "Type",
            operation: "==",
            value: document.getElementById("TypeFilter").value
        }
        arr.push(object);
    }
    if (document.getElementById("MaterialFilter").value !== "No") {
        let object = {
            key: "Material",
            operation: "==",
            value: document.getElementById("MaterialFilter").value
        }
        arr.push(object);
    }
    if (document.getElementById("DamageFilter").value !== "") {
        let object = {
            key: "Damage",
            operation: "==",
            value: document.getElementById("DamageFilter").value
        }
        arr.push(object);
    }
    if (document.getElementById("WeightFilter").value !== "") {
        let object = {
            key: "Weight",
            operation: "==",
            value: document.getElementById("WeightFilter").value
        }
        arr.push(object);
    }
    if (document.getElementById("PriceFilter").value !== "") {
        let object = {
            key: "Price",
            operation: "==",
            value: document.getElementById("PriceFilter").value
        }
        arr.push(object);
    }
    newStats.where(arr);
    document.getElementById('table').innerHTML = newStats.print();
}