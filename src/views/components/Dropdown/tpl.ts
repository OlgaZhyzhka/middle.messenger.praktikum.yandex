const tpl = `{{{ button }}}
{{#if isOpen }}
<ul class="dropdown__list">
  {{{ dropdownList }}}
</ul>{{/if}}`;
export default tpl;
