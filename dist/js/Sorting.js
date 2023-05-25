newStats.change = function(k, p) {
    let allKey = this.getAllKey();
    for(let key in allKey) {
        let w = this[allKey[key]][k];
        this[allKey[key]][k] = this[allKey[key]][p];
        this[allKey[key]][p] = w;
    }
};

newStats.isCompareOrder = function(n, arrCompare) {
    for(let k = 0; k < arrCompare.length; k += 2) {
        let sortOrder = (arrCompare[k+1] === true)? 'desc' : 'asc';
        if (doCompare(this[arrCompare[k]][n], this[arrCompare[k]][n + 1], sortOrder)) {
            return true;
        } else if (this[arrCompare[k]][n] === this[arrCompare[k]][n + 1]) {
            continue;
        } else {
            return false;
        }
    }
    return false
};

newStats.sorted = function(arr) {
    let n = this[arr[0]].length;
    for(let i = 0; i < n - 1; i += 1) {
        for (let j = 0; j < n - i - 1; j++) {
            if (this.isCompareOrder(j, arr)) {
                this.change(j, j + 1);
            }
        }
    }
    return true;
};

function doCompare (elem1, elem2, sortOrder)
{
    switch (sortOrder)
    {
        case 'asc':
            if (elem1 > elem2) return true;
            else return false;
            break;
        case 'desc':
            if (elem1 < elem2) return true;
            else return false;
            break;
    }
}

function buttonSorting() {
    let arr = [];
    for (let i = 1; i <= document.getElementsByTagName("select").length; i++) {
        if (document.getElementById(`Select${i}`) !== null
            && document.getElementById(`Select${i}`).value !== 'No'){
            arr.push(document.getElementById(`Select${i}`).value);
            arr.push(document.getElementById(`sortOrder${i}`).checked);
        }
    }

    newStats.sorted(arr);
    let table = document.getElementById('table');
    table.innerHTML = newStats.print();
}

function changeOptions() {
    let arrOptions = [];
    for (let key in options) {
        let newOption = document.createElement('option');
        let optionText = document.createTextNode(options[key]);
        newOption.appendChild(optionText);
        newOption.setAttribute('value', key);
        arrOptions.push(newOption);
    }
    let selectedOption1 = document.getElementById("Select1").options[document.getElementById("Select1").selectedIndex];
    let selectedOption2 = document.getElementById("Select2").options[document.getElementById("Select2").selectedIndex];
    let selectedOption3 = document.getElementById("Select3").options[document.getElementById("Select3").selectedIndex];

    for (let i = 0; i < arrOptions.length; i++) {
        let flag = true;
        for(let j = 0; j < document.getElementById("Select1").options.length; j++){
            if (document.getElementById("Select1").options[j].value === arrOptions[i].value) {
                flag = false;
            }
        }
        if (flag)
            document.getElementById("Select1").insertBefore(arrOptions[i].cloneNode(true), document.getElementById("Select1").options[i]);
    }
    let index = 0;
    while (index < document.getElementById("Select1").length) {
        if (document.getElementById("Select1").options[index].value === selectedOption2.value
            && selectedOption2.value !== "No") {
            document.getElementById("Select1").options[index] = null;
            index = 0;
        }
        if (document.getElementById("Select1").options[index].value === selectedOption3.value
            && selectedOption3.value !== "No") {
            document.getElementById("Select1").options[index] = null;
            index = 0;
        }
        index++;
    }

    for (let i = 0; i < arrOptions.length; i++) {
        let flag = true;
        for(let j = 0; j < document.getElementById("Select2").options.length; j++){
            if (document.getElementById("Select2").options[j].value === arrOptions[i].value)
                flag = false;
        }
        if (flag)
            document.getElementById("Select2").insertBefore(arrOptions[i].cloneNode(true), document.getElementById("Select2").options[i]);

    }
    index = 0
    while (index < document.getElementById("Select2").length) {
        if (document.getElementById("Select2").options[index].value === selectedOption1.value
            && selectedOption1.value !== "No") {
            document.getElementById("Select2").options[index] = null;
            index = 0;
        }
        if (document.getElementById("Select2").options[index].value === selectedOption3.value
            && selectedOption3.value !== "No") {
            document.getElementById("Select2").options[index] = null;
            index = 0;
        }
        index++;
    }

    for (let i = 0; i < arrOptions.length; i++) {
        let flag = true;
        for(let j = 0; j < document.getElementById("Select3").options.length; j++){
            if (document.getElementById("Select3").options[j].value === arrOptions[i].value)
                flag = false;
        }
        if (flag)
            document.getElementById("Select3").insertBefore(arrOptions[i].cloneNode(true), document.getElementById("Select3").options[i]);

    }
    index = 0
    while (index < document.getElementById("Select3").length) {
        if (document.getElementById("Select3").options[index].value === selectedOption1.value
            && selectedOption1.value !== "No") {
            document.getElementById("Select3").options[index] = null;
            index = 0;
        }
        if (document.getElementById("Select3").options[index].value === selectedOption2.value
            && selectedOption2.value !== "No") {
            document.getElementById("Select3").options[index] = null;
            index = 0;
        }
        index++;
    }
}