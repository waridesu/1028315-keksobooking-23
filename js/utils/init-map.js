const toggleDisabled = (tagName, boolean) => document.body.querySelectorAll(tagName).forEach((element) => element.disabled = boolean);

const beforeInitMap = (filterForm, sendForm) => {
  filterForm.classList.add('ad-form--disabled');
  sendForm.classList.add('ad-form--disabled');
  toggleDisabled('input', true);
  toggleDisabled('select', true);
  toggleDisabled('textarea', true);
  toggleDisabled('checkbox', true);
};

const afterInitMap = (filterForm, sendForm) => {
  filterForm.classList.remove('ad-form--disabled');
  sendForm.classList.remove('ad-form--disabled');
  toggleDisabled('input', false);
  toggleDisabled('select', false);
  toggleDisabled('textarea', false);
  toggleDisabled('checkbox', false);
};

export {beforeInitMap, afterInitMap};
