/* global MutationObserver */
(function () {
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

  // TODO: this can be more performant for sure - or more concise at least, lol
  function findSelection (node, selection = 'Projektteam - zuweisbare Benutzer') {
    if (node.innerHTML === selection) {
      return node
    }
    for (const child of node.childNodes) {
      if (child.innerHTML === selection) {
        return child
      }
      const found = findSelection(child, selection)
      if (found) {
        return found
      }
    }
    return null
  }

  function init (commentWrapper) {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach(addedNode => {
            const visibilityNode = addedNode.querySelector('[data-testid="issue-comment-base.ui.comment.comment-visibility.comment-visibility-wrapper"]')
            if (visibilityNode) {
              visibilityNode.firstChild.click()

              const menuList = document.querySelector('.comment-visibility__menu-list')
              const menuOptions = menuList.querySelectorAll('.comment-visibility__option')
              // TODO: save the options to storage to update the option list in popup

              menuOptions.forEach(option => {
                if (findSelection(option)) {
                  option.click()
                  // TODO: persist option node to not search it again for new comments (storage? or maybe localStorage)
                  // TODO: display something to the user if none is found for any of the options - can't have accidental visible comments
                }
              })
            }
          })
        }
      })
    })
    observer.observe(commentWrapper, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true
    })
  }

  // TODO: proper multi language support
  const commentWrapperSelectors = [
    'input[placeholder="Einen Kommentar hinzufügen..."]',
    'input[placeholder="Add a comment…"]'
  ]
  commentWrapperSelectors.forEach(selector => {
    waitForElement(selector).then((element) => {
      init(element.parentNode)
    })
  })
})()
