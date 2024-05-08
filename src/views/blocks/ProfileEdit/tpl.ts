const tpl = `{{{ uploadAvatar }}}
<hr class="divider" />
<ul class="profile__list list">
<li class="list__item">{{{ emailInput }}}</li>
<li class="list__item">{{{ firstNameInput }}}</li>
<li class="list__item">{{{ loginInput }}}</li>
<li class="list__item">{{{ secondNameInput }}}</li>
<li class="list__item">{{{ phoneInput }}}</li>
<li class="list__item">{{{ chatNameInput }}}</li>
</ul>
<div class="profile__footer">{{{ submitButton }}}{{{ cancelButton }}}</div>`;
export default tpl;
