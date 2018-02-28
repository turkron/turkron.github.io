var contentList = {
    KellyMoutou: {
        text:"Built a website for my fiancée to help her establish herself as a start up potter.",
        content:"<iframe width=\"100%\" height=\"100%\" src=\"Portfolio/Pottery%20practice.html\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>"
    },
    undefined:{
        text:"this param is not found",
        content:"<p>undefined</p>"
    }
};



function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var getContentFromList = function (item, list) {
        if(!_.isUndefined(list[item])){
            return list[item];
        } else {
            console.error("undefined");
            return list['undefined'];
        }
};

var getContentFromMainList = _.partialRight(getContentFromList,contentList);

var getContent = function (contentSection, descriptionSection) {
    var contentToFind = getParameterByName("content");
    var contentToDisplay = getContentFromMainList(contentToFind);
    htmlToElements(contentToDisplay.content, contentSection);
    injectStringToElement(contentToDisplay.text, descriptionSection)
};

function htmlToElements(html, targetNode) {
    var frag = document.createRange().createContextualFragment(html);
    console.log(frag);
    return targetNode.appendChild(frag)
}

function injectStringToElement(string, targetNode){
    return targetNode.innerHTML = string;
}


/*function htmlToElements(html, targetNode) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}*/