document.getElementById("1-interrupted-page-hide").onclick = async () => {
  const { mainContainer, container, iframe } = setupIframe();

  // Set up two listeners on the iframe
  iframe.contentWindow.addEventListener("pagehide", () => {
    console.log("event listener 1 fired");
    container.removeChild(iframe); // Modifying the DOM in the first listener will cause the second listener to not fire.
  });
  iframe.contentWindow.addEventListener("pagehide", () => {
    console.log("event listener 2 fired");
  });

  mainContainer.removeChild(container);
};

function setupIframe() {
  const mainContainer = document.getElementById("container");

  const container = document.createElement("div");
  mainContainer.appendChild(container);

  const iframe = document.createElement("iframe");
  container.appendChild(iframe);

  return { mainContainer, container, iframe };
}
