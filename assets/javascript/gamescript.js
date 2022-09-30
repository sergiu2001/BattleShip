function createBoard() {
    boardHTML = "";
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            boardHTML += `<div data-l=${i} data-c=${j} data-on=0 class="board__cell"></div>`;
        }
    }
    document.querySelector('.board__container__left').innerHTML = boardHTML;
    document.querySelector('.board__container__right').innerHTML = boardHTML;
}

createBoard();

function createShip(i) {
    shipHTML = `<div draggable="true" data-id=${i} class="ship__container${i}">${i}</div>`;
    document.querySelector('.ships').innerHTML += shipHTML;
}

createShip(5);
createShip(4);
createShip(3);
createShip(2);


var board = document.querySelector('.board__container__left');

interact('.ship__container2')
    .draggable({
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: board,
                endOnly: true
            })
        ],

        listeners: {
            // call this function on every dragmove event
            move: dragMoveListener,
        }
    })

interact('.ship__container3')
    .draggable({
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: board,
                endOnly: true
            })
        ],

        listeners: {
            // call this function on every dragmove event
            move: dragMoveListener,
        }
    })

interact('.ship__container4')
    .draggable({
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: board,
                endOnly: true
            })
        ],

        listeners: {
            // call this function on every dragmove event
            move: dragMoveListener,
        }
    })

interact('.ship__container5')
    .draggable({
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: board,
                endOnly: true
            })
        ],

        listeners: {
            // call this function on every dragmove event
            move: dragMoveListener,
        }
    })

function dragMoveListener(event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

interact('.board__cell').dropzone({
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    // listen for drop related events:

    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active')
    },
    ondragenter: function (event) {
        var draggableElement = event.relatedTarget
        var dropzoneElement = event.target

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target')
        draggableElement.classList.add('can-drop')
        draggableElement.innerText = 'enter'
    },
    ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target')
        event.relatedTarget.classList.remove('can-drop')
        event.relatedTarget.innerText = 'leave'
        event.target.setAttribute('data-on', 0)
    },
    ondrop: function (event) {
        let thisShip = event.target
        let cell_l = parseInt(thisShip.getAttribute('data-l'));
        let cell_c = parseInt(thisShip.getAttribute('data-c'));
        let ship_id = parseInt(event.relatedTarget.getAttribute('data-id'));
        let empty = true;
        for (let c = cell_c; c < cell_l + ship_id; c++) {
            let cell_data = parseInt(thisShip.getAttribute('data-on'));
            if (cell_data) {
                empty = false;
            }
            thisShip = thisShip.nextSibling
        }
        if (cell_c + ship_id - 1 < 10 && empty === true) {
            event.target.setAttribute('data-on', ship_id);
            event.target.style.backgroundColor = '#7e07e0'
            let nextShip = event.target.nextSibling
            for (let remainingShip = ship_id - 1; remainingShip > 0; remainingShip--) {
                nextShip.setAttribute('data-on', ship_id);
                nextShip.style.backgroundColor = '#7e07e0'
                nextShip = nextShip.nextSibling
            }


            event.relatedTarget.remove()
        }
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active')
        event.target.classList.remove('drop-target')
    }
})