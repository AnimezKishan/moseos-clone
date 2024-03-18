let loaderText = document.querySelector(".loader h1");
let loaderImg = document.querySelector(".loader-img");
let counter = 0;
let imgCounter = 0;
let timeOut;

function loaderCounter(){
    let randomTimer = Math.floor(Math.random()*8+5);
    //console.log(randomTimer);
    timeOut = setInterval(function(){
        if(counter<101){
            loaderText.textContent = counter;
            counter++;
        }
        else{
            clearInterval(timeOut);
        }
    }, randomTimer);        
}

function loaderAnimation(){
    gsap.to(loaderText,{
        bottom: "100%",
        delay: 1,
        duration: 1.6,
        onStart: function(){
            loaderCounter();
        }
    })

    gsap.to(".loader", {
        delay: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.6,
        onEnd: function(){
            page1Animation();
        }
    })
}

function loaderImageAnimation(){

    const throttleFunction = (func, delay) => {

        let prev = 0;

        return (...args) => {

            let now = new Date().getTime();

            if (now - prev > delay) {
                prev = now;
                return func(...args);
            }
        }
    }

    loaderImg.addEventListener("mousemove", throttleFunction((details) => {
        var div = document.createElement("div");
        div.style.left = (details.clientX) + 'px';
        div.style.top = (details.clientY) + 'px';
        div.style.transform = "translate(-50%, -50%)";

        var img = document.createElement("img");
        let count = imgCounter%11 + 2;
        img.src = `https://museos.arteyeducacion.org/trail/image-${count}.jpg`;
        imgCounter++;

        div.appendChild(img);

        loaderImg.appendChild(div);

        gsap.from(img, {
            opacity: 0,
            duration: .2
        });

        gsap.to(img, {
            opacity: 0,
            y: 100,
            delay: .5,
            duration: .2
        });

        setTimeout(function () {
            div.remove();
        }, 1000);

    }, 90));
}

function page1Animation(){
    let tl = gsap.timeline();

    tl.from(".page1 h1", {
        y: 120,
        opacity: 0,
        stagger: .3,
        duration: .5,
        delay: 1.5,
    })

    tl.from("nav a, nav h3", {
        y: -100,
        duration: .5,
    })

    tl.to(".loader-img", {
        opacity: 0,
        pointerEvents: "none",
        duration: 1,
    })

    tl.to(".loader-img", {
        zIndex: -999,
    })
}


window.addEventListener("mousemove", (e)=>{
    gsap.to(".cursor", {
        top: e.y,
        left: e.x
    })
})

loaderAnimation();
loaderImageAnimation();