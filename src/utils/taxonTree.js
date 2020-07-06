export default function createTaxonTree( _list) {
        var _rootId =  2146526   
    
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
                //부모를 찾았으면,
                if ( child.id === item.parentId ) {
                      if(item.childExst){
                        var view =
                          {
                              "id" : item.id,
                              "label" : item.name,
                              "nodeRank" : item.nodeRank,
                              "ncbiTaxonId" : item.ncbiTaxonId,
                              "children" : []
                          };
                      }else{
                          var view =
                              {
                                  "id" : item.id,
                                  "label" : item.name,
                                  "ncbiTaxonId" : item.ncbiTaxonId,
                                  "nodeRank" : item.nodeRank
                              };
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
                              "nodeRank" : item.nodeRank,
                              "ncbiTaxonId" : item.ncbiTaxonId,
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

        console.log('_treeModel', _treeModel)
        return _treeModel;
    
}