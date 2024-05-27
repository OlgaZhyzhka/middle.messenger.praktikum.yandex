const tpl = `{{#if title}} 
<h2 class="heading">{{ title }}</h2> 
{{/if}}
{{#if subTitle}} 
<p>{{ subTitle }}</p> 
{{else}}
{{{ titleInput }}}
{{/if}}
<div class="form__footer">
{{{ submitButton }}}
{{{ cancelButton }}}
</div>`;
export default tpl;
