// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.
var choice1=undefined
var choice2=undefined
var choice3=undefined
var lock=false
var dogs=[]
var beds=[]
var toys=[]
var result=document.getElementById("result_section")
TYPES=["blep","happy","sleeping","dopey","burger","cart","nerd","shy","sleepy"]

init()

function init()
{
	Array.from(document.getElementsByClassName("choice-grid")[0].children).forEach(function(item){
		dogs.push(item)
		let attr=item.getAttribute("data-choice-id")
		item.addEventListener("click",function(){
			handler(1,attr)
			})
	})
	Array.from(document.getElementsByClassName("choice-grid")[1].children).forEach(function(item){
		beds.push(item)
		let attr=item.getAttribute("data-choice-id")
		item.addEventListener("click",function(){
			handler(2,attr)
			})
	})
	Array.from(document.getElementsByClassName("choice-grid")[2].children).forEach(function(item){
		toys.push(item)
		let attr=item.getAttribute("data-choice-id")
		item.addEventListener("click",function(){
			handler(3,attr)
			})
	})

	window.addEventListener("resize",function(){
		resize(window.outerWidth)
		})
}

function resize(width)
{
	if(width>=700)
	{
		document.getElementsByTagName("article")[0].style.width="700px"
		document.getElementById("yayinternet").style.display="flex"
		dogs.forEach(function(item){
			item.style.width="calc(32.5% - 20px)"
			})
		beds.forEach(function(item){
			item.style.width="calc(32.5% - 20px)"
			})
		toys.forEach(function(item){
			item.style.width="calc(32.5% - 20px)"
			})
	}
	else if(width<700&&width>=500)
	{
		document.getElementsByTagName("article")[0].style.width="95%"
		document.getElementById("yayinternet").style.display="none"
		dogs.forEach(function(item){
			item.style.width="calc(32.5% - 20px)"
			})
		beds.forEach(function(item){
			item.style.width="calc(32.5% - 20px)"
			})
		toys.forEach(function(item){
			item.style.width="calc(32.5% - 20px)"
			})
	}
	else if(width<500)
	{
		document.getElementsByTagName("article")[0].style.width="95%"
		document.getElementById("yayinternet").style.display="none"
		dogs.forEach(function(item){
			item.style.width="calc(49% - 20px)"
			})
		beds.forEach(function(item){
			item.style.width="calc(49% - 20px)"
			})
		toys.forEach(function(item){
			item.style.width="calc(49% - 20px)"
			})
	}
}

function handler(id,ch)
{
	if(lock)
		return
	setChoice(id,ch)
	if(id===1)
	{
		dogs.forEach(function(item){
			item.style.opacity=0.6
			item.style.background="#f4f4f4"
			item.children[1].src="images/unchecked.png"
		})
		let id=TYPES.indexOf(ch)
		let sel=dogs[id]
		sel.style.opacity=1.0
		sel.style.background="#cfe3ff"
		sel.children[1].src="images/checked.png"
	}
	else if(id===2)
	{
		beds.forEach(function(item){
			item.style.opacity=0.6
			item.style.background="#f4f4f4"
			item.children[1].src="images/unchecked.png"
		})
		let id=TYPES.indexOf(ch)
		let sel=beds[id]
		sel.style.opacity=1.0
		sel.style.background="#cfe3ff"
		sel.children[1].src="images/checked.png"
	}
	else if(id===3)
	{
		toys.forEach(function(item){
			item.style.opacity=0.6
			item.style.background="#f4f4f4"
			item.children[1].src="images/unchecked.png"
		})
		let id=TYPES.indexOf(ch)
		let sel=toys[id]
		sel.style.opacity=1.0
		sel.style.background="#cfe3ff"
		sel.children[1].src="images/checked.png"
	}
	if(choice1!==undefined&&choice2!==undefined&&choice3!==undefined)
	{
		lock=true
		showResult()
	}
}

function clear()
{
	dogs.forEach(function(item){
		item.style.opacity=1.0
		item.style.background="#f4f4f4"
		item.children[1].src="images/unchecked.png"
	})
	beds.forEach(function(item){
		item.style.opacity=1.0
		item.style.background="#f4f4f4"
		item.children[1].src="images/unchecked.png"
	})
	toys.forEach(function(item){
		item.style.opacity=1.0
		item.style.background="#f4f4f4"
		item.children[1].src="images/unchecked.png"
	})
	lock=false
	choice1=undefined
	choice2=undefined
	choice3=undefined
	document.getElementById("q1").scrollIntoView({behavior:"smooth"})
	result.style.display="none"
}

function setChoice(qid,ch)
{
	if(qid===1)
		choice1=ch
	else if(qid===2)
		choice2=ch
	else if(qid===3)
		choice3=ch
}

function mouseOver()
{
	document.getElementById("restart_btn").style.background="#cecece"
}
function mouseOut()
{
	document.getElementById("restart_btn").style.background="#e0e0e0"
}
function showResult()
{
	result.style.display="block"
	if(choice2===choice3)
	{
		document.getElementById("result_title").innerHTML="You got: "+RESULTS_MAP[choice2].title
		document.getElementById("result_desc").innerHTML=RESULTS_MAP[choice2].contents
	}
	else
	{
		document.getElementById("result_title").innerHTML="You got: "+RESULTS_MAP[choice1].title
		document.getElementById("result_desc").innerHTML=RESULTS_MAP[choice1].contents
	}
	result.children[2].addEventListener("click",function(){clear()})
	result.scrollIntoView({behavior:"smooth"})
}