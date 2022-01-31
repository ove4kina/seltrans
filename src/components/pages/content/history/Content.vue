<template lang="pug">
    include ../../../../tools/mixins.pug
    div#main
        admin-panel-component(v-show="loginIn" @clicked="onAdminPanelClick")
        +b.history(ref="history")
            +e.H1.title.title--big.--underlined.--dark._animated--trf(
                    :class="{'editable-text': loginIn}"
                    @click="clickTextField($event,content.title,'title','textJson')"
                    @input="editTextJson($event,content.title,'title',70)"
                ) {{ content.title }}
            +e.timeline(
                ref="timeline"
                :class="{'fixed': animations.timeLine.isFixed, 'active': animations.timeLine.active}"
            )
                +e.scroller(ref="scroller" :class="['active-' + animations.timeLine.activeStage]")
                    +e.time.active 1992
                    +e.time 1994
                    +e.time 1995
                    +e.time 1998
                    +e.time--big 2001-2002
                    +e.time--big 2002
                    +e.time--big 2002-2004
                    +e.time--big 2005
                    <!--+e.time&#45;&#45;big 2006-->
                    +e.time--big 2006-2010
                    +e.time 2011
                    +e.time 2013
                    +e.time 2014
                    +e.time 2015
                    +e.time 2016
                    +e.time 2017
            +e.blur
            +e.body(ref="periods")
                +e.period--line
                    +e.text--line.text--history._animated--trf
                        h3._period(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[1992].title,'1992.title','textJson')"
                            @input="editTextJson($event,content[1992].title,'1992.title',70)"
                        ) {{ content[1992].title }}
                        div(v-html="content[1992].text" :class="{'editable-html': loginIn}" @click="clickTextField($event,content[1992].text,'1992.text','htmlJson')" @input="editHtmlJson($event,content[1992].text,'1992.text')")
                    +e.media--line.--period-1
                        +e.img._animated--trf
                            +e.image-wrapper--1
                                img(src="/img/history/1.jpg" alt="")
                            p(
                                :class="{'editable-text': loginIn}"
                                @click="clickTextField($event,content[1992].image,'1992.image','textJson')"
                                @input="editTextJson($event,content[1992].image,'1992.image')"
                            ) {{ content[1992].image }}
                +e.period._animated--border
                    +e.text--line.--line-desktop.text--history._animated--trf
                        h3._period(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[1994].title,'1994.title','textJson')"
                            @input="editTextJson($event,content[1994].title,'1994.title',70)"
                        ) {{ content[1994].title }}
                        div(v-html="content[1994].text" :class="{'editable-html': loginIn}" @click="clickTextField($event,content[1994].text,'1994.text','htmlJson')" @input="editHtmlJson($event,content[1994].text,'1994.text')")
                    +e.media--line.--line-desktop
                        +e.img--small.--shadow.--padding-30._animated--trf
                            +e.image-wrapper--2
                                img(src="/img/history/2.jpg" alt="")
                +e.period._animated--border
                    +e.text.text--history._animated--trf
                        h3._period(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[1995].title,'1995.title','textJson')"
                            @input="editTextJson($event,content[1995].title,'1995.title',70)"
                        ) {{ content[1995].title }}
                        div(v-html="content[1995].text" :class="{'editable-html': loginIn}" @click="clickTextField($event,content[1995].text,'1995.text','htmlJson')" @input="editHtmlJson($event,content[1995].text,'1995.text')")
                    +e.media
                        +e.img._animated--trf
                            +e.image-wrapper--3
                                img(src="/img/history/3.jpg" alt="")
                            p(
                                :class="{'editable-text': loginIn}"
                                @click="clickTextField($event,content[1995].image,'1995.image','textJson')"
                                @input="editTextJson($event,content[1995].image,'1995.image')"
                            ) {{ content[1995].image }}
                +e.period._animated--border
                    +e.text.text--history._animated--trf
                        h3._period(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[1998].title,'1998.title','textJson')"
                            @input="editTextJson($event,content[1998].title,'1998.title',70)"
                        ) {{ content[1998].title }}
                        div(v-html="content[1998].text" :class="{'editable-html': loginIn}" @click="clickTextField($event,content[1998].text,'1998.text','htmlJson')" @input="editHtmlJson($event,content[1998].text,'1998.text')")
                    +e.media
                        +e.img._animated--trf
                            +e.image-wrapper--4
                                img(src="/img/history/4.jpg" alt="")
                            p(
                                :class="{'editable-text': loginIn}"
                                @click="clickTextField($event,content[1998].images[0].text,'content.1998.images.0.text','textJson')"
                                @input="editTextJson($event,content[1998].images[0].text,'content.1998.images.0.text')"
                            ) {{ content[1998].images[0].text }}
                        <!--+e.img&#45;&#45;hide-mobile.&#45;&#45;half._animated&#45;&#45;trf-->
                            <!--+e.image-wrapper&#45;&#45;5-->
                                <!--img(src="/img/history/5.jpg" alt="")-->
                            <!--p(-->
                                <!--:class="{'editable-text': loginIn}"-->
                                <!--@click="clickTextField($event,content[1995].image,'1995.image','textJson')"-->
                                <!--@input="editTextJson($event,content[1995].image,'1995.image')"-->
                            <!--) {{ content[1998].images[1].text }}-->
                        <!--+e.img&#45;&#45;hide-mobile.&#45;&#45;half._animated&#45;&#45;trf-->
                            <!--+e.image-wrapper&#45;&#45;6-->
                                <!--img(src="/img/history/6.jpg" alt="")-->
                            <!--p(-->
                                <!--:class="{'editable-text': loginIn}"-->
                                <!--@click="clickTextField($event,content[1995].image,'1995.image','textJson')"-->
                                <!--@input="editTextJson($event,content[1995].image,'1995.image')"-->
                            <!--) {{ content[1998].images[2].text }}-->
                    +e.text.text--history
                        div(v-html="content[1998].bottom" :class="{'editable-html': loginIn}" @click="clickTextField($event,content[1998].bottom,'1998.bottom','htmlJson')" @input="editHtmlJson($event,content[1998].bottom,'1998.bottom')")
                +e.period._animated--border
                    +e.text.text--history._animated--trf
                        h3._period(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[2001].title,'2001.title','textJson')"
                            @input="editTextJson($event,content[2001].title,'2001.title',70)"
                        ) {{ content[2001].title }}
                    +e.media
                        +e.img--no-description-mobile.--no-description-desktop._animated--trf
                            +e.image-wrapper--7
                                img(src="/img/history/7.jpg" alt="")
                    +e.text--low-top.text--history._animated--trf
                        p.strong(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[2001].sokol.title,'2001.sokol.title','textJson')"
                            @input="editTextJson($event,content[2001].sokol.title,'2001.sokol.title',70)"
                        ) {{ content[2001].sokol.title }}
                        div(v-html="content[2001].sokol.text" :class="{'editable-html': loginIn}" @click="clickTextField($event,content[2001].sokol.text,'2001.sokol.text','htmlJson')" @input="editHtmlJson($event,content[2001].sokol.text,'2001.sokol.text')")
                    +e.media--abs-container
                        +e.img--middle._animated--trf
                            +e.image-wrapper--8
                                img(src="/img/history/8.jpg" alt="")
                            p(
                                :class="{'editable-text': loginIn}"
                                @click="clickTextField($event,content[2001].images[0].text,'2001.images.0.text','textJson')"
                                @input="editTextJson($event,content[2001].images[0].text,'2001.images.0.text')"
                            ) {{ content[2001].images[0].text }}
                        +e.img--hide-mobile.--middle._animated--trf
                            +e.image-wrapper--9
                                img(src="/img/history/9.jpg" alt="")
                            p(
                                :class="{'editable-text': loginIn}"
                                @click="clickTextField($event,content[2001].images[1].text,'2001.images.1.text','textJson')"
                                @input="editTextJson($event,content[2001].images[1].text,'2001.images.1.text')"
                            ) {{ content[2001].images[1].text }}
                        +e.img--small.--absoluted-1._animated--trf
                            +e.image-wrapper--10
                                img(src="/img/history/10.jpg" alt="")
                            p(
                                :class="{'editable-text': loginIn}"
                                @click="clickTextField($event,content[2001].images[2].text,'2001.images.2.text','textJson')"
                                @input="editTextJson($event,content[2001].images[2].text,'2001.images.2.text')"
                            ) {{ content[2001].images[2].text }}
                            p.strong-mobile(
                                :class="{'editable-text': loginIn}"
                                @click="clickTextField($event,content[2001].images[3].text,'2001.images.3.text','textJson')"
                                @input="editTextJson($event,content[2001].images[3].text,'2001.images.3.text')"
                            ) {{ content[2001].images[3].text }}
                        p.hide-mobile.absoluted-1._animated--trf._animated(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[2001].images[4].text,'2001.images.4.text','textJson')"
                            @input="editTextJson($event,content[2001].images[4].text,'2001.images.4.text')"
                        ) {{ content[2001].images[4].text }}
                    +e.text.text--history._animated--trf
                        div(v-html="content[2001].bottom" :class="{'editable-html': loginIn}" @click="clickTextField($event,content[2001].bottom,'2001.bottom','htmlJson')" @input="editHtmlJson($event,content[2001].bottom,'2001.bottom')")
                +e.period._animated--border
                    +e.text.text--history._animated--trf
                        h3._period(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[2002].title,'2002.title','textJson')"
                            @input="editTextJson($event,content[2002].title,'2002.title')"
                        ) {{ content[2002].title }}
                        p.strong(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[2002].titleBold,'2002.titleBold','textJson')"
                            @input="editTextJson($event,content[2002].titleBold,'2002.titleBold')"
                        ) {{ content[2002].titleBold }}
                        div(
                            v-html="content[2002].description"
                            :class="{'editable-html': loginIn}"
                            @click="clickTextField($event,content[2002].description,'2002.description','htmlJson')"
                            @input="editHtmlJson($event,content[2002].description,'2002.description')"
                        )
                    +e.media
                        +e.img--width-1._animated--trf
                            +e.image-wrapper--11
                                img(src="/img/history/11.jpg" alt="")
                            p(
                                v-html="content[2002].images[0].text"
                                :class="{'editable-text': loginIn}"
                                @click="clickTextField($event,content[2002].images[0].text,'content.2002.images.0.text','textJson')"
                                @input="editTextJson($event,content[2002].images[0].text,'content.2002.images.0.text')"
                            )
                    +e.media--abs-1
                        +e.img--abs-1-app._animated--trf
                            +e.image-wrapper--12
                                img(src="/img/history/12.jpg" alt="")
                            p(
                                v-html="content[2002].images[1].text"
                                :class="{'editable-text': loginIn}"
                                @click="clickTextField($event,content[2002].images[1].text,'content.2002.images.1.text','textJson')"
                                @input="editTextJson($event,content[2002].images[1].text,'content.2002.images.1.text')"
                            )
                        +e.img--absoluted.--abs-1._animated--trf
                            +e.image-wrapper--13
                                img(src="/img/history/13.jpg" alt="")
                            p(
                                v-html="content[2002].images[2].text"
                                :class="{'editable-text': loginIn}"
                                @click="clickTextField($event,content[2002].images[2].text,'content.2002.images.2.text','textJson')"
                                @input="editTextJson($event,content[2002].images[2].text,'content.2002.images.2.text')"
                            )
                        p._animated--trf._animated(
                            v-html="content[2002].images[3].text"
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[2002].images[3].text,'content.2002.images.3.text','textJson')"
                            @input="editTextJson($event,content[2002].images[3].text,'content.2002.images.3.text')"
                        )
                +e.period._animated--border
                    +e.text.text--history._animated--trf
                        h3._period(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[2004].title,'2004.title','textJson')"
                            @input="editTextJson($event,content[2004].title,'2004.title',70)"
                        ) {{ content[2004].title }}
                        div(
                            v-html="content[2004].description"
                            :class="{'editable-html': loginIn}"
                            @click="clickTextField($event,content[2004].description,'2004.description','htmlJson')"
                            @input="editHtmlJson($event,content[2004].description,'2004.description')"
                        )
                +e.period--abs-1._animated--border
                    +e.text.text--history._animated--trf
                        h3._period(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[2005].title,'2005.title','textJson')"
                            @input="editTextJson($event,content[2005].title,'2005.title',70)"
                        ) {{ content[2005].title }}
                        div(
                            v-html="content[2005].description"
                            :class="{'editable-html': loginIn}"
                            @click="clickTextField($event,content[2005].description,'2005.description','htmlJson')"
                            @input="editHtmlJson($event,content[2005].description,'2005.description')"
                        )
                    +e.media
                        <!--+e.img&#45;&#45;hide-mobile.&#45;&#45;width-2._animated&#45;&#45;trf-->
                            <!--+e.image-wrapper&#45;&#45;14-->
                                <!--img(src="/img/history/14.jpg" alt="")-->
                            <!--p(-->
                                <!--v-html="content[2005].images[0].text"-->
                                <!--:class="{'editable-html': loginIn}"-->
                                <!--@click="clickTextField($event,content[2005].images[0].text,'2005.images.0.text','htmlJson')"-->
                                <!--@input="editHtmlJson($event,content[2005].images[0].text,'2005.images.0.text')"-->
                            <!--)-->
                        <!--+e.img&#45;&#45;hide-mobile.&#45;&#45;width-2._animated&#45;&#45;trf-->
                            <!--+e.image-wrapper&#45;&#45;15-->
                                <!--img(src="/img/history/15.jpg" alt="")-->
                            <!--p(-->
                                <!--v-html="content[2005].images[1].text"-->
                                <!--:class="{'editable-html': loginIn}"-->
                                <!--@click="clickTextField($event,content[2005].images[1].text,'2005.images.1.text','htmlJson')"-->
                                <!--@input="editHtmlJson($event,content[2005].images[1].text,'2005.images.1.text')"-->
                            <!--)-->
                        +e.img._animated--trf
                            +e.image-wrapper--16
                                img(src="/img/history/16.jpg" alt="")
                            p(
                                v-html="content[2005].images[2].text"
                                :class="{'editable-html': loginIn}"
                                @click="clickTextField($event,content[2005].images[2].text,'2005.images.2.text','htmlJson')"
                                @input="editHtmlJson($event,content[2005].images[2].text,'2005.images.2.text')"
                            )
                <!--+e.period._animated&#45;&#45;border-->
                    <!--+e.text.text&#45;&#45;history._animated&#45;&#45;trf-->
                        <!--h3._period(-->
                            <!--:class="{'editable-text': loginIn}"-->
                            <!--@click="clickTextField($event,content[2006].title,'2006.title','textJson')"-->
                            <!--@input="editTextJson($event,content[2006].title,'2006.title',70)"-->
                        <!--) {{ content[2006].title }}-->
                        <!--div(-->
                            <!--v-html="content[2006].description"-->
                            <!--:class="{'editable-html': loginIn}"-->
                            <!--@click="clickTextField($event,content[2006].description,'2006.description','htmlJson')"-->
                            <!--@input="editHtmlJson($event,content[2006].description,'2006.description')"-->
                        <!--)-->
                    <!--+e.media-->
                        <!--+e.img._animated&#45;&#45;trf-->
                            <!--+e.image-wrapper&#45;&#45;17-->
                                <!--img(src="/img/history/17.jpg" alt="")-->
                            <!--p(-->
                                <!--:class="{'editable-text': loginIn}"-->
                                <!--@click="clickTextField($event,content[2006].image,'2006.image','textJson')"-->
                                <!--@input="editTextJson($event,content[2006].image,'2006.image',70)"-->
                            <!--) {{ content[2006].image }}-->
                +e.period._animated--border
                    +e.text.text--history._animated--trf
                        h3._period(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[2010].title,'2010.title','textJson')"
                            @input="editTextJson($event,content[2010].title,'2010.title',70)"
                        ) {{ content[2010].title }}
                        <!--p.strong(-->
                            <!--:class="{'editable-text': loginIn}"-->
                            <!--@click="clickTextField($event,content[2010].titleBold,'2010.titleBold','textJson')"-->
                            <!--@input="editTextJson($event,content[2010].titleBold,'2010.titleBold')"-->
                        <!--) {{ content[2010].titleBold }}-->
                    <!--+e.media-->
                        <!--+e.img&#45;&#45;patent._animated&#45;&#45;trf-->
                            <!--+e.image-wrapper&#45;&#45;18-->
                                <!--img(src="/img/history/18.jpg" alt="")-->
                            <!--+e.image-wrapper&#45;&#45;19-->
                                <!--img(src="/img/history/19.jpg" alt="")-->
                            <!--+e.image-wrapper&#45;&#45;20-->
                                <!--img(src="/img/history/20.jpg" alt="")-->
                            <!--p(-->
                                <!--:class="{'editable-html': loginIn}"-->
                                <!--@click="clickTextField($event,content[2010].images[0].text,'2010.images.0.text','textJson')"-->
                                <!--@input="editTextJson($event,content[2010].images[0].text,'2010.images.0.text')"-->
                            <!--) {{ content[2010].images[0].text }}-->
                    +e.text--farther.text--history._animated--trf
                        p.strong.big(
                            :class="{'editable-html': loginIn}"
                            @click="clickTextField($event,content[2010].imageBold,'2010.imageBold','textJson')"
                            @input="editTextJson($event,content[2010].imageBold,'2010.imageBold')"
                        ) {{ content[2010].imageBold }}
                    +e.media
                        +e.img--width-3._animated--trf
                            +e.image-wrapper--21
                                img(src="/img/history/21.jpg" alt="")
                            p(
                                :class="{'editable-html': loginIn}"
                                @click="clickTextField($event,content[2010].images[1].text,'2010.images.1.text','textJson')"
                                @input="editTextJson($event,content[2010].images[1].text,'2010.images.1.text')"
                            ) {{ content[2010].images[1].text }}
                        +e.img--hide-mobile.--abs-3._animated--trf
                            +e.image-wrapper--22
                                img(src="/img/history/22.jpg" alt="")
                +e.period._animated--border
                    +e.text--line.--line-desktop.text--history._animated--trf
                        h3._period(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[2011].title,'2011.title','textJson')"
                            @input="editTextJson($event,content[2011].title,'2011.title',70)"
                        ) {{ content[2011].title }}
                        div(
                            v-html="content[2011].description"
                            :class="{'editable-html': loginIn}"
                            @click="clickTextField($event,content[2011].description,'2011.description','htmlJson')"
                            @input="editHtmlJson($event,content[2011].description,'2011.description')"
                        )
                    +e.media--line.--line-desktop
                        +e.img--small.--shadow.--padding-45._animated--trf
                            +e.image-wrapper--23
                                img(src="/img/history/23.jpg" alt="")
                +e.period._animated--border
                    +e.text.text--history._animated--trf
                        h3._period(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[2011].title,'2011.title','textJson')"
                            @input="editTextJson($event,content[2011].title,'2011.title',70)"
                        ) {{ content[2013].title }}
                        div(
                            v-html="content[2013].description"
                            :class="{'editable-html': loginIn}"
                            @click="clickTextField($event,content[2013].description,'2013.description','htmlJson')"
                            @input="editHtmlJson($event,content[2013].description,'2013.description')"
                        )
                    +e.media
                        +e.img._animated--trf
                            +e.image-wrapper--24
                                img(src="/img/history/24.jpg" alt="")
                +e.period._animated--border
                    +e.text--line.--line-desktop.text--history._animated--trf
                        h3._period(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[2014].title,'2014.title','textJson')"
                            @input="editTextJson($event,content[2014].title,'2014.title',70)"
                        ) {{ content[2014].title }}
                        p.strong(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[2014].titleBold,'2014.titleBold','textJson')"
                            @input="editTextJson($event,content[2014].titleBold,'2014.titleBold',70)"
                        ) {{ content[2014].titleBold }}
                        div(
                            v-html="content[2014].description"
                            :class="{'editable-html': loginIn}"
                            @click="clickTextField($event,content[2014].description,'2014.description','htmlJson')"
                            @input="editHtmlJson($event,content[2014].description,'2014.description')"
                        )
                    +e.media--line.--line-desktop
                        +e.img--hide-mobile.--shadow.--padding-30.--offset-on-title._animated--trf
                            +e.image-wrapper--25
                                img(src="/img/history/25.jpg" alt="")
                    +e.media--offset-30
                        +e.img--width-4._animated--trf
                            +e.image-wrapper--26
                                img(src="/img/history/26.jpg" alt="")
                            p(
                                :class="{'editable-html': loginIn}"
                                @click="clickTextField($event,content[2014].images[0].text,'2014.images.0.text','textJson')"
                                @input="editTextJson($event,content[2014].images[0].text,'2014.images.0.text')"
                            ) {{ content[2014].images[0].text }}
                        +e.img--hide-mobile.--abs-4._animated--trf
                            +e.image-wrapper--27
                                img(src="/img/history/27.jpg" alt="")
                            p(
                                :class="{'editable-html': loginIn}"
                                @click="clickTextField($event,content[2014].images[1].text,'2014.images.1.text','textJson')"
                                @input="editTextJson($event,content[2014].images[1].text,'2014.images.1.text')"
                            ) {{ content[2014].images[1].text }}
                +e.period._animated--border
                    +e.text.text--history._animated--trf
                        h3._period(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[2015].title,'2015.title','textJson')"
                            @input="editTextJson($event,content[2015].title,'2015.title',70)"
                        ) {{ content[2015].title }}
                        div(
                            v-html="content[2015].description"
                            :class="{'editable-html': loginIn}"
                            @click="clickTextField($event,content[2015].description,'2015.description','htmlJson')"
                            @input="editHtmlJson($event,content[2015].description,'2015.description')"
                        )
                    +e.media--abs-2
                        +e.img--abs-6._animated--trf
                            +e.image-wrapper--28
                                img(src="/img/history/28.jpg" alt="")
                            p(
                                :class="{'editable-html': loginIn}"
                                @click="clickTextField($event,content[2015].images[0].text,'2015.images.0.text','textJson')"
                                @input="editTextJson($event,content[2015].images[0].text,'2015.images.0.text')"
                            ) {{ content[2015].images[0].text }}
                        +e.img--abs-5._animated--trf
                            +e.image-wrapper--29
                                img(src="/img/history/29.jpg" alt="")
                            p(
                                :class="{'editable-html': loginIn}"
                                @click="clickTextField($event,content[2015].images[1].text,'2015.images.1.text','textJson')"
                                @input="editTextJson($event,content[2015].images[1].text,'2015.images.1.text')"
                            ) {{ content[2015].images[1].text }}
                        p._animated--trf._animated
                +e.period--abs-2._animated--border
                    +e.text.text--history._animated--trf
                        h3._period(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[2016].title,'2016.title','textJson')"
                            @input="editTextJson($event,content[2016].title,'2016.title',70)"
                        ) {{ content[2016].title }}
                        div(
                            v-html="content[2016].description"
                            :class="{'editable-html': loginIn}"
                            @click="clickTextField($event,content[2016].description,'2016.description','htmlJson')"
                            @input="editHtmlJson($event,content[2016].description,'2016.description')"
                        )
                    +e.media--abs-3
                        +e.img--no-description-mobile.--no-description-desktop._animated--trf
                            +e.image-wrapper--30
                                img(src="/img/history/30.jpg" alt="")
                            p(
                                :class="{'editable-html': loginIn}"
                                @click="clickTextField($event,content[2016].images[0].text,'2016.images.0.text','textJson')"
                                @input="editTextJson($event,content[2016].images[0].text,'2016.images.0.text')"
                            ) {{ content[2016].images[0].text }}
                        +e.video--hide-mobile(v-on:click="playVideo" :class="isMuted ? 'muted' : ''")._animated--trf
                            iframe(src="https://www.youtube.com/embed/vbRYRtLM-ZA" width="420" height="315" frameborder="0" allowfullscreen)
                            p(
                                :class="{'editable-html': loginIn}"
                                @click="clickTextField($event,content[2016].images[1].text,'2016.images.1.text','textJson')"
                                @input="editTextJson($event,content[2016].images[1].text,'2016.images.1.text')"
                            ) {{ content[2016].images[1].text }}
                        p(
                            :class="{'editable-html': loginIn}"
                            @click="clickTextField($event,content[2016].images[2].text,'2016.images.2.text','textJson')"
                            @input="editTextJson($event,content[2016].images[2].text,'2016.images.2.text')"
                        ) {{ content[2016].images[2].text }}
                +e.period(ref="historyEnd")._animated--border
                    +e.text.text--history._animated--trf
                        h3._period(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content[2017].title,'2017.title','textJson')"
                            @input="editTextJson($event,content[2017].title,'2017.title',70)"
                        ) {{ content[2017].title }}
                        div(
                            v-html="content[2017].description"
                            :class="{'editable-html': loginIn}"
                            @click="clickTextField($event,content[2017].description,'2017.description','htmlJson')"
                            @input="editHtmlJson($event,content[2017].description,'2017.description')"
                        )
                    +e.media
                        +e.img._animated--trf
                            +e.image-wrapper--31
                                img(src="/img/history/31.jpg" alt="")
        +e.VIDEO-COMPONENT(
            ref="video"
            :source="video.source"
        ).content
        blog-latest-component(class="blog-latest--no-grid blog-latest--more-offset")
</template>
<script>
    import constants from '../../../../../content/constants.json';
    import GridDark from '@/components/blanks/GridDark.vue';
    import BlogLatest from '@/components/blanks/BlogLatest.vue';
    import Video from '@/components/blanks/VideoSection.vue';

    import {fadeInOnScroll} from '@/mixins/fadeInOnScroll';
    import {throttle} from '@/mixins/throttle';
    import {scrollUtils} from '@/mixins/scrollUtils';
    import {getOffset} from '@/mixins/getOffset';
    import {getProperty} from '@/mixins/getProperty';
    import {preventScrollPage} from '@/mixins/preventScrollPage';
    import {normalizeWheel} from '@/mixins/normalizeWheel';

    import {TweenLite} from 'gsap';

    import {editText} from '@/mixins/admin/editText';
    import AdminPanel from '@/components/admin/Panel.vue';

    export default {
        mixins: [editText,throttle,scrollUtils,getOffset,getProperty,preventScrollPage,normalizeWheel,fadeInOnScroll],
        data(){
            let language = this.$router.currentRoute.meta.language,
                obj = {
                    video:{
                        source: '/video/history/video'
                    },
                    content: this.$attrs.content.content[language].text,
                    animations: {
                        pageHeight: 0,
                        viewPortWidth: 0,
                        scrollerWidth: 0,
                        historyHeight: 0,
                        points: [],
                        periods: [],
                        historyEnd: 0,
                        historyEndHeight: 0,
                        timeLine: {
                            height: 0,
                            heightFact: 0,
                            margin: 0,
                            top: 0,
                            isFixed: false,
                            active: false,
                            activeStage: 1
                        },
                        scrollValue: 0
                    },
                    isMuted: true,
                };
            return obj;
        },
        destroyed(){
            if (typeof document !== 'undefined' ){
                window.removeEventListener('scroll',this.scrollingPage);
            }
        },
        mounted() {
            setTimeout(()=>{
                this.getVariables();
                this.moveTime();
                this.checkTimes();
                window.addEventListener('scroll', this.scrollingPage);
                this.scrollingPage();
            },500);
        },
        methods:{
            playVideo(){
                // if(this.isMuted){
                //     this.isMuted = false;
                //     this.$refs.video.play();
                // } else{
                //     this.isMuted = true;
                //     this.$refs.video.pause();
                // }
            },
            getVariables(){
                this.animations.timeLine.active = true;
                if(window.innerWidth < 600){
                    this.animations.timeLine.height = this.$refs.timeline.getBoundingClientRect().width;
                    this.animations.timeLine.heightFact = this.$refs.timeline.getBoundingClientRect().height;
                } else {
                    this.animations.timeLine.height = this.$refs.timeline.getBoundingClientRect().height;

                }
                this.animations.historyHeight = this.$refs.history.getBoundingClientRect().height;
                this.animations.scrollerWidth = this.$refs.scroller.scrollWidth;

                this.animations.timeLine.top = this.getOffset(this.$refs.timeline).top;
                this.animations.timeLine.positionTop = parseFloat(getComputedStyle(this.$refs.timeline).top);
                this.animations.pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight,
                    document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
                this.animations.viewPortWidth = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                this.animations.historyEnd = this.getOffset(this.$refs.historyEnd).top;
                this.animations.historyEndHeight = this.$refs.historyEnd.getBoundingClientRect().height
                this.animations.timeLine.margin = parseFloat(getComputedStyle(this.$refs.timeline).marginBottom);
                for(let i=0; i < this.$refs.timeline.querySelectorAll('.history__time').length; i++){
                    this.animations.points.push(this.$refs.timeline.querySelectorAll('.history__time')[i]);
                }
                for(let i=0; i < this.$refs.periods.querySelectorAll('.history__period').length; i++){
                    this.animations.periods.push(this.$refs.periods.querySelectorAll('._period')[i]);
                }
            },
            scrollingPage(){
                this.throttle(this.moveTime(),50);
                this.throttle(this.checkTimes(),50);
            },
            checkTimes(){
                let points = this.animations.points,
                    periods = this.animations.periods;
                for(let i = 0; i < periods.length; i++){



                    if(this.getScroll()[1] < 50){
                        points[i].classList.remove('active');
                        points[0].classList.add('active');
                    } else {
                        if(this.isElementInViewport(periods[i]) && this.howMuchCentered(periods[i]) > -0.2 && this.howMuchCentered(periods[i]) < 0.2){
                            for(let j = 0; j < points.length; j++){
                                points[j].classList.remove('active');
                                this.animations.timeLine.activeStage = i + 1;
                                if (j < i){
                                    points[i-1].classList.add('checked');
                                }
                            }
                            points[i].classList.remove('checked');
                            points[i].classList.add('active');
                        }
                    }
                }

            },
            moveTime(){
                let k = 0,
                    scrolled = 0,
                    timeLine = this.$refs.timeline,
                    scroller = this.$refs.scroller;


                this.animations.scrollValue = this.getScroll()[1];
                let scrollValue = this.animations.scrollValue;
                if(window.innerWidth < 600){
                    k = (this.animations.scrollerWidth - this.$refs.scroller.getBoundingClientRect().width)/(this.$refs.periods.getBoundingClientRect().height + window.innerHeight);
                    scrolled = (scrollValue - this.animations.timeLine.top - 20) * k;
                    if(scrollValue > this.animations.timeLine.top - 20){
                        scroller.style.transform = 'translate3d(-' + scrolled + 'px,0,0) rotateZ(0)';
                        timeLine.style.position = 'fixed';
                        timeLine.style.paddingTop = '20px';
                        timeLine.style.paddingBottom = '20px';
                        timeLine.style.top = 0;
                        timeLine.style.bottom = 'auto';
                        this.$refs.periods.style.paddingTop = this.animations.timeLine.heightFact + this.animations.timeLine.margin + 'px';
                        this.animations.timeLine.isFixed = true;
                        if(scrollValue > this.animations.historyHeight - this.$refs.timeline.getBoundingClientRect().height){
                            timeLine.style.top = 'auto';
                            timeLine.style.bottom = 0;
                            timeLine.style.position = 'absolute';
                        }
                    } else {
                        timeLine.style.position = 'relative';
                        timeLine.style.top = 'auto';
                        timeLine.style.paddingTop = 0;
                        timeLine.style.paddingBottom = 0;
                        this.$refs.periods.style.paddingTop = 0;
                        this.animations.timeLine.isFixed = false;
                        scroller.style.transform = 'translate3d(0,0,0) rotateZ(0)';
                    }
                } else {
                    k = (this.animations.scrollerWidth - window.innerHeight)/(this.animations.historyHeight - window.innerHeight);
                    scrolled = scrollValue * k * 1.2;
                    if(scrollValue < this.animations.historyHeight - window.innerHeight){
                        scroller.style.transform = 'translate3d(-' + scrolled + 'px,0,0) rotateZ(0)';
                        timeLine.style.top = this.animations.timeLine.positionTop + 'px';
                    } else {
                        scrolled = (this.animations.historyHeight - window.innerHeight) * k * 1.2;
                        scroller.style.transform = `translate3d(-${scrolled}px,0,0) rotateZ(0)`;
                        timeLine.style.top = -(scrollValue - this.animations.historyHeight + window.innerHeight - this.animations.timeLine.positionTop) + 'px';

                    }

                }
            },
            scrollTimeline(){
                let norm = this.normalizeWheel(event),
                    scroll = this.animations.scrollValue,
                    ref = this.$refs.scroller;

                scroll += norm.spinY;
                TweenLite.to(ref, 0.7, {
                    x: -scroll,
                    overflow: 5,
                    force3D: !0
                })
            }

        },
        components: {
            'video-component': Video,
            'grid-dark-component': GridDark,
            'blog-latest-component':BlogLatest,
            'admin-panel-component': AdminPanel
        }
    }
</script>