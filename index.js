document.getElementById("1-normal-page-hide").onclick = () => {
  runScenario("pagehide", () => () => {
    console.log("event listener 1 fired");
    // In a normal case, both listeners will fire.
  });
};


document.getElementById("2-interrupted-page-hide").onclick = () => {
  runScenario("pagehide", ({ container, iframe }) => () => {
    console.log("event listener 1 fired");
    // Modifying the DOM in the first listener will cause the second listener to not fire in chromium and edge.
    // The second listener _will_ fire in firefox, however.
    container.removeChild(iframe); 
  });
};

function runScenario(event, getFirstListener) {
  const mainContainer = document.getElementById("container");

  const container = document.createElement("div");
  mainContainer.appendChild(container);

  const iframe = document.createElement("iframe");
  container.appendChild(iframe);

  iframe.contentWindow.addEventListener(event, getFirstListener({ container, iframe }));
  iframe.contentWindow.addEventListener(event, () => {
    // Depending on what the first listener does, this may or may not fire.
    console.log("event listener 2 fired");
  });

  mainContainer.removeChild(container);
}
