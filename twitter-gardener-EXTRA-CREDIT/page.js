// TODO(you): Add your own positive messages if you'd like!
const POSITIVE_MESSAGES = [
	'Never gonna give you up',
	'Never gonna let you down',
	'Never gonna run around',
	'Never gonna desert you',
	'Never gonna make you cry',
	'Never gonna say goodbye',
	'Never gonna tell a lie',
	'Never gonna hurt you'
];
const curserUrl=chrome.runtime.getURL('images/rose-cursor.gif');
const backUrl=chrome.runtime.getURL('images/sparkle.gif');

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(onMessage);
});

function onMessage(gardeningInProgress) {
	// TODO(you): Implement this function for extra credit! Add helper functions
	// as needed.

	// NOTE: This extension is EXTRA CREDIT and is not required for HW2.

	// If gardeningInProgress is true, that means "Start Gardening" was clicked.
	// If gardeningInProgress is false, that means "Stop Gardening" was clicked.
	if(gardeningInProgress)
	{
		tweets=document.getElementsByClassName('tweet')
		for(let i=0,tl=tweets.length;i<tl;i++)
		{
			if(tweets[i].getAttribute('hijacked')!=='true')
			{
				tweets[i].addEventListener('click',function(e){gardening(e,tweets[i])});
				tweets[i].addEventListener('mouseover',function(){over(tweets[i])});
				tweets[i].addEventListener('mouseout',function(){out(tweets[i])});
				tweets[i].setAttribute('hijacked','true');
				tweets[i].setAttribute('inprogress','true');
			}
		}
		console.log('all tweets hijacked');
		//hijack new tweets
		var code = "const POSITIVE_MESSAGES = ['Never gonna give you up','Never gonna let you down','Never gonna run around','Never gonna desert you','Never gonna make you cry','Never gonna say goodbye','Never gonna tell a lie','Never gonna hurt you'];\n"+
		"function over(tweet){if(tweet.getAttribute('inprogress')==='false')return;const curserUrl="+"'"+curserUrl+"'"+";const backUrl="+"'"+backUrl+"'"+";tweet.style.cursor='url('+curserUrl+')4 12,auto';tweet.style.backgroundImage='url('+backUrl+')';tweet.style.opacity='0.8';}\n"+
		"function out(tweet){if(tweet.getAttribute('inprogress')==='false')return;tweet.style.cursor='';tweet.style.backgroundImage='';tweet.style.opacity='1.0';}\n"+
		"function gardening(e,tweet){if(tweet.getAttribute('inprogress')==='false')return;e.stopPropagation();if(tweet.getAttribute('gardened')==='true')return;let ch=tweet.children;for(let i=0,cl=ch.length;i<cl;i++)if(ch[i].className==='content'){let chch=ch[i].children;for(let j=0,ccl=chch.length;j<ccl;j++){if(chch[j].className==='js-tweet-text-container')chch[j].innerText=POSITIVE_MESSAGES[Math.floor(Math.random()*POSITIVE_MESSAGES.length)];if(chch[j].className.includes('QuoteTweet')){chchch=chch[j].children[0];chchch.children[0].setAttribute('href','https://www.youtube.com/watch?v=dQw4w9WgXcQ');chchch.children[1].setAttribute('href','https://www.youtube.com/watch?v=dQw4w9WgXcQ');}}}tweet.setAttribute('gardened','true');}\n"+
		'('+function() {
			$(document).ajaxComplete(function(){ 
				tweets=document.getElementsByClassName('tweet');
				for(let i=0,tl=tweets.length;i<tl;i++)
				{
					if(tweets[i].getAttribute('hijacked')!=='true')
					{
						tweets[i].addEventListener('click',function(e){gardening(e,tweets[i])});
						tweets[i].addEventListener('mouseover',function(){over(tweets[i])});
						tweets[i].addEventListener('mouseout',function(){out(tweets[i])});
						tweets[i].setAttribute('hijacked','true');
						tweets[i].setAttribute('inprogress','true');
					}
				}
				console.log('all tweets hijacked');
			});
		}+')();';
		if(document.getElementById('ajaxLoadDetect')===null)
		{
			var script = document.createElement('script');
			script.setAttribute('id','ajaxLoadDetect')
			script.textContent = code;
			document.head.appendChild(script);
			script.parentNode.removeChild(script);
		}
	}
	else
	{
		elem=document.getElementById('ajaxLoadDetect');
		if(elem!==null)
			elem.parentNode.removeChild(elem);
		tweets=document.getElementsByClassName('tweet');
		for(let i=0,tl=tweets.length;i<tl;i++)
				tweets[i].setAttribute('inprogress','false');
	}
}

function over(tweet)
{
	if(tweet.getAttribute('inprogress')==='false')
		return;
	tweet.style.cursor='url('+curserUrl+')4 12,auto';
	tweet.style.backgroundImage='url('+backUrl+')';
	tweet.style.opacity='0.8';
}

function out(tweet)
{
	if(tweet.getAttribute('inprogress')==='false')
		return;
	tweet.style.cursor='';
	tweet.style.backgroundImage='';
	tweet.style.opacity='1.0';
}

function gardening(e,tweet)
{
	if(tweet.getAttribute('inprogress')==='false')
		return;
	e.stopPropagation();
	if(tweet.getAttribute('gardened')==='true')
		return;
	let ch=tweet.children;
	for(let i=0,cl=ch.length;i<cl;i++)
		if(ch[i].className==='content')
		{
			let chch=ch[i].children;
			for(let j=0,ccl=chch.length;j<ccl;j++)
			{
				if(chch[j].className==='js-tweet-text-container')
					chch[j].innerText=POSITIVE_MESSAGES[Math.floor(Math.random()*POSITIVE_MESSAGES.length)];
				if(chch[j].className.includes('QuoteTweet'))
				{
					chchch=chch[j].children[0];
					chchch.children[0].setAttribute('href','https://www.youtube.com/watch?v=dQw4w9WgXcQ');
					chchch.children[1].setAttribute('href','https://www.youtube.com/watch?v=dQw4w9WgXcQ');
				}
			}
		}
	tweet.setAttribute('gardened','true');
}