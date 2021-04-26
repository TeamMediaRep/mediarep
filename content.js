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
  newButton.className = "taurusButton";

  //styling for button
  newButton.style.background = "#E4572E";
  newButton.style.position = "relative";
  newButton.style.top = "18em";
  newButton.style.left = "46em";
  newButton.style.zIndex = 8000;
  newButton.style.color = "white";
  newButton.style.width = "175px";
  newButton.style.height = "40px";
  newButton.style.borderRadius = "10px";
  newButton.style.padding = "0.5em";
  newButton.style.boxSizing = "border-box";

  //attach button to page
  const currentButton = document.getElementById("headerMain");
  document.body.insertAdjacentElement("afterbegin", newButton, currentButton);

  // document.body.insertAdjacentElement("afterend", debunkModal, newButton);

  newButton.onclick = function (e) {
    e.preventDefault();

    const allDivs = document.getElementsByTagName("div");
    const targetNode =
      allDivs[0].firstChild.childNodes[3].childNodes[1].childNodes[1]
        .childNodes[1].childNodes[1];
    targetNode.classList.add("testing");

    // create the debunking modal
    const debunkModal = document.createElement("div");
    debunkModal.innerHTML = "Misleading claim alert! <br/> <br/>GLUTEN FREE is mostly suggested for celiac disease patients and doesn't carry any additional health advantages for others. <br/> <br/>This product has 12g of added sugar in a 36g serving size - which is 30% sugar and 40g net carbs.";
    debunkModal.style.background = "#fefefe";
    debunkModal.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
    debunkModal.style.borderRadius = "2px";
    debunkModal.style.padding = "12px";
    debunkModal.style.height = "300px";

    // logic here to link clicking with stuff happening
    if (newButton.classList.contains("button-showing-debunk")) {
      newButton.classList.remove("button-showing-debunk");
      newButton.textContent = "Click to Analyze";
      newButton.style.background =
        "#E4572E";
      const modalChild = targetNode.lastChild;
      targetNode.removeChild(modalChild);
    } else {
      newButton.classList.add("button-showing-debunk");
      newButton.textContent = "Done";
      newButton.style.background = "black";

      targetNode.appendChild(debunkModal);
    }

    console.log(
      "Heads up!! Labeling like 'Gluten Free' has no real health benefit unless you're celiac!"
    );
  };
}

document.body.onload = addButtonElement;
