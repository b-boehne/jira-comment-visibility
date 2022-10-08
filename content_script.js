/* global MutationObserver */
/* global chrome */

(() => {
  function waitForElement (selector) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector))
      }

      const observer = new MutationObserver(_mutations => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector))
          observer.disconnect()
        }
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    })
  }

  function clickSelectionInMenuOptions (selection, menuOptions) {
    menuOptions.forEach(option => {
      if (option.innerText === selection) {
        option.click()
      }
    })
    // TODO: display something to the user if none is found for any of the options - can't have accidental visible comments
  }

  function findAndClickSelection () {
    const menuList = document.querySelector('.comment-visibility__menu-list')
    const menuOptions = menuList.querySelectorAll('.comment-visibility__option')

    // little trick to stop the menu list from flashing
    menuList.style.display = 'none'
    const options = [...menuOptions].map(option => option.innerText)
    chrome.storage.sync.set({ options })

    // TODO: if we don't use sync get we can maybe get rid of the menu flashing
    chrome.storage.sync.get('selection', ({ selection }) => {
      clickSelectionInMenuOptions(selection, menuOptions)
      menuList.style.display = ''
    })
  }

  function preventFlashingDarkColors (visibilityNode) {
    const visibilityButton = visibilityNode.querySelector('button')
    visibilityButton.style.background = 'var(--ds-background-neutral,rgba(9,30,66,0.04))'
    visibilityButton.style.color = 'var(--ds-text,#42526E)'
  }

  function findAndClickVisibilityChanger (addedNode) {
    const visibilityNode = addedNode.querySelector('[data-testid="issue-comment-base.ui.comment.comment-visibility.comment-visibility-wrapper"]')
    if (visibilityNode) {
      visibilityNode.firstChild.click()
      preventFlashingDarkColors(visibilityNode)
      findAndClickSelection()
    }
  }

  function initMutationObserver (commentWrapper) {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach(addedNode => {
            findAndClickVisibilityChanger(addedNode)
          })
        }
      })
    })
    observer.observe(commentWrapper, {
      childList: true,
      subtree: true
    })
  }

  // TODO: proper multi language support
  const commentWrapperSelectors = [
    'input[placeholder="Einen Kommentar hinzufügen..."]',
    'input[placeholder="Add a comment…"]'
  ]
  commentWrapperSelectors.forEach(selector => {
    waitForElement(selector).then((element) => {
      initMutationObserver(element.parentNode)
    })
  })

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === 'sync' && changes.selection?.newValue) {
      // TODO: can be made much more performant
      findAndClickVisibilityChanger(document)
    }
  })
})()
