const tpl = `{{#if isLogin}} 
{{{ loginForm }}} 
{{/if}} 
{{#if isRegister}} 
{{{ registrationForm }}} 
{{/if}}
<div class="form__footer">
{{{ submitButton }}}
<span class="form__text">{{ text }}</span>
{{{ linkButton }}}
</div>`;

export default tpl;
