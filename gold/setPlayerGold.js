(() => {
    let n = document.createElement('iframe');
    document.body.append(n);
    window.alert = n.contentWindow.alert.bind(window);
    window.prompt = n.contentWindow.prompt.bind(window);
    window.confirm = n.contentWindow.confirm.bind(window);
    n.remove();

    function reactHandler() {
        return Object.values(document.querySelector('#app > div > div'))[1].children[1]._owner;
    };

    if (window.location.pathname != '/play/gold') {
        alert('You must be in a gold quest game!');
    } else {
        let e = reactHandler(),
            player = prompt("Player name to set gold"),
            amount = Number(parseFloat(prompt("Amount to set gold to")));
        e.memoizedProps.firebase.setVal({
            id: e.memoizedProps.client.hostId,
            path: "c/" + e.memoizedProps.client.name,
            val: {
                b: e.memoizedProps.client.blook,
                g: e.stateNode.state.gold,
                tat: player + ":swap:" + amount
            }
        })
        alert('Set gold for player:' + player + ' to ' + amount);
    };
})();

function footer() {
    let element = document.createElement('div');
    
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = ((e = window.event) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = (() => {
            document.onmouseup = null;
            document.onmousemove = null;
        });
        document.onmousemove = ((e) => {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            let top = (element.offsetTop - pos2) > 0 ? (element.offsetTop - pos2) : 0;
            let left = (element.offsetLeft - pos1) > 0 ? (element.offsetLeft - pos1) : 0;
            element.style.top = top + "px";
            element.style.left = left + "px";
        });
    });
};

footer();
