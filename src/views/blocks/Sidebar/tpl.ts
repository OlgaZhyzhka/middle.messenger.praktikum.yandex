const tpl = `<div class="sidebar__container">
{{{ logo }}}
<div class="sidebar__footer">
<span class="sidebar__title">{{ login }}</span>
{{#if isMessenger}} 
{{{ userAvatar }}}
{{/if}} 
{{{ link }}}
</div>
</div>`;
export default tpl;
