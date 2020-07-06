<template>
    <div class="container">
      <section class="mT-60">
        <h3 class="h3 title-section mB-30"><img src="../images/arg-search-ico-sm.png" alt="분석 결과">분석 결과</h3>
        <h4 class="h4 mB-20">{{ analysis.analNm }} 상세보기 <button type="button" title="재분석" class="btn btn-default mL-15">재분석</button></h4>
        
        <!-- 분석정보 -->
        <div class="mB-20">
          <table class="table-view table-thead">
            <colgroup>
              <col style="width: 260px">
              <col>
            </colgroup>
            <thead>
              <tr>
                <th colspan="2" class="th-title">분석정보</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="th-title">분석명</th>
                <td>{{ analysis.analNm }}</td>
              </tr>
              <tr>
                <th class="th-title">분석옵션</th>
                <td><a title="상세보기" class="pointer a-link" data-toggle="modal" data-target="#modal-anlysis-option">상세보기</a></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 분석요약 -->
        <div class="mB-20">
          <table class="table-view table-thead">
            <colgroup>
              <col style="width: 260px">
              <col>
              <col style="width: 260px">
              <col>
            </colgroup>
            <thead>
              <tr>
                <th colspan="4" class="th-title">분석요약</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="th-title">분석 서열 수 (분석서열/전체서열)</th>
                <td class="text-right">{{ `${analysisOption.analysisCount} / ${analysisOption.totalCount}` }}</td>
                <th class="th-title">탐색된 보존 영역 서열 수</th>
                <td class="text-right">{{ analysisOption.probeCount }}</td>
              </tr>
              <tr>
                <th class="th-title">평균 보존 영역 서열 길이</th>
                <td class="text-right">{{ summary.meanCsSqcLn }}</td>
                <th class="th-title">보존 영역 별 평균 서열 수</th>
                <td class="text-right">{{ summary.meanCsNsqc }}</td>
              </tr>
            </tbody>
          </table>
        </div>   
        <!-- 
        <div class="mB-20">
          <table class="table-view table-thead">
            <colgroup>
              <col>
              <col>
              <col>
              <col>
              <col>
              <col>
              <col>
            </colgroup>
            <thead>
              <tr>
                <th colspan="7" class="th-title">보존영역서열 (Conserved region Sequence) 상세 보기</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="th-title">서열 ID</th>
                <th class="th-title">% GC</th>
                <th class="th-title">서열길이(bp)</th>
                <th class="th-title">불일치  염기수 (mismatch)</th>
                <th class="th-title">다중 서열 정렬(aln)</th>
                <th class="th-title">서열 다운로드 (fasta)</th>
                <th class="th-title">서열</th>
              </tr> 
              <tr v-for="(probe) in probeList" :key="probe.probeId">
                <td>{{`probe ${probe.probeId}`}}</td>
                <td>{{ probe.cnsvGc }}</td>
                <td>{{ probe.cnsvSqcLn }}</td>
                <td>{{ probe.mismatchCount }}</td>   
                <td><a class="pointer" @click="download(probe.msaFileId)" title="다중 서열 정렬(aln)" download><i class="xi-file-download"><span class="sr-only">다중 서열 정렬 다운로드</span></i></a></td>
                <td><a class="pointer" @click="download(probe.fasFileId)" title="보존영역 서열 다운로드 (fasta)" download><i class="xi-file-download"><span class="sr-only">보존영역 서열 다운로드</span></i></a></td>
                <td><a class="pointer" @click="modalSeq(probe.cnsvSqc)" title="서열팝업" download><i class="xi-download"><span class="sr-only">서열팝업</span></i></a></td>
              </tr>           
            </tbody>
          </table>
        </div>         
       -->
        <!-- 보존영역서열 (Conserved region Sequence) 상세 보기 -->
        <template v-for="(probe, index) in probeList">
        <h4 class="h4 mB-20">보존영역서열 {{ index + 1 }}</h4>
        <div class="mB-20">
          <table class="table-view table-thead">
            <colgroup>
              <col style="width: 260px">
              <col>
              <col style="width: 260px">
              <col>
            </colgroup>
            <thead>
              <tr>
                <th colspan="4" class="th-title">보존영역서열 (Conserved region Sequence) 상세 보기</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="th-title">서열길이(bp)</th>
                <td class="text-right">{{ probe.cnsvSqcLn }}</td>
                <th class="th-title">불일치  염기수 (mismatch)</th>
                <td class="text-right">{{ probe.mismatchCount }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 보존영역서열 -->
        <div class="mB-20">
          
          <table class="table-view table-thead">
            <thead>
              <tr>
                <th class="th-title">보존영역 서열</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="font-family-courier" v-html="formatProbeSeq(probe.cnsvSqc, probe.locations)"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 다운로드 -->
        <div class="mB-20 area-download">
          <div class="row">
            <div class="col-xs-4">
              <div class="bg-gray">
                <div class="col-xs-10 text-left">다중 서열 정렬(aln)</div>
                <div class="col-xs-2 text-right"><a class="pointer" @click="download(probe.msaFileId)" title="다중 서열 정렬(aln)" download><i class="xi-download"><span class="sr-only">다중 서열 정렬 다운로드</span></i></a></div>
              </div>
            </div>
            <div class="col-xs-4">
              <div class="bg-gray">
                <div class="col-xs-10 text-left">보존영역 서열 다운로드 (fasta)</div>
                <div class="col-xs-2 text-right"><a class="pointer" @click="download(probe.fasFileId)" title="보존영역 서열 다운로드 (fasta)" download><i class="xi-download"><span class="sr-only">보존영역 서열 다운로드</span></i></a></div>
              </div>
            </div>
            <div class="col-xs-4">
              <div class="bg-gray">
                <div class="col-xs-10 text-left">리포트 다운로드</div>
                <div class="col-xs-2 text-right"><a class="pointer" @click="download(probe.rptFileId)" title="리포트 다운로드" download><i class="xi-download"><span class="sr-only">리포트 다운로드</span></i></a></div>
              </div>
            </div>
          </div>
        </div>         
        </template>
        <div class="wrap-btn text-right mB-120">
          <button @click="$router.go(-1)" type="button" title="List" class="btn btn-primary btn-radius">List</button>
        </div>
      </section>

      <div class="modal fade" id="modal-anlysis-option" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="btn close" data-dismiss="modal" aria-label="Close"><i class="xi-close"></i><span class="sr-only">Close</span></button>
              <h4 class="modal-title">{{ $route.params.analNm }} 분석옵션 상세보기</h4>
            </div>
            <div class="modal-body">
              <div class="pB-20">
                <table class="table-view">
                  <colgroup>
                    <col style="width: 167px;">
                    <col>
                  </colgroup>
                  <tbody>
                    <tr>
                      <th class="th-title">내성 항생제</th>
                      <td>{{ analysisOption.ab }}</td>
                    </tr>
                    <tr>
                      <th class="th-title">항생제 내성 Class</th>
                      <td>{{ `${analysisOption.arcNm} > ${analysisOption.artp}` }}</td>
                    </tr>
                    <tr>
                      <th class="th-title">선택된 종 목록</th>
                      <td>
                        <template v-for="row in analysisTaxonList">
                          {{ row.name }} <br>
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <table class="table-view table-thead">
                  <colgroup>
                    <col style="width: 167px;">
                    <col>
                    <col>
                  </colgroup>
                  <thead>
                    <tr>
                      <th colspan="3" class="th-title">분석 옵션</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th rowspan="4" class="th-title">서열 클러스터링<br>옵션</th>
                      <th>서열간 최소 유사도<br>(% identity)</th>
                      <td class="text-right">{{ analysisOption.clMinIdnty }}</td>
                    </tr>
                    <tr>
                      <th>서열간 최소 coverage (%)</th>
                      <td class="text-right">{{ analysisOption.clMinCvrg }}</td>
                    </tr>
                    <tr>
                      <th>클러스터별 최소 서열 수</th>
                      <td class="text-right">{{ analysisOption.clMinSqc }}</td>
                    </tr>
                    <tr>
                      <th>최소 서열 길이</th>
                      <td class="text-right">{{ analysisOption.clMinSlen }}</td>
                    </tr>
                    <tr>
                      <th rowspan="2" class="th-title">보존 영역<br>탐색 옵션</th>
                      <th>보존 영역 최소 서열 길이 (bp)</th>
                      <td class="text-right">{{ analysisOption.csMinSlen }}</td>
                    </tr>
                    <tr>
                      <th>보존영역내 최소 서열 유사도 (% identity)</th>
                      <td class="text-right">{{ analysisOption.csMinIdnty }}</td>
                    </tr>
                  </tbody>
                </table>
            </div>
            <div class="modal-footer text-center">
              <button type="button" title="Close" data-dismiss="modal" class="btn btn-primary-border btn-radius">Close</button>
            </div>
          </div>
        </div>
      </div>      
    </div>
  
</template>

<script>
import { mapGetters} from 'vuex'

export default {
  name: 'AnalysisDetail',
  components: {
  },
  data() {
    return {
    }
  },
  created() {
    this.$store.dispatch('loadOne', {
      url: '/api/analysis/selectAnalysis.do',
      params: {
        rstId: this.$route.params.rstId,
        paramId: this.$route.params.paramId,
      }
    })
  },
 
  computed: {
    ...mapGetters(['result']),
    analysis() {
      return this.result.analysis == null ? {} : this.result.analysis
    },
    summary() {
      return this.result.summary == null ? {} : this.result.summary
    },
    probeList() {
      return this.result.probeList == null ? {} : this.result.probeList
    },
    analysisOption() {
      return this.result.analysisOption == null ? {} : this.result.analysisOption
    },
    analysisTaxonList() {
      return this.result.analysisTaxonList == null ? [] : this.result.analysisTaxonList
    },
 

  },
  mounted() {
  },
  
  methods: {
    //파일 다운로드
    download(fileId) {
      this.$axios.post('/api/fileMng/download.do', fileId, {responseType: 'arraybuffer'})
        .then(response => {
          let blob = new Blob([response.data], { type: response.headers['content-type'] })
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = Date.now()
          link.click()          
        })      
    },
    //특정 위치의 문자의 색상을 변경하고 60자리 마다 줄바꿈한다.
    formatProbeSeq(cnsvSqc, locations) {
      let arrSeq = [...cnsvSqc]
      let locationList = locations.split(',')
      locationList.forEach(location => {
        let alphabet = arrSeq[location-1]
        arrSeq[location-1] = `<font color="red">${alphabet}</font>`
      });

      let returnIndex = 60
      let arrLength = arrSeq.length
      let quotient = parseInt(arrLength / returnIndex)

      for (let step = 0; step < quotient; step++) {
        arrSeq.splice(returnIndex * (step + 1) + step, 0, '<br>')
      }      

      return arrSeq.join('')
    }   
  }
}
</script>
<style>
.pointer {
  cursor:pointer;
}
</style>
