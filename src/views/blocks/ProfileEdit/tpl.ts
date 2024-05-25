const tpl = `<div class="profile__image">{{{ avatar }}}{{{ uploadAvatar }}}</div>
<hr class="divider" />
{{#if isLoading}}
<div class="profile__loader">
  {{{ spinner }}}
</div>
{{else}}
<ul class="profile__list list">
<li class="list__item">{{{ emailInput }}}</li>
<li class="list__item">{{{ firstNameInput }}}</li>
<li class="list__item">{{{ loginInput }}}</li>
<li class="list__item">{{{ secondNameInput }}}</li>
<li class="list__item">{{{ phoneInput }}}</li>
<li class="list__item">{{{ chatNameInput }}}</li>
</ul>
{{/if}}
<div class="profile__footer">{{{ submitButton }}}{{{ cancelButton }}}</div>
{{#if updateError}}<p class="is-error">{{ updateError }}</p>{{/if}}`;
export default tpl;
