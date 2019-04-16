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
	if(node.nodeName==="SCRIPT"||node.nodeName==="STYLE")
		return
	
	console.log(node.nodeName+' '+node.nodeValue)
	
	if(node.nodeValue!=null)
	{
		let txtArray=node.nodeValue.split(' ')
		for(let i=0,l=txtArray.length;i<l;i++)
		{
			txtArray[i]=txtArray[i].replace('\n','')
			txtArray[i]=txtArray[i].trim()
			if(txtArray[i] in MATCH_LIST)
				txtArray[i]=MATCH_LIST[txtArray[i]]
		}
		node.nodeValue=txtArray.join(' ')
	}
	let children=node.childNodes
	for(let i=0,l=children.length;i<l;i++)
		transformTextNodes(children[i])
}

transformTextNodes(document.body);

// Log statement to test that the extension loaded properly.
console.log('Evil extension loaded!');
console.log('Extension unloaded!')