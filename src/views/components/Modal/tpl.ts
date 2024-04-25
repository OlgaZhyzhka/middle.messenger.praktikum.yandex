const tpl = `{{#if isOpen}}
    <div class="modal__overlay">
      <div class="modal__content">
        {{{content}}}
        <button class="modal__close-button">X</button>
      </div>
    </div>
  {{/if}}`;

export default tpl;
