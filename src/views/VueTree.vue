<template>
  <div class="container">
    <section class="section-search mT-60">
      <h3 class="h3 title-section mB-30"><img src="../images/arg-blast-ico-s.png" alt="BLAST">TREE</h3>
     <!-- <pre class="result">{{ value }}</pre>-->
      <div id="app">
        <treeselect v-model="value"
                    valueFormat="object"
                    :multiple="true"
                    :options="options"
                    :flatten-search-results="true"
                    :showCount="true"
                    maxheight="500">

          <label slot="option-label" slot-scope="{ node, shouldShowCount, count, labelClassName }" :class="labelClassName">
              <span v-if="node.raw.node_rank == 'species'" v-bind:style="{color : 'blue'}"> {{node.label}} </span>
              <span v-if="node.raw.node_rank != 'species'" > {{node.label}} </span>
          </label>
        </treeselect>
          <button v-on:click="getArraySpecies">종 가져오기</button>
      </div>
    </section>
  </div>
</template>

<script>
    // import the component
    import Treeselect from '@riophae/vue-treeselect'

    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    export default {
        //목록을 조회 한다.
        components: { Treeselect },
        data: () => ({
            value: null,

                // define the default value
            // define options
            options: [],}
            ),
        created() {
            this.$axios.get('/api/common/selectTaxonTreeList.do').then((response) => {
                //트리로 변환할 배열
                //list = JSON.stringify(list, null, "    ");
                var trees = this.getTreeModel( response.data, 2146526);
                this.options = trees;
                //트리 모델로 변환
            })
        },
        methods: {
            getArraySpecies: function () {
                var jsonToStr = JSON.stringify(this.value);
                var strToJson = JSON.parse(jsonToStr);
                var _arrayModel = [];
                console.log(this.getArrayModel(strToJson, _arrayModel));
            },
            getArrayModel(_Json, _arrayModel){
                for(var i=0; i<_Json.length; i++){
                    if(_Json[i].node_rank === 'species'){
                        //console.log(_Json[i].node_rank, _Json[i].id);
                        _arrayModel.push(_Json[i].id);
                        //console.log(_arrayModel);
                        if( typeof _Json[i].children != "undefined")
                        {
                            this.getArrayModel(_Json[i].children, _arrayModel);
                        }
                    }else{
                        if( typeof _Json[i].children != "undefined")
                        {
                            this.getArrayModel(_Json[i].children, _arrayModel);
                        }
                    }
                }
                return _arrayModel;
            },
                            //트리 모델 변환 메서드
                           getTreeModel ( _list, _rootId ) {
                                //최종적인 트리 데이터
                                var _treeModel = [];
                                //전체 데이터 길이
                                var _listLength = _list.length;
                                //트리 크기
                                var _treeLength = 0;
                                //반복 횟수
                                var _loopLength = 0;
                                //재귀 호출
                                function getParentNode ( _children, item ) {
                                    //전체 리스트를 탐색
                                    for ( var i=0, child; child = _children[i]; i++ ) {
                                        if ( child.id === item.parentId ) {
                                            //부모를 찾았으면,
                                            var view =
                                                {
                                                    "id" : item.id,
                                                    "label" : item.name,
                                                    "node_rank" : item.nodeRank,
                                                };
                                            if(item.childExst){
                                                view.children = [];
                                            }
                                            if(item.nodeRank == 'species'){
                                                view.isNew = true;
                                             }
                                            //현재 요소를 추가하고
                                            child.children.push(view);
                                            //트리 크기를 반영하고,
                                            _treeLength++;
                                            //데이터상에서는 삭제
                                            _list.splice( _list.indexOf(item), 1 );
                                            //현재 트리 계층을 정렬
                                            child.children.sort(function(a, b)
                                            {
                                                return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
                                            });
                                            break;
                                        }
                                        //부모가 아니면,
                                        else
                                        {
                                              if( typeof child.children != "undefined")
                                              {
                                                  getParentNode(child.children, item );
                                              }
                                        }

                                    }
                                }
                                //트리 변환 여부 + 무한 루프 방지
                                while ( _treeLength != _listLength && _listLength != _loopLength++ ) {
                                    //전체 리스트를 탐색
                                    for ( var i=0, item; item = _list[i]; i++ ) {
                                        //최상위 객체면,
                                        if ( item.parentId === _rootId ) {
                                              var view =
                                                  {
                                                      "id" : item.id,
                                                      "label" : item.name,
                                                      "node_rank" : item.nodeRank,
                                                      "children" : []
                                                  };
                                            //현재 요소를 추가하고,
                                            _treeModel.push(view);
                                            //트리 크기를 반영하고,
                                            _treeLength++;
                                            //데이터상에서는 삭제
                                            _list.splice(i, 1);
                                            //현재 트리 계층을 정렬
                                            _treeModel.sort( function ( a, b )
                                            {
                                                return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
                                            });
                                            break;
                                        }
                                        //하위 객체면,
                                        else {
                                            //
                                            getParentNode( _treeModel, item );
                                        }
                                    }
                                }
                                return _treeModel;
                            },

    }
    }
</script>