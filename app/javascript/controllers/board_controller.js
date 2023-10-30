import { Controller } from "@hotwired/stimulus"
//import axios from 'axios'

export default class extends Controller {
  HEADERS = { 'ACCEPT': 'application/json' }

  connect() {

    //const axios = require('axios/dist/browser/axios.cjs'); // browser

    const boards = [
        {
            "id"    : "board-id-1",
            "title" : "To-do",
            "item"  : [
                {
                    "id"      : "item-id-1",
                    "title"   : "Item 1",
                    "username": "username1"
                },
                {
                    "id"      : "item-id-2",
                    "title"   : "Item 2",
                    "username": "username2"
                }
            ]
        },
        {
            "id"    : "board-id-1",
            "title" : "In Progress",
            "item"  : [
                {
                    "id"      : "item-id-1",
                    "title"   : "Item 1",
                    "username": "username1"
                },
                {
                    "id"      : "item-id-2",
                    "title"   : "Item 2",
                    "username": "username2"
                }
            ]
        },
        {
            "id"    : "board-id-1",
            "title" : "Done",
            "item"  : [
                {
                    "id"      : "item-id-1",
                    "title"   : "Item 1",
                    "username": "username1"
                },
                {
                    "id"      : "item-id-2",
                    "title"   : "Item 2",
                    "username": "username2"
                }
            ]
        }
    ]


    var kanban = new jKanban({
        element          : '.board',                                           // selector of the kanban container
        gutter           : '15px',                                       // gutter of the board
        widthBoard       : '250px',                                      // width of the board
        responsivePercentage: false,                                    // if it is true I use percentage in the width of the boards and it is not necessary gutter and widthBoard
        dragItems        : true,                                         // if false, all items are not draggable
        boards           : boards,                                           // json of boards
        dragBoards       : true,                                         // the boards are draggable, if false only item can be dragged
        itemAddOptions: {
            enabled: false,                                              // add a button to board for easy item creation
            content: '+',                                                // text or html content of the board button   
            class: 'kanban-title-button btn btn-default btn-xs',         // default class of the button
            footer: false                                                // position the button on footer
        },    
        itemHandleOptions: {
            enabled             : false,                                 // if board item handle is enabled or not
            handleClass         : "item_handle",                         // css class for your custom item handle
            customCssHandler    : "drag_handler",                        // when customHandler is undefined, jKanban will use this property to set main handler class
            customCssIconHandler: "drag_handler_icon",                   // when customHandler is undefined, jKanban will use this property to set main icon handler class. If you want, you can use font icon libraries here
            customHandler       : "<span class='item_handle'>+</span> %title% "  // your entirely customized handler. Use %title% to position item title 
                                                                                 // any key's value included in item collection can be replaced with %key%
        },
        click            : function (el) {},                             // callback when any board's item are clicked
        context          : function (el, event) {},                      // callback when any board's item are right clicked
        dragEl           : function (el, source) {},                     // callback when any board's item are dragged
        dragendEl        : function (el) {},                             // callback when any board's item stop drag
        dropEl           : function (el, target, source, sibling) {},    // callback when any board's item drop in a board
        dragBoard        : function (el, source) {},                     // callback when any board stop drag
        dragendBoard     : function (el) {},                             // callback when any board stop drag
        buttonClick      : function(el, boardId) {},                     // callback when the board's button is clicked
        propagationHandlers: [],                                         // the specified callback does not cancel the browser event. possible values: "click", "context"
    })


    //axios.get('/api/boards/1/lists', { headers: this.HEADERS }).then((response) => { console.log(response) })

  fetch('http://localhost:3000/api/boards/1/lists') // Substitua 'https://exemplo.com/api/dados' pela URL da API que você deseja acessar
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na solicitação');
    }
    return response.json(); // Converte a resposta para JSON
  })
  .then(data => {
    // Aqui você pode acessar os dados e fazer o que desejar com eles
    console.log(data);
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });

  }
}
