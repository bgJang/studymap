import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';

cytoscape.use(coseBilkent);

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
            "id": 'cpp',
            "url": '',
            "label": 'C++', 
            "rank" : 1
        }
    }, 
    {
        // C++ 스터디 
        "data": {
            "id": 'cpp_study',
            "url": '',
            "label": 'C++ 스터디', 
            "rank" : 2
        }
    },
    {
        // C++ 블로그 
        "data": {
            "id": 'cpp_blog',
            "url": '',
            "label": 'C++ 블로그', 
            "rank" : 3
        }
    },
    {   // node : 씹어먹는 C++
        "data": {
            "id": 'cpp_modoo',
            "url": 'https://modoocode.com/135',
            "label": '씹어먹는 C++', 
            "rank" : 5
        }
    }, 

    {   // C++ -> C++ 스터디
        "data": {
            "id": 'cpp_title->cpp_study',
            "source": 'cpp_study',
            "target":'cpp'
        }
    },    
    {   // C++ -> C++ 블로그
        "data": {
            "id": 'cpp_title->cpp_blog',
            "source": 'cpp_blog',
            "target":'cpp'
        }
    },
    {   // edge : C++ 스터디 ->씹어먹는 C++
        "data": {
            "id": 'cpp_study->cpp_modoo',
            "source": 'cpp_modoo',
            "target":'cpp_study'
        }
    }
];



const cy_for_rank = cytoscape({
    elements: data
});
// rank를 활용하기 위해 data만 입력한 cytoscape 객체입니다

const pageRank = cy_for_rank.elements().pageRank();



// 별도로 가중치를 주려 했는데 안예뻐서 일단 pass.

// elements들의 rank들입니다.
// Source로 이용되는 숫자에 따라 크기를 결정한다.
// let pageRanks = [];

// for(var i = 0; i < Object.keys(data).length; i++) {
//     if(data[i]["data"].label) { 
//         pageRanks[data[i]["data"].id] = data[i]["data"].rank;
//     }
// }
// console.log(pageRanks);




const nodeMaxSize = 50;
const nodeMinSize = 5;
const fontMaxSize = 8;
const fontMinSize = 5;
// 추후 마우스 인/아웃 시에도 활용해야 하니 node와 font의 최대값/최소값은 변수로 빼줍니다



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
                'label' : 'data(label)', // id 대신 label 표시
                'width': function (ele) {
                    // return nodeMaxSize * (5 - pageRanks[ele.id()]) + nodeMinSize;
                    return nodeMaxSize *  pageRank.rank('#' + ele.id())  + nodeMinSize;

                },
                'height': function (ele) {
                    // return nodeMaxSize *  (5 - pageRanks[ele.id()]) + nodeMinSize;
                    return nodeMaxSize *  pageRank.rank('#' + ele.id()) + nodeMinSize;
                },
                'font-size': function (ele) {
                    // return fontMaxSize * (5 - pageRanks[ele.id()]) + fontMinSize;
                    return fontMaxSize *   pageRank.rank('#' + ele.id()) + fontMinSize;
                }
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
                // 'target-arrow-color': '#ccc', 
                // // 'target-arrow-shape': 'triangle'
                // 'target-arrow-shape': 'vee'
                
                // 화살표 방향 Source <- Target
                'source-arrow-color': '#ccc',
                'source-arrow-shape': 'vee'
            }
        }
    ],

    // layout: {
    //     name: 'grid',
    //     rows: 5
    // }
    layout: {
        name: 'cose-bilkent',
        animate: false,
        gravityRangeCompound: 1.5,
        fit: true,
        tile: true
    }

});

cy.on('tap', function (e) {
    const url = e.target.data('url')
    if (url && url !== '') {
        window.open(url);
    }
});
