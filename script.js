let prevBtnElement=document.getElementById("prevBtn");
let nextBtnElement=document.getElementById("nextBtn");
let spinnerElement=document.getElementById("spinner");

let displayImgElement=document.getElementById("displayImg");
let previewConElement=document.getElementById("previewCon");

let imgIndex=0;
let count=0;


function displayImage(imgIndex){

    displayImgElement.src=images[imgIndex].url;
    displayImgElement.classList.add("display-img");
    
    for (let i = 0; i < previewConElement.children.length; i++) {
        if (i === imgIndex) {
            previewConElement.children[i].classList.add("current-img");
        } else {
            previewConElement.children[i].classList.remove("current-img");
        }
    }

}

function displayPreview(){
    for(let i=0; i<images.length; i++){
        let imgCon=document.createElement("img");
        imgCon.src=images[i].url;
        imgCon.classList.add("preview-img");
        imgCon.addEventListener("click", () => {
            imgIndex = i;
            displayImage(imgIndex);
        });
        previewConElement.appendChild(imgCon);
        
    }
}

let images;
async function getImg(){
    spinnerElement.classList.add("spinner");
    let result=await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
    images=await result.json();
    spinnerElement.classList.remove("spinner");
    displayImage(0);
    displayPreview();
}

getImg();


function changeToPrev(){
    if(imgIndex>0){
        imgIndex--;
        displayImage(imgIndex);
        prevBtnElement.style.backgroundColor="rgb(41, 41, 229)";
        nextBtnElement.style.backgroundColor="rgb(41, 41, 229)";
    }else{
        displayImage(imgIndex);
        prevBtnElement.style.backgroundColor="grey";
    }   
}

function changeToNext(){
    if(imgIndex<9){
        imgIndex++;
        displayImage(imgIndex);
        nextBtnElement.style.backgroundColor="rgb(41, 41, 229)";
        prevBtnElement.style.backgroundColor="rgb(41, 41, 229)";
    }else{
        displayImage(imgIndex);
        nextBtnElement.style.backgroundColor="grey";
    }
}


prevBtnElement.addEventListener("click",changeToPrev);
nextBtnElement.addEventListener("click",changeToNext);
