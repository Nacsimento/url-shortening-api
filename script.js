const menu_btn = document.querySelector(".uil-bars")
const close_btn = document.querySelector(".uil-times")
const module = document.querySelector(".module")

const url = "https://api.shrtco.de/v2/shorten?url="
const urlcontainer = document.querySelector(".shorten_url")

const urlinput = document.querySelector(".url")
const urlbtn = document.querySelector(".urlbtn")
const error = document.querySelector(".error")

const copybtn =document.querySelector(".copybtn") 


const arr=[]

menu_btn.addEventListener("click", ()=>{
    module.style.display="block"
    menu_btn.style.display="none"
    close_btn.style.display="block"
})


close_btn.addEventListener("click", ()=>{
    module.style.display="none"
    menu_btn.style.display="block"
    close_btn.style.display="none"
})



urlbtn.addEventListener("click", ()=>{
    if(urlinput.value === ""){
        urlinput.style.borderColor="hsl(0, 87%, 67%)";
        urlinput.classList.add('place');
        error.style.display="block";
    }
    else{
        fetch(`${url}${urlinput.value}`).then(response =>{
            return response.json()
        }).then(data =>{
            const shorten_url = document.createElement("div")
            const shor = data.result.short_link
            shorten_url.innerHTML=`<div class="container"><div class="entered_url">${urlinput.value}</div>
            <hr class="hr">
            <div class="short">
              <div class="shortutl"> https://${shor}</div>
              <button class="copybtn">Copy</button>
            </div>
          </div></div>`
          urlcontainer.prepend(shorten_url)
            arr.push(shorten_url)
            urlinput.value=""

            if (arr.length === 4) {
                const oldestElement = arr.shift();

  
                urlcontainer.removeChild(oldestElement);
              }
            
              
              urlinput.style.borderColor="transparent";
              urlinput.classList.remove('place');
              error.style.display="none";
              
              
          
            const copybtn =document.querySelectorAll(".copybtn") 
            copybtn.forEach((e)=>{
                e.addEventListener("click", ()=>{
                    var tempElement = document.createElement('textarea');
                    tempElement.value = shor;
                    document.body.appendChild(tempElement);
                    tempElement.select();
                    
                    document.execCommand("copy")
                    document.body.removeChild(tempElement);
                    e.style.backgroundColor="hsl(257, 27%, 26%)"
                   e.innerHTML="Copied!"
                })
            })
            

        })
    }
})







