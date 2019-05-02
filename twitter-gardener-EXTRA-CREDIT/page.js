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

chrome.runtime.onConnect.addListener(function(port)
{
  port.onMessage.addListener(onMessage);
});

function onMessage(gardeningInProgress)
{
	// TODO(you): Implement this function for extra credit! Add helper functions
	// as needed.

	// NOTE: This extension is EXTRA CREDIT and is not required for HW2.

	// If gardeningInProgress is true, that means "Start Gardening" was clicked.
	// If gardeningInProgress is false, that means "Stop Gardening" was clicked.
	
	if(gardeningInProgress)
	{
		tweets = document.getElementsByClassName('tweet')
		for(let i=0,tweets_length=tweets.length;i<tweets_length;i++)
		{
			if(tweets[i].getAttribute('hacked') != 'true')
			{
				tweets[i].addEventListener('click',function(seed){planting(seed,tweets[i])});
				tweets[i].addEventListener('mouseover',function(){cover(tweets[i])});
				tweets[i].addEventListener('mouseout',function(){present(tweets[i])});
				tweets[i].setAttribute('hacked','true');
				tweets[i].setAttribute('inprogress','true');
			}
		}

		var message = "const POSITIVE_MESSAGES = ['Never gonna give you up','Never gonna let you down','Never gonna run around','Never gonna desert you','Never gonna make you cry','Never gonna say goodbye','Never gonna tell a lie','Never gonna hurt you'];\n"+
		"function cover(tweet){if(tweet.getAttribute('inprogress')=='false')return;const curserUrl="+"'"+curserUrl+"'"+";const backUrl="+"'"+backUrl+"'"+";tweet.style.cursor='url('+curserUrl+')4 12,auto';tweet.style.backgroundImage='url('+backUrl+')';tweet.style.opacity='0.8';}\n"+
		"function present(tweet){if(tweet.getAttribute('inprogress')=='false')return;tweet.style.cursor='';tweet.style.backgroundImage='';tweet.style.opacity='1.0';}\n"+
		"function planting(seed,tweet){if(tweet.getAttribute('inprogress')=='false')return;seed.stopPropagation();if(tweet.getAttribute('gardened')=='true')return;let children=tweet.children;for(let i=0,children_len=children.length;i<children_len;i++)if(children[i].className=='content'){let x=children[i].children;for(let j=0,x_len=x.length;j<x_len;j++){if(x[j].className=='js-tweet-text-container')x[j].innerText=POSITIVE_MESSAGES[Math.floor(Math.random()*POSITIVE_MESSAGES.length)];if(x[j].className.includes('QuoteTweet')){y=x[j].children[0];y.children[0].setAttribute('href','https://www.youtube.com/watch?v=dQw4w9WgXcQ');y.children[1].setAttribute('href','https://www.youtube.com/watch?v=dQw4w9WgXcQ');}}}tweet.setAttribute('gardened','true');}\n"+
		'(' + function() {
			$(document).ajaxComplete(function(){ 
				tweets=document.getElementsByClassName('tweet');
				
				for(let i=0,tweets_length=tweets.length;i<tweets_length;i++)
				{
					if(tweets[i].getAttribute('hacked')!='true')
					{
						tweets[i].addEventListener('click',function(seed){planting(seed,tweets[i])});
						tweets[i].addEventListener('mouseover',function(){cover(tweets[i])});
						tweets[i].addEventListener('mouseout',function(){present(tweets[i])});
						tweets[i].setAttribute('hacked','true');
						tweets[i].setAttribute('inprogress','true');
					}
				}
			});
		}+')();';
		
		signal = document.getElementById('ajaxLoadDetect')
		
		if(signal == null)
		{
			var script = document.createElement('script');
			script.setAttribute('id','ajaxLoadDetect')
			script.textContent = message;
			document.head.appendChild(script);
			script.parentNode.removeChild(script);
		}
	}
	
	else
	{
		signal = document.getElementById('ajaxLoadDetect');
		
		if(signal != null)
		{
			signal.parentNode.removeChild(signal);
		}
		
		tweets=document.getElementsByClassName('tweet');
		
		for(let i=0,tweets_length=tweets.length;i<tweets_length;i++)
		{
				tweets[i].setAttribute('inprogress','false');
		}
	}
}

function cover(tweet)
{
	if(tweet.getAttribute('inprogress') == 'false')
	{
		return;
	}
	
	tweet.style.cursor='url('+curserUrl+')4 12,auto';
	tweet.style.backgroundImage='url('+backUrl+')';
	tweet.style.opacity='0.8';
}

function present(tweet)
{
	if(tweet.getAttribute('inprogress') == 'false')
	{
		return;
	}
	
	tweet.style.cursor='';
	tweet.style.backgroundImage='';
	tweet.style.opacity='1.0';
}

function planting(seed, tweet)
{
	if(tweet.getAttribute('inprogress') == 'false')
	{
		return;
	}
	seed.stopPropagation();
	
	if(tweet.getAttribute('gardened') == 'true')
	{
		return;
	}
	let children = tweet.children;
	
	for(let i=0, children_len=children.length; i<children_len; i++)
	{
		if(children[i].className == 'content')
		{
			let x=children[i].children;
			for(let j=0, x_len=x.length; j<x_len; j++)
			{
				if(x[j].className == 'js-tweet-text-container')
					x[j].innerText=POSITIVE_MESSAGES[Math.floor(Math.random()*POSITIVE_MESSAGES.length)];
				if(x[j].className.includes('QuoteTweet'))
				{
					y=x[j].children[0];
					y.children[0].setAttribute('href','https://www.youtube.com/watch?v=dQw4w9WgXcQ');
					y.children[1].setAttribute('href','https://www.youtube.com/watch?v=dQw4w9WgXcQ');
				}
			}
		}
	}
	
	tweet.setAttribute('gardened','true');
}
