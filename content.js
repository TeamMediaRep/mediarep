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

const displayTextOptions = {
  "whole grains":
    "Whole grains- \n While whole grains are better than refined grains, watch out for added sugars or processed sugars which increase the calorie density of the item, cause inflammation, and have been shown to have a direct link to chronic illnesses. Opt for now added sugar and higher fiber varieties.",
  "high fiber":
    "High fiber- \n \n Marketed as high fiber and healthier, this product might contain added sugars, making it calorie and carb dense, which has been shown to cause blood usgar spikes and leads to cardiovasular disease and insulin resistance if prolonged. ",
  "gluten free":
    "Gluten free- \n \n Gluten free is mostly suggested for celiac disease patients and doesn’t carry any additional health advantagesfor others. Further gluten free products have lower dietary fiber, bringing the overall nutritional value down.",
  "heart healthy":
    "Heart healthy- \n \n The study supporting this claim has been long challenged by experts for its authenticity. Further, newer studies have shown that lowering cholesterol doesn’t affect heart health. Simple carbs and sugars consumption is directly linked to heart disease.",
  "lower cholesterol":
    "Lower cholesterol- \n Study supporting this claim has long been challenged by experts. Further, newer research shows that simple sugars are a major contributor to chronic illnesses as opposed to cholesterol.",
  "naturally flavored":
    "Naturally flavored- \n The FDA doesn’t have any guidelines for “natural” food. So natural flavoring doesn’t mean healthier or better in any way.",
  "real honey":
    "Real honey- \n Many ingredients claimed as “real” in processed foods are processed at high temperatures or use processed derivatives of ingredients to increase shelf life and reduce costs – and do not retain all nutritional benefits or taste of the original ingredients.",
  "real cocoa":
    "Real cocoa- \n Many ingredients claimed as “real” in processed foods are processed at high temperatures or use processed derivatives of ingredients to increase shelf life and reduce costs – and do not retain all nutritional benefits or taste of the original ingredients.",
};

const displayText = displayTextOptions[firstKeyword];

function addButtonElement() {
  //create a new div element
  const newButton = document.createElement("button");
  newButton.textContent = "Evaluate Claims";
  newButton.className = "buttonn";

  //styling for button
  // newButton.style.background = "#E4572E";
  // // newButton.style.position = "relative";
  // newButton.style.top = "18em";
  // newButton.style.left = "46em";
  // // newButton.style.zIndex = 8000;
  // newButton.style.color = "white";
  // newButton.style.width = "175px";
  // newButton.style.height = "40px";
  // newButton.style.borderRadius = "10px";
  // newButton.style.padding = "0.5em";
  // newButton.style.boxSizing = "border-box";

  //attach button to page
  const currentButton = document.getElementById("headerMain");
  document.body.insertAdjacentElement("afterbegin", newButton, currentButton);

  const allDivs = document.getElementsByTagName("div");
  const buttonContainerNode =
    allDivs[0].firstChild.childNodes[3].childNodes[1].childNodes[1]
      .childNodes[1].firstChild.firstChild.firstChild;

  buttonContainerNode.appendChild(newButton);

  newButton.onclick = function (e) {
    e.preventDefault();

    // const targetNode =
    //   allDivs[0].firstChild.childNodes[3].childNodes[1].childNodes[1]
    //     .childNodes[1].childNodes[1];
    const targetNode = document.getElementById("root");
    targetNode.classList.add("testing");

    // create the debunking modal
    const modalContainer = document.createElement("div");
    modalContainer.style.position = "fixed";
    modalContainer.style.top = "0";
    modalContainer.style.left = "0";
    modalContainer.style.right = "0";
    modalContainer.style.width = "100%";
    modalContainer.style.height = "100%";
    modalContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modalContainer.style.opacity = "0";
    modalContainer.style.visibility = "hidden";
    modalContainer.style.transform = "scale(1.1)";
    modalContainer.style.transition = "visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s";

    const debunkModal = document.createElement("div");
    debunkModal.innerHTML = `Misleading claim alert! <br/><br/>${displayText}<br/>`;
    debunkModal.style.background = "#fefefe";
    debunkModal.style.boxShadow =
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
    debunkModal.style.borderRadius = "2px";
    debunkModal.style.padding = "12px";
    debunkModal.style.height = "300px";
    debunkModal.style.width = "24rem";

    debunkModal.style.position = "absolute";
    // debunkModal.style.top = "0";
    debunkModal.style.top = "50%";
    debunkModal.style.left = "50%";
    debunkModal.style.transform = "translate(-50%, -50%)";


    modalContainer.appendChild(debunkModal);

    const closeButton = document.createElement("span");
    closeButton.innerHTML = "&times;";
    closeButton.style.float = "right";
    closeButton.style.width = "1.5rem";
    closeButton.style.lineHeight = "1.5rem";
    closeButton.style.textAlign = "center";
    closeButton.style.cursor = "pointer";
    closeButton.style.borderRadius = "0.25rem";
    closeButton.style.backgroundColor = "#fefefe";

    debunkModal.prepend(closeButton);
    function toggleModal() {
      modalContainer.classList.toggle("button-showing-debunk");
    }

    // logic here to link clicking with stuff happening
    if (newButton.classList.contains("button-showing-debunk")) {
      newButton.classList.remove("button-showing-debunk");
      newButton.textContent = "Evaluate Claims";
      newButton.style.background = "#E4572E";
      const modalChild = targetNode.lastChild;
      targetNode.removeChild(modalChild);
    } else {
      newButton.classList.add("button-showing-debunk");
      newButton.textContent = "Done";
      newButton.style.background = "black";

      // show modal styles
      modalContainer.style.opacity = "1";
      modalContainer.style.visibility = "visible";
      modalContainer.style.transform = "scale(1.0)";
      modalContainer.style.transition = "visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s";

      targetNode.appendChild(modalContainer);
    }
  };
}

document.body.onload = addButtonElement;
