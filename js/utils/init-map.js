const mainForm = document.querySelector('.ad-form');
const toggleDisabled = (tagName, boolean) => mainForm.querySelectorAll(tagName).forEach((element) => element.disabled = boolean);

const beforeInitMap = (currentForm) => {
  currentForm.classList.add('ad-form--disabled');
  toggleDisabled('input', true);
  toggleDisabled('select', true);
  toggleDisabled('textarea', true);
  toggleDisabled('checkbox', true);
};

const afterInitMap = (currentForm) => {
  currentForm.classList.remove('ad-form--disabled');
  toggleDisabled('input', false);
  toggleDisabled('select', false);
  toggleDisabled('textarea', false);
  toggleDisabled('checkbox', false);
};

export {beforeInitMap, afterInitMap, mainForm};
