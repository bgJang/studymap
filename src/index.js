import cytoscape from 'cytoscape';
import './style.css';
// webpack으로 묶어줘야 하니 css파일을 진입점인 index.js 에 import 합니다

/* 
{
    // node 
    "data": {
        "id": 'id',
        "url": '링크걸고 싶은 주소(옵션)',
        "label": '표시하고 싶은 내용(옵션)'
    }
}
*/

/* 
{   // edge
    "data": {
        "id": 'id',
        "source": '연결할 노드 중 상위에 둘 node id',
        "target":'연결할 노드 중 하위에 둘 node id'
    }
}
*/

const data = [ // list of graph elements to start with
    {   // node : C++
        "data": {
            "id": 'cpp_title',
            // "url": '',
            "label": 'C++'
        }
    }, 
    {   // node : C++ 시작
        "data": {
            "id": 'cpp_start',
            "url": '',
            "label": 'C++ 시작!!!'
        }
    }, 

    {   // edge : C++->C++ 시작
        "data": {
            "id": 'cpp_title->cpp_start',
            "source": 'cpp_title',
            "target":'cpp_start'
        }
    }
];

// 아래는 공식 사이트에 올라와 있는 예제 코드입니다
var cy = cytoscape({

    container: document.getElementById('cy'), // container to render in

    elements: data,

    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-color': '#666',
                //'label': 'data(id)'
                'label' : 'data(label)' // id 대신 label 표시
            }
        },

        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                
                // 화살표
                'curve-style': 'bezier',

                // 화살표 방향 Source -> Target
                'target-arrow-color': '#ccc',
                // 'target-arrow-shape': 'triangle'
                'target-arrow-shape': 'vee'
                
            }
        }
    ],

    layout: {
        name: 'grid',
        rows: 5
    }

});
