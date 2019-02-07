var contentList = {
    KellyMoutou: {
        text: "Built a website for my fiancée to help her establish herself as a start up potter.",
        content: "<iframe style=\"height: 80vh\" width=\"100%\" height=\"100%\" src=\"Portfolio/PotteryWebsite/index.html\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>",
        thumbnail: "Kelly-Moutou-ceramics.png",
        tbDescription: "Start up pottery studio website"
    },
    Snake: {
        text: "Built a game using only old GameBoy colour pigments, as part of an internal GameJam ran by the company",
        content: "<iframe style=\"height: 80vh\" width=\"100%\" height=\"100%\" src=\"http://play.google.com/store/apps/details?id=com.NathandKendall.Ouroboros&hl=en\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>",
        thumbnail: "snake2.png",
        tbDescription: "How much of this can <BR> I get away with and How much can <BR> I style this to suit my needs"
    },
    undefined: {
        text: "this param is not found",
        content: "<p>undefined</p>",
        thumbnail: "",
        tbDescription: "How much of this can <BR> I get away with and How much can <BR> I style this to suit my needs"
    }
};

var thumbnailOrder = ['KellyMoutou', 'Snake', 'undefined', 'undefined', 'undefined', 'undefined'];


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var getContentFromUrl = function () {
    return getParameterByName("content");
};

var getContentFromList = function (item, list) {
    return list[item];
};

var getContentFromMainList = _.partialRight(getContentFromList, contentList);

var getContent = function () {
    return getContentFromMainList(getContentFromUrl());
};

var displayFocusedContent = function (contentSection, descriptionSection) {
    buildContentScreen(getContent(), {contentSection: contentSection, descriptionSection: descriptionSection});
};

function htmlToElements(html, targetNode) {
    var frag = document.createRange().createContextualFragment(html);
    return targetNode.appendChild(frag)
}

function injectStringToElement(string, targetNode) {
    return targetNode.innerHTML = string;
}

function buildContentScreen(contentToDisplay, sectionsObj) {
    htmlToElements(contentToDisplay.content, sectionsObj.contentSection);
    injectStringToElement(contentToDisplay.text, sectionsObj.descriptionSection)
}

function buildThumbNailTemplate(contentLocation, contentThumbnail, contentDescription) {
    return '<article class="w3-display-container w3-button w3-white w3-hover-black thumbnailPadding"> <a href="content.html#?content=' + contentLocation + '">' +
        '<img src="Images/'+contentThumbnail +'" class="w3-opacity w3-card-4" height="256" width="256">' +
        '<div class="w3-display-middle"><p class="thumbnailText w3-animated-opacity" style="color: whitesmoke">' +
        contentDescription +
        '</a>' +
        '</article>'
}

function loadLinks(contentSection) {
    thumbnailOrder.map(function (contentName) {
        var contentObj = getContentFromMainList(contentName);
        var tmbNail = buildThumbNailTemplate(contentName, contentObj.thumbnail, contentObj.tbDescription);
        htmlToElements(tmbNail, contentSection);
    })
}


/*function htmlToElements(html, targetNode) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}*/