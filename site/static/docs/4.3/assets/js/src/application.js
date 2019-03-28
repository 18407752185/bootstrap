// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

/*!
 * JavaScript for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2019 The Bootstrap Authors
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 * For details, see https://creativecommons.org/licenses/by/3.0/.
 */

/* global ClipboardJS: false, anchors: false, bootstrap: false, bsCustomFileInput: false */

(function () {
  'use strict'

  function makeArray(list) {
    return [].slice.call(list)
  }

  // Tooltip and popover demos
  makeArray(document.querySelectorAll('.tooltip-demo'))
    .forEach(function (tooltip) {
      new bootstrap.Tooltip(tooltip, {
        selector: '[data-toggle="tooltip"]'
      })
    })

  makeArray(document.querySelectorAll('[data-toggle="popover"]'))
    .forEach(function (popover) {
      new bootstrap.Popover(popover)
    })

  makeArray(document.querySelectorAll('.toast'))
    .forEach(function (toastNode) {
      var toast = new bootstrap.Toast(toastNode, {
        autohide: false
      })

      toast.show()
    })

  // Demos within modals
  makeArray(document.querySelectorAll('.tooltip-test'))
    .forEach(function (tooltip) {
      new bootstrap.Tooltip(tooltip)
    })

  makeArray(document.querySelectorAll('.popover-test'))
    .forEach(function (popover) {
      new bootstrap.Popover(popover)
    })

  // Indeterminate checkbox example
  makeArray(document.querySelectorAll('.bd-example-indeterminate [type="checkbox"]'))
    .forEach(function (checkbox) {
      checkbox.indeterminate = true
    })

  // Disable empty links in docs examples
  makeArray(document.querySelectorAll('.bd-content [href="#"]'))
    .forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault()
      })
    })

  // Modal relatedTarget demo
  var exampleModal = document.getElementById('exampleModal')
  if (exampleModal) {
    exampleModal.addEventListener('show.bs.modal', function (event) {
      var button = event.relatedTarget // Button that triggered the modal
      var recipient = button.getAttribute('data-whatever') // Extract info from data-* attributes

      // Update the modal's content.
      var modalTitle = exampleModal.querySelector('.modal-title')
      var modalBodyInput = exampleModal.querySelector('.modal-body input')

      modalTitle.innerHTML = 'New message to ' + recipient
      modalBodyInput.value = recipient
    })
  }

  // Activate animated progress bar
  makeArray(document.querySelectorAll('.bd-toggle-animated-progress > .progress-bar-striped'))
    .forEach(function (progressBar) {
      progressBar.addEventListener('click', function () {
        if (progressBar.classList.contains('progress-bar-animated')) {
          progressBar.classList.remove('progress-bar-animated')
        } else {
          progressBar.classList.add('progress-bar-animated')
        }
      })
    })

  // Insert copy to clipboard button before .highlight
  var buttonHtml = '<div class="bd-clipboard"><button type="button" class="btn-clipboard" title="Copy to clipboard">Copy</button></div>'
  makeArray(document.querySelectorAll('figure.highlight, div.highlight'))
    .forEach(function (element) {
      element.insertAdjacentHTML('beforebegin', buttonHtml)
    })

  makeArray(document.querySelectorAll('.btn-clipboard'))
    .forEach(function (button) {
      var tooltipButton = new bootstrap.Tooltip(button)

      button.addEventListener('mouseleave', function () {
        // Explicitly hide tooltip, since after clicking it remains
        // focused (as it's a button), so tooltip would otherwise
        // remain visible until focus is moved away
        tooltipButton.hide()
      })
    })

  var clipboard = new ClipboardJS('.btn-clipboard', {
    target: function (trigger) {
      return trigger.parentNode.nextElementSibling
    }
  })

  clipboard.on('success', function (event) {
    var tooltipButton = bootstrap.Tooltip._getInstance(event.trigger)

    event.trigger.setAttribute('title', 'Copied!')
    tooltipButton._fixTitle()
    tooltipButton.show()

    event.trigger.setAttribute('title', 'Copy to clipboard')
    tooltipButton._fixTitle()
    event.clearSelection()
  })

  clipboard.on('error', function (event) {
    var modifierKey = /Mac/i.test(navigator.userAgent) ? '\u2318' : 'Ctrl-'
    var fallbackMessage = 'Press ' + modifierKey + 'C to copy'
    var tooltipButton = bootstrap.Tooltip._getInstance(event.trigger)

    event.trigger.setAttribute('title', fallbackMessage)
    tooltipButton._fixTitle()
    tooltipButton.show()

    event.trigger.setAttribute('title', 'Copy to clipboard')
    tooltipButton._fixTitle()
  })

  anchors.options = {
    icon: '#'
  }
  anchors.add('.bd-content > h2, .bd-content > h3, .bd-content > h4, .bd-content > h5')

  // Wrap inner
  makeArray(document.querySelectorAll('.bd-content > h2, .bd-content > h3, .bd-content > h4, .bd-content > h5'))
    .forEach(function (element) {
      element.innerHTML = '<span class="bd-content-title">' + element.innerHTML + '</span>'
    })

  bsCustomFileInput.init()
})()
