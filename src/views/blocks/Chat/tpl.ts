const tpl = `{{#unless activeChatId}}
<div class="chat__message">Select chat for start.</div>
{{/unless}}
{{#if activeChatId}}
<div class="chat__wrapper">
{{{ chatHeader }}}
<div class="chat__body">{{{ messages }}}</div>
{{{ chatInput }}}
</div>
{{{ modalAddUser }}}{{{ modalDeleteUser }}}{{{ modalDeleteChat }}}{{{ modalUploadAvatar }}}
{{/if}}`;
export default tpl;
