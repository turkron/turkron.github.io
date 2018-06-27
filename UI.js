var openSideBar = function (mainDiv, bodyDiv, sideBar) {
        mainDiv.style.marginLeft = "20%";
        sideBar.style.width = "20%";
        sideBar.style.display = "block";
    },
    closeSideBar = function (mainDiv, bodyDiv, sideBar) {
        mainDiv.style.marginLeft = "0%";
        sideBar.style.width = "0%";
    };

function updateClock() {
    var now = new Date(), // current date
        months = ['January', 'February', '...'], // you get the idea
        time = now.getHours() + ':' + now.getMinutes(), // again, you get the idea

        // a cleaner way than string concatenation
        date = [now.getDate(),
            months[now.getMonth()],
            now.getFullYear()].join(' ');

    // set the content of the element with the ID time to the formatted string
    document.getElementById('time').innerHTML = [date, time].join(' / ');

    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
}
