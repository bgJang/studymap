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



// node & font size
const nodeMaxSize = 50;
const nodeMinSize = 5;
const nodeActiveSize = 28;
const fontMaxSize = 8;
const fontMinSize = 5;
const fontActiveSize = 7;


const edgeWidth = '2px';
var edgeActiveWidth = '4px';
const arrowScale = 0.8;
const arrowActiveScale = 1.2;
// edge & arrow 크기값

const dimColor = '#dfe4ea';
const edgeColor = '#ced6e0';
const nodeColor = '#57606f';
const nodeActiveColor = '#ffa502';

const successorColor = '#ff6348';
// 상위 node & edge color
const predecessorsColor = '#1e90ff';
// 하위 node & edge color


// 아래는 공식 사이트에 올라와 있는 예제 코드입니다
var cy = cytoscape({

    container: document.getElementById('cy'), // container to render in

    elements: data,

    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-color': nodeColor,
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
                },
                'color': nodeColor
            }
        },

        {
            selector: 'edge',
            style: {
                'width': edgeWidth,
                'line-color': edgeColor,
                // 화살표
                'curve-style': 'bezier', 
                // 화살표 방향 Source -> Target
                // 'target-arrow-color': '#ccc', 
                // // 'target-arrow-shape': 'triangle'
                // 'target-arrow-shape': 'vee'
                
                // 화살표 방향 Source <- Target
                'source-arrow-color': '#ccc',
                'source-arrow-shape': 'vee',
                'arrow-scale': arrowScale
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

cy.on('tapstart mouseover', 'node', function (e) {
    setDimStyle(cy, {
        'background-color': dimColor,
        'line-color': dimColor,
        'source-arrow-color': dimColor,
        'color': dimColor
    });

    setFocus(e.target, successorColor, predecessorsColor, edgeActiveWidth, arrowActiveScale);
});

cy.on('tapend mouseout', 'node', function (e) {
    setResetFocus(e.cy);
});

// 추가되는 부분                                              
let resizeTimer;

window.addEventListener('resize', function () {
    this.clearTimeout(resizeTimer);
    resizeTimer = this.setTimeout(function(){
        cy.fit();
    },200);
});


function setDimStyle(target_cy, style) {
    target_cy.nodes().forEach(function (target) {
        target.style(style);
    });
    target_cy.edges().forEach(function (target) {
        target.style(style);
    });
}

function setFocus(target_element, successorColor, predecessorsColor, edgeWidth, arrowScale) {
    target_element.style('background-color', nodeActiveColor);
    target_element.style('color', nodeColor);
    target_element.successors().each(function (e) {
        // 상위  엣지와 노드
        if (e.isEdge()) {
            e.style('width', edgeWidth);
            e.style('arrow-scale', arrowScale);
        }
        e.style('color', nodeColor);
        e.style('background-color', successorColor);
        e.style('line-color', successorColor);
        e.style('source-arrow-color', successorColor);
        setOpacityElement(e, 0.5);
    }
    );
    target_element.predecessors().each(function (e) {
        // 하위 엣지와 노드
        if (e.isEdge()) {
            e.style('width', edgeWidth);
            e.style('arrow-scale', arrowScale);
        }
        e.style('color', nodeColor);
        e.style('background-color', predecessorsColor);
        e.style('line-color', predecessorsColor);
        e.style('source-arrow-color', predecessorsColor);
        setOpacityElement(e, 0.5);
    });
    target_element.neighborhood().each(function (e) {
        // 이웃한 엣지와 노드
        setOpacityElement(e, 1);
    }
    );
    target_element.style('width', Math.max(parseFloat(target_element.style('width')), nodeActiveSize));
    target_element.style('height', Math.max(parseFloat(target_element.style('height')), nodeActiveSize));
    target_element.style('font-size', Math.max(parseFloat(target_element.style('font-size')), fontActiveSize));
}

function setOpacityElement(target_element, degree) {
    target_element.style('opacity', degree);
}

function setResetFocus(target_cy) {
    target_cy.nodes().forEach(function (target) {
        target.style('background-color', nodeColor);
        var rank = pageRank.rank(target);
        target.style('width', nodeMaxSize * rank + nodeMinSize);
        target.style('height', nodeMaxSize * rank + nodeMinSize);
        target.style('font-size', fontMaxSize * rank + fontMinSize);
        target.style('color', nodeColor);
        target.style('opacity', 1);
    });
    target_cy.edges().forEach(function (target) {
        target.style('line-color', edgeColor);
        target.style('source-arrow-color', edgeColor);
        target.style('width', edgeWidth);
        target.style('arrow-scale', arrowScale);
        target.style('opacity', 1);
    });
}
