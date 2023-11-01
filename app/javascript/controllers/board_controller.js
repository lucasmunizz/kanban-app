import { Controller } from "@hotwired/stimulus"
import axios from 'axios'
import { map, get, isNull, sample } from 'lodash-es'

export default class extends Controller {
  HEADERS = { 'ACCEPT': 'application/json' }
  BACKGROUND_COLORS = ['bg-green-700', 'bg-red-700', 'bg-blue-700']

  getHeaders(){
    return Array.from(document.getElementsByClassName('kanban-board-header'))
  }

  getHeaderTitles(){
    return Array.from(document.getElementsByClassName('kanban-title-board'))
  }

  cursorifyHeaderTitles(){
    this.getHeaderTitles().forEach((headerFiles) => {
      headerFiles.classList.add('cursor-pointer');
    })
  }

  addLinkToHeaderTitles(boards){
    this.getHeaderTitles().forEach((headerTitle, index) => {
      headerTitle.addEventListener('click', () => {
        Turbo.visit(`${this.element.dataset.boardListsUrl}/${boards[index].id}/edit`)
      })
    })
  }

  addHeaderDeleteButtons(boards){
    this.getHeaders().forEach((header, index) => {
      header.appendChild(this.buildBoardsDeleteButton(boards[index].id))
    })
  }

  buildBoardsDeleteButton(boardId){
    const button = document.createElement('button')
    button.classList.add('kanban-title-button')
    button.classList.add('btn')
    button.classList.add('btn-default')
    button.classList.add('btn.xs')
    button.classList.add('mr-2')
    button.textContent = 'x'
    button.addEventListener('click', (e) => {
      e.preventDefault();
      axios.delete(`${this.element.dataset.boardListsUrl}/${boardId}`, {
        headers: this.HEADERS
      }).then((_) => {
        Turbo.visit(window.location.href)
      })
    })
    return button
  }

  connect() {
    axios.get(this.element.dataset.apiUrl, { headers: this.HEADERS }).then((response) => {
        this.buildKanban(this.buildBoards(response['data']))
        this.cursorifyHeaderTitles()
        this.addLinkToHeaderTitles(this.buildBoards(response['data']))
        this.addHeaderDeleteButtons(this.buildBoards(response['data']))
    })
  }

  buildBoards(boardsData){
    return map(boardsData['data'], (board) => {
        return {
            "id": get(board, 'id'),
            "title": get(board, 'attributes.title'),
            "class": this.buildClassList(get(board, 'attributes.class_list')),
            "item": this.buildItems(get(board, 'attributes.items.data'))
        }
    })
  }

  buildItems(itemsData) {
    return map(itemsData, (item) => {
        return {
            "id": get(item, 'id'),
            "title": get(item, 'attributes.title'),
            "class": this.buildClassList()
        }
    })
  }

  buildClassList() {
    return `text-white, ${sample(this.BACKGROUND_COLORS)}`
  }

  updateListPositions(el){
    axios.put(`${this.element.dataset.listPositionsApiUrl}/${el.dataset.id}`, {
      position: el.dataset.order - 1
    }, {
      headers: this.HEADERS
    }).then((response) => {
      console.log(response)
    })
  }

  buildKanban(boards) {
    new jKanban({
        element: '#board',
        boards: boards,
        itemAddOptions:{
            enabled: true,
        },
        buttonClick: (el, boardId) => {
          Turbo.visit(`/lists/${boardId}/items/new`)
        },
        dragendBoard: (el) => {
         this.updateListPositions(el)
        }
    })
  }
}
