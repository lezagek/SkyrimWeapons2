let marginX = 50;
let marginY = 100;
let height = 400;
let width = 900;

let weaponData = [];

//Копируем все данные об оружии
for (let i = 0; i < weaponName.length; i++){
    let object = {
        WeaponName: weaponName[i],
        Type: type[i],
        Material: material[i],
        Damage: damage[i],
        Weight: weight[i],
        Price: price[i]
    }
    weaponData.push(object);
}

//Кнопка "Скрыть таблицу"
let hideButton = document.getElementById('hideButton');
hideButton.onclick = function() {
    if (this.value === "Скрыть таблицу"){
        this.value = "Показать таблицу";
        d3.select("div.tableBlock")
            .select("table")
            .selectAll("tr")
            .style("display", "none");
    } else {
        this.value = "Скрыть таблицу";
        d3.select("div.tableBlock")
            .select("table")
            .selectAll("tr")
            .style("display", "");
    }
};

getArrGraph = (arrObject, fieldX, fieldY) => {
    let groupObj = d3.group(arrObject, d => d[fieldX]); //Группируем по параметру X
    let arrGroup = []; //Массив значений

    for(let entry of groupObj) {
        //Находим мин и макс
        let minMax = d3.extent(entry[1].map(d => d[fieldY]));
        arrGroup.push({
            //Подпись - то, по чём сгруппировали
            "labelX": entry[0],
            "valueMin": minMax[0],
            "valueMax": minMax[1]
        });
    }

    return arrGroup;
}

//Функция рисовки графика
function drawGraph(){
    if (!document.getElementsByName("oy")[0].checked &&
        !document.getElementsByName("oy")[1].checked){
        alert("Выберите результат");
        return;
    }

    let selectedX;
    for (let i in document.getElementsByName("ox")){
        if (document.getElementsByName("ox")[i].checked) {
            selectedX = document.getElementsByName("ox")[i].value;
            break;
        }
    }
    let selectedY = "Price";

    //Получаем массив значений
    let arrGraph = getArrGraph(weaponData, selectedX, selectedY);
    //Область, где располагается график
    let svg = d3.select("svg")
        .attr("height", height)
        .attr("width", width);

    //Всё очищаем
    svg.selectAll("*").remove();

    //Вычисляем мин и макс
    let min; let max;
    if (document.getElementsByName("oy")[0].checked &&
        !document.getElementsByName("oy")[1].checked){
        min = d3.min(arrGraph.map(d => d.valueMax)) * 0.95;
        max = d3.max(arrGraph.map(d => d.valueMax)) * 1.05;
    } else if (document.getElementsByName("oy")[1].checked &&
        !document.getElementsByName("oy")[0].checked){
        min = d3.min(arrGraph.map(d => d.valueMin)) * 0.95;
        max = d3.max(arrGraph.map(d => d.valueMin)) * 1.05;
    } else {
        min = d3.min(arrGraph.map(d => d.valueMin)) * 0.95;
        max = d3.max(arrGraph.map(d => d.valueMax)) * 1.05;
    }

    //Размеры осей
    let xAxisLen = width - 2 * marginX;
    let yAxisLen = height - 2 * marginY;

    //Функция интерполяции значений на оси
    let scaleY = d3.scaleLinear()
        .domain([min, max])
        .range([yAxisLen, 0]);

    let scaleX;
    //Для точечной
    if (document.getElementsByName("type")[0].checked) {
        //Отображение на оси текстовых значений вместо чисел
        scaleX = d3.scaleBand()
            .domain(arrGraph.map(function(d) {
                    return d.labelX;
                })
            )
            .range([0, xAxisLen]);
    }
    //Для гистограммы
    if (document.getElementsByName("type")[1].checked){
        //Отображение на оси текстовых значений вместо чисел
        scaleX = d3.scaleBand()
            .domain(arrGraph.map(function(d) {
                return d.labelX;
            }))
            .range([0, xAxisLen])
            .padding(0.2);
    }

    //Создание осей
    let axisX = d3.axisBottom(scaleX);  // горизонтальная
    let axisY = d3.axisLeft(scaleY); // вертикальная

    //Отрисовка осей в SVG-элементе (сгруппированы)
    svg.append("g")
        //Ось X
        .attr("transform", `translate(${marginX}, ${height - marginY})`)
        .call(axisX)
        .attr("class", "x-axis")
        //Работа со стилем текста
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".20em")
        //Поворот текста на 45 градусов
        .attr("transform", function (d) {
            return "rotate(-45)";
        });

    svg.append("g")
        //Ось Y
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .attr("class", "y-axis")
        .call(axisY);

    //Вертикальные полоски на фоне
    d3.selectAll("g.x-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", - (yAxisLen));

    //Горизонтальные полоски на фоне
    d3.selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", xAxisLen)
        .attr("y2", 0);

    //Строим график или гистрограмму по максимальной цене
    if (document.getElementsByName("oy")[0].checked) {
        if (document.getElementsByName("type")[0].checked)
            drawDottedGraph(svg, arrGraph, "labelX", scaleX, "valueMax", scaleY, "white");
        if (document.getElementsByName("type")[1].checked)
            drawHistogram(svg, arrGraph, "labelX", scaleX, "valueMax", scaleY, "white")
    }
    //Строим график или гистрограмму по минимальной цене
    if (document.getElementsByName("oy")[1].checked) {
        if (document.getElementsByName("type")[0].checked)
            drawDottedGraph(svg, arrGraph, "labelX", scaleX, "valueMin", scaleY, "gray");
        if (document.getElementsByName("type")[1].checked)
            drawHistogram(svg, arrGraph, "labelX", scaleX, "valueMin", scaleY, "gray")
    }
}

//Точечный график
function drawDottedGraph(svg, arrGraph, x, scaleX, y, scaleY, color){
    svg.selectAll(".dot")
        .data(arrGraph)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", function (d) {
            return scaleX(d[x]);
        })
        .attr("cy", function (d) {
            return scaleY(d[y]);
        })
        .attr("transform", `translate(${marginX + width/(2.2 * arrGraph.length)}, ${marginY})`)
        .style("fill", color)
}

//Гистограмма
function drawHistogram(svg, arrGraph, x, scaleX, y, scaleY, color){
    svg.append("g")
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .selectAll(".rect")
        .data(arrGraph)
        .enter()
        .append("rect")
        .attr("x", function(d) { return scaleX(d[x]); })
        .attr("width", scaleX.bandwidth())
        .attr("y", function(d) { return scaleY(d[y]); })
        .attr("height", function(d) { return height - 2 * marginY - scaleY(d[y]); })
        .attr("fill", color);
}

//Нажатие кнопки "Построить"
let graphButton = document.getElementById("graphButton")
graphButton.onclick = function (){
    drawGraph();
}

//График(гистограмма) по умолчанию
function defaultGraphDraw(){
    //Стандартные параметры
    let arrGraph = getArrGraph(weaponData, "Material", "Price")
    //Область
    let svg = d3.select("svg")
        .attr("height", height)
        .attr("width", width);

    //Мин и макс
    let min = d3.min(arrGraph.map(d => d.valueMin)) * 0.95;
    let max = d3.max(arrGraph.map(d => d.valueMax)) * 1.05;
    //Размеры осей
    let xAxisLen = width - 2 * marginX;
    let yAxisLen = height - 2 * marginY;

    let scaleY = d3.scaleLinear()
        .domain([min, max])
        .range([yAxisLen, 0]);

    //Подпись у X текстом, а не цифрами
    let scaleX = d3.scaleBand()
        .domain(arrGraph.map(function(d) {
            return d.labelX;
        }))
        .range([0, xAxisLen])
        .padding(0.2);

    //Создание осей
    let axisX = d3.axisBottom(scaleX);
    let axisY = d3.axisLeft(scaleY);

    //Отрисовка осей в SVG-элементе (сгруппированы)
    svg.append("g")
        //Ось X
        .attr("transform", `translate(${marginX}, ${height - marginY})`)
        .call(axisX)
        .attr("class", "x-axis")
        //Работа со стилем текста
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".20em")
        //Поворот текста на 45 градусов
        .attr("transform", function (d) {
            return "rotate(-45)";
        });

    svg.append("g")
        //Ось Y
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .attr("class", "y-axis")
        .call(axisY);

    //Вертикальные полоски на фоне
    d3.selectAll("g.x-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", - (yAxisLen));

    //Горизонтальные полоски на фоне
    d3.selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", xAxisLen)
        .attr("y2", 0);

    drawHistogram(svg, arrGraph, "labelX", scaleX, "valueMax", scaleY, "white");
    drawHistogram(svg, arrGraph, "labelX", scaleX, "valueMin", scaleY, "gray")
}
