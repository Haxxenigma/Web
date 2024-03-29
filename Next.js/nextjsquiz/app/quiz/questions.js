const questions = [
    {
        question: 'В каком музыкальном стиле можно классифицировать творчество известного русского композитора Сергея Рахманинова?',
        answers: [
            'A. Романтизм',
            'B. Неоклассицизм',
            'C. Экспрессионизм',
            'D. Символизм'
        ],
        correct: 3
    },
    {
        question: 'Где расположена статуя Христа-Искупителя, которая возвышается на горе Корковаду?',
        answers: [
            'A. Рио-де-Жанейро',
            'B. Иерусалим',
            'C. Константинополь',
            'D. Сан-Сальвадор'
        ],
        correct: 0
    },
    {
        question: 'В каком месте расположена та самая башня, известная своим наклоном?',
        answers: [
            'A. Рим',
            'B. Венеция',
            'C. Пиза',
            'D. Флоренция'
        ],
        correct: 2
    },
    {
        question: 'Кто был автором «Капитала»?',
        answers: [
            'A. Карл Маркс',
            'B. Фридрих Ницше',
            'C. Артур Шопенгауэр',
            'D. Платон'
        ],
        correct: 0
    },
    {
        question: 'В какой книге последней фразой является «Оставь надежду, всяк сюда входящий»?',
        answers: [
            'A. «Гаргантюа и Пантагрюэль»',
            'B. «Ромео и Джульетта»',
            'C. «Гамлет»',
            'D. «Божественная комедия»'
        ],
        correct: 3
    },
    {
        question: 'Какое направление искусствоведения занимается изучением личности художника и влиянием различных форм искусства на человека?',
        answers: [
            'A. Психология искусства',
            'B. Философия искусства',
            'C. Социология искусства',
            'D. Герменевтика искусства'
        ],
        correct: 0
    },
    {
        question: 'Что такое «Код Бушидо»?',
        answers: [
            'A. Набор правил для боевых искусств',
            'B. Этические принципы и нормы для самураев',
            'C. Система медицинской этики',
            'D. Религиозные обряды и ритуалы'
        ],
        correct: 1
    },
    {
        question: 'Какое изображение зафиксировано на старейшей сохранившейся фотографии?',
        answers: [
            'A. Вид из окна',
            'B. Собака',
            'C. Селфи',
            'D. Тартановая лента'
        ],
        correct: 0
    },
    {
        question: 'Какой термин описывает концепцию морального и этического поведения в исламе?',
        answers: [
            'A. Легализм',
            'B. Абсолютизм',
            'C. Феодализм',
            'D. Шариат'
        ],
        correct: 3
    },
    {
        question: 'Какой народ практикует традицию «медитации» для духовного развития?',
        answers: [
            'A. Индейцы Амазонки',
            'B. Греки',
            'C. Тибетцы',
            'D. Майя'
        ],
        correct: 2
    },
    {
        question: 'Какой термин используется для описания техники изготовления керамических изделий, при которой обожженная глина покрывается расписной глазурью?',
        answers: [
            'A. Фаянс',
            'B. Майолика',
            'C. Терракота',
            'D. Порцелян'
        ],
        correct: 1
    },
    {
        question: 'Кто является основателем буддизма?',
        answers: [
            'A. Сиддхартха Гаутама',
            'B. Иисус Христос',
            'C. Рам Мохан Рой',
            'D. Лао-цзы'
        ],
        correct: 0
    },
    {
        question: 'Какие из перечисленных народов отмечают в «День мертвых» традицию чтения своих усопших предков?',
        answers: [
            'A. Индейцы Амазонки',
            'B. Китайцы',
            'C. Мексиканцы',
            'D. Греки'
        ],
        correct: 2
    },
    {
        question: 'Какая религия является самой распространенной в мире?',
        answers: [
            'A. Христианство',
            'B. Иудаизм',
            'C. Буддизм',
            'D. Ислам'
        ],
        correct: 0
    },
    {
        question: 'Какая этическая концепция подчеркивает важность взаимопомощи и солидарности в обществе?',
        answers: [
            'A. Кодекс Рыцаря',
            'B. Анархизм',
            'C. Хедонизм',
            'D. Конфуцианство'
        ],
        correct: 3
    },
    {
        question: 'Какая из следующих религий практикует веру в многих богов?',
        answers: [
            'A. Даосизм',
            'B. Иудаизм',
            'C. Синтоизм',
            'D. Зороастризм'
        ],
        correct: 3
    },
    {
        question: 'Какой философ формулировал категорический императив в этике?',
        answers: [
            'A. Иммануил Кант',
            'B. Фридрих Ницше',
            'C. Карл Маркс',
            'D. Давид Юм'
        ],
        correct: 0
    },
    {
        question: 'Какой термин описывает иудейское этическое наставление, содержащее Десять Заповедей?',
        answers: [
            'A. Библия',
            'B. Талмуд',
            'C. Каббала',
            'D. Тора'
        ],
        correct: 3
    },
    {
        question: 'Кто известен как «отец современной физики» и разработал «закон взаимосвязи массы и энергии»?',
        answers: [
            'A. Исаак Ньютон',
            'B. Нильс Бор',
            'C. Стивен Хокинг',
            'D. Альберт Эйнштейн'
        ],
        correct: 3
    },
    {
        question: 'Кто написал философское сочинение «Искусство войны», изучаемое как искусство управления?',
        answers: [
            'A. Сунь Цзы',
            'B. Гомер',
            'C. Хомер Симпсон',
            'D. Конфуций'
        ],
        correct: 0
    },
    {
        question: 'Какая из следующих религий имеет священное писание под названием «Бхагавад-гита»?',
        answers: [
            'A. Иудаизм',
            'B. Христианство',
            'C. Буддизм',
            'D. Индуизм'
        ],
        correct: 3
    },
    {
        question: 'Какая религия практикует священный обряд «крещение»?',
        answers: [
            'A. Христианство',
            'B. Иудаизм',
            'C. Буддизм',
            'D. Ислам'
        ],
        correct: 0
    },
    {
        question: 'Кто был советником Тауке хана и одним из соавторов свода законов «Жеті жарғы»?',
        answers: [
            'A. Амангельды Иманов',
            'B. Айтеке би',
            'C. Каныш Сатпаев',
            'D. Курмангазы Сагырбайулы'
        ],
        correct: 1
    },
    {
        question: 'Какое великое имя из мира музыки открыло новые горизонты в композиции и считается одним из самых влиятельных композиторов всех времен?',
        answers: [
            'A. Вольфганг Амадей Моцарт',
            'B. Людвиг ван Бетховен',
            'C. Йоханн Себастьян Бах',
            'D. Густав Малер'
        ],
        correct: 1
    },
    {
        question: 'Какой философ предложил идеи о «социальном договоре» и «естественных правах»?',
        answers: [
            'A. Карл Маркс',
            'B. Сёрен Кьеркегор',
            'C. Жан-Жак Руссо',
            'D. Фридрих Ницше'
        ],
        correct: 2
    },
    {
        question: 'Какое здание в Нью-Йорке служило самым высоким в мире с 1931 по 1970 год?',
        answers: [
            'A. Биг-Бен (Башня Елизаветы)',
            'B. Всемирный торговый центр (Башни-близнецы)',
            'C. Эмпайр-стейт-билдинг',
            'D. Гранд-Каньон'
        ],
        correct: 2
    },
    {
        question: 'Автор книги «Божественная комедия»',
        answers: [
            'A. Франсуа Рабле',
            'B. Данте Алигьери',
            'C. Леонардо да Винчи',
            'D. Уильям Шекспир'
        ],
        correct: 1
    },
    {
        question: 'Какое великое имя в мире литературы создало «Анну Каренину»?',
        answers: [
            'A. Лев Толстой',
            'B. Уильям Шекспир',
            'C. Александр Пушкин',
            'D. Братья Гримм'
        ],
        correct: 0
    },
    {
        question: 'Какой город является священным для иудаизма?',
        answers: [
            'A. Мекка',
            'B. Иерусалим',
            'C. Ватикан',
            'D. Бенарес'
        ],
        correct: 1
    },
    {
        question: 'Какое из нижеперечисленных племен в Африке известно своими длинными шеями и использованием колье?',
        answers: [
            'A. Маори',
            'B. Индейцы племени Чероки',
            'C. Племя Масаи',
            'D. Индейцы племени Амазонки'
        ],
        correct: 2
    },
    {
        question: 'Какому ученому удалось получить Нобелевскую премию дважды?',
        answers: [
            'A. Мария Склодовская-Кюри',
            'B. Альберт Эйнштейн',
            'C. Никола Тесла',
            'D. Чарльз Дарвин'
        ],
        correct: 0
    },
    {
        question: 'Кто создал знаменитую скульптуру «Давид»?',
        answers: [
            'A. Леонардо да Винчи',
            'B. Рафаэль',
            'C. Микеланджело',
            'D. Винченцо Фоппа'
        ],
        correct: 2
    },
    {
        question: 'Какой ученый открыл закон сохранения массы в химии?',
        answers: [
            'A. Мария Кюри',
            'B. Альберт Эйнштейн',
            'C. Нильс Бор',
            'D. Михаил Ломоносов'
        ],
        correct: 3
    },
    {
        question: 'Какой художник создал знаменитую картину «Звёздная ночь»?',
        answers: [
            'A. Пабло Пикассо',
            'B. Винсент Ван Гог',
            'C. Леонардо да Винчи',
            'D. Эдвард Мунк'
        ],
        correct: 1
    },
];

export default questions;