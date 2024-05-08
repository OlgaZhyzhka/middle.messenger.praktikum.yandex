const tpl = `{{{ avatar }}}
<hr class="divider" />
<ul class="profile__list list">
<li class="list__item"><span class="title">Email</span><span>{{ email }}</span></li>
<li class="list__item"><span class="title">First Name</span><span>{{ firstName }}</span></li>
<li class="list__item"><span class="title">Login</span><span>{{ login }}</span></li>
<li class="list__item"><span class="title">Second Name</span><span>{{ secondName }}</span></li>
<li class="list__item"><span class="title">Phone</span><span>{{ phone }}</span></li>
<li class="list__item"><span class="title">Chat name</span><span>{{ chatName }}</span></li>
</ul>`;
export default tpl;