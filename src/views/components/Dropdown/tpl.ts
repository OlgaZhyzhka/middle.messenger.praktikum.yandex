const tpl = `{{{ button }}}
<ul class="dropdown {{#if isOpen }} dropdown_open{{/if}}">
  {{{ items }}}
</ul>`;
export default tpl;
