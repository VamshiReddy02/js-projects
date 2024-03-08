document.addEventListener('DOMContentLoaded', () =>{
   const grid = document.querySelector('.grid')
   const flagsLeft = document.querySelector('#flag-left')
   const result = document.querySelector('#result')
   const width = 10
   let bombAmount = 20
   let squares = []
   let isGameOver = false

   function createBoard() {

    flagsLeft.innerHTML = bombAmount

    const bombArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width * width - bombAmount).fill('valid')
    const gameArray = emptyArray.concat(bombArray)
    const shuffledArray = gameArray.sort(()=> Math.random() - 0.5)
        for (let i = 0; i < width * width; i++) {
           const square = document.createElement('div')
           square.id = i
           square.classList.add(shuffledArray[i])
           grid.appendChild(square)
           squares.push(square)  
           
           square.addEventListener('click', (e)=>{
                click(square)
           })

           square.addEventListener('click', (e)=>{
                //addFlag(square)
           })
        }

        for (let i = 0; i < squares.length; i++) {
            let total = 0
            const isLeftEdge = (i % width === 0)
            const isRightEdge = (i % width === width -1)

            if(squares[i].classList.contains('valid')) {
                if(i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++
                if ( i > 9 && !isLeftEdge && squares[i + 1 - width].classList.contains('bomb')) total++
                if (i> 10 && squares[i - width].classList.contains('bomb')) total++
                if (i > 11 && !isLeftEdge && squares[i - width - 1].classList.contains('bomb')) total++
                if (i < 99 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++
                if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++
                if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total++
                if (i < 89 && squares[i + width]. classList.contains('bomb')) total++
                squares[i].setAttribute('data', total)

            }
        }
   }

   createBoard()


   function click(square) {
    console.log(square)
    if (isGameOver || square.classList.contains('checked') || square.classList.contains('flag')) return

    if(square.classList.contains('bomb')){
        gameOver()
    }
   }

   function gameOver() {
    result.innerHTML = 'GAME OVER!!!1'
    isGameOver = true

    squares.forEach(function(square) {
        if(square.classList.contains('bomb')) {
            square.innerHTML = 'boo'
            square.classList.remove('bomb')
            square.classList.add('checked')
        }
    })
   }
})