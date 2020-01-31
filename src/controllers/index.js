/**
 * This controller prepares the data received from the client's HTTP requests
 * to be used by the services methods. After completition, it foward its output to the client.
 */

// Required services
const { fetchStreams, saveEvent } = require('../services');
const loadash = require('lodash');

// This function is chaining two asynchronous calls to services.
const saveStreamstoEvent = async function (req, res) {
    const { source, backup } = req.body;
    try {
        const streamsResp = await fetchStreams(source, backup);
        intersectStreams(streamsResp[0].streams[0], streamsResp[1].streams[0]);
        const eventResp = await saveEvent(backup, 
            streamsResp[0].streams.concat(streamsResp[1].streams));
        res.json(eventResp);
    } catch (e) {
        console.error('Error while fetching stream or saving event', e);
        res.sendStatus(500);
    }
};


function intersectStreams(s1, s2){
    // console.log(s1,s2);
    var linkArray = [];
    var linkArray2 = [];
    var intersectFin = [];

    function flatTree(tree, arr){
        arr.push(tree);
        if (tree.children){
            for (var i=0; i < tree.children.length; i++){
                flatTree(tree.children[i], arr);
            }
        }            
    }

    flatTree(s1, linkArray);
    flatTree(s2, linkArray2);

    for (var i=0; i < linkArray.length ; i++) {
        for (var j=0; j < linkArray2.length ; j++){
            if ((linkArray[i].id == linkArray2[j].id) && (linkArray[i].parentId == linkArray2[j].parentId)) {
                intersectFin.push(linkArray[i].id);
            }
        }
    }

    var intersecTree = {};

    function constructTree(tree, _intersect){
        if (_intersect.includes(tree.id)){
            var treeClone = loadash.cloneDeep(tree);
            treeClone.children = null;
            // ``if (!intersecTree)`` doesn't work
            if (Object.keys(intersecTree) == 0) {
                intersecTree = treeClone;
            } else {
                intersecTree['children'] = treeClone;
            }
        }

        for (var i=0; i < tree.children.length; i++){
            constructTree(tree.children[i], _intersect);
        }          
    }
    
    constructTree(s1, intersectFin);

    console.log(intersecTree);
}

module.exports = {
    saveStreamstoEvent
};
