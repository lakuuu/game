    let $start = document.querySelector('#start')
    let $game = document.querySelector('#game')
    let $time = document.querySelector('#time')
    let $time_header = document.querySelector('#time-header')
    let $result_header = document.querySelector('#result-header')
    let $result = document.querySelector('#result')
    let $game_time = document.querySelector('#game-time')
    let $userName = document.querySelector('#userName')
    let $welcome = document.querySelector('.welcome')
    let $app = document.querySelector('.app')
    let $app_rating = document.querySelector('.app_rating')

    let score = 0 



    $start.addEventListener('click', start)

    function start(){
        score = 0
        $game.style.backgroundColor = 'white'
        $start.classList.add('hide')
        timer() 
        creatBox()  
        $time_header.classList.remove('hide')
        $result_header.classList.add('hide')
        setTime()
        $game_time.setAttribute('disabled','true')
    }

    $game.addEventListener('click',clickedBox) 
    
    function clickedBox(event){
        if (event.target.dataset.box){
            creatBox()
            score++
        }
    }
  

    function creatBox(){
        $game.innerHTML = ""
        let box = document.createElement('div')
        let size = getRandom(30, 100)
        let top = getRandom(0, 300-size)       
        let left = getRandom(0, 300-size)   
            
        box.style.width = box.style.height = size + 'px'
        box.style.backgroundColor = `rgb(${getRandom(0, 255)},${getRandom(0, 255) },${getRandom(0, 254) })`
        box.style.position = 'absolute'
        box.style.top = top + 'px'
        box.style.left = left +  'px'   
        box.setAttribute('data-box', 'true')
    

        $game.insertAdjacentElement('afterbegin', box)

    }

        function timer(){
            let interval = setInterval(function(){
                $time.textContent = (Number($time.textContent) - 0.1).toFixed(1)
                if ($time.textContent <= "0.0"){
                    clearInterval(interval)
                    endGame()
                }
            },100)                      
        }
        
         

            function endGame(){
                $game.style.backgroundColor = '#ccc'
                $start.classList.remove('hide')
                $game.innerHTML = ""
                $result.textContent = score
                $time_header.classList.add('hide')
                $result_header.classList.remove('hide')
                $game_time.removeAttribute('disabled')
                rating()
            }


            function getRandom(min, max) {
                return Math.ceil(Math.random() * (max - min) + min)
            }

            $game_time.addEventListener('input', setTime)
            function setTime(){
                $time.textContent = $game_time.value
                $result_header.classList.add('hide')
                $time_header.classList.remove('hide')

            }

            $userName.addEventListener('change', function(){
                $welcome.classList.add('hide')
                $app.classList.remove('hide')
            })

            function rating(){
                let list = JSON.parse(localStorage.getItem('ListOfUsers'))
                list.push({name: $userName.value, score: score})
                localStorage.setItem('ListOfUsers', JSON.stringify(list))
                list.sort((a,b) => b.score - a.score)
                list.forEach(function(elem, item){
                    if (item >= 10){
                        return
                    }
                    $app_rating.insertAdjacentHTML('beforeend', `
                    <div class="user">
                         ${elem.name}
                           -----
                         ${elem.score}
                    </div> 
                    `)
                })      
            }

function setupLocal(){
    localStorage.setItem('ListOfUsers', JSON.stringify([]))
}
         

        
    