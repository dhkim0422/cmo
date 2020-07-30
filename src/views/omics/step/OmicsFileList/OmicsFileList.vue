<template>
    <div class="example-vuex">

        <div class="upload">
            <ul>
                <li v-for="(file, index) in files" :key="file.id">
                    <span>{{file.name}}</span> -
                    <span>{{file.size | formatSize}}</span> -
                    <span v-if="file.error">{{file.error}}</span>
                    <span v-else-if="file.success">success</span>
                    <span v-else-if="file.active">active</span>
                    <span v-else-if="file.active">active</span>
                    <span v-else></span>
                </li>
            </ul>
            <div class="example-btn">
                <file-upload
                        class="btn btn-primary"
                        post-action="/upload/post"
                        extensions="gif,jpg,jpeg,png,webp"
                        accept="image/png,image/gif,image/jpeg,image/webp"
                        :multiple="true"
                        :size="1024 * 1024 * 10"
                        :value="files"
                        @input="inputUpdate"
                        ref="upload">
                    <i class="fa fa-plus"></i>
                    Select files
                </file-upload>
                <button type="button" class="btn btn-success" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
                    <i class="fa fa-arrow-up" aria-hidden="true"></i>
                    Start Upload
                </button>
                <button type="button" class="btn btn-danger"  v-else @click.prevent="$refs.upload.active = false">
                    <i class="fa fa-stop" aria-hidden="true"></i>
                    Stop Upload
                </button>
            </div>
        </div>

    </div>
</template>
<style>
    .example-vuex label.btn {
        margin-bottom: 0;
        margin-right: 1rem;
    }
</style>

<script>
    import { mapState } from 'vuex'
    import FileUpload from 'vue-upload-component'
    export default {
        name:'OmicsFileList',
        components: {
            FileUpload,
        },
        computed: {
            ...mapState([
                'files',
            ])
        },
        methods: {
            inputUpdate(files) {
                //this.$store.commit('updateFiles', files)
                console.log(files);
            },
        }
    }
</script>
