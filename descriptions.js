const contentList = {
    KellyMoutou: {
        text: "Built a website for my fiancée to help her establish herself as a start up potter. <BR> https://github.com/turkron/PotteryWebsite",
        content: "<iframe style=\"height: 80vh\" width=\"100%\" height=\"100%\" src=\"Portfolio/PotteryWebsite/index.html\"  allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>",
        thumbnail: "Kelly-Moutou-ceramics.png",
        tbDescription: "Start up pottery studio website"
    },
    Snake: {
        text: "Built a game using only old GameBoy colour pigments, as part of an internal GameJam ran by the company",
        content: "<iframe style=\"height: 80vh\" width=\"100%\" height=\"100%\" src=\"http://play.google.com/store/apps/details?id=com.NathandKendall.Ouroboros&hl=en\"  allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>",
        thumbnail: "snake2.png",
        tbDescription: "Snake"
    },
    BlackJack: {
        text: "Fleshed a test that was given as part of an interview into a full game, my self set challenge was to write the game using vanilla JS only",
        content: "<iframe style=\"height: 80vh\" width=\"100%\" height=\"100%\" src=\"Portfolio/blackJack/index.html\"  allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>",
        thumbnail: "blackJack/blackJack (1).png",
        tbDescription: "blackJack/Pontoon"
    },
    ChatRoom: {
        text: "Made a chat room allowing work friends to chat together in a hosted room",
        content: "<iframe style=\"height: 80vh\" width=\"100%\" height=\"100%\" src=\"Portfolio/chatRoom/index.php\"  allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>",
        thumbnail: "chatroom.png",
        tbDescription: "hosted chat room"
    },
    Fishing: {
        text: "Prototype website designed as a pitch for a business pitch.",
        content: "<iframe style=\"height: 80vh\" width=\"100%\" height=\"100%\" src=\"Portfolio/fishingSchool\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>",
        thumbnail: "fishing.png",
        tbDescription: "Kendall Fishing"
    },
    Pong: {
        text: "A quick exercise into c++ and using sfml libs",
        content: "",
        thumbnail: "pong/pong (1).png",
        tbDescription: "Pong"
    },
    IWG: {
        text: "The company which I worked at for about 3 years, I developed over 20 games for them from scratch and reskinned over 100 other games. " +
            "<BR> Those games in turn have been deployed to over 20 platforms in 8 different countries" +
            "<BR> http://www.instantwingaming.com/",
        content: "<iframe style=\"height: 80vh\" width=\"100%\" height=\"100%\" src=\"http://www.instantwingaming.com\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>",
        thumbnail: "iwg.png",
        tbDescription: "IWG"
    },
    SpaceInvaders: {
        text: "Using your tank and cunning tactics, repeal the invaders from space and save the planet from complete destruction!" +
            "<BR> https://play.google.com/store/apps/details?id=com.NathanDKendall.InvadersFromSpace" +
            "<BR> https://github.com/turkron/Space-invaders",
        content: {type: "gallery", images: ["./images/space/space(1).png", "./images/space/space(2).png", "./images/space/space(3).png"]},
        thumbnail: "invaders.png",
        tbDescription: "Invaders from space"
    },
    undefined: {
        text: "this param is not found",
        content: "<p>undefined</p>",
        thumbnail: "",
        tbDescription: "How much of this can <BR> I get away with and How much can <BR> I style this to suit my needs"
    }
};

const thumbnailOrder = ['KellyMoutou', 'BlackJack', 'ChatRoom', 'Snake', 'Fishing', 'Pong', 'IWG', 'SpaceInvaders'];


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const getContentFromUrl = () => getParameterByName("content");
const getContentFromList = (item, list) =>list[item];
const getContentFromMainList = _.partialRight(getContentFromList, contentList);
const getContent = () => getContentFromMainList(getContentFromUrl());
const displayFocusedContent = (contentSection, descriptionSection) => buildContentScreen(getContent(), {contentSection: contentSection, descriptionSection: descriptionSection});
const htmlToElements = (html, targetNode) => {
    if(html.type){
        if(html.type === "gallery"){
            //build gallery.
            console.log(html);
            //need a string here so we can attach the html to the element.
            html = galleryTemplate.scripts + galleryTemplate.slideBody(html.images.map(image => galleryTemplate.image(image)));
        }
    }
    console.log(html);
    const frag = document.createRange().createContextualFragment(html);
    return targetNode.appendChild(frag)
};

function injectStringToElement(string, targetNode) {
    return targetNode.innerHTML = string;
}

function buildContentScreen(contentToDisplay, sectionsObj) {
    htmlToElements(contentToDisplay.content, sectionsObj.contentSection);
    injectStringToElement(contentToDisplay.text, sectionsObj.descriptionSection)
}

function buildThumbNailTemplate(contentLocation, contentThumbnail, contentDescription) {
    return '<article class="w3-display-container w3-button w3-white w3-hover-black thumbnailPadding w3-card-4" style="width: 256px; height: 256px">' +
        ' <a href="content.html#?content=' + contentLocation + '">' +
        '<img src="Images/' + contentThumbnail + '" class="w3-opacity w3-display-middle" style="max-height: 256px; max-width: 256px">' +
        '<div class="w3-display-middle" style="height: 256px; width: 256px"><p class="thumbnailText w3-animated-opacity w3-display-middle" style="color: whitesmoke">' +
        contentDescription +
        '</a>' +
        '</article>'
}

function loadLinks(contentSection) {
    thumbnailOrder.map(function (contentName) {
        const contentObj = getContentFromMainList(contentName),
            tmbNail = buildThumbNailTemplate(contentName, contentObj.thumbnail, contentObj.tbDescription);
        htmlToElements(tmbNail, contentSection);
    })
}
let galleryTemplate = {
    scripts: "<script>" +
        "let myIndex = 0;" +
        "carousel();" +
        "function carousel() {" +
            "let i, x = document.getElementsByClassName('mySlides');" +
            "for (i = 0; i < x.length; i++) {" +
            "x[i].style.display = \"none\"; " +
            "}"+
            "myIndex++;"+
            "if (myIndex > x.length) {myIndex = 1} "+
            "x[myIndex-1].style.display = \"block\"; "+
            "setTimeout(carousel, 2000);" +
        "}" +
        "</script>",
    image: (src) => {
        return "<img class=\"mySlides\" src=" + src + " style=\"width:100%\">"
    },
    slideBody: (htmlImgNodes) => {
        htmlImgNodes = htmlImgNodes.reduce((output, node) => output+node ,"");
        return "<div class=\"w3-content w3-section\">"+htmlImgNodes+"</div>";
}

};







/*function htmlToElements(html, targetNode) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}*/