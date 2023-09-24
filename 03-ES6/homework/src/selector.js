var traverseDomAndCollectElements = function (matchFunc, startEl, resultSet = []) {

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if (matchFunc(startEl) === true) resultSet.push(startEl);
  for (let i = 0; i < startEl.children.length; i++) {
    traverseDomAndCollectElements(matchFunc, startEl.children[i], resultSet)
  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {
  // tu código aquí
  if (typeof selector !== 'string') throw new Error("no es un string válido");
  const arr = selector.split('');

  if (arr[0] === '#') return 'id';
  if (arr[0] === '.') return 'class'
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === '.') return 'tag.class'
  };
  return 'tag';
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = (elementDom) => `#${elementDom.id}` === selector;
  } else if (selectorType === "class") {
    matchFunction = (elementDom) => {
      for (const clases of elementDom.classList) {
        if (`.${clases}` === selector) return true;
      }
      return false;
    }
  } else if (selectorType === "tag.class") {
    const [tag, clase] = selector.split(".");
    matchFunction = (elementDom) => matchFunctionMaker(tag)(elementDom) && matchFunctionMaker(`.${clase}`)(elementDom);
  } else if (selectorType === "tag") {
    matchFunction = (elementDom) => elementDom.tagName.toLowerCase() === selector.toLowerCase();
  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
