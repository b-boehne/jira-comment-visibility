chrome.storage.sync.get('options', ({ options }) => {
  const selectNode = document.getElementById('select')

  options.forEach(text => {
    const optionNode = document.createElement('option')
    optionNode.value = text
    optionNode.text = text
    selectNode.appendChild(optionNode)
  })
})

const select = document.getElementById('select')

chrome.storage.sync.get('selection', ({ selection }) => {
  select.value = selection
})

select.addEventListener('change', async (type, listener) => {
  chrome.storage.sync.set({ selection: type.target.value })
})
