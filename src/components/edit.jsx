/* global editormd */
import { mapGetters } from 'vuex'
import api from '../api'
export default {
    ...mapGetters({
        article: 'getAdminArticle'
    }),
    data () {
        return {
            id: '',
            form: {
                title: '',
                category: '',
                content: ''
            }
        }
    },
    methods: {
        handleChange(type, e) {
            this.form[type] = e.target.value
        },
        handleSubmit(e) {
            e.preventDefault()
            if (this.form.title === '') {
                this.$store.dispatch('showMsg', '请输入标题')
            } else if (this.form.category === '') {
                this.$store.dispatch('showMsg', '请选择分类')
            } else if ($("#editor").val() === '') {
                this.$store.dispatch('showMsg', '请输入内容')
            } else {
                api.modifyAdminArticle(this.id, {
                    title: this.form.title,
                    category: this.form.category,
                    content: window.modifyEditor.getHTML()
                }).then( () => {
                    this.$store.commit('UPDATE_ADMIN_ARTICLE', {
                        id: this.id,
                        title: this.form.title,
                        category: this.form.category,
                        content: this.form.content
                    })
                    this.$store.dispatch('showMsg', {
                        content: '编辑成功',
                        type: "success"
                    })
                    this.$router.replace('/list/' + this.$route.params.page)
                })
            }
        }
    },
    mounted() {
        this.$store.dispatch('getAdminArticle').then(data => {
            this.id = data._id
            this.form.title = data.title
            this.form.category = data.category
            this.form.content = data.content
            window.modifyEditor = editormd("post-content", {
                width: "100%",
                height: 500,
                placeholder: '请输入内容...',
                path: '/static/editor.md/lib/',
                toolbarIcons() {
                    return [
                        "bold", "italic", "quote", "|",
                        "list-ul", "list-ol", "hr", "|",
                        "link", "reference-link", "image", "code", "code-block", "table", "|",
                        "watch", "preview", "fullscreen", "|",
                        "help"
                    ]
                },
                watch : false,
                markdown: this.form.content,
                saveHTMLToTextarea : true,
                imageUpload : true,
                imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                imageUploadURL : "/api/?action=upload"
            })
        })
    },
    render(h) { // eslint-disable-line
        return (
            <div class="g-mn">
                <div class="box">
                    <form id="article-post" action="#" method="post">
                        <section id="post-title">
                            <input on-change={this.handleChange.bind(this, 'title')} value={this.form.title} type="text" name="title" class="form-control" placeholder="请输入标题" />
                        </section>
                        <section id="post-category">
                            <select on-change={this.handleChange.bind(this, 'category')} domProps-value={this.form.category} id="category" name="category" class="form-control">
                                <option value="">请选择分类</option>
                                <option value="1">生活</option>
                                <option value="2">工作</option>
                                <option value="3">其他</option>
                            </select>
                        </section>
                        <section id="post-content">
                            <textarea id="editor" name="content" class="form-control" data-autosave="editor-content" />
                        </section>
                        <section id="post-submit">
                            <button on-click={this.handleSubmit} class="btn btn-success">编辑</button>
                        </section>
                    </form>
                </div>
            </div>
        )
    }
}
