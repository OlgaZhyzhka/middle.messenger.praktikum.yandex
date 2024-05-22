const tpl = `{{#if isLoading}}<div class="profile__loader">
{{{ spinner }}}
</div>
{{else}}
{{{ oldPasswordInput }}}{{{ passwordInput }}}{{{ confirmPasswordInput }}}
{{/if}}
<div class="profile__footer">{{{ submitButton }}}{{{ cancelButton }}}</div>
{{#if isUpdatePassword}}<p class="is-success">Password updated successful</p>{{/if}}
{{#if profileUpdateError}}<p class="is-error">{{ profileUpdateError }}</p>{{/if}}`;
export default tpl;
