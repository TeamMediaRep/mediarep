console.log("Chrome extension running...");

const ul = document.getElementsByTagName("ul");
const text = ul[3].firstChild.innerHTML;

const keywords = [
  "Gluten Free",
  "Heart Healthy",
  "sugar free",
  "lower cholesterol",
  "WHOLE GRAIN",
  "Whole Grains",
  "High Fiber",
  "Good source of Fiber",
  "Naturally Flavored",
  "Real honey",
  "Real cocoa",
];
const matched = [];

keywords.forEach(textMatcher);
function textMatcher(item) {
  re = new RegExp(item, "gi");
  find = text.match(re);
  if (find) {
    matched.push(find[0]);
  }
}

const firstKeyword = matched[0].toLowerCase();
console.log("firstkey", firstKeyword);

const displayTextOptions = {
  "whole grains":
    "Misleading claim alert: Whole grains- \n \n While whole grains are better than refined grains, watch out for added sugars or processed sugars which increase the calorie density of the item, cause inflammation, and have been shown to have a direct link to chronic illnesses. Opt for now added sugar and higher fiber varieties.",
  "high fiber":
    "Misleading claim alert: High fiber- \n \n Marketed as high fiber and healthier, this product might contain added sugars, making it calorie and carb dense, which has been shown to cause blood usgar spikes and leads to cardiovasular disease and insulin resistance if prolonged. ",
  "gluten free":
    "Misleading claim alert: Gluten free- \n \n Gluten free is mostly suggested for celiac disease patients and doesn’t carry any additional health advantagesfor others. Further gluten free products have lower dietary fiber, bringing the overall nutritional value down.",
  "heart healthy":
    "Misleading claim alert: Heart healthy- \n \n The study supporting this claim has been long challenged by experts for its authenticity. Further, newer studies have shown that lowering cholesterol doesn’t affect heart health. Simple carbs and sugars consumption is directly linked to heart disease.",
  "lower cholesterol":
    "Misleading claim alert: Lower cholesterol- \n Study supporting this claim has long been challenged by experts. Further, newer research shows that simple sugars are a major contributor to chronic illnesses as opposed to cholesterol.",
  "naturally flavored":
    "Misleading claim alert: naturally flavored- \n The FDA doesn’t have any guidelines for “natural” food. So natural flavoring doesn’t mean healthier or better in any way.",
  "real honey":
    "Misleading claim alert: Real honey- \n Many ingredients claimed as “real” in processed foods are processed at high temperatures or use processed derivatives of ingredients to increase shelf life and reduce costs – and do not retain all nutritional benefits or taste of the original ingredients.",
  "real cocoa":
    "Misleading claim alert: Real cocoa- \n Many ingredients claimed as “real” in processed foods are processed at high temperatures or use processed derivatives of ingredients to increase shelf life and reduce costs – and do not retain all nutritional benefits or taste of the original ingredients.",
};

const displayText = displayTextOptions[firstKeyword];
console.log("textto display", displayText);

function addButtonElement() {
  //create a new div element
  const newButton = document.createElement("button");
  //give the button content
  newButton.textContent = "Click to Analyze";
  newButton.className = "buttonn";

  //styling for button
  newButton.style.background = "linear-gradient(to bottom, #2c3e50, #3498db) ";
  // newButton.style.position = "relative";
  // newButton.style.top = "12.5em";
  // newButton.style.left = "50em";
  // newButton.style.zIndex = 8000;
  newButton.style.color = "white";
  // newButton.style.width = "10%";
  // newButton.style.height = "30%";
  // newButton.style.borderRadius = "20px";
  // newButton.style.padding = "0.5em";
  // newButton.style.boxSizing = "border-box";

  //attach button to page
  const currentButton = document.getElementById("headerMain");
  document.body.insertAdjacentElement("afterbegin", newButton, currentButton);

  const allDivs = document.getElementsByTagName("div");
  const buttonContainerNode =
    allDivs[0].firstChild.childNodes[3].childNodes[1].childNodes[1]
      .childNodes[1].firstChild.firstChild.firstChild;
  newButton.classList.add("buttonn");
  // buttonContainerNode.insertAdjacentHTML("afterend", newButton);

  console.log(buttonContainerNode);

  const targetNode =
    allDivs[0].firstChild.childNodes[3].childNodes[1].childNodes[1]
      .childNodes[1].childNodes[1];
  // targetNode.classList.add("testing");

  // targetNode.append(newButton);
  buttonContainerNode.appendChild(newButton);

  newButton.onclick = function (e) {
    e.preventDefault();

    // create the debunking modal
    const debunkModal = document.createElement("div");
    debunkModal.innerHTML = displayText;
    debunkModal.style.background = "gray";
    debunkModal.style.height = "200px";

    // logic here to link clicking with stuff happening
    if (newButton.classList.contains("button-showing-debunk")) {
      newButton.classList.remove("button-showing-debunk");
      newButton.textContent = "Click to Analyze";
      newButton.style.background =
        "linear-gradient(to bottom, #2c3e50, #3498db) ";
      const modalChild = targetNode.lastChild;
      targetNode.removeChild(modalChild);
    } else {
      newButton.classList.add("button-showing-debunk");
      newButton.textContent = "I have been clicked!";
      newButton.style.background = "black";

      targetNode.appendChild(debunkModal);
    }

    console.log(
      "Heads up!! Labeling like 'Gluten Free' has no real health benefit unless you're celiac!"
    );
  };
}

document.body.onload = addButtonElement;
