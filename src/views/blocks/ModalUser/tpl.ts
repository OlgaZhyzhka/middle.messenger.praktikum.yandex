const tpl = `{{#if title}} 
<h2 class="heading">{{ title }}</h2> 
{{/if}}
{{#if subTitle}} 
<p>{{ subTitle }}</p> 
{{/if}}
{{{ loginInput }}}
<div class="form__footer">
{{{ submitButton }}}
{{{ cancelButton }}}
</div>
<hr />
<ul class="list list_user">{{{ userList }}}</ul>`;
export default tpl;
