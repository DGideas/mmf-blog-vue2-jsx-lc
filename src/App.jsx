import '../static/editor.md/css/editormd.css'
import './assets/css/hljs/googlecode.css'
import './assets/css/style.css'
import '../node_modules/toastr/build/toastr.css'
import '../node_modules/nprogress/nprogress.css'
import { mapGetters } from 'vuex'
import NProgress from 'nprogress'
import About from './components/about'
export default {
    computed: {
        ...mapGetters({
            global: 'getGlobal'
        }),
        visit() {
            return ['index', 'article', 'category', 'search'].includes(this.$route.name)
        }
    },
    components: {
        About
    },
    methods: {
        handleGoBack() {
            this.$router.go(-1)
        },
        handleGoTop(e) {
            e.preventDefault()
            window.scrollTo(0, 0)
        },
        handleSearch(e) {
            var qs = e.target.value
            if (e.keyCode === 13 && qs !== '') {
                this.$router.replace('/search/' + qs)
            }
        }
    },
    watch: {
        'global.progress'(val) {
            if (val === 0) {
                NProgress.set(0)
                NProgress.start()
            } else if (val === 100) {
                NProgress.done()
            } else {
                NProgress.set(val/100)
                NProgress.start()
            }
        }
    },
    render(h) { // eslint-disable-line
        let navigation =
            <div class="box menu">
                <div class="m-sch">
                    <input on-keyup={this.handleSearch} id="search_content" class="sch" type="text" name="q" placeholder="记得按回车哦" />
                </div>
                <div class="m-nav">
                    <ul class="menuOpen">
                        <li class="tag-all">
                            <router-link to="/" exact><i />All</router-link>
                        </li>
                        <li class="tag-life">
                            <router-link to="/category/1"><i />Life</router-link>
                        </li>
                        <li class="tag-study">
                            <router-link to="/category/2"><i />Study</router-link>
                        </li>
                        <li class="tag-other">
                            <router-link to="/category/3"><i />Other</router-link>
                        </li>
                    </ul>
                </div>
            </div>

        if (!this.visit) {
            navigation =
                <div class="box menu">
                    <div class="m-nav">
                        <ul class="menuOpen">
                            <li class="tag-all">
                                <router-link to="/" exact><i />All</router-link>
                            </li>
                            <li class="tag-life">
                                <router-link to="/admin/list/1"><i />List</router-link>
                            </li>
                            <li class="tag-study">
                                <router-link to="/admin/post"><i />Post</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
        }
        return (
            <div class="g-doc">
                <div class="g-hd">
                    <About />
                    {navigation}
                </div>
                <transition name="fade" mode="out-in">
                    <router-view class="router" />
                </transition>
                <div class="g-ft">
                    <span class="copy"><span title="Copyright">©</span> <a href="/">M·M·F 小屋</a> 2016.06</span>
                    <span class="beian"><i /> <a target="_blank" rel="noopener noreferrer" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=000000000000">浙公网安备 000000000000号</a></span>
                </div>
                <div class="arrow">
                    <a class="go-top" href="#" on-click={this.handleGoTop} />
                    <a class="go-back" href="#" on-click={this.handleGoBack} />
                </div>
            </div>
        )
    }
}
