const tpl = `
{{{ chatButton }}}
{{#unless activeChatId}} 
<div class="chat__message"><span class="title">Select chat for start</span></div>
{{else}}
<div class="chat__wrapper">
{{{ chatHeader }}}
<div class="chat__body">
{{{ chatLog }}}
</div>
{{{ chatInput }}}
</div>
{{{ modalAddUser }}}{{{ modalDeleteUser }}}{{{ modalDeleteChat }}}{{{ modalUploadAvatar }}}{{{ modalInfo }}}
{{/unless}} 
{{{ modalCreateChat }}}`;
export default tpl;
