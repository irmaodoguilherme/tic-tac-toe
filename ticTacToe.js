const winPatterns = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

const hideOrShowPopup = () => {
  const popupContainer = document.querySelector('[data-js="popup-container"]')
  popupContainer.classList.toggle('d-none')
}

const disableRemainingButtons = buttons => buttons
  .filter(button => !button.disabled)
  .forEach(button => button.setAttribute('disabled', ''))

const announceWinnerOrLoser = string => {
  const popupTitle = document.querySelector('[data-js="popup-title"]')

  popupTitle.textContent = string
  hideOrShowPopup()
}

const checkPattern = (playerPattern, string, buttons) => {
  for (const pattern of winPatterns) {
    const winner = pattern.every(number => playerPattern.includes(number))

    if (winner) {
      announceWinnerOrLoser(string)
      disableRemainingButtons(buttons)
      break
    }
  }
}

const getPlayerMark = icon => {
  const playerMark = document.createElement('i')
  playerMark.setAttribute('class', `bi bi-${icon} text-white player-mark`)

  return playerMark
}

const getAvailableNumbers = buttons => buttons
  .filter(child => !child.disabled)
  .map(child => Number(child.dataset.number))

const getRandomNumber = buttons => {
  const availableNumbers = getAvailableNumbers(buttons)

  while (true) {
    const randomNumber = Math.trunc(Math.random() * (9 - 1) + 1)

    if (availableNumbers.includes(randomNumber)) {
      return randomNumber
    }
  }
}

const markTargetButton = (button, tag, mark) => {
  button.append(getPlayerMark(tag))
  button.setAttribute('disabled', '')
  button.setAttribute('data-mark', mark)
}

const getPlayerPattern = (mark, buttons) => buttons
  .filter(button => button.dataset.mark === mark)
  .map(button => Number(button.dataset.number))

const handleUserTurn = (e, buttons) => {
  const clickedButton = e.target

  markTargetButton(clickedButton, 'x-lg', 'X')

  const userPattern = getPlayerPattern('X', buttons)

  if (userPattern.length >= 3) {
    checkPattern(userPattern, 'Você venceu!', buttons)
  }
}

const handleCPUTurn = buttons => {
  const buttonNumber = getRandomNumber(buttons)
  const buttonEl = document.querySelector(`[data-number="${buttonNumber}"]`)

  markTargetButton(buttonEl, 'circle', 'O')

  const cpuPattern = getPlayerPattern('O', buttons)

  if (cpuPattern.length >= 3) {
    checkPattern(cpuPattern, 'Você perdeu!', buttons)
  }
}

export { handleUserTurn, handleCPUTurn, getAvailableNumbers, hideOrShowPopup }