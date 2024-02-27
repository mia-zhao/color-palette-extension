console.log("content");

const cursorImageUrl = chrome.runtime.getURL("src/assets/cursor-24.png");

const state = { isColorPicking: false };

function msgListener(
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (message.action == "useColorPickerCursor") {
    // change cursor to custom for color picking
    document.getElementsByTagName(
      "body"
    )[0].style.cursor = `url("${cursorImageUrl}"), default`;
    state.isColorPicking = true;
    sendResponse({ status: "Ok" });
    return true;
  } else {
    sendResponse({ status: "Unhandled" });
    return false;
  }
}

chrome.runtime.onMessage.addListener(msgListener);
console.log("listener added");

// Add click event listener to the document
document.addEventListener("click", function () {
  if (state.isColorPicking) {
    console.log("clicked...");
    console.log("isSecureContext", window.isSecureContext);
    if (window.EyeDropper != undefined) {
      const eyeDropper = new window.EyeDropper();
      (async () => {
        const res = await eyeDropper?.open();
        console.log("res", res);
      })();
    }
    state.isColorPicking = false;
  }
});

// // update all cursor
// const styleSheet = `
//   body, body * {
//     cursor: url('${cursorImageUrl}'), auto !important;
//   }
// `;
// const styleEl = document.createElement("style");
// styleEl.textContent = styleSheet;
// document.head.appendChild(styleEl);
