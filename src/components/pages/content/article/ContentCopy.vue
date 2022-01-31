<template lang="pug">
    include ../../../../tools/mixins.pug
    div(id="main")
        +b.SECTION.article__.--page
            +e.main
                grid-component
                +e.date--page 19 августа
                +e.title--page Пневмозахват для промышленных производств
                +e.tags--page
                    +e.A(href="#").tag--page.tag--small.--gray Кейс
                    +e.A(href="#").tag--page.tag--small.--gray Моделирование
                    +e.A(href="#").tag--page.tag--small.--gray ЭПС
            +e.photo--page
                img(src="/img/services/engineering--desktop.jpg")
            +e.body--page
                +e.text--page.text__.--article-page
                    p Они рассчитаны на работу зимой при температурах до -40 ° C и способны справляться с 800 мм снега на трассе. У них есть соединения с двумя рядами трапов, большие снегоочистители, напольное и настенное отопление, специально приспособленная изоляция и тележки, предназначенные для минимизации замерзания. Эти изменения также помогают минимизировать последствия столкновений с дикой природой.
                    h3 Для шведских условий алюминиевый корпус ЭПС будет:
                    ul
                        li Шириной 2 920 мм
                        li Высотой 4 700 мм
                        li На 120 мм шире и на 100 мм выше, чем предыдущие двухуровневые ЭПС Stadler
                    +e.image
                        img(src="https://placeimg.com/600/400/tech")
                        p Double-Decker-Electrical-Multiple-Unit
                    p Интерьер был разработан для ежедневных поездок с временем нахождения в пути от 1 часа до 2 часов, с регулируемыми стульями со столами, розетками и wi-fi. В каждом корпусе предусмотрено 333 фиксированных места, с 24 раскладными сиденьями, чтобы обеспечить место для большого багажа и велосипедов. Один из трех туалетов доступен для пассажиров с ограниченной подвижностью.
                    p «Поезд хорошо зарекомендовал себя в скандинавских условиях, с отличным послужным списком из Норвегии, Финляндии и других стран с длинной зимой», — сказал Питер Дженельтен, исполнительный вице-президент по маркетингу и продажам в Stadler. «Поезд был дополнительно адаптирован для Швеции в сотрудничестве со шведскими дизайнерами и имеет высокие стандарты функциональности, комфорта и долговечности».
                    p Пневмозахват ПЗ-4-600 предназначен для перемещения различных предметов массой до 600 кг. Пневмозахват подвешивается на крюк любого грузоподъемного механизма грузоподъемностью не менее 1 тонны. Гибкий шланг подключается к внешней системе воздухоподачи с давлением до 1 МПа (10 бар).
                    +e.table.table__
                        +e.title Технические характеристики
                        +e.body
                            +e.row
                                +e.cell Система управления
                                +e.cell--big Пневматическая, вручную пневмоджойстиками
                            +e.row
                                +e.cell Давление в пневмосистеме, max МПА (бар)
                                +e.cell 1(10)
                            +e.row
                                +e.cell Рабочая зона захвата:
                                +e.row
                                    +e.row
                                        +e.cell Минимальная, мм
                                        +e.cell 750х750
                                    +e.row
                                        +e.cell Максимальная, мм
                                        +e.cell 1200х1200
                            +e.row
                                +e.cell Грузоподъемность, кг
                                +e.cell 600
                            +e.row
                                +e.cell Сила сжатия (при 10 бар), кг:
                                +e.row
                                    +e.row
                                        +e.cell Верхними прижимами
                                        +e.cell 600
                                    +e.row
                                        +e.cell Нижними прижимами
                                        +e.cell 1200
                            +e.row
                                +e.cell Ход штока пневмоцилиндров, мм
                                +e.cell 200
                            +e.row
                                +e.cell Масса, кг
                                +e.cell 300
                    +e.slider.swiper-container(v-swiper:photos="swiper.photos")
                        +e.BUTTON(type="#").slider-nav--prev.button.--circle.--circle-prev
                            +b.ui-arrow--no-span.--dark
                                span
                                    span
                                    span
                                        span
                                        span
                        +e.BUTTON(type="#").slider-nav--next.button.--circle
                            +b.ui-arrow--no-span.--dark
                                span
                                    span
                                    span
                                        span
                                        span
                        .swiper-wrapper
                            +e.photo--slider.swiper-slide
                                +e.img-wrapper
                                    img(src="/img/services/tok--desktop.jpg")
                                p Описание фотографии
                            +e.photo--slider.swiper-slide
                                +e.img-wrapper
                                    img(class="swiper-lazy" data-src="/img/services/engineering--desktop.jpg")
                                .swiper-lazy-preloader
                                p Описание фотографии
                            +e.photo--slider.swiper-slide
                                +e.img-wrapper
                                    img(class="swiper-lazy" data-src="/img/services/modeling--desktop.jpg")
                                .swiper-lazy-preloader
                                p Описание фотографии
                            +e.photo--slider.swiper-slide
                                +e.img-wrapper
                                    img(class="swiper-lazy" data-src="/img/main-slider/1.jpg")
                                .swiper-lazy-preloader
                                p Описание фотографии
                            +e.photo--slider.swiper-slide
                                +e.img-wrapper
                                    img(class="swiper-lazy" data-src="/img/main-slider/2.jpg")
                                .swiper-lazy-preloader
                                p Описание фотографии
                            +e.photo--slider.swiper-slide
                                +e.img-wrapper
                                    img(class="swiper-lazy" data-src="/img/main-slider/3.jpg")
                                .swiper-lazy-preloader
                                p Описание фотографии
                    p Область применения широкая. В частности, можно использовать для погрузки кирпичей или тротуарной плитки.
                    +e.VIDEO-COMPONENT.video(
                    :source="video.source"
                    ).content
                    +e.VIDEO-COMPONENT(
                    :source="video.source"
                    ).content
                        p Тестирование пневмозахвата на нашем производстве.
                    p Конструкция пневмозахвата состоит из особопрочного металлокаркаса. Можем покрыть индивидуально любой краской на ваш вкус. Дополнительно также возможна доработка существующего прототипа до необходимых вам параметров.
        order-block-component(:content="orderBlock")
        blog-latest-component(class="blog-latest--no-grid blog-latest--more-offset")
</template>

<script>
    import constants from '../../../../../content/constants.json';
    import GridDark from '@/components/blanks/GridDark.vue';
    import Grid from '@/components/blanks/Grid.vue';
    import BlogLatest from '@/components/blanks/BlogLatest.vue';
    import OrderBlock from '@/components/blanks/OrderBlock.vue';
    import Video from '@/components/blanks/Video.vue';

    export default {
        data(){
            let language = this.$router.currentRoute.meta.language,
                obj = {
                    swiper:{
                        photos:{
                            loop: true,

                            centeredSlides: true,
                            navigation: {
                                nextEl: '.text__slider-nav--next',
                                prevEl: '.text__slider-nav--prev',
                            },
                            lazy: {
                                loadPrevNext: true,
                                preloadImages: true,

                            },
                            breakpoints: {
                                599: {
                                    slidesPerView: 1.14,
                                },
                                1199: {
                                    slidesPerView: 1.4,
                                },
                                9999: {
                                    slidesPerView: 2,
                                }
                            }
                        }
                    },
                    isMuted: true,

                    orderBlock: {
                        form: 'recall',
                        title: 'Хотите такой же пневмозахват?',
                        description: '<p>Наша команда производит нестандратное оборудование на заказ и поставляет в любую точку мира. Для того, чтобы обсудить условия сотрудничества, наберите нам по телефону +7 495 544-71-31 или оставьте заявку и мы перезвоним вам в ближайшее время.</p>'
                    }
                };
            return obj;
        },
        mounted(){

        },
        methods: {
            startVideo(){
                this.isMuted = false;
                this.$refs.video.play();
            }
        },
        components:{
            'video-component': Video,
            'grid-dark-component': GridDark,
            'grid-component': Grid,
            'blog-latest-component': BlogLatest,
            'order-block-component': OrderBlock
        }
    }
</script>