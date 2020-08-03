<template>
    <!-- Step 4 -->
    <div class="wizard-step">

        <h2 class="h2">오믹스 데이터 등록 절차</h2>
        <div class="form-card">
            <div class="card-body-bg">
                <h3 class="h3">오믹스 데이터 등록절차 도식도</h3>
                <!--<img src="../images/oreo-logo.png" alt="">-->
            </div>
            <div class="card-text text-left mt-3">
                오믹스 데이터 등록 동의서 다운로드: <i class="xi-paperclip"></i>
                <input class="btn-link" type="button" value="등록동의서.hwp"><br>
                제3자 정보제공 동의서: <i class="xi-paperclip"></i>
                <input class="btn-link" type="button" value="제3자정보제공동의서.hwp">
            </div>
        </div>

        <h2 class="h2">오믹스 데이터 등록 절차</h2>
        <table class="view-table">
            <caption class="sr-only">오믹스 데이터 등록 절차</caption>
            <tbody>
            <tr>
                <th scope="row">등록 동의서</th>
                <td>
                    <div v-show="hasDepositFile()" aria-hidden="false" class="" style="">
                        <a class="btn-link"
                           type="button"
                           style="margin-top: 7px;"
                           @click="download(depositFile.id)"
                        >
                            {{depositFile.name }} ({{ (depositFile.size == undefined ? 0 : depositFile.size) | byte }})

                        </a>
                        <button class="btn-outline-secondary"
                                style="float: right;"
                                data-placement="top"
                                title=""
                                @click="remove(depositFile.id)"
                                data-original-title="삭제"
                        >
                            <i class="xi-trash"></i>
                            <span class="sr-only">삭제</span>
                        </button>
                    </div>
                    <div class="custom-file ng-hide"
                         v-show="!hasDepositFile()"
                         aria-hidden="true" style=""
                    >
                        <label class="custom-file-label"
                               data-toggle="tooltip"
                               data-placement="top"
                               title=""
                               data-original-title="업로드"
                        >

                            <!-- upload -->
                            <file-upload
                                    class=""
                                    input-id='updatetValueDeposit'
                                    post-action="/isg-oreo/temporary/files"
                                    v-model="files['deposit']"
                                    ref="updatetValueDeposit"
                                    @input-file="inputFileDeposit"
                                    @input-filter="inputFilter"
                                    @input="updatetValueDeposit"
                            >
                                <i class="xi-file-upload"></i><span class="sr-only">업로드</span>
                            </file-upload>

                        </label>
                    </div>
                </td>
            </tr>
            <tr>
                <th scope="row">제3자 정보제공 동의서</th>
                <td>
                    <div v-show="hasProvideFile()" aria-hidden="false" class="" style="">
                        <a class="btn-link"
                           type="button"
                           style="margin-top: 7px;"
                           @click="download(provideFile.id)"
                        >
                            {{provideFile.name }} ({{ (provideFile.size == undefined ? 0 : provideFile.size) | byte }})
                        </a>

                        <button class="btn-outline-secondary"
                                style="float: right;"
                                data-placement="top"
                                title=""
                                @click="remove(provideFile.id)"
                                data-original-title="삭제"
                        >
                            <i class="xi-trash"></i>
                            <span class="sr-only">삭제</span>
                        </button>
                    </div>
                    <div class="custom-file ng-hide"
                         v-show="!hasProvideFile()"
                         aria-hidden="true" style=""
                    >
                        <label class="custom-file-label"
                               data-toggle="tooltip"
                               data-placement="top"
                               title=""
                               data-original-title="업로드"
                        >
                            <!-- ngRepeat: file in depositUploader.fileList -->

                            <!-- upload -->
                            <file-upload
                                    input-id='updatetValueProvide'
                                    post-action="/isg-oreo/temporary/files"
                                    v-model="files['provide']"
                                    ref="updatetValueProvide"
                                    @input-file="inputFileProvide"
                                    @input-filter="inputFilter"
                                    @input="updatetValueProvide"
                            >
                                <i class="xi-file-upload"></i><span class="sr-only">업로드</span>
                            </file-upload>

                        </label>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <!--
        로그 분석용
        <div>등록동의서 {{depositFile}} </div>
        <div>등록동의서 : {{hasDepositFile()}} </div>
        <div>3자 정보제공 동의서 {{provideFile}} </div>
        <div>3자 정보제공 동의서 : {{hasProvideFile()}} </div>
        -->
    </div>
</template>

<script>
    import axios from "../../../utils/axios";
    import FileUpload from 'vue-upload-component'

    export default {
        name: "OmicsDataStep4",
        props: ['omics'],
        components: {FileUpload},
        computed: {},
        created() {
            this.selectFile()
            document.charset = 'utf-8'
        },
        data() {
            return {
                depositFile: {},
                provideFile: {},
                fileList: {
                    total: 2,
                    currentPage: 1,
                    numberOfRows: 2,
                    list:
                        []
                },
                files: {
                    deposit: {},
                    provide: {}
                }
            }
        },
        methods: {
            hasProvideFile() {
                return this.provideFile.id != undefined ? true : false

            },
            hasDepositFile() {
                return this.depositFile.id != undefined ? true : false
            },
            async selectFile(page = 1) {
                this.files = []
                let url = '/isg-oreo/api/attachments'
                const params = new URLSearchParams();
                params.append('omicsId', this.omics.id)
                const resultList = await axios.get(url, {params: params});
                console.log("resultList", resultList)
                this.fileList = resultList.data

                const deposit = this.fileList.list.filter((v) => {
                    return v.type == 'deposit'
                })
                const provide = this.fileList.list.filter((v) => {
                    return v.type == 'provide'
                })

                console.log('deposit', deposit)
                console.log('provide', provide)

                if (deposit.length != 0) {
                    this.depositFile = deposit[0]
                }

                if (provide.length != 0) {
                    this.provideFile = provide[0]
                }
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
            inputFileDeposit(newFile, oldFile) {
                if (newFile && !oldFile) {
                    // add
                    //등록과 동시에 업로드 시작
                    console.log("add1")
                    this.$refs.updatetValueDeposit.active = true
                    this.$refs[this.type.name].active = true
                    //this.errors = []
                }
            },
            inputFileProvide(newFile, oldFile) {
                if (newFile && !oldFile) {
                    console.log("add2")
                    //등록과 동시에 업로드 시작
                    this.$refs.updatetValueProvide.active = true
                    //this.errors = []
                }
            },

            fileUloaAfter(type, item) {
                console.log(type)
                const url = '/isg-oreo/api/attachments?omicsId=' + this.omics.id + '&type=' + type
                item.response['type'] = type
                item.response['omicsId'] = this.omics.id

                this.$axios.post(url, item.response).catch((error) => {
                    if (error.response) {
                        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                        //          this.errors.push(error.response.data)
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
                    //문제가 없으면 화면을 갱신
                    this.selectFile();
                });
            },
            updatetValueDeposit(valueArr) {

                if (this.$refs['updatetValueDeposit'] && this.$refs['updatetValueDeposit'].uploaded) {
                    console.log("???????????????????????????")
                    for (let item of valueArr) {

                        try {
                            this.fileUloaAfter('deposit', item)

                        } catch (e) {
                            //    this.errors.push(e)
                        }
                    }

                }
            },
            updatetValueProvide(valueArr) {

                if (this.$refs['updatetValueProvide'] && this.$refs['updatetValueProvide'].uploaded) {
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                    for (let item of valueArr) {
                        try {
                            this.fileUloaAfter('provide', item)
                        } catch (e) {
                            //    this.errors.push(e)
                        }
                    }
                }
            },
            remove(id) {
                const url = '/isg-oreo/api/attachments/' + id
                this.$axios.delete(url, {}).catch((error) => {
                    if (error.response) {
                        this.$alert('', error.response, 'error');
                    }
                }).then((response) => {
                    console.log('123', response.data.id)
                    if (response.data.id == this.depositFile.id) {
                        this.depositFile = {}
                    } else if (response.data.id == this.provideFile.id) {
                        this.provideFile = {}
                    }
                })
            },
            download(id) {
                const url = '/isg-oreo/api/attachments/' + id


                this.$axios.get(url, {
                    // include your additional POSTed data here
                    responseType: "application/octet-stream"
                }).then((response) => {
                    let blob = new Blob([response.data], {type: "application/octet-stream"}),
                        url = window.URL.createObjectURL(blob);
                    window.open(url, "_self");
                }).catch((error) => {
                    console.log(error)
                });
            }
        }
    }
</script>

<style scoped>

</style>
