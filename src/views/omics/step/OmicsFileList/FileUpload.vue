<template>
    <div class="upload">
        <div class="filter-group">
            <div class="group-item">
                <!--<total-record-count :result-list="files[type.name]">-->
            </div>
            <div class="group-item">
                <!--:put-action="'/api/omics/' + this.omics.id + '/files'"-->
                <file-upload
                        class="btn-outline-secondary-sm"
                        :input-id="'upload_' + type.name"
                        post-action="/isg-oreo/temporary/files"
                        :multiple="true"

                        v-model="files[type.name]"
                        :ref="type.name"
                        @input-file="inputFile"
                        @input-filter="inputFilter"
                        @input="updatetValue"
                >
                    <i class="xi-file-upload"></i><span class="sr-only">업로드</span>
                </file-upload>

                <button class="btn-outline-secondary-sm" title="샘플연결">
                    <i class="xi-link"></i><span class="sr-only">샘플연결</span>
                </button>
                <button class="btn-outline-secondary-sm" type="button"
                        data-toggle="tooltip" data-placement="top" title="삭제">
                    <i class="xi-trash"></i>
                    <span class="sr-only">삭제</span>
                </button>
                <!--<button class="btn-outline-secondary-sm" type="button"
                        v-if="!$refs[type.name] || !$refs[type.name].active"
                        @click.prevent="$refs[type.name].active = true">
                    <i class="fa fa-arrow-up" aria-hidden="true"></i>
                    Start Upload
                </button>
                <button class="btn-outline-secondary-sm" type="button"
                        @click.prevent="$refs[type.name].active = false">
                    <i class="fa fa-stop" aria-hidden="true"></i>
                    Stop Upload
                </button>-->
                <page-unit :page-unit="resultList.data.numberOfRows"/>
            </div>
        </div>

        <table class="data-table">
            <thead>
            <tr>
                <th>
                    순번
                </th>
                <th>
                    등록번호
                </th>
                <th>
                    연구샘플
                </th>
                <th>
                    파일이름
                </th>
                <th>
                    파일사이즈
                </th>
                <th>
                    md5 Checksum
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-show="!(fileList[type.name] > 0 || resultList.data.list.length > 0)">
                <td colspan="7" class="text-center">
                    검색된 항목이 없습니다.
                </td>
            </tr>
            <tr v-for="item in resultList.data.list">
                <td class="custom-checkbox">
                    <input type="checkbox"  class="custom-control-input"
                           checklist-model="modelHandler.selectedIdList" checklist-value="item.id"
                           ng-change="modelHandler.select()"/>
                    <label class="custom-control-label" >
                        <span class="sr-only">선택 </span>
                    </label>
                </td>

                <td>{{ item.accession && '' }}</td>
                <td>{{ item.sample.accession && '' }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.size | byte }}</td>
                <td>{{ item.checksum }}</td>
            </tr>

            <tr v-for="(file, index) in files[type.name]" :key="file.id">
                <td>&nbsp;</td>
                <td colspan="2">
                    <b-progress :value="file.progress" :max="100" show-progress animated></b-progress>
                </td>
                <td>{{ file.name }}</td>
                <td>{{ file.size | byte }}</td>
                <td>-</td>
            </tr>

            <tr v-if="files[type.name] == 0">
                <td colspan="6">

                </td>
            </tr>
            </tbody>
        </table>
        <div>
            <div v-for="err in this.errors"> {{err}}</div>
        </div>

    </div>
</template>
<style>
    .example-simple label.btn {
        margin-bottom: 0;
        margin-right: 1rem;
    }
</style>

<script>
    import FileUpload from 'vue-upload-component'
    import TotalRecordCount from "../../../../components/TotalRecordCount";
    import PageUnit from "../../../../components/PageUnit";
    import axios from "../../../../utils/axios";

    export default {
        name: 'FileUploadTemp',
        components: {
            PageUnit,
            TotalRecordCount,
            FileUpload,
        },
        props: ['omics', 'type', 'dataType'],
        data() {
            return {
                selected: [],
                items: [],
                fileList: {
                    fasta: [],
                    fastaq: [],
                    BAM: [],
                    VCF: [],
                    BED: [],
                    Others: []
                },
                files: {
                    fasta: [],
                    fastaq: [],
                    BAM: [],
                    VCF: [],
                    BED: [],
                    Others: []
                },
                errors: [],
                resultList:{
                    data: {
                        total: 0,
                        currentPage: 1,
                        numberOfRows: 10,
                        list: []
                    }
                }
            }
        },
        methods: {
            onRowSelected(data) {
                this.selected = data
            },
            inputFilter(newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    // Before adding a file
                    // Filter system files or hide files
                    if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                        return prevent()
                    }
                    // Filter php html js file
                    if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                        return prevent()
                    }
                }
            },
            inputFile(newFile, oldFile) {
                if (newFile && !oldFile) {
                    // add
                    console.log('add', newFile)
                    //등록과 동시에 업로드 시작
                    this.$refs[this.type.name].active = true
                }
                /*
                if (newFile && oldFile) {
                    // update
                    console.log('update', newFile)
                }
                if (!newFile && oldFile) {
                    // remove
                    console.log('remove', oldFile)
                }*/
            },
            updatetValue(value) {
                if (this.$refs[this.type.name] && this.$refs[this.type.name].uploaded) {
                    for (let item of value) {
                        let response = {}

                        let itemData = item
                        itemData['response']['omics'] = this.omics
                        item['response']['type'] = this.type.name
                        item['response']['status'] = "complete"
                        item['response']['distbStatus'] = "READY"
                        item['response']['group'] = this.dataType
                        console.log('itemSSSSS',item)
                        try {
                            const url = '/isg-oreo/api/omics/' + this.omics.id + '/files'

                            this.$axios.post(url, item.response).catch((error) => {
                                if (error.response) {
                                    // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.

                                    this.errors.push(error.response.data)

                                    console.log(error.response.status);
                                    console.log(error.response.headers);
                                }
                                else if (error.request) {
                                    // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                                    // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                                    // Node.js의 http.ClientRequest 인스턴스입니다.
                                    console.log(error.request);
                                }
                                else {
                                    // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                                    console.log('Error', error.message);
                                }
                                console.log(error.config);
                            }).then(()=>{
                                this.selectFile();
                            });

                        } catch (e) {
                            this.errors.push(response.response.data)
                        }
                    }

                }
            },
            async selectFile(page = 1){

                let url = '/isg-oreo/api/omics/'+this.omics.id+'/files'
                const params = new URLSearchParams();

                params.append('firstIndex', 1)
                params.append('type', this.type.name)
                params.append('group', this.dataType)
                params.append('omicsId', this.omics.id)
                params.append('firstIndex', 1)
                params.append('rowSize', this.resultList.data.numberOfRows)
                params.append('currentPage', page)

                this.resultList = await axios.get(url, {params: params});
                this.items = this.resultList.data.list
            }


        }
    }
</script>

