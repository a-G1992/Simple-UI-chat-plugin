var chatBoxes = new Array();

$(document).ready(function() {
	$('.list_of_online_users ul').empty();
	getListOfOnlineusers();
	$('.main_chat_box_head').on('click', function() {
		if($('.main_chat_box_content').css('display') == 'none') {
			$('.main_chat_box_content').show();
		} else {
			$('.main_chat_box_content').hide();
		}
	});

	$('.list_of_online_users ul').on('click', '.online_user span', function() {
	    chatWith($(this).text());
	});
});

function getListOfOnlineusers() {
	all_users = ['Alpha', 'Charlie', 'Tango'];
	all_users.forEach(function(user) {
		$('.list_of_online_users ul').append(
				'<li class="online_user"> \
					<span>' + user +' </span> \
				</li>'
			);
	});
}

function restructureChatBoxes() {
	align = 1;
	for (x in chatBoxes) {
		chatboxtitle = chatBoxes[x];
		if ($("#chatbox_"+chatboxtitle).css('display') != 'none') {
			width = (align)*(225+7)+20;
			$("#chatbox_"+chatboxtitle).css('right', width+'px');
			align++;
		}
	}
}

function chatWith(chatuser) {
	console.log("called for", chatuser);
	createChatBox(chatuser);
	$("#chatbox_"+chatuser+" .chatboxtextarea").focus();
}

function createChatBox(chatboxtitle) {
	chatboxtitle = chatboxtitle.trim();
	var userInArray = $.inArray(chatboxtitle, chatBoxes);
	console.log(userInArray);
	if (userInArray == -1) {
		chatboxtitle = chatboxtitle.trim();
		chatBoxes.push(chatboxtitle);
		$(" <div />" ).attr("id","chatbox_"+chatboxtitle)
			.addClass("chatbox")
			.html(
				'<div class="chatboxhead" onclick="javascript:minimizeChatBox(\''+chatboxtitle+'\')"> \
					<div class="chatboxtitle">'+chatboxtitle+'</div> \
					<div class="chatboxoptions"> \
						<a href="javascript:void(0)" onclick="javascript:closeChatBox(\''+chatboxtitle+'\')">X</a> \
					</div> \
					<br clear="all"/> \
				</div> \
				<div class="chatboxcontent" id="chatboxcontent_' +chatboxtitle+ '"></div> \
				<div class="chatboxinput"> \
					<input type="text" placeholder="Enter message..." class="chatboxtextarea" id="chatboxtextarea_' +chatboxtitle+ '" onkeydown="sendLoggedInUserMessage(event, this,\''+chatboxtitle+'\')"></input> \
				</div>'
				)
			.appendTo($( "body" ));
		var totalChatBoxes = chatBoxes.length;
		var rightCss = (totalChatBoxes)*(225+7)+20;
		console.log(rightCss);
		$("#chatbox_"+chatboxtitle).css('right', rightCss+'px');
	}		
	else {
		$("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();
		if ($("#chatboxcontent_"+chatboxtitle).css('display') == 'none') {
			$("#chatboxcontent_"+chatboxtitle).css('display', 'block');
			$("#chatboxtextarea_"+chatboxtitle).css('display', 'block');
		}
	}
}

function closeChatBox(chatboxtitle) {
	$('#chatbox_'+chatboxtitle).css('display','none');
	var index = chatBoxes.indexOf(chatboxtitle);
	if (index > -1) {
		chatBoxes.splice(index, 1);
	}
	$("#chatbox_"+chatboxtitle).remove();
	console.log(chatboxtitle + 'removed');
	restructureChatBoxes();
}
function minimizeChatBox(chatboxtitle) {
	console.log(chatboxtitle, "******");
	if ($("#chatboxcontent_"+chatboxtitle).css('display') == 'none') {
		$("#chatboxcontent_"+chatboxtitle).css('display', 'block');
		$("#chatboxtextarea_"+chatboxtitle).css('display', 'block');
	}
	else {
		$("#chatboxcontent_"+chatboxtitle).css('display', 'none');
		$("#chatboxtextarea_"+chatboxtitle).css('display', 'none');
	}
}
function sendLoggedInUserMessage(event, that, chatboxtitle) {
	if(event.keyCode == 13) {
        var new_messgae = $(that).val();
        $(that).val('');
        $("#chatboxcontent_"+chatboxtitle).append(
	        	'<div class="self_message"> \
	        		<span class="chatboxmessagefrom">You:&nbsp;&nbsp;</span> \
	        		<span class="chatboxmessagecontent">'+new_messgae+'</span> \
	        	</div> </br>'	
        	)     
    }
}