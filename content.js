function addButtonElement() {
  console.log("Chrome extension running...");

  let ul = document.getElementsByTagName("ul");
  let text = ul[3].firstChild.innerHTML;

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

  const firstKeyword = () => {
    if (matched[0]) {
      return matched[0].toLowerCase();
    } else {
      return "no match";
    }
  };

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

  const displayText = displayTextOptions[firstKeyword()];

  //create a new div element
  const newButton = document.createElement("button");
  newButton.textContent = "Click to Analyze";
  newButton.className = "buttonn";

  // find elements we will be appending to
  const allDivs = document.getElementsByTagName("div");
  const buttonContainerNode =
    allDivs[0].firstChild.childNodes[3].childNodes[1].childNodes[1]
      .childNodes[1].firstChild.firstChild.firstChild;

  buttonContainerNode.appendChild(newButton);

  const targetNode =
    allDivs[0].firstChild.childNodes[3].childNodes[1].childNodes[1]
      .childNodes[1].childNodes[1];
  targetNode.classList.add("testing");

  // create the debunking modal
  const debunkModal = document.createElement("div");
  debunkModal.innerHTML = `Misleading claim alert! <br/><br/>${displayText}<br/>`;
  debunkModal.style.background = "#fefefe";
  debunkModal.style.boxShadow =
    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
  debunkModal.style.borderRadius = "2px";
  debunkModal.style.padding = "12px";
  debunkModal.style.height = "300px";

  // add functionality to the button click
  newButton.onclick = function (e) {
    e.preventDefault();

    if (newButton.classList.contains("button-showing-debunk")) {
      newButton.classList.remove("button-showing-debunk");
      newButton.textContent = "Click to Analyze";
      newButton.style.background = "#E4572E";
      const modalChild = targetNode.lastChild;
      targetNode.removeChild(modalChild);
    } else {
      newButton.classList.add("button-showing-debunk");
      newButton.textContent = "Done";
      newButton.style.background = "black";

      targetNode.appendChild(debunkModal);
    }
  };
}

addButtonElement();
