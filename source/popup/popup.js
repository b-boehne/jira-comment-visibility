chrome.storage.sync.get('options', ({options}) => {
	options = options || [];
	if (!options.length) {
		return;
	}

	const selectNode = document.querySelector('#select');
	while (selectNode.firstChild) {
		selectNode.firstChild.remove();
	}

	for (const text of options) {
		const optionNode = document.createElement('option');
		optionNode.value = text;
		optionNode.text = text;
		selectNode.append(optionNode);
	}
});

const select = document.querySelector('#select');

chrome.storage.sync.get('selection', ({selection}) => {
	select.value = selection;
});

select.addEventListener('change', async type => {
	chrome.storage.sync.set({selection: type.target.value});
});
