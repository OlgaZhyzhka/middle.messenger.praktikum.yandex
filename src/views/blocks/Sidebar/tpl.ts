const tpl = `<div class="sidebar__container">
{{{ logo }}}
<div class="sidebar__footer">
{{ login }}
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
