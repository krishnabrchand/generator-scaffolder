/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE_AFL.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * @category    Varien
 * @package     js
 * @copyright   Copyright (c) 2014 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
const paymentForm = Class.create();
paymentForm.prototype = {
  initialize(formId) {
    this.formId = formId;
    this.validator = new Validation(this.formId);
    const elements = Form.getElements(formId);

    let method = null;
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].name == 'payment[method]') {
        if (elements[i].checked) {
          method = elements[i].value;
        }
      } else if (elements[i].type && elements[i].type.toLowerCase() != 'submit') {
        elements[i].disabled = true;
      }
      elements[i].setAttribute('autocomplete', 'off');
    }
    if (method) this.switchMethod(method);
  },

  switchMethod(method) {
    if (this.currentMethod && $(`payment_form_${this.currentMethod}`)) {
      var form = $(`payment_form_${this.currentMethod}`);
      form.style.display = 'none';
      var elements = form.getElementsByTagName('input');
      for (var i = 0; i < elements.length; i++) elements[i].disabled = true;
      var elements = form.getElementsByTagName('select');
      for (var i = 0; i < elements.length; i++) elements[i].disabled = true;
    }
    if ($(`payment_form_${method}`)) {
      var form = $(`payment_form_${method}`);
      form.style.display = '';
      var elements = form.getElementsByTagName('input');
      for (var i = 0; i < elements.length; i++) elements[i].disabled = false;
      var elements = form.getElementsByTagName('select');
      for (var i = 0; i < elements.length; i++) elements[i].disabled = false;
      this.currentMethod = method;
    }
  }
};
