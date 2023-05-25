let options = {
    No: "Нет",
    WeaponName: "Название",
    Type: "Тип",
    Material: "Материал",
    Damage: "Урон",
    Weight: "Вес",
    Price: "Стоимость"
}

function createFormElements(){
    let table = document.getElementById('table');
    table.innerHTML = newStats.print();

    let strHTML = "";
    for (let i = 1; i <= 3; i++) {
        let sortLevel;
        switch (i){
            case 1:
                sortLevel = `<p>Первый уровень:`;
                break;
            case 2:
                sortLevel = `<p>Второй уровень:`;
                break;
            case 3:
                sortLevel = `<p>Третий уровень:`;
                break;
        }

        strHTML += `<div id = "selectDiv${i}" class = "rowFlex">` + sortLevel;
        strHTML += createSelect(options, i) + "</p>";

        strHTML += `<p>По убыванию?
                <input id = "sortOrder${i}" type="checkbox">
            </p></div>`;
    }

    document.getElementById("sortDiv").innerHTML = strHTML;

    strHTML = `
          <div class="rowFlex">
            <p>Название
                              <input type="text" id = "WeaponNameFilter">
                            </p>
                          </div>
                          <div class="rowFlex">
                            <p>Тип
                                                <select id = "TypeFilter">
                                                  <option value = 'No'>Нет</option>
                                                  <option value = 'Кинжал'>Кинжал</option>
                                                  <option value = 'Меч'>Меч</option>
                                                  <option value = 'Топор'>Топор</option>
                                                  <option value = 'Булава'>Булава</option>
                                                </select>
                            </p>
                          </div>
                          <div class="rowFlex">
                            <p>Материал
                                                <select id = "MaterialFilter">
                                                  <option value = 'No'>Нет</option>
                                                  <option value = 'Железный слиток'>Железный слиток</option>
                                                  <option value = 'Стальной слиток'>Стальной слиток</option>
                                                  <option value = 'Орихалковый слиток'>Орихалковый слиток</option>
                                                  <option value = 'Двемерский металлический слиток'>Двемерский металлический слиток</option>
                                                  <option value = "Очищенный лунный камень">Очищенный лунный камень</option>
                                                  <option value = "Слиток ртутной руды">Слиток ртутной руды</option>
                                                  <option value = "Очищенный малахит">Очищенный малахит</option>
                                                  <option value = "Эбонитовый слиток">Эбонитовый слиток</option>
                                                  <option value = "Сталгрим">Сталгрим</option>
                                                  <option value = "Драконья кость">Драконья кость</option>
                                                  <option value = "Хитин коруса">Хитин коруса</option>
                                                </select>
                            </p>
                          </div>
                          <div class="rowFlex">
                            <p>Урон
                              <input type="number" min="0" id = 'DamageFilter'>
                            </p>
                          </div>
                          <div class="rowFlex">
                            <p>Вес
                              <input type="number" min="0" id = 'WeightFilter'>
                            </p>
                          </div>
                          <div class="rowFlex">
                            <p>Стоимость
                              <input type="number" min="0" id = 'PriceFilter'>
                            </p>
                          </div>
          `;
    document.getElementById('filterDiv').innerHTML = strHTML;
    defaultGraphDraw();
}

function createSelect(object, index){
    return `<select id = "Select${index}" onchange="changeOptions()"> ${createOptions(object)} </select>`;
}
function createOptions(object){
    let result = "";
    for (let key in object)
    {
        result += `<option value = "${key}">${object[key]}</option>`;
    }
    return result;
}