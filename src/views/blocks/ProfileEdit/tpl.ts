const tpl = `
{{#if isLoading}}
  {{{ spinner }}}
{{else}}
<div class="profile__image">{{{ avatar }}}{{{ uploadAvatar }}}</div>
<hr class="divider" />
<ul class="profile__list list">
<li class="list__item">{{{ emailInput }}}</li>
<li class="list__item">{{{ firstNameInput }}}</li>
<li class="list__item">{{{ loginInput }}}</li>
<li class="list__item">{{{ secondNameInput }}}</li>
<li class="list__item">{{{ phoneInput }}}</li>
<li class="list__item">{{{ chatNameInput }}}</li>
</ul>
<div class="profile__footer">{{{ submitButton }}}{{{ cancelButton }}}</div>
{{#if updateError}}<p class="is-error">{{ updateError }}</p>{{/if}}
{{/if}}
`;
export default tpl;
