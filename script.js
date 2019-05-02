// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.

var dog = []
var bed = []
var toy = []
var flag = false
var checkbox1 = undefined
var checkbox2 = undefined
var checkbox3 = undefined
var restart = document.getElementById("restart")
TYPES=["blep","happy","sleeping","dopey","burger","cart","nerd","shy","sleepy"]

__init__()

function __init__()
{
	Array.from(document.getElementsByClassName("choice-grid")[0].children).forEach(function(item)
	{
		dog.push(item)
		let attr=item.getAttribute("data-choice-id")
		item.addEventListener("click",function()
		{
			handler(1, attr)
		})
	})
	Array.from(document.getElementsByClassName("choice-grid")[1].children).forEach(function(item)
	{
		bed.push(item)
		let attr=item.getAttribute("data-choice-id")
		item.addEventListener("click",function()
		{
			handler(2, attr)
		})
	})
	Array.from(document.getElementsByClassName("choice-grid")[2].children).forEach(function(item)
	{
		toy.push(item)
		let attr=item.getAttribute("data-choice-id")
		item.addEventListener("click",function()
		{
			handler(3, attr)
		})
	})

	window.addEventListener("resize",function()
	{
		resize(window.outerWidth)
	})
}

function resize(width)
{
	if(width >= 700)
	{
		document.getElementsByTagName("article")[0].style.width = "700px"
		document.getElementById("yayinternet").style.display = "flex"
		
		dog.forEach(function(item)
		{
			item.style.width="calc(32.5% - 20px)"
		})
		
		bed.forEach(function(item)
		{
			item.style.width="calc(32.5% - 20px)"
		})
			
		toy.forEach(function(item)
		{
			item.style.width="calc(32.5% - 20px)"
		})
	}
	
	else if(width<700 && width>=500)
	{
		document.getElementsByTagName("article")[0].style.width = "95%"
		document.getElementById("yayinternet").style.display = "none"
		
		dog.forEach(function(item)
		{
			item.style.width="calc(32.5% - 20px)"
			})
			
		bed.forEach(function(item)
		{
			item.style.width="calc(32.5% - 20px)"
			})
			
		toy.forEach(function(item)
		{
			item.style.width="calc(32.5% - 20px)"
			})
	}
	
	else if(width<500)
	{
		document.getElementsByTagName("article")[0].style.width = "95%"
		document.getElementById("yayinternet").style.display = "none"
		
		dog.forEach(function(item)
		{
			item.style.width="calc(49% - 20px)"
			})
			
		bed.forEach(function(item)
		{
			item.style.width="calc(49% - 20px)"
			})
			
		toy.forEach(function(item)
		{
			item.style.width="calc(49% - 20px)"
			})
	}
}

function handler(id, ch)
{
	if(flag)
		return
	
	setChoice(id, ch)
	
	if(id === 1)
	{
		dog.forEach(function(item)
		{
			item.style.opacity = 0.6
			item.style.background = "#f4f4f4"
			item.children[1].src = "images/unchecked.png"
		})
		
		let id=TYPES.indexOf(ch)
		let sel = dog[id]
		sel.style.opacity = 1.0
		sel.style.background = "#cfe3ff"
		sel.children[1].src = "images/checked.png"
	}
	
	else if(id === 2)
	{
		bed.forEach(function(item){
			item.style.opacity=0.6
			item.style.background="#f4f4f4"
			item.children[1].src="images/unchecked.png"
		})
		let id = TYPES.indexOf(ch)
		let sel = bed[id]
		sel.style.opacity = 1.0
		sel.style.background = "#cfe3ff"
		sel.children[1].src = "images/checked.png"
	}
	
	else if(id === 3)
	{
		toy.forEach(function(item){
			item.style.opacity=0.6
			item.style.background="#f4f4f4"
			item.children[1].src="images/unchecked.png"
		})
		
		let id = TYPES.indexOf(ch)
		let sel = toy[id]
		sel.style.opacity = 1.0
		sel.style.background = "#cfe3ff"
		sel.children[1].src = "images/checked.png"
	}
	
	if(checkbox1 !== undefined&&checkbox2 !== undefined&&checkbox3 !== undefined)
	{
		flag=true
		showResult()
	}
}

function clear()
{
	dog.forEach(function(item)
	{
		item.style.opacity=1.0
		item.style.background="#f4f4f4"
		item.children[1].src="images/unchecked.png"
	})
	
	bed.forEach(function(item)
	{
		item.style.opacity=1.0
		item.style.background="#f4f4f4"
		item.children[1].src="images/unchecked.png"
	})
	
	toy.forEach(function(item)
	{
		item.style.opacity=1.0
		item.style.background="#f4f4f4"
		item.children[1].src="images/unchecked.png"
	})
	
	flag = false
	checkbox1 = undefined
	checkbox2 = undefined
	checkbox3 = undefined
	
	document.getElementById("q1").scrollIntoView({behavior:"smooth"})
	restart.style.display="none"
}

function setChoice(qid, ch)
{
	if(qid === 1)
	{
		checkbox1 = ch
	}
	
	else if(qid === 2)
	{
		checkbox2 = ch
	}
	
	else if(qid === 3)
	{
		checkbox3 = ch
	}
}

function mouseOver()
{
	document.getElementById("restart_button").style.background = "#cecece"
}

function mouseOut()
{
	document.getElementById("restart_button").style.background = "#e0e0e0"
}

function showResult()
{
	restart.style.display = "block"
	if(checkbox2 === checkbox3)
	{
		document.getElementById("restart_info").innerHTML = "You got: " + RESULTS_MAP[checkbox2].title
		document.getElementById("restart_space").innerHTML=RESULTS_MAP[checkbox2].contents
	}
	
	else
	{
		document.getElementById("restart_info").innerHTML = "You got: " + RESULTS_MAP[checkbox1].title
		document.getElementById("restart_space").innerHTML=RESULTS_MAP[checkbox1].contents
	}
	
	restart.children[2].addEventListener("click", function(){clear()})
	restart.scrollIntoView({behavior:"smooth"})
}