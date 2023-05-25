const weaponName = ["Железный кинжал", "Стальной кинжал", "Орочий кинжал", "Двемерский кинжал", "Эльфийский кинжал", "Нордский кинжал", "Стеклянный кинжал", "Эбонитовый кинжал", "Сталгримовый кинжал", "Даэдрический кинжал", "Драконий костяной кинжал", "Железный меч", "Стальной меч", "Орочий меч", "Двемерский меч", "Эльфийский меч", "Нордский меч", "Стеклянный меч", "Эбонитовый меч", "Сталгримовый меч", "Даэдрический меч", "Драконий костяной меч", "Железный боевой топор", "Стальной боевой топор", "Орочий боевой топор", "Двемерский боевой топор", "Эльфийский боевой топор", "Нордский боевой топор", "Стеклянный боевой топор", "Даэдрический боевой топор", "Эбонитовый боевой топор", "Сталгримовый боевой топор", "Драконий костяной боевой топор", "Железная булава", "Стальная булава", "Орочья булава", "Двемерская булава", "Эльфийская булава", "Нордская булава", "Стеклянная булава", "Даэдрическая булава", "Эбонитовая булава", "Сталгримовая булава", "Драконья костяная булава", "Заточка", "Кинжал драконьего жреца", "Небесный стальной кинжал", "Жертвенный клинок", "Древний нордский меч", "Имперский меч", "Фалмерский меч"];
const type = ["Кинжал", "Кинжал", "Кинжал", "Кинжал", "Кинжал", "Кинжал", "Кинжал", "Кинжал", "Кинжал", "Кинжал", "Кинжал", "Меч", "Меч", "Меч", "Меч", "Меч", "Меч", "Меч", "Меч", "Меч", "Меч", "Меч", "Топор", "Топор", "Топор", "Топор", "Топор", "Топор", "Топор", "Топор", "Топор", "Топор", "Топор", "Булава", "Булава", "Булава", "Булава", "Булава", "Булава", "Булава", "Булава", "Булава", "Булава", "Булава", "Кинжал", "Кинжал", "Кинжал", "Кинжал", "Меч", "Меч", "Меч"];
const material = ["Железный слиток", "Стальной слиток", "Орихалковый слиток", "Двемерский металлический слиток", "Очищенный лунный камень", "Слиток ртутной руды", "Очищенный малахит", "Эбонитовый слиток", "Сталгрим", "Эбонитовый слиток", "Драконья кость", "Железный слиток", "Стальной слиток", "Орихалковый слиток", "Двемерский металлический слиток", "Очищенный лунный камень", "Слиток ртутной руды", "Очищенный малахит", "Эбонитовый слиток", "Сталгрим", "Эбонитовый слиток", "Драконья кость", "Железный слиток", "Стальной слиток", "Орихалковый слиток", "Двемерский металлический слиток", "Очищенный лунный камень", "Слиток ртутной руды", "Очищенный малахит", "Эбонитовый слиток", "Эбонитовый слиток", "Сталгрим", "Драконья кость", "Железный слиток", "Стальной слиток", "Орихалковый слиток", "Двемерский металлический слиток", "Очищенный лунный камень", "Слиток ртутной руды", "Очищенный малахит", "Эбонитовый слиток", "Эбонитовый слиток", "Сталгрим", "Драконья кость", "Нет материала", "Нет материала", "Стальной слиток", "Эбонитовый слиток", "Стальной слиток", "Стальной слиток", "Хитин коруса"];
const damage = [4, 5, 6, 7, 8, 8, 9, 10, 10, 11, 12, 7, 8, 9, 11, 11, 11, 12, 13, 13, 14, 15, 8, 9, 10, 11, 13, 12, 13, 15, 15, 15, 16, 9, 10, 11, 12, 13, 13, 14, 16, 16, 16, 17, 5, 6, 8, 10, 8, 8, 10];
const weight = [2, 2, 3, 3, 4, 3, 4, 5, 4, 6, 6, 9, 10, 11, 13, 13, 12, 14, 15, 14, 16, 19, 11, 12, 13, 14, 15, 14, 16, 18, 17, 16, 21, 13, 14, 15, 16, 17, 16, 18, 20, 19, 18, 22, 2, 5, 2, 4, 12, 10, 18];
const price = [10, 18, 30, 55, 95, 115, 165, 290, 395, 500, 600, 25, 45, 75, 135, 235, 290, 410, 720, 985, 1250, 1500, 30, 55, 90, 165, 280, 350, 490, 1500, 865, 1180, 1700, 35, 65, 105, 190, 330, 410, 575, 1750, 1000, 1375, 2000, 50, 90, 250, 144, 130, 230, 67];
const columnName = ["Название", "Тип", "Материал", "Урон", "Вес", "Стоимость"];

let stats = {
    WeaponName: Array.from(weaponName),
    Type: Array.from(type),
    Material: Array.from(material),
    Damage: Array.from(damage),
    Weight: Array.from(weight),
    Price: Array.from(price),

    getAllKey: function (){
        let arrKey = [];
        for(let key in this) {
            if (typeof(this[key]) !== 'function') {
                arrKey.push(key)
            }
        }
        return arrKey;
    },

    print: function(){
        let html = '<table><tr>';
        let arrKey = this.getAllKey();
        for(let key in columnName) {
            html += `<th>${ columnName[key] }</th>`;
        }
        html += '</tr>';
        for(let i = 0; i < this[arrKey[0]].length; i++) {
            html += '<tr>';
            for(let key in arrKey) {
                html += `<td>${ this[arrKey[key]][i] }</td>`;
            }
            html += '</tr>';
        }
        return html + '</table>';
    }
};

let newStats = {
    __proto__: stats,
    resetData: function() {
        this.WeaponName = Array.from(weaponName);
        this.Type = Array.from(type);
        this.Material = Array.from(material);
        this.Damage = Array.from(damage);
        this.Weight = Array.from(weight);
        this.Price = Array.from(price);
    }
};

function buttonReset(){
    newStats.resetData();
    let table = document.getElementById('table');
    table.innerHTML = newStats.print();
}