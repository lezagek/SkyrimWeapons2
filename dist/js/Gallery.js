const allImages = ["img/Кинжалы/Драконий_костяной_кинжал.webp", "img/Кинжалы/Жертвенный_клинок.webp", "img/Кинжалы/Кинжал_драконьего_жреца.webp", "img/Кинжалы/Клинок_Горя.webp", "img/Кинжалы/Крапивник.webp", "img/Кинжалы/Небесный_стальной_кинжал.webp", "img/Кинжалы/Орочий_кинжал.webp",
    "img/Мечи/Бич_драконов.webp", "img/Мечи/Даэдрический_меч.webp", "img/Мечи/Древний_нордский_меч.webp", "img/Мечи/Железный_меч.webp", "img/Мечи/Меч-душегуб.webp", "img/Мечи/Охладитель.webp", "img/Мечи/Скимитар.webp", "img/Мечи/Сталгримовый_меч.webp", "img/Мечи/Эбонитовый_меч.webp", "img/Мечи/Эдуж.webp",
    "img/Топоры/Древний_нордский_боевой_топор.webp", "img/Топоры/Окин.webp", "img/Топоры/Рунный_топор_Стражи_Рассвета.webp", "img/Топоры/Стеклянный_боевой_топор.webp", "img/Топоры/Топор_браконьера.webp", "img/Топоры/Топор_Изгоев.webp", "img/Топоры/Хороший_фалмерский_боевой_топор.webp", "img/Топоры/Эбонитовый_боевой_топор.webp", "img/Топоры/Эльфийский_боевой_топор.webp",
    "img/Прочее/Бич_Хоркеров.webp", "img/Прочее/Булава_Молага_Бала.webp", "img/Прочее/Булава_прелата.webp", "img/Прочее/Двемерская_булава.webp", "img/Прочее/Древняя_нордская_кирка.webp", "img/Прочее/Зазубренная_кирка.webp", "img/Прочее/Сталгримовая_булава.webp"]

createGallery = () => {
    let row = 6;
    let column = 6;

    let images = document.getElementsByName('imageRow');
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            images[i].innerHTML += `
            <div class="imagesFlexItem">
                <a href = ${allImages[column * i + j]}
                   data-fancybox = "gallery">
                   <img src=${allImages[column * i + j]} />
                </a>
            </div>`;
        }
    };
};