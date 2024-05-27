const tpl = `{{#if isLoading}}
{{{ spinner }}}
{{else}}
{{{ oldPasswordInput }}}{{{ passwordInput }}}{{{ confirmPasswordInput }}}
<div class="profile__footer">{{{ submitButton }}}{{{ cancelButton }}}</div>
{{#if isUpdatePassword}}<p class="is-success">Password updated successful</p>{{/if}}
{{#if updateError}}<p class="is-error">{{ updateError }}</p>{{/if}}
{{/if}}`;
export default tpl;
