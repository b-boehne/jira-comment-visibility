const selection = 'Projektteam - zuweisbare Benutzer'

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({options: [selection]})
	chrome.storage.sync.set({selection})
})
