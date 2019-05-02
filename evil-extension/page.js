const MATCH_LIST = {
	'there': 'their',
	'their': 'they\'re',
	'they\'re': 'there',
	'There': 'Their',
	'Their': 'They\'re',
	'They\'re': 'There',
	'THERE': 'THEIR',
	'THEIR': 'THEY\'RE',
	'THEY\'RE': 'THERE'
};

function transformTextNodes(node) {
	// TODO(you): Implement this function! See HW spec for details.
	
	if(node.nodeName === "SCRIPT" || node.nodeName === "STYLE")
	{
		return
	}
	
	if(node.nodeValue!=null)
	{
		let vocab = node.nodeValue.split(' ')
		for(let i=0, len=vocab.length; i<len; i++)
		{
			vocab[i] = vocab[i].replace('\n','')
			vocab[i] = vocab[i].trim()
			
			if(vocab[i] in MATCH_LIST)
			{
				vocab[i]=MATCH_LIST[vocab[i]]
			}
		}
		node.nodeValue = vocab.join(' ')
	}
	
	let transfer = node.childNodes
	
	for(let i=0, len=transfer.length; i<len; i++)
	{
		transformTextNodes(transfer[i])
	}
}

transformTextNodes(document.body);

// Log statement to test that the extension loaded properly.
console.log('Done! Evil Extension is well loaded!');
console.log('Extension Uploaded!')