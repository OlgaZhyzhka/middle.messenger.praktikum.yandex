const tpl = `{{{ loginInput }}} {{{ passwordInput }}}
{{#if loginError}}
<h4 class="is-error">{{{loginError}}}</h4>
{{/if}}
<div class="form__footer">
{{{ submitButton }}}
<span class="form__text">{{ text }}</span>
{{{ navButton }}}
</div>`;
export default tpl;
