const tpl = `
{{#if activeChatId}}
<div class="chat__wrapper">
{{{ chatHeader }}}
<div class="chat__body">{{{ chatLog }}}</div>
{{{ chatInput }}}
</div>
{{{ modalAddUser }}}{{{ modalDeleteUser }}}{{{ modalDeleteChat }}}{{{ modalUploadAvatar }}}
{{else}}
<div class="chat__message">Select chat for start.</div>
{{/if}}`;
export default tpl;
