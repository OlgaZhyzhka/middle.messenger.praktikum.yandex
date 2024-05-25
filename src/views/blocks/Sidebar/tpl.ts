const tpl = `<div class="sidebar__container">
{{{ logo }}}
<div class="sidebar__footer">
<span class="sidebar__title">{{ login }}</span>
{{#if isMessenger}} 
{{{ userAvatar }}}
{{{ linkToProfile }}}
{{/if}} 
{{#if isSettings}} 
{{{ linkToLogout }}}
{{/if}} 
</div>
</div>`;
export default tpl;
