function addButtonElement() {
  console.log("Chrome extension running...");

  let ul = document.getElementsByTagName("ul");
  let text = ul[3].firstChild.innerHTML;

  const keywords = [
    "Gluten Free",
    "Heart Healthy",
    "Sugar Free",
    "Lowers Cholesterol",
    "Whole Grain",
    "Whole Grains",
    "High Fiber",
    "Good source of Fiber",
    "Naturally Flavored",
    "Real Honey",
    "Real Cocoa",
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
    "whole grain":
      "While whole grains are better than refined grains, watch out for added sugars or processed sugars which increase the calorie density of the item, cause inflammation, and have been shown to have a direct link to chronic illnesses. Opt for no added sugar and higher fiber varieties.",
    "high fiber":
      "Marketed as high fiber and healthier, this product might contain added sugars, making it calorie and carb dense, which has been shown to cause blood sugar spikes and leads to cardiovasular disease and insulin resistance if prolonged. ",
    "gluten free":
      "Gluten free is mostly suggested for celiac disease patients and doesn’t carry any additional health advantagesfor others. Further gluten free products have lower dietary fiber, bringing the overall nutritional value down.",
    "heart healthy":
      "The study supporting this claim has been long challenged by experts for its authenticity. Further, newer studies have shown that lowering cholesterol doesn’t affect heart health. Simple carbs and sugars consumption is directly linked to heart disease.",
    "lowers cholesterol":
      "Study supporting this claim has long been challenged by experts. Further, newer research shows that simple sugars are a major contributor to chronic illnesses as opposed to cholesterol.",
    "naturally flavored":
      "The FDA doesn’t have any guidelines for “natural” food. So natural flavoring doesn’t mean healthier or better in any way.",
    "real honey":
      " Many ingredients claimed as “real” in processed foods are processed at high temperatures or use processed derivatives of ingredients to increase shelf life and reduce costs – and do not retain all nutritional benefits or taste of the original ingredients.",
    "real cocoa":
      "Many ingredients claimed as “real” in processed foods are processed at high temperatures or use processed derivatives of ingredients to increase shelf life and reduce costs – and do not retain all nutritional benefits or taste of the original ingredients.",
  };

  //create a new div element
  const newButton = document.createElement("button");
  newButton.textContent = "Evaluate Claims";
  newButton.classList.add("buttonn");

  // find elements we will be appending to
  const allDivs = document.getElementsByTagName("div");
  const buttonContainerNode =
    allDivs[0].firstChild.childNodes[3].childNodes[1].childNodes[1]
      .childNodes[1].firstChild.firstChild.firstChild;

  // add extension button to page if not already there
  if (
    buttonContainerNode.childNodes &&
    buttonContainerNode.lastChild.tagName !== "BUTTON"
  ) {
    buttonContainerNode.appendChild(newButton);
  }

  // add functionality to the button click
  newButton.onclick = function (e) {
    e.preventDefault();

    const targetNode = document.getElementById("root");

    // create modal
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal";

    // create modal content
    const debunkModal = document.createElement("div");
    debunkModal.className = "modal-content";
    const debunkTitle = `Misleading claim alert: ${matched[0]}`;
    const displayText = displayTextOptions[firstKeyword()];

    if (displayText === undefined) {
      debunkModal.innerHTML = "No marketing claims";
    } else {
      debunkModal.innerHTML = `${debunkTitle} <br/><br/>${displayText}`;
    }

    // attach modal content to modal container
    modalContainer.appendChild(debunkModal);

    //add icon for text box
    const alertIcon = document.createElement("img");
    const source = chrome.runtime.getURL("images/alert_small.png");
    alertIcon.src = source;
    const iconDiv = document.createElement("div");
    // iconDiv.classList.add("alert-icon");
    iconDiv.appendChild(alertIcon);

    // attach alert icon to modal
    debunkModal.prepend(iconDiv);

    // create exit button for modal
    const closeButton = document.createElement("span");
    closeButton.className = "close-button";
    closeButton.innerHTML = "&times;";

    // add exit button to modal
    debunkModal.prepend(closeButton);

    const nextButton = document.createElement("button");
    nextButton.className = "next-option";
    nextButton.innerHTML = "&#62";

    const prevButton = document.createElement("button");
    prevButton.className = "prev-option";
    prevButton.innerHTML = "&#60";

    debunkModal.appendChild(prevButton);
    debunkModal.appendChild(nextButton);

    let position = 0;
    function viewNext() {
      if (position >= matched.length - 1) {
        position = 0;
        debunkModal.innerHTML = `Misleading claim alert! <br/><br/>${
          displayTextOptions[matched[position].toLowerCase()]
        }`;
        debunkModal.prepend(closeButton);
        debunkModal.appendChild(prevButton);
        debunkModal.appendChild(nextButton);
        return;
      }
      debunkModal.innerHTML = `Misleading claim alert! <br/><br/>${
        displayTextOptions[matched[position + 1].toLowerCase()]
      }`;
      debunkModal.prepend(closeButton);
      debunkModal.appendChild(prevButton);
      debunkModal.appendChild(nextButton);
      position++;
    }

    function viewPrev() {
      if (position < 1) {
        position = matched.length - 1;
        debunkModal.innerHTML = `Misleading claim alert! <br/><br/>${
          displayTextOptions[matched[position].toLowerCase()]
        }`;
        debunkModal.prepend(closeButton);
        debunkModal.appendChild(prevButton);
        debunkModal.appendChild(nextButton);
        return;
      }
      debunkModal.innerHTML = `Misleading claim alert! <br/><br/>${
        displayTextOptions[matched[position - 1].toLowerCase()]
      }`;
      debunkModal.prepend(closeButton);
      debunkModal.appendChild(prevButton);
      debunkModal.appendChild(nextButton);
      position--;
    }

    prevButton.addEventListener("click", viewPrev);
    nextButton.addEventListener("click", viewNext);

    function toggleModal() {
      modalContainer.style.visibility = "hidden";
    }

    // logic here to link clicking with stuff happening
    if (newButton.classList.contains("button-showing-debunk")) {
      newButton.classList.remove("button-showing-debunk");
      newButton.textContent = "Evaluate Claims";
      const modalChild = targetNode.lastChild;
      targetNode.removeChild(modalChild);
    } else {
      // show modal styles
      modalContainer.classList.add("show-modal");
      targetNode.appendChild(modalContainer);
      closeButton.addEventListener("click", toggleModal);
    }
  };
}

addButtonElement();
