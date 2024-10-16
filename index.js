document.getElementById("1-interrupted-page-hide").onclick = async () => {
  const { removeContainer, detachIframe, iframe } = setupIframe();

  // Set up two listeners on the iframe
  iframe.contentWindow.addEventListener("pagehide", () => {
    console.log("event listener 1 fired");
    detachIframe(); // Modifying the DOM in the first listener will cause the second listener to not fire.
  });
  iframe.contentWindow.addEventListener("pagehide", () => {
    console.log("event listener 2 fired");
  });

  removeContainer();
};

function setupIframe() {
  const mainContainer = document.getElementById("container");

  const container = document.createElement("div");
  mainContainer.appendChild(container);

  const iframe = document.createElement("iframe");
  container.appendChild(iframe);

  return {
    removeContainer: () => mainContainer.removeChild(container),
    detachIframe: () => container.removeChild(iframe),
    iframe
  };
}
