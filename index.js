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

document.getElementById("3-normal-unload").onclick = () => {
  runScenario("unload", () => () => {
    console.log("event listener 1 fired");
    // In a normal case, both listeners will fire.
  });
};

document.getElementById("4-interrupted-unload").onclick = () => {
  runScenario("unload", ({ container, iframe }) => () => {
    console.log("event listener 1 fired");
    // Modifying the DOM in the first listener will cause the second listener to not fire in chromium and edge.
    // The second listener _will_ fire in firefox, however.
    container.removeChild(iframe); 
  });
};

document.getElementById("5-pagehide-on-timeout").onclick = () => {
  runScenario("pagehide", ({ container, iframe }) => () => {
    console.log("event listener 1 fired");
    // Modifying the DOM on a timeout will fix the problem and allow the second event to run.
    setTimeout(() => container.removeChild(iframe), 0); 
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
