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


                <span data-toggle="tooltip" data-placement="top" title="객체 등록">
                    <!--등록은 id=registPopup 로연결되어 있음 -->
                    <button class="btn-outline-secondary-sm" @click="onSampleModal" >
                        <i class="xi-link"></i><span class="sr-only">샘플연결</span>
                    </button>
                    <!--등록을 위한 페잊 컴포넌트-->
                    <sample-modal :tube="[]" :type="this.type.name" @sample="onSampleSelect" />
                </span>

                <button class="btn-outline-secondary-sm" type="button" @click="remove"
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
                <!--<page-unit :page-unit="resultList.data.numberOfRows"/>-->
            </div>
        </div>
        <b-form-checkbox-group id="checkbox-group" v-model="selectedFile" name="fileSelect">
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
            <tr v-show="computedFiles.length == 0">
                <td colspan="7" class="text-center">
                    검색된 항목이 없습니다.
                </td>
            </tr>


            <tr v-for="item in computedFiles">
                <td>
                    <b-form-checkbox :value="item"/>
                </td>
                <td>{{ item.accession}}</td>
                <td>{{ item.sample && item.sample.accession }}</td>
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

            <!--<tr v-if="files[type.name] == 0">
                <td colspan="6">
                     업로드 해 주세요
                </td>
            </tr>-->
            </tbody>
        </table>
        </b-form-checkbox-group>
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
    import SamplesPopupList from "../../../samples/SamplesPopupList";
    import SampleModal from "../../../../components/SampleModal";

    export default {
        name: 'FileUploadTemp',
        components: {
            SampleModal,
            SamplesPopupList,
            PageUnit,
            TotalRecordCount,
            FileUpload,
        },
        created() {
            this.selectFile()
        },
        props: ['omics', 'type', 'dataType'],
        computed: {
            computedFiles() {
                return this.fileList.data && this.fileList.data.list;
            }
        },
        data() {
            return {
                selectedFile: [],
                fileList: {
                    data: {
                        total: 0,
                        currentPage: 1,
                        numberOfRows: 10,
                        list: []
                    }
                },

                files: {
                    fasta: [],
                    fastaq: [],
                    BAM: [],
                    VCF: [],
                    BED: [],
                    Others: [],
                    CEL: [],
                    IDAT: [],
                    TXT: [],
                    mzXML: [],
                    mzData: [],
                    mzML: [],
                },
                errors: [],
            }
        },
        methods: {
            async onSampleSelect(item){
                await this.$confirm( this.selectedFile.length+'개의 파일에 샘플을 지정합니다.','샘플정보를 변경하시겠습니까?','question')

                let arr = []
                for(const row of this.selectedFile){
                    row['sample'] = item
                    arr.push(row)
                }

                const  url = '/isg-oreo/api/omics/'+this.omics.id+'/files?action=CHANGE'
                this.$axios.put(url,arr).then((response)=>{
                    this.$alert('샘플정보 변경 완료','작업알림','info')
                    this.selectFile()
                })
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
                    //등록과 동시에 업로드 시작
                    this.$refs[this.type.name].active = true
                    this.errors = []
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
                        item.response.type = this.type.name
                        item.response.status = "complete"
                        item.response.distbStatus = "READY"
                        item.response.group = this.dataType

                        try {
                            const url = '/isg-oreo/api/omics/' + this.omics.id + '/files'

                            this.$axios.post(url, item.response).catch((error) => {
                                if (error.response) {
                                    // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.

                                    this.errors.push(error.response.data)
                                    /*
                                    console.log(error.response.status);
                                    console.log(error.response.headers);
                                    */
                                } else if (error.request) {
                                    // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                                    // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                                    // Node.js의 http.ClientRequest 인스턴스입니다.
                                    console.log(error.request);
                                } else {
                                    // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                                    console.log('Error', error.message);
                                }
                                //console.log(error.config);
                            }).then(() => {

                                this.selectFile();
                            });

                        } catch (e) {
                            this.errors.push(e)
                        }
                    }

                }
            },
            async selectFile(page = 1) {
                this.files = []
                let url = '/isg-oreo/api/omics/' + this.omics.id + '/files'
                const params = new URLSearchParams();
                params.append('type', this.type.name)
                params.append('group', this.dataType)
                params.append('omicsId', this.omics.id)
                params.append('firstIndex', (this.fileList.data.currentPage - 1) * this.fileList.data.numberOfRows)
                params.append('rowSize', this.fileList.data.numberOfRows)
                params.append('currentPage', page)
                const resultList = await axios.get(url, {params: params});
                console.log("resultList", resultList)
                this.fileList.data = resultList.data

            },
            async remove(){

                console.log(this.selectedFile)
                let url = '/isg-oreo/api/omics/' + this.omics.id + '/files?action=REMOVE'
                console.log(url)
                const resultList = await axios.put(url, this.selectedFile);
                this.$alert(resultList.data.list.length + '건 삭제 되었습니다','처리 완료 되었습니다.','info')
            },
            onSampleModal(){
               let type = this.type && ''
              console.log('???????????11','sample-modal'+this.type.name);
              this.$bvModal.show('sample-modal'+this.type.name)
            }

        }
    }
</script>

