window.addEventListener('load', function () {
    var contentChat = JSON.parse(localStorage.getItem('contentChat'));
    //get form input----------------------------------------------------------------------
    var clientOne = document.querySelector('.screen-1 .mess-form');
    var clientTwo = document.querySelector('.screen-2 .mess-form');
    var messInput1 = document.querySelector('.screen-1 .mess-input');
    var messInput2 = document.querySelector('.screen-2 .mess-input');
    var sendBtn1 = document.querySelector('.screen-1 .mess-send-btn ');
    var sendBtn2 = document.querySelector('.screen-2 .mess-send-btn ');
    var messDisplay1 = document.querySelector('.screen-1 .mess-display');
    var messDisplay2 = document.querySelector('.screen-2 .mess-display');
    var btnResetInput1 = document.querySelector('.screen-1 .btn-reset');
    var btnResetInput2 = document.querySelector('.screen-2 .btn-reset');
    var avatarPr1 = './user2.jpg';
    var avatarPr2 = './user1.jpg';
    // function push localStorage chat value -------------------------------------------------
    var sendMessage = function (event, receiver, messInput) {
        event.preventDefault();
        contentChat = JSON.parse(localStorage.getItem('contentChat'));
        var textMess = messInput.innerHTML.trim();
        if (!textMess)
            return;
        if (contentChat) {
            contentChat.push({
                id: contentChat.length + 1,
                receiver: receiver,
                content: textMess
            });
            localStorage.setItem('contentChat', JSON.stringify(contentChat));
        }
        else {
            var newContentMsg = { id: 1, receiver: receiver, content: textMess };
            localStorage.setItem('contentChat', JSON.stringify([newContentMsg]));
        }
        getContentChat(receiver, textMess);
        cleanData(messInput);
        isDisabled(receiver);
    };
    // function get value content and switch side display ----------------------------------------
    var getContentChat = function (receiver, content) {
        if (receiver === 2) {
            messDisplay1.insertAdjacentHTML('beforeend', showContent(avatarPr2, content, 'right'));
            messDisplay2.insertAdjacentHTML('beforeend', showContent(avatarPr2, content, 'left'));
        }
        else {
            messDisplay1.insertAdjacentHTML('beforeend', showContent(avatarPr1, content, 'left'));
            messDisplay2.insertAdjacentHTML('beforeend', showContent(avatarPr1, content, 'right'));
        }
    };
    // function display content chat ------------------------------------------------------------------------
    var showContent = function (avatar, content, side) {
        var show = "<div class=\"msg ".concat(side, "-msg\">\n\t\t\t\t<div class=\"msg-img\" style=\"background-image: url(").concat(avatar, ")\"></div>\n\t\t\t\t<div class=\"msg-bubble\">\n\t\t\t\t\t<div class=\"msg-text\">\n\t\t\t\t\t\t").concat(content, "\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>");
        return show;
    };
    // get storage contentChat binding ----------------------------------------------------------------------
    (function () {
        if (contentChat) {
            contentChat.forEach(function (element) {
                getContentChat(element.receiver, element.content);
            });
        }
        cleanData(messInput1);
        cleanData(messInput2);
    })();
    //   clean Value input after submit, Scroll overflow -----------------------------------------------------
    function cleanData(messInput) {
        messInput.innerHTML = '';
        messDisplay1.scrollTop = 1000;
        messDisplay2.scrollTop = 1000;
    }
    //function disable send-button client anothers when typing -----------------------------------------------
    function isDisabled(receiver) {
        if (receiver === 1) {
            sendBtn2.disabled = true;
        }
        else {
            sendBtn1.disabled = true;
        }
    }
    //function enable send button when value valid -----------------------------------------------------------
    function isEnabled(element, text) {
        if (text.trim().length > 0) {
            element.disabled = false;
        }
        else {
            element.disabled = true;
        }
    }
    // submit chat screen 1
    clientOne.addEventListener('submit', function () {
        sendMessage(event, 2, messInput1);
    }, false);
    // submit chat screen 2
    clientTwo.addEventListener('submit', function () {
        sendMessage(event, 1, messInput2);
    }, false);
    // enter mess input client 1
    messInput1.addEventListener('input', function (e) {
        var text = e.target.textContent;
        isEnabled(sendBtn1, text);
    });
    // enter mess input client 2
    messInput2.addEventListener('input', function (e) {
        var text = e.target.textContent;
        isEnabled(sendBtn2, text);
    });
    //   reset btn data
    (function () {
        btnResetInput1.addEventListener('click', function () {
            if (messInput1.innerHTML) {
                messInput1.innerHTML = '';
            }
        });
        btnResetInput2.addEventListener('click', function () {
            if (messInput2.innerHTML) {
                messInput2.innerHTML = '';
            }
        });
    })();
});
