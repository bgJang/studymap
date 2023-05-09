import cytoscape from 'cytoscape';
import './style.css';
// webpack���� ������� �ϴ� css������ �������� index.js �� import �մϴ�

/* 
{
    // node 
    "data": {
        "id": 'id',
        "url": '��ũ�ɰ� ���� �ּ�(�ɼ�)',
        "label": 'ǥ���ϰ� ���� ����(�ɼ�)'
    }
}
*/

/* 
{   // edge
    "data": {
        "id": 'id',
        "source": '������ ��� �� ������ �� node id',
        "target":'������ ��� �� ������ �� node id'
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
    {   // node : C++ ����
        "data": {
            "id": 'cpp_start',
            "url": '',
            "label": 'C++ ����!'
        }
    }, 

    {   // edge : C++->C++ ����
        "data": {
            "id": 'cpp_title->cpp_start',
            "source": 'cpp_title',
            "target":'cpp_start'
        }
    }
];

// �Ʒ��� ���� ����Ʈ�� �ö�� �ִ� ���� �ڵ��Դϴ�
var cy = cytoscape({

    container: document.getElementById('cy'), // container to render in

    elements: data,

    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-color': '#666',
                //'label': 'data(id)'
                'label' : 'data(label)' // id ��� label ǥ��
            }
        },

        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle'
            }
        }
    ],

    layout: {
        name: 'grid',
        rows: 5
    }

});
