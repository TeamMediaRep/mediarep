console.log("Chrome extension running...");

document.body.onload = addButtonElement;

function addButtonElement() {
  //create a new div element
  const newButton = document.createElement("button");

  //give the button content
  const newContent = document.createTextNode("Click to Analyze");

  //add the text to the button
  newButton.appendChild(newContent);
  newButton.classList.add("buttonExtension");

  //styling for button
  newButton.style.background = "linear-gradient(to bottom, #2c3e50, #3498db) ";
  newButton.style.border = "solid 2px #dfdfdf";
  newButton.style.position = "relative";
  newButton.style.top = "12.5em";
  newButton.style.left = "50em";
  newButton.style.zIndex = 8000;
  newButton.style.backgroundColor = "white";
  newButton.style.color = "white";
  newButton.style.width = "10%";
  newButton.style.borderRadius = "20px";
  newButton.style.padding = "0.5em";
  newButton.style.boxSizing = "border-box";

  const currentButton = document.getElementById("headerMain");
  document.body.insertAdjacentElement("afterbegin", newButton, currentButton);

  newButton.onclick = function (e) {
    e.preventDefault();
    // testing!
    console.log(
      "Heads up! Labeling like 'Gluten Free' has no real health benefit unless you're celiac!"
    );
  };
}
