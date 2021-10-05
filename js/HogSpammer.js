/*
HogSpammer v1.4
████████╗██╗░░██╗███████╗  ░██████╗███████╗░██╗░░░░░░░██╗███████╗██████╗░  ██████╗░██╗░██████╗░
╚══██╔══╝██║░░██║██╔════╝  ██╔════╝██╔════╝░██║░░██╗░░██║██╔════╝██╔══██╗  ██╔══██╗██║██╔════╝░
░░░██║░░░███████║█████╗░░  ╚█████╗░█████╗░░░╚██╗████╗██╔╝█████╗░░██████╔╝  ██████╔╝██║██║░░██╗░
░░░██║░░░██╔══██║██╔══╝░░  ░╚═══██╗██╔══╝░░░░████╔═████║░██╔══╝░░██╔══██╗  ██╔═══╝░██║██║░░╚██╗
░░░██║░░░██║░░██║███████╗  ██████╔╝███████╗░░╚██╔╝░╚██╔╝░███████╗██║░░██║  ██║░░░░░██║╚██████╔╝
░░░╚═╝░░░╚═╝░░╚═╝╚══════╝  ╚═════╝░╚══════╝░░░╚═╝░░░╚═╝░░╚══════╝╚═╝░░╚═╝  ╚═╝░░░░░╚═╝░╚═════╝░
Created by the sewer pig.
*/
const API_URL = "https://discord.com/api/v8";
const UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36';
const XSuperProperties = 'ewogICAib3MiOiJXaW5kb3dzIiwKICAgImJyb3dzZXIiOiJGaXJlZm94IiwKICAgImRldmljZSI6IiIsCiAgICJicm93c2VyX3VzZXJfYWdlbnQiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvODcuMC40MjgwLjg4IFNhZmFyaS81MzcuMzYiLAogICAiYnJvd3Nlcl92ZXJzaW9uIjoiODcuMC40MjgwLjg4IiwKICAgIm9zX3ZlcnNpb24iOiIxMCIsCiAgICJyZWZlcnJlciI6IiIsCiAgICJyZWZlcnJpbmdfZG9tYWluIjoiIiwKICAgInJlZmVycmVyX2N1cnJlbnQiOiIiLAogICAicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwKICAgInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsCiAgICJjbGllbnRfYnVpbGRfbnVtYmVyIjo3MzgwNiwKICAgImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGwKfQ==';
function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
}
function sendMsg(Token, ID, Msg){
      try{
      var request = new XMLHttpRequest();
      request.open("POST", `${API_URL}/channels/${ID}/messages`);
      request.setRequestHeader('Authorization', Token);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.setRequestHeader('User-agent', UserAgent);
      request.setRequestHeader('x-super-properties', XSuperProperties);
      var message = `content=${Msg}`
      if(document.querySelector('#AttackBtn').textContent == 'Stop!'){
            request.send(message);
      }
      else if(document.querySelector('#AttackBtn').textContent == 'Attack!'){return;}
      }
      catch(err){
            if(err.includes('Unauthorized')){
                  console.error(`Error: ${Token} is invalid!`);
            }
            else if(err.includes('rate limit')||err.includes('rate-limit')){
                  alert('You are being rate limited, please use a proxy!');
                  return;
            }
            else if(err.includes('429')){
                  sleep(request.response.retry_after).then(() => { sendMsg(Token, ID, Msg); });
            }
      }    
}
function changeStatus(Token, Status){
      try{
            var standardparams = {
                  status: `${Status}`
            }
            var request = new XMLHttpRequest();
              request.open("PATCH", `${API_URL}/users/@me/settings`);
              request.setRequestHeader('Authorization', Token);
              request.setRequestHeader('Content-type', 'application/json');
              request.setRequestHeader('User-agent', UserAgent);
              request.setRequestHeader('x-super-properties', XSuperProperties);
              request.send(JSON.stringify(standardparams));  
            }
            catch(err){
                  if(err.includes('Unauthorized')){
                        console.error(`Error: ${Token} is invalid!`);
                  }
                  else if(err.includes('rate limit')||err.includes('rate-limit')){
                        alert('You are being rate limited, please use a proxy!');
                        return;
                  }
                  else if(err.includes('429')){
                        sleep(request.response.retry_after).then(() => { changeStatus(Token, Status); });
                  }
            }  
}
function customStatus(Token, Status, Emoji){
      var customparams = {
            custom_status: {
                  text: Status,
                  emoji_name: Emoji
            }
      }
      try{
            var request = new XMLHttpRequest();
            request.open("PATCH", `${API_URL}/users/@me/settings`);
              request.setRequestHeader('Authorization', Token);
              request.setRequestHeader('Content-type', 'application/json');
              request.setRequestHeader('User-agent', UserAgent);
              request.setRequestHeader('x-super-properties', XSuperProperties);
              request.send(JSON.stringify(customparams));
            }
            catch(err){
                  if(err.includes('Unauthorized')){
                        console.error(`Error: ${Token} is invalid!`);
                  }
                  else if(err.includes('rate limit')||err.includes('rate-limit')){
                        alert('You are being rate limited, please use a proxy!');
                        return;
                  }
                  else if(err.includes('429')){
                        sleep(request.response.retry_after).then(() => { customStatus(Token, Status, Emoji); });
                  }
            }  
}
function changePFP(Token, dataURI){
      var params = {
            avatar: dataURI
      }
      try{
            var request = new XMLHttpRequest();
            request.open("PATCH", `${API_UR}/users/@me`);
              request.setRequestHeader('Authorization', Token);
              request.setRequestHeader('Content-type', 'application/json');
              request.setRequestHeader('User-agent', UserAgent);
              request.setRequestHeader('x-super-properties', XSuperProperties);
              request.send(JSON.stringify(params));
            }
            catch(err){
                  if(err.includes('Unauthorized')){
                        console.error(`Error: ${Token} is invalid!`);
                  }
                  else if(err.includes('rate limit')||err.includes('rate-limit')){
                        alert('You are being rate limited, please use a proxy!');
                        return;
                  }
                  else if(err.includes('429')){
                        sleep(request.response.retry_after).then(() => { changePFP(Token, dataURI); });
                  }
            }  
}
function reactMsg(Token, ChnId, MsgId, Emoji){
      Emoji=encodeURI(Emoji);
      try{
    var request = new XMLHttpRequest();
      request.open("PUT", `${API_URL}/channels/${ChnId}/messages/${MsgId}/reactions/${Emoji}/%40me`);
      request.setRequestHeader('Authorization', Token);
      request.setRequestHeader('User-agent', UserAgent);
      request.setRequestHeader('x-super-properties', XSuperProperties);
      request.send();
      }
      catch(err){
            if(err.includes('Unauthorized')){
                  console.error(`Error: ${Token} is invalid!`);
            }
            else if(err.includes('rate limit')||err.includes('rate-limit')){
                  alert('You are being rate limited, please use a proxy!');
                  return;
            }
            else if(err.includes('429')){
                  sleep(request.response.retry_after).then(() => { reactMsg(Token, ChnId, MsgId, Emoji) });
            }
      }  
}
function removeReaction(Token, ChnId, MsgId, Emoji){
      Emoji=encodeURI(Emoji);
      try{
    var request = new XMLHttpRequest();
      request.open("DELETE", `${API_URL}/channels/${ChnId}/messages/${MsgId}/reactions/${Emoji}/%40me`);
      request.setRequestHeader('Authorization', Token);
      request.setRequestHeader('User-agent', UserAgent);
      request.setRequestHeader('x-super-properties', XSuperProperties);
      request.send();
      }
      catch(err){
            if(err.includes('Unauthorized')){
                  console.error(`Error: ${Token} is invalid!`);
            }
            else if(err.includes('rate limit')||err.includes('rate-limit')){
                  alert('You are being rate limited, please use a proxy!');
                  return;
            }
            else if(err.includes('429')){
                  sleep(request.response.retry_after).then(() => { removeReaction(Token, ChnId, MsgId, Emoji) });
            }
      }  
}
function reactCustomMsg(Token, ChnID, MsgID, cEmoji, EmojiID){
      try{
    var request = new XMLHttpRequest();
      request.open("PUT", `${API_URL}/channels/${ChnID}/messages/${MsgID}/reactions/${cEmoji}${encodeURI(':')}${EmojiID}/%40me`);
      request.setRequestHeader('Authorization', Token);
      request.setRequestHeader('User-agent', UserAgent);
      request.setRequestHeader('x-super-properties', XSuperProperties);
      request.send();
      }
      catch(err){
            if(err.includes('Unauthorized')){
                  console.error(`Error: ${Token} is invalid!`);
            }
            else if(err.includes('rate limit')||err.includes('rate-limit')){
                  alert('You are being rate limited, please use a proxy!');
                  return;
            }
            else if(err.includes('429')){
                  sleep(request.response.retry_after).then(() => { reactCustomMsg(Token, ChnID, MsgID, cEmoji, EmojiID) });
            }
      }  
}
function removeCustomReaction(Token, ChnID, MsgID, cEmoji, EmojiID){
      try{
    var request = new XMLHttpRequest();
      request.open("DELETE", `${API_URL}/channels/${ChnID}/messages/${MsgID}/reactions/${cEmoji}${encodeURI(':')}${EmojiID}/%40me`);
      request.setRequestHeader('Authorization', Token);
      request.setRequestHeader('User-agent', UserAgent);
      request.setRequestHeader('x-super-properties', XSuperProperties);
      request.send();
      }
      catch(err){
            if(err.includes('Unauthorized')){
                  console.error(`Error: ${Token} is invalid!`);
            }
            else if(err.includes('rate limit')||err.includes('rate-limit')){
                  alert('You are being rate limited, please use a proxy!');
                  return;
            }
            else if(err.includes('429')){
                  sleep(request.response.retry_after).then(() => { removeCustomReaction(Token, ChnID, MsgID, cEmoji, EmojiID); });
            }
      }  
}
function sendFriendRequest(Token, ID){
      var params ={
      }
      try{
    var request = new XMLHttpRequest();
      request.open("PUT", `${API_URL}/users/@me/relationships/${ID}`);
      request.setRequestHeader('Authorization', Token);
      request.setRequestHeader('Content-type', 'application/json');
      request.setRequestHeader('User-agent', UserAgent);
      request.setRequestHeader('x-super-properties', XSuperProperties);
      request.send(JSON.stringify(params));
      }
      catch(err){
            if(err.includes('Unauthorized')){
                  console.error(`Error: ${Token} is invalid!`);
            }
            else if(err.includes('rate limit')||err.includes('rate-limit')){
                  alert('You are being rate limited, please use a proxy!');
                  return;
            }
            else if(err.includes('429')){
                  sleep(request.response.retry_after).then(() => { sendFriendRequest(Token, ID); });
            }
      }  
}
function removeFriendRequest(Token, ID){
      try{
      var request = new XMLHttpRequest();
      request.open("DELETE", `${API_URL}/users/@me/relationships/${ID}`);
      request.setRequestHeader('Authorization', Token);
      request.setRequestHeader('Content-type', 'application/json');
      request.setRequestHeader('User-agent', UserAgent);
      request.setRequestHeader('x-super-properties', XSuperProperties);
      request.send(JSON.stringify(params));
      }
      catch(err){
            if(err.includes('Unauthorized')){
                  console.error(`Error: ${Token} is invalid!`);
            }
            else if(err.includes('rate limit')||err.includes('rate-limit')){
                  alert('You are being rate limited, please use a proxy!');
                  return;
            }
            else if(err.includes('429')){
                  sleep(request.response.retry_after).then(() => { removeFriendRequest(Token, ID); });
            }
      }  
}
function userTyping(Token, ID){
      try{
    var request = new XMLHttpRequest();
      request.open("POST", `${API_URL}/channels/${ID}/typing`);
      request.setRequestHeader('Authorization', Token);
      request.setRequestHeader('User-agent', UserAgent);
      request.setRequestHeader('x-super-properties', XSuperProperties);
      request.send();
      }
      catch(err){
            if(err.includes('Unauthorized')){
                  console.error(`Error: ${Token} is invalid!`);
            }
            else if(err.includes('rate limit')||err.includes('rate-limit')){
                  alert('You are being rate limited, please use a proxy!');
                  return;
            }
            else if(err.includes('429')){
                  sleep(request.response.retry_after).then(() => { userTyping(Token, ID); });
            }
      }  
}
function joinGuild(Token, Invite){
    try{
      var request = new XMLHttpRequest();
    request.open("POST", `${API_URL}/invites/${Invite}`);
    request.setRequestHeader('Authorization', Token);
    request.setRequestHeader('User-agent', UserAgent);
    request.setRequestHeader('x-super-properties', XSuperProperties);
    request.send();
    }
    catch(err){
      if(err.includes('Unauthorized')){
            console.error(`Error: ${Token} is invalid!`);
      }
      else if(err.includes('rate limit')||err.includes('rate-limit')){
            alert('You are being rate limited, please use a proxy!');
            return;
      }
      else if(err.includes('429')){
            sleep(request.response.retry_after).then(() => { joinGuild(Token, Invite); });
      }
}  
}
function leaveGuild(Token, ID){
      try{
      var request = new XMLHttpRequest();
      request.open("DELETE", `${API_URL}/users/@me/guilds/${ID}`);
      request.setRequestHeader('Authorization', Token);
      request.setRequestHeader('User-agent', UserAgent);
      request.setRequestHeader('x-super-properties', XSuperProperties);
      request.send();
      }
      catch(err){
            if(err.includes('Unauthorized')){
                  console.error(`Error: ${Token} is invalid!`);
            }
            else if(err.includes('rate limit')||err.includes('rate-limit')){
                  alert('You are being rate limited, please use a proxy!');
                  return;
            }
            else if(err.includes('429')){
                  sleep(request.response.retry_after).then(() => { leaveGuild(Token, ID); });
            }
      }  
}
function deleteWebhook(HookURL){
      try{
      var request = new XMLHttpRequest();
      request.open("DELETE", `${HookURL}`);
      request.send();
      }
      catch(err){
            if(err.includes('401')||err.includes('404')){
                  console.error(`Error: ${HookURL} is invalid!`);
            }
            else if(err.includes('rate limit')||err.includes('rate-limit')){
                  alert('You are being rate limited, please use a proxy!');
                  return;
            }
            else if(err.includes('429')){
                  console.error(`429'd while attempting to delete ${HookURL}`);
            }
      }
}
function sendWebhook(HookURL, Username, AvatarURL, Content){
      if(Content.length==0){
            alert('Send an actual message, you idiot.');
            return;
      }
      try{
      var request = new XMLHttpRequest();
      request.open("POST", HookURL);
      request.setRequestHeader('Content-type', 'application/json');
      var params = {
        username: `${Username}`,
        avatar_url: `${AvatarURL}`,
        content: `${Content}`
      }
      request.send(JSON.stringify(params));
      }
      catch(err){
            if(err.includes('401')||err.includes('404')){
                  console.error(`Error: ${HookURL} is invalid!`);
            }
            else if(err.includes('rate limit')||err.includes('rate-limit')){
                  alert('You are being rate limited, please use a proxy!');
                  return;
            }
            else if(err.includes('429')){
                  console.error(`429'd while attempting to send a message through ${HookURL}`);
            }
      }
}
function changeNickname(Token, ID, Nick){
      try{
      var request = new XMLHttpRequest();
      request.open("PATCH", `${API_URL}/guilds/${ID}/members/@me/nick`);
      request.setRequestHeader('Authorization', Token);
      request.setRequestHeader('Content-type', 'application/json');
      request.setRequestHeader('User-agent', UserAgent);
      request.setRequestHeader('x-super-properties', XSuperProperties);
      var params = {
            nick: Nick
      };
      request.send(JSON.stringify(params));
      }
      catch(err){
            if(err.includes('Unauthorized')){
                  console.error(`Error: ${Token} is invalid!`);
            }
            else if(err.includes('rate limit')||err.includes('rate-limit')){
                  alert('You are being rate limited, please use a proxy!');
                  return;
            }
            else if(err.includes('429')){
                  sleep(request.response.retry_after).then(() => { changeNickname(Token, ID, Nick); });
            }
      }  
}
function changeTheme(Token, theme){
      var params ={
            theme: `${theme}`
      }
      try{
            var request = new XMLHttpRequest();
            request.open("PATCH", `${API_URL}/users/@me/settings`);
            request.setRequestHeader('Authorization', Token);
            request.setRequestHeader('Content-type', 'application/json');
            request.setRequestHeader('User-agent', UserAgent);
            request.setRequestHeader('x-super-properties', XSuperProperties);
            request.send(JSON.stringify(params));
            }
            catch(err){
                  if(err.includes('401')||err.includes('404')){
                        console.error(`Error: ${Token} is invalid!`);
                  }
                  else if(err.includes('rate limit')||err.includes('rate-limit')){
                        alert('You are being rate limited, please use a proxy!');
                        return;
                  }
                  else if(err.includes('429')){
                        sleep(request.response.retry_after).then(() => { changeTheme(Token, theme); });
                  }
            }
}
//Spam functions begin here.
function TokenSpam(ID, Msg){
let list = document.getElementById('TokenList').value;
let dtokens = list.split(/\r\n|\n/);
const TokensArray = Array.from(dtokens);
TokensArray.forEach(token => sendMsg(token, ID, Msg));
}
function joinInvite(Invite){
      if(document.getElementById('TokenList').value == ''||document.getElementById('TokenList').value == 'None!'){
            alert('Make sure you import some tokens first!');
            return;
      }
      let list = document.getElementById('TokenList').value;
      let dtokens = list.split(/\r\n|\n/);
      const TokensArray = Array.from(dtokens);
      TokensArray.forEach(token => joinGuild(token, Invite));
}
function leaveFromID(Invite){
      if(document.getElementById('TokenList').value == ''||document.getElementById('TokenList').value == 'None!'){
            alert('Make sure you import some tokens first!');
            return;
      }
      let list = document.getElementById('TokenList').value;
      let dtokens = list.split(/\r\n|\n/);
      const TokensArray = Array.from(dtokens);
      TokensArray.forEach(token => leaveGuild(token, Invite));
}
function reactToMsg(ChnId, MsgId, Emoji){
      if(document.getElementById('TokenList').value == ''||document.getElementById('TokenList').value == 'None!'){
            alert('Make sure you import some tokens first!');
            return;
      }
      let list = document.getElementById('TokenList').value;
      let dtokens = list.split(/\r\n|\n/);
      const TokensArray = Array.from(dtokens);
      if(document.getElementById('AddReaction').checked) {
            TokensArray.forEach(token => reactMsg(token, ChnId, MsgId, Emoji));
      }
      else if(document.getElementById('RemoveReaction').checked) {
            TokensArray.forEach(token => removeReaction(token, ChnId, MsgId, Emoji));
      }
}
function reactToCustomMsg(ChnId, MsgId, Emoji, ID){
      if(document.getElementById('TokenList').value == ''||document.getElementById('TokenList').value == 'None!'){
            alert('Make sure you import some tokens first!');
            return;
      }
      let list = document.getElementById('TokenList').value;
      let dtokens = list.split(/\r\n|\n/);
      const TokensArray = Array.from(dtokens);
      if(document.getElementById('AddCReaction').checked) {
            TokensArray.forEach(token => reactCustomMsg(token, ChnId, MsgId, Emoji, ID));
      }
      else if(document.getElementById('RemoveCReaction').checked) {
            TokensArray.forEach(token => removeCustomReaction(token, ChnId, MsgId, Emoji, ID));
      }
}
function setDefaultStatus(Status){
      if(document.getElementById('TokenList').value == ''||document.getElementById('TokenList').value == 'None!'){
            alert('Make sure you import some tokens first!');
            return;
      }
      let list = document.getElementById('TokenList').value;
      let dtokens = list.split(/\r\n|\n/);
      const TokensArray = Array.from(dtokens);
      TokensArray.forEach(token => changeStatus(token, Status));
}
function setCustomStatus(Status, Emoji){
      if(document.getElementById('TokenList').value == ''||document.getElementById('TokenList').value == 'None!'){
            alert('Make sure you import some tokens first!');
            return;
      }
      let list = document.getElementById('TokenList').value;
      let dtokens = list.split(/\r\n|\n/);
      const TokensArray = Array.from(dtokens);
      TokensArray.forEach(token => customStatus(token, Status, Emoji));
}
function setNickname(ID, Nick){
      if(document.getElementById('TokenList').value == ''||document.getElementById('TokenList').value == 'None!'){
            alert('Make sure you import some tokens first!');
            return;
      }
      let list = document.getElementById('TokenList').value;
      let dtokens = list.split(/\r\n|\n/);
      const TokensArray = Array.from(dtokens);
      TokensArray.forEach(token => changeNickname(token, ID, Nick));
}
function friendSpam(ID){
      if(document.getElementById('TokenList').value == ''||document.getElementById('TokenList').value == 'None!'){
            alert('Make sure you import some tokens first!');
            return;
      }
      let list = document.getElementById('TokenList').value;
      let dtokens = list.split(/\r\n|\n/);
      const TokensArray = Array.from(dtokens);
      if(document.getElementById('SendFriendRequest').checked) { //FIX THIS
            TokensArray.forEach(token => sendFriendRequest(token, ID)); 
      }
      else if(document.getElementById('DeleteFriendRequest').checked) {
            TokensArray.forEach(token => removeFriendRequest(token, ID)); 
      }
}
function changeProfilePictures(dataURI){
      let list = document.getElementById('TokenList').value;
      let dtokens = list.split(/\r\n|\n/);
      const TokensArray = Array.from(dtokens);
      TokensArray.forEach(token => changePFP(token, dataURI));
}
function CheckBtn(ID, Msg, Int){
      if(document.getElementById('TokenList').value == ''||document.getElementById('TokenList').value == 'None!'){
            alert('Make sure you import some tokens first!');
            return;
      }
      if(Int<500){
            alert('Please pick a number that is at least 500ms!');
            return;
      }
      if(Msg.length==0){
            alert('Send an actual message, you idiot.');
            return;
      }
if(document.querySelector('#AttackBtn').textContent == 'Attack!'){
      window.setInterval(function(){
            TokenSpam(ID, Msg)
      }, Int);
      document.querySelector('#AttackBtn').textContent = 'Stop!';
}
else if(document.querySelector('#AttackBtn').textContent == 'Stop!'){
      document.querySelector('#AttackBtn').textContent = 'Attack!';
      }
}