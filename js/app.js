const gameContainer = document.querySelector('[data-js="game-container"]')
const buttonPlayAgain = document.querySelector('[data-js="play-again"]')
const popupContainer = document.querySelector('[data-js="popup-container"]')

const resetGame = async () => {
  const { hideOrShowPopup } = await import('./ticTacToe.js')
  const buttons = [...gameContainer.children]

  buttons.forEach(button => {
    const buttonHasChild = button.children[0]

    button.removeAttribute('disabled')
    button.removeAttribute('data-mark')

    if (buttonHasChild) {
      button.children[0].remove()
    }
  })


  hideOrShowPopup()
}

const handleButtonClicks = async e => {
  if (e.target.dataset.js === 'game-container') {
    return
  }

  const buttons = [...gameContainer.children]
  const { handleUserTurn, getAvailableNumbers } = await import('./ticTacToe.js')
  handleUserTurn(e, buttons)

  if (getAvailableNumbers(buttons).length <= 1) {
    return
  }

  const { handleCPUTurn } = await import('./ticTacToe.js')
  handleCPUTurn(buttons)
}

const hidePopup = e => {
  const selectedDatas = ['popup-container', 'close-popup']
  const clickedElementData = e.target.dataset.js

  if (selectedDatas.includes(clickedElementData)) {
    popupContainer.classList.add('d-none')
    return
  }
}

popupContainer.addEventListener('click', hidePopup)
buttonPlayAgain.addEventListener('click', resetGame)
gameContainer.addEventListener('click', handleButtonClicks)