/* f5b5a6e72f39c43111a78bd23782371c */
/* http://wikispaces.com/ Copyright 2008 Tangient LLC */
function pageAutocompleteFormatItem(B,C,A){return B[0]+' <span class="autocompleteSupplemental">Changed '+B[1]+" by "+B[2]+"</span>"
}function tagAutocompleteFormatItem(B,C,A){return B[0]+' <span class="autocompleteSupplemental">Used '+B[2]+" times</span>"
}function pageAutocompleteFindValue(C,A){var B=jQuery(C.input).parents("form").find(".autocompleteStatusImage");
if(A==null){B.attr("src","/i/error_add.png");
B.attr("title","Page Not Found - A link will be made to a new page");
jQuery(C.input).css("color","darkred")
}else{var D=A.selectValue;
B.attr("src","/i/checkmark.gif");
B.attr("title","Page Found");
jQuery(C.input).css("color","green")
}}function tagAutocompleteFindValue(C,A){var B=jQuery(C.input).parents("form").find(".autocompleteStatusImage");
if(A==null){B.attr("src","/i/error_add.png");
B.attr("title","Page Not Found - A link will be made to a new page");
jQuery(C.input).css("color","darkred")
}else{var D=A.selectValue;
B.attr("src","/i/checkmark.gif");
B.attr("title","Page Found");
jQuery(C.input).css("color","green")
}}function autocompleteSelectItem(B,A){B.findValue()
}jQuery(document).ready(function(){jQuery("input.autocompletePage").each(function(){jQuery(this).autocomplete("/space/autocomplete/page",{maxItemsToShow:20,onFindValue:pageAutocompleteFindValue,formatItem:pageAutocompleteFormatItem,onItemSelect:autocompleteSelectItem});
jQuery(this).after('<img class="autocompleteStatusImage" src="/i/error_add.png"/>');
jQuery(this).keyup(function(){var A=this.autocompleter.findValue()
});
jQuery(this).change(function(){var A=this.autocompleter.findValue()
})
});
jQuery("input.autocompleteTag").each(function(){jQuery(this).autocomplete("/space/autocomplete/tag",{maxItemsToShow:20,onFindValue:tagAutocompleteFindValue,formatItem:tagAutocompleteFormatItem,onItemSelect:autocompleteSelectItem});
jQuery(this).after('<img class="autocompleteStatusImage" src="/i/error_add.png"/>');
jQuery(this).keyup(function(){var A=this.autocompleter.findValue()
});
jQuery(this).change(function(){var A=this.autocompleter.findValue()
})
})
});
var AUTOSAVE_INTERVAL=60000;
var detectedChangeHandle;
function detectedChangeDelayed(){if(typeof detectedChangeHandle=="number"){clearTimeout(detectedChangeHandle)
}detectedChangeHandle=setTimeout("detectedChange()",50)
}function detectedChange(){if(typeof detectedChangeHandle=="number"){clearTimeout(detectedChangeHandle)
}if(!document.rte.changeDetected.value){document.rte.changeDetected.value=true;
window.onbeforeunload=editorUnsavedChangesWarning;
setTimeout("autosaveLoop()",AUTOSAVE_INTERVAL)
}if(mode=="visual"){lookForHeightChange()
}}var rteEditorHeight=null;
var rteEditorWidth=null;
var rteEditorMinWidth=null;
function lookForHeightChange(){var C=document.getElementById(editorId).contentWindow.document;
var B=getContentHeight();
var A=getMaxWidth();
if(!rteEditorMinWidth){rteEditorMinWidth=jQuery("#toolbarPopup").width()-32
}if(B<290){B=290
}if(A<rteEditorMinWidth){A=rteEditorMinWidth
}if(!rteEditorHeight){rteEditorHeight=jQuery("#editor").height()
}if(!rteEditorWidth){rteEditorWidth=jQuery("#editor").width()
}if(B>rteEditorHeight){rteEditorHeight=B+10;
jQuery("#"+editorId).height(rteEditorHeight)
}if(A>rteEditorWidth){rteEditorWidth=A+10;
jQuery("#"+editorId).width(rteEditorWidth)
}return 
}function getContentHeight(){var C=document.getElementById(editorId).contentWindow.document;
var B=C.getElementById("editor_body");
if(B){var A=B.scrollHeight;
return A*1
}}function getMaxWidth(){var C=document.getElementById(editorId).contentWindow.document;
var B=C.getElementById("editor_body");
if(B){var A=B.scrollWidth;
jQuery(B).find("img").each(function(){if(jQuery(this).width()>A){A=jQuery(this).width()
}});
return A*1
}}function autosaveLoop(){try{autosave()
}catch(A){}finally{setTimeout("autosaveLoop()",AUTOSAVE_INTERVAL)
}}function autosave(B){log("autosave",B);
jQuery("#saveDraftButton").attr("disabled",true).val("Saving...");
if(typeof B=="undefined"){B=true
}if(autosaveEnabled){var A="/page/autosave/"+encodeURIComponent(wikispaces_page)+"/"+version+"?mode="+mode;
var C="content="+encodeURIComponent(getContent());
jQuery.ajax({async:B,url:A,type:"POST",data:C,dataType:"xml",global:false,cache:false,error:function(D,F,E){log("autosave ajax error",D,F,E);
autosaveReloadSession(autosave,3000)
},success:autosaveProcessResponse});
log("autosave finished")
}}var reloadAttempt=0;
function autosaveReloadSession(E,A){log("autosaveReloadSession",E,A,reloadAttempt);
if(reloadAttempt>4){autosaveEnabled=false;
alert("We were unable to restore your session.  Autosaving of your drafts has been disabled, and you will not be able to use the image tool.");
jQuery("#saveDraftButton").attr("disabled",true).val("Autosave Disabled");
var B=jQuery("#autosaveStatus");
B.html("Autosave Disabled").css("color","red");
B.fadeIn("slow")
}else{var D="?_="+(new Date()).getTime();
var C='<iframe id="refreshSessionIframe'+reloadAttempt+'" src="/space/sessionreload'+D+'" name="refreshSessionIframe'+reloadAttempt+'" style="width:0px; height:0px; border:0px;"></iframe>';
log("created session iframe",C);
jQuery("#refreshSessionDiv").append(C);
reloadAttempt++;
setTimeout(E,A)
}}function autosaveProcessResponse(F){log("autosaveProcessResponse",F);
reloadAttempt=0;
if(F.getElementsByTagName("autosave")[0].getElementsByTagName("save").length>0){setAutosaveTime(F.getElementsByTagName("autosave")[0].getElementsByTagName("save")[0].firstChild.nodeValue)
}if(F.getElementsByTagName("status")[0].getAttribute("type")=="changed"){var K=F.getElementsByTagName("status")[0].getElementsByTagName("revision");
for(E=0;
E<K.length;
E++){var D=K[E].getElementsByTagName("user")[0].firstChild.nodeValue;
var C=K[E].getElementsByTagName("date")[0].firstChild.nodeValue;
var A=K[E].getAttribute("id");
addSavedVersionDetected(A,D,C)
}}var I=Array();
if(F.getElementsByTagName("concurrent").length>0){var G=F.getElementsByTagName("concurrent")[0].getElementsByTagName("editor");
for(E=0;
E<G.length;
E++){var D=G[E].getElementsByTagName("user")[0].firstChild.nodeValue;
var C=G[E].getElementsByTagName("date")[0].firstChild.nodeValue;
addConcurrentEditor(D,C);
I[D]=1
}}for(var E in concurrentEditors){if(I[E]!=1){removeConcurrentEditor(E)
}}if(F.getElementsByTagName("autosave")[0].getElementsByTagName("merge").length>0){var H=F.getElementsByTagName("autosave")[0].getElementsByTagName("merge")[0];
if(H.getElementsByTagName("mergeStatus").length>0&&H.getElementsByTagName("mergeStatus").firstChild){var B=H.getElementsByTagName("mergeStatus")[0].firstChild.nodeValue;
document.getElementById("mergeStatus").innerHTML=B
}if(H.getElementsByTagName("mergeResult").length>0&&H.getElementsByTagName("mergeResult").firstChild){var J=H.getElementsByTagName("mergeStatus")[0].firstChild.nodeValue;
document.getElementById("mergeResult").innerHTML=J
}}jQuery("#saveDraftButton").attr("disabled",false).val("Save Draft")
}function getContent(){if(mode=="plain"){return document.rte[editorId].value
}else{rteSync(editorId);
return document.rte[editorId].value
}}function setAutosaveTime(B){var A=jQuery("#autosaveStatus");
A.html("Draft Saved at "+B);
A.fadeIn("slow")
}function autosaveLoadDraft(){version=autosaveVersion;
document.rte.version.value=version;
if(mode=="plain"){document.rte[editorId].value=document.getElementById("autosaveContent").innerHTML
}else{var A=Element.getDimensions(document.getElementById("autosaveContent"));
enableDesignMode(editorId,document.getElementById("autosaveContent").innerHTML,stylesheetUrl);
var B=document.getElementById(editorId).contentWindow.document;
jQuery(B).ready(function(){attachEditorEventHandlers(editorId)
})
}detectedChangeDelayed()
}function autosaveDiscardDraft(){var A="/page/discardautosave/"+encodeURIComponent(wikispaces_page);
jQuery.ajax({url:A,type:"GET",global:false,cache:false})
}function removeLock(){var A="/page/removepagelock/"+encodeURIComponent(wikispaces_page);
jQuery.ajax({url:A,type:"GET",global:false,cache:false})
}function showAutosavePopup(){var A=Dialog.confirm(document.getElementById("autosavePrompt").innerHTML,{title:"Draft Recovered",windowParameters:{className:"wikispaces",width:450},id:"popupDialog",ok:function(){autosaveLoadDraft();
A.hide()
},cancel:autosaveDiscardDraft,okLabel:"Load Previous Draft",cancelLabel:"Discard Previous Draft",resizable:false,showEffectOptions:{duration:3}})
}function editorUnsavedChangesWarning(){if(editorConfirmDeparture&&document.rte.changeDetected.value){autosave();
return("You have not yet saved your changes.")
}}var concurrentEditors=new Array();
function addConcurrentEditor(D,F){document.getElementById("concurrentEditor_otherEditor_heading").style.display="block";
concurrentEditors[D]=F;
var B="concurrentEditor_otherEditor_"+D;
var C=document.getElementById(B);
if(!C){var E=document.createElement("li");
E.id=B;
var A=document.createElement("img");
A.src="/user/pic/"+D+"-sm.jpg";
A.height=16;
A.width=16;
A.style.verticalAlign="text-top";
E.appendChild(A);
E.appendChild(document.createTextNode(" "+D+" started editing this page at "+F));
document.getElementById("concurrentEditor_otherEditors").appendChild(E);
showConcurrentEditorPopup();
document.getElementById("concurrentEditor_noEditors").style.display="none";
jQuery(E).Highlight(2000,"#FFA")
}}function removeConcurrentEditor(C){var B="concurrentEditor_otherEditor_"+C;
var A=document.getElementById(B);
if(A){jQuery(A).slideUp();
A.parentNode.removeChild(A);
var D=document.getElementById("concurrentEditor_otherEditors").getElementsByTagName("li");
if(D.length==1){document.getElementById("concurrentEditor_noEditors").style.display="list-item";
jQuery("#concurrentEditor_noEditors").Highlight(2000,"#FFA")
}}}var anotherEditDetected=false;
function addSavedVersionDetected(G,E,A){anotherEditDetected=true;
document.getElementById("concurrentEditor_savedVersion_heading").style.display="block";
var B="concurrentEditor_savedVersion_"+G;
var I=document.getElementById(B);
if(!I){var H=document.createElement("li");
H.id=B;
var F=document.createElement("a");
F.href="/page/diff/"+encodeURIComponent(wikispaces_page)+"/"+G;
F.target="_new";
F.appendChild(document.createTextNode("View the changes"));
document.getElementById("concurrentEditor_savedVersion_viewChanges").innerHTML='<a href="/page/diff/'+encodeURIComponent(wikispaces_page)+"?v1="+version+"&v2="+G+'" target="_new">View all changes since I started editing</a>';
var C=document.createElement("img");
C.src="/user/pic/"+E+"-sm.jpg";
C.height=16;
C.width=16;
C.style.verticalAlign="text-top";
H.appendChild(C);
H.appendChild(document.createTextNode(" "+E+" saved a new revision at "+A+".  "));
H.appendChild(F);
document.getElementById("concurrentEditor_savedVersions").appendChild(H);
var D=document.getElementById("concurrentEditor_savedVersions").getElementsByTagName("li");
if(D.length>1){document.getElementById("concurrentEditor_savedVersion_viewChanges").style.display="list-item"
}showConcurrentEditorPopup();
jQuery(H).Highlight(2000,"#FFA");
removeConcurrentEditor(E)
}}var concurrentEditorPopup;
function showConcurrentEditorPopup(){if(!concurrentEditorPopup){concurrentEditorPopup=new Window("concurrentEditorPopup",{minWidth:300,title:"Page Activity",resizable:false,maximizable:false,minimizable:false,className:"wikispaces",showEffect:Element.show,hideEffect:Element.hide});
concurrentEditorPopup.setContent("concurrentEditor",true,true);
document.getElementById("concurrentEditorPopup_content").style.overflowY="hidden";
if(jQuery.browser.msie==true&&jQuery.browser.version<7){registerOnScroll(function(){scrollWindow(concurrentEditorPopup,false)
})
}else{concurrentEditorPopup.element.style.position="fixed"
}}concurrentEditorPopup.element.style.left="0px";
concurrentEditorPopup.show();
concurrentEditorPopup.toFront();
updateConcurrentEditorPopup()
}function updateConcurrentEditorPopup(){concurrentEditorPopup.updateWidth();
concurrentEditorPopup.updateHeight();
if(document.all){var A=document.documentElement.clientHeight+document.documentElement.scrollTop-Element.getDimensions(concurrentEditorPopup.element)["height"]+"px";
if(A<concurrentEditorPopup.element.style.top){concurrentEditorPopup.element.style.top=A
}}else{concurrentEditorPopup.element.style.top=document.documentElement.clientHeight-Element.getDimensions(concurrentEditorPopup.element)["height"]+"px"
}}jQuery.fn.farbtastic=function(A){jQuery.farbtastic(this,A);
return this
};
jQuery.farbtastic=function(A,B){var A=jQuery(A).get(0);
return A.farbtastic||(A.farbtastic=new jQuery._farbtastic(A,B))
};
jQuery._farbtastic=function(A,D){var B=this;
jQuery(A).html('<div class="farbtastic"><div class="color"></div><div class="wheel"></div><div class="overlay"></div><div class="h-marker marker"></div><div class="sl-marker marker"></div></div>');
var C=jQuery(".farbtastic",A);
B.wheel=jQuery(".wheel",A).get(0);
B.radius=84;
B.square=100;
B.width=194;
B.firstClick=true;
if(navigator.appVersion.match(/MSIE [0-6]\./)){jQuery("*",C).each(function(){if(this.currentStyle.backgroundImage!="none"){var E=this.currentStyle.backgroundImage;
E=this.currentStyle.backgroundImage.substring(5,E.length-2);
jQuery(this).css({backgroundImage:"none",filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='"+E+"')"})
}})
}B.linkTo=function(E){if(typeof B.callback=="object"){jQuery(B.callback).unbind("keyup",B.updateValue)
}B.color=null;
if(typeof E=="function"){B.callback=E
}else{if(typeof E=="object"||typeof E=="string"){B.callback=jQuery(E);
B.callback.bind("keyup",B.updateValue);
if(B.callback.get(0).value){B.setColor(B.callback.get(0).value)
}}}return this
};
B.updateValue=function(E){if(this.value&&this.value!=B.color){B.setColor(this.value)
}};
B.setColor=function(E){var F=B.unpack(E);
if(F){B.color=E;
B.rgb=F;
B.hsl=B.RGBToHSL(B.rgb);
B.updateDisplay()
}return this
};
B.setHSL=function(E){B.hsl=E;
B.rgb=B.HSLToRGB(E);
B.color=B.pack(B.rgb);
B.updateDisplay();
return this
};
B.widgetCoords=function(H){var F,L;
var G=H.target||H.srcElement;
var E=B.wheel;
if(typeof H.offsetX!="undefined"){var K={x:H.offsetX,y:H.offsetY};
var I=G;
while(I){I.mouseX=K.x;
I.mouseY=K.y;
K.x+=I.offsetLeft;
K.y+=I.offsetTop;
I=I.offsetParent
}var I=E;
var J={x:0,y:0};
while(I){if(typeof I.mouseX!="undefined"){F=I.mouseX-J.x;
L=I.mouseY-J.y;
break
}J.x+=I.offsetLeft;
J.y+=I.offsetTop;
I=I.offsetParent
}I=G;
while(I){I.mouseX=undefined;
I.mouseY=undefined;
I=I.offsetParent
}}else{var K=B.absolutePosition(E);
F=(H.pageX||0*(H.clientX+jQuery("html").get(0).scrollLeft))-K.x;
L=(H.pageY||0*(H.clientY+jQuery("html").get(0).scrollTop))-K.y
}return{x:F-B.width/2,y:L-B.width/2}
};
B.mousedown=function(E){if(!document.dragging){jQuery(document).bind("mousemove",B.mousemove).bind("mouseup",B.mouseup);
document.dragging=true
}var F=B.widgetCoords(E);
B.circleDrag=Math.max(Math.abs(F.x),Math.abs(F.y))*2>B.square;
B.mousemove(E);
return false
};
B.mousemove=function(H){var I=B.widgetCoords(H);
if(B.circleDrag){var G=Math.atan2(I.x,-I.y)/6.28;
if(G<0){G+=1
}if(B.firstClick&&(B.hsl[2]==0||B.hsl[2]==1)){B.firstClick=false;
B.setHSL([G,1,0.5])
}else{B.setHSL([G,B.hsl[1],B.hsl[2]])
}}else{var F=Math.max(0,Math.min(1,-(I.x/B.square)+0.5));
var E=Math.max(0,Math.min(1,-(I.y/B.square)+0.5));
B.setHSL([B.hsl[0],F,E])
}return false
};
B.mouseup=function(){jQuery(document).unbind("mousemove",B.mousemove);
jQuery(document).unbind("mouseup",B.mouseup);
document.dragging=false
};
B.updateDisplay=function(){var E=B.hsl[0]*6.28;
jQuery(".h-marker",C).css({left:Math.round(Math.sin(E)*B.radius+B.width/2)+"px",top:Math.round(-Math.cos(E)*B.radius+B.width/2)+"px"});
jQuery(".sl-marker",C).css({left:Math.round(B.square*(0.5-B.hsl[1])+B.width/2)+"px",top:Math.round(B.square*(0.5-B.hsl[2])+B.width/2)+"px"});
jQuery(".color",C).css("backgroundColor",B.pack(B.HSLToRGB([B.hsl[0],1,0.5])));
if(typeof B.callback=="object"){jQuery(B.callback).css({backgroundColor:B.color,color:B.hsl[2]>0.5?"#000":"#fff"});
jQuery(B.callback).each(function(){this.value=B.color
})
}else{if(typeof B.callback=="function"){B.callback.call(B,B.color)
}}};
B.absolutePosition=function(F){var G={x:F.offsetLeft,y:F.offsetTop};
if(F.offsetParent){var E=B.absolutePosition(F.offsetParent);
G.x+=E.x;
G.y+=E.y
}return G
};
B.pack=function(F){var H=Math.round(F[0]*255);
var G=Math.round(F[1]*255);
var E=Math.round(F[2]*255);
return"#"+(H<16?"0":"")+H.toString(16)+(G<16?"0":"")+G.toString(16)+(E<16?"0":"")+E.toString(16)
};
B.unpack=function(E){if(E.length==7){return[parseInt("0x"+E.substring(1,3))/255,parseInt("0x"+E.substring(3,5))/255,parseInt("0x"+E.substring(5,7))/255]
}else{if(E.length==4){return[parseInt("0x"+E.substring(1,2))/15,parseInt("0x"+E.substring(2,3))/15,parseInt("0x"+E.substring(3,4))/15]
}}};
B.HSLToRGB=function(J){var L,K,E,H,I;
var G=J[0],M=J[1],F=J[2];
K=(F<=0.5)?F*(M+1):F+M-F*M;
L=F*2-K;
return[this.hueToRGB(L,K,G+0.33333),this.hueToRGB(L,K,G),this.hueToRGB(L,K,G-0.33333)]
};
B.hueToRGB=function(F,E,G){G=(G<0)?G+1:((G>1)?G-1:G);
if(G*6<1){return F+(E-F)*G*6
}if(G*2<1){return E
}if(G*3<2){return F+(E-F)*(0.66666-G)*6
}return F
};
B.RGBToHSL=function(J){var G,L,M,H,N,F;
var E=J[0],I=J[1],K=J[2];
G=Math.min(E,Math.min(I,K));
L=Math.max(E,Math.max(I,K));
M=L-G;
F=(G+L)/2;
N=0;
if(F>0&&F<1){N=M/(F<0.5?(2*F):(2-2*F))
}H=0;
if(M>0){if(L==E&&L!=I){H+=(I-K)/M
}if(L==I&&L!=K){H+=(2+(K-E)/M)
}if(L==K&&L!=E){H+=(4+(E-I)/M)
}H/=6
}return[H,N,F]
};
jQuery("*",C).mousedown(B.mousedown);
B.setColor("#000000");
if(D){B.linkTo(D)
}};
var MAX_PER_ROW=4;
var MAX_ROWS=3;
var currentPage=1;
var selectedImage;
var selectedMedia;
var newImageIdCounter=0;
var currentMode="all";
var pageCount=1;
var jumpLinks=Array();
var imageListPopupWindow;
function toggleImageEditTool(){enableDelayedImages("imageDiv");
if(!imageListPopupWindow){imageListPopupWindow=new Window("imageListPopup",{minWidth:340,title:"Images & Files",resizable:false,minimizable:false,maximizable:false,className:"wikispaces",showEffect:Element.show,hideEffect:Element.hide});
imageListPopupWindow.setContent("imageDiv",true,false);
imageListPopupWindow.setSize(0,Element.getDimensions(imageListPopupWindow.element).height+10);
if(jQuery.browser.msie==true&&jQuery.browser.version<7){registerOnScroll(function(){scrollWindow(imageListPopupWindow,true)
})
}else{imageListPopupWindow.element.style.position="fixed"
}imageListPopupWindow.element.style.top="0";
var A=Element.getDimensions(document.getElementsByTagName("body")[0]).width-Element.getDimensions(imageListPopupWindow.element).width-5;
imageListPopupWindow.element.style.left=A+"px"
}if(imageListPopupWindow.element.style.display=="none"){if(imageListPopupWindow.isMinimized()){imageListPopupWindow.minimize()
}imageListPopupWindow.show();
imageListPopupWindow.toFront()
}else{imageListPopupWindow.hide()
}}function findCenteringElement(A){while(A){if(A.tagName&&(A.tagName.toUpperCase()=="CENTER"||(A.tagName.toUpperCase()=="DIV"&&(A.style.textAlign=="center"||A.align=="center")))){return A
}if(A.parentNode){A=A.parentNode
}else{return null
}}return null
}function getImageAlignment(B){var A=findCenteringElement(B);
if(A){return"center"
}return B.align
}function setImageLink(A){document.getElementById("imageLink").innerHTML=A;
document.getElementById("imageLinkControlsActive").style.display="inline";
document.getElementById("imageLinkControlsInactive").style.display="none"
}function unsetImageLink(){document.getElementById("imageLink").innerHTML="None";
document.getElementById("imageLinkControlsActive").style.display="none";
document.getElementById("imageLinkControlsInactive").style.display="inline"
}function setImageCaption(A){document.getElementById("imageCaptionInput").value=A
}function updateImageCaption(A){if(selectedImage){selectedImage.alt=A
}}function unSelectImage(){if(selectedImage){setSelectedValue(document.getElementById("imageAlign"),"");
unsetImageLink();
setImageCaption("");
selectedImage=null
}hideImagePropertiesPopup()
}function selectImage(A){unSelectImage();
selectedImage=A;
if(currentMode=="files"){setListMode("images")
}setSelectedValue(document.getElementById("imageAlign"),getImageAlignment(A));
setImageCaption(A.alt);
if(A.parentNode.nodeName=="A"&&A.parentNode.href){setImageLink(A.parentNode.href)
}else{unsetImageLink()
}showImagePropertiesPopup()
}function setImageAlignment(B){if(selectedImage){if(B=="center"){if(findCenteringElement(selectedImage)){return 
}else{selectedImage.align="";
var A=document.getElementById(editorId).contentWindow.document;
newDiv=A.createElement("div");
newDiv.style.textAlign="center";
imageNode=selectedImage;
if(selectedImage.parentNode.nodeName=="A"){imageNode=selectedImage.parentNode
}imageNode.parentNode.appendChild(newDiv);
imageNode.parentNode.replaceChild(newDiv,imageNode);
newDiv.appendChild(imageNode)
}}else{if(centering=findCenteringElement(selectedImage)){for(i=0;
i<centering.childNodes.length;
i++){centering.parentNode.insertBefore(centering.childNodes.item(i),centering)
}centering.parentNode.removeChild(centering)
}selectedImage.align=B
}showImagePropertiesPopup();
detectedChange()
}}function showFiles(){var A=self.innerHeight||(document.documentElement.clientHeight||document.body.clientHeight);
MAX_ROWS=Math.floor((A-350)/88);
if(MAX_ROWS<1){MAX_ROWS=1
}var B=document.getElementById("imageSection");
for(i=0;
i<MAX_ROWS;
i++){var C=document.createElement("tr");
for(j=0;
j<MAX_PER_ROW;
j++){C.appendChild(document.createElement("td"))
}B.appendChild(C)
}showPage(1)
}function showFileSpinner(){jQuery("#fileSpinner").show()
}function hideFileSpinner(){jQuery("#fileSpinner").hide()
}function setListMode(B){if(B==currentMode){return 
}var A=jQuery(document.forms.imageToolForm.listMode);
A.val(B);
currentMode=B;
showPage(1)
}function isImage(A){if(A=="image/png"||A=="image/x-png"||A=="image/jpeg"||A=="image/gif"||A=="image/jpg"||A=="image/pjpeg"){return true
}else{return false
}}function isMedia(A){switch(A){case"audio/mpeg":case"audio/mpg":case"audio/mp3":case"audio/x-mp3":case"audio/x-mpeg":case"audio/x-mpg":case"application/asx":case"application/x-mplayer2":case"audio/x-ms-wma":case"audio/x-ms-wax":case"video/x-ms-asf-plugin":case"video/x-ms-asf":case"video/x-ms-wm":case"video/x-ms-wmv":case"video/x-ms-wvx":case"video/avi":case"audio/3gpp":case"audio/3gpp2":case"audio/aac":case"audio/x-aac":case"audio/aiff":case"audio/x-aiff":case"audio/mid":case"audio/midi":case"audio/x-midi":case"audio/mp4":case"audio/m4a":case"audio/x-m4a":case"audio/wav":case"audio/x-wav":case"video/3gpp":case"video/3gpp2":case"video/m4v":case"video/x-m4v":case"video/mp4":case"video/mpeg":case"video/x-mpeg":case"video/quicktime":case"video/sd-video":case"video/flv":case"video/x-flv":case"application/x-shockwave-flash":case"application/futuresplash":case"audio/x-pn-realaudio":case"audio/x-pn-realaudio-plugin":return true;
break
}return false
}function getCell(A){var B=document.getElementById("imageSection");
var C=B.getElementsByTagName("tr");
row=C[Math.floor(A/MAX_PER_ROW)];
cells=row.getElementsByTagName("td");
cell=cells[A%MAX_PER_ROW];
return cell
}function removeFile(B){var A=getCell(B);
var C=document.createElement("td");
C.style.textAlign="center";
C.style.padding="5px;";
A.parentNode.replaceChild(C,A)
}function addNewFile(C,B){var A="files";
if(isImage(B)){A="images"
}else{if(isMedia(B)){A="media"
}}if((A=="images"||A=="media")&&currentMode=="files"){setListMode(A)
}else{if(A=="files"&&(currentMode=="images"||currentMode=="media")){setListMode("files")
}}jumpToName(C)
}function jumpTo(B){showFileSpinner();
var C=MAX_PER_ROW*MAX_ROWS;
var A="/space/filelistjson/"+currentMode+"?jumpTo="+B+"&pageLimit="+C;
jQuery.ajax({url:A,type:"GET",dataType:"json",global:false,cache:false,error:function(D,F,E){autosaveReloadSession(function(){jumpTo(B)
},3000)
},success:loadFileData})
}function jumpToName(C){showFileSpinner();
var B=MAX_PER_ROW*MAX_ROWS;
var A="/space/filelistjson/"+currentMode+"?jumpToName="+encodeURIComponent(C)+"&pageLimit="+B;
jQuery.ajax({url:A,type:"GET",dataType:"json",global:false,cache:false,error:function(D,F,E){autosaveReloadSession(function(){jumpToName(C)
},3000)
},success:function(D){loadFileData(D);
highlightFile(C)
}})
}function highlightFile(A){jQuery("#imageSection td[title='"+A+"']").Highlight(3000,"#FFA")
}function addFile(H,F,B){var A=getCell(B);
var E;
if(isImage(F)){E="image"
}else{if(isMedia(F)){E="media"
}else{E="file"
}}var D=document.createElement("td");
D.style.textAlign="center";
D.style.padding="5px;";
D.title=H;
Event.observe(D,"dblclick",function(){insertImageInEditor(H,E)
},true);
var C=document.createElement("img");
if(E=="image"){C.src="/space/image/64x64/"+encodeURIComponent(H);
C.width=64;
C.height=64
}else{loadMimeImage(C,F)
}C.className="draggableImage";
C.id=E+"Link_"+H;
C.onmousedown=function(){return false
};
var G=H;
if(H.length>10){G=H.substr(0,10)+"..."
}D.appendChild(C);
D.appendChild(document.createElement("br"));
D.appendChild(document.createTextNode(G));
A.parentNode.replaceChild(D,A)
}function addFileError(A){alert(A)
}function getSelectedValue(A){return A[A.selectedIndex].value
}function setSelectedValue(A,B){for(i=0;
i<A.options.length;
i++){if(A[i].value==B){A.selectedIndex=i;
return 
}}}function resetPages(){jQuery("#imagePages").empty();
var B=1;
var A=pageCount;
if(pageCount>10){B=currentPage-5;
if(B<1){B=1
}A=B+10;
if(A>pageCount){A=pageCount
}}if(B>1){addPage(1);
if(B>2){jQuery("#imagePages").append("..")
}}for(i=B;
i<=A;
i++){addPage(i)
}if(pageCount>A){if(A+1<pageCount){jQuery("#imagePages").append("..")
}addPage(pageCount)
}}function addPage(A){jQuery("#imagePages").append('<a href="#'+A+'" onclick="showPage('+A+');">'+A+"</a> ")
}function showPage(B){showFileSpinner();
var D=(B-1)*(MAX_PER_ROW*MAX_ROWS);
var C=MAX_PER_ROW*MAX_ROWS;
var A="/space/filelistjson/"+currentMode+"?offset="+D+"&pageLimit="+C;
jQuery.ajax({url:A,type:"GET",dataType:"json",global:false,cache:false,error:function(E,G,F){autosaveReloadSession(function(){showPage(B)
},3000)
},success:loadFileData})
}function loadFileData(C){reloadAttempt=0;
var A=0;
jQuery.each(C.files,function(D,E){addFile(E.name,E.mime_type,A++)
});
pageCount=C.pagedata.numpages;
currentPage=C.pagedata.current;
for(var B=A;
B<(MAX_ROWS*MAX_PER_ROW);
B++){removeFile(B)
}resetPages();
highlightPage(currentPage);
hideFileSpinner()
}function highlightPage(C){var A=document.getElementById("imagePages").getElementsByTagName("span");
for(var B=0;
B<A.length;
B++){if(A[B].innerHTML==C){A[B].style.fontWeight="bold"
}else{A[B].style.fontWeight="normal"
}}}function showLastPage(){showPage(pageCount)
}function externalImageOnloadCallback(E){if(E&&E.height==0){alert("Please enter the address of an external image.");
return 
}var C=document.getElementById("externalImageUrl").value;
var D="image";
var B=document.createElement("img");
B.src=C;
B.width=64;
B.height=64;
B.alt="external "+D;
B.className="draggableImage";
B.id=D+"Link_"+C;
var A=document.getElementById("externalImage");
A.appendChild(B);
Event.observe(B,"dblclick",function(){insertImageInEditor(C,D)
},true)
}function showExternalImage(){var C=document.getElementById("externalImageUrl").value;
var A=document.getElementById("externalImage");
var B=A.childNodes;
for(var D=0;
D<B.length;
D++){A.removeChild(B[D])
}var E=new Image();
jQuery(E).ready(externalImageOnloadCallback);
E.src=C
}function loadMimeImage(A,C){var B=new Image();
B.src="/i/mime/64/"+C+".png";
if(B.height>0){A.src=B.src
}else{A.src="/i/mime/64/empty.png"
}A.width=64;
A.height=64
}function startSpinner(){var A=document.getElementById("uploadSpinner");
A.src="/i/spinner.gif"
}function stopSpinner(){var A=document.getElementById("uploadSpinner");
A.src="/i/c.gif"
}var imagePropertiesPopupWindow;
function showImagePropertiesPopup(){if(!imagePropertiesPopupWindow){imagePropertiesPopupWindow=new Window("content_win",{minWidth:250,title:"Image Properties",resizable:false,className:"wikispaces",minimizable:false,maximizable:false,showEffect:Element.show,hideEffect:Element.hide});
imagePropertiesPopupWindow.setContent("imageProperties",true,false);
imagePropertiesPopupWindow.show()
}Position.prepare();
var D=Position.positionedOffset(selectedImage);
var C=Position.cumulativeOffset(document.getElementById(editorId));
var B=D[0]+C[0]+Element.getDimensions(selectedImage).width;
var A=D[1]+C[1]+Element.getDimensions(selectedImage).height;
var F=Element.getDimensions(document.getElementsByTagName("body").item(0));
var E=Element.getDimensions(imagePropertiesPopupWindow.element);
if(B+E.width>F.width){B=F.width-E.width
}if(A+E.height>F.height){A=F.height-E.height
}imagePropertiesPopupWindow.setLocation(A,B);
if(imagePropertiesPopupWindow.isMinimized()){imagePropertiesPopupWindow.minimize()
}imagePropertiesPopupWindow.show();
imagePropertiesPopupWindow.toFront();
imagePropertiesPopupWindow.setSize(0,Element.getDimensions(document.getElementById("imageProperties")).height)
}function hideImagePropertiesPopup(){if(imagePropertiesPopupWindow){imagePropertiesPopupWindow.hide()
}}function insertImageInVisualEditor(C,A){var B=document.forms.imageToolForm;
if(B.insertMode[0].checked){if(A=="image"){if(C.substring(0,"http://".length)=="http://"||C.substring(0,"https://".length)=="https://"||C.substring(0,"ftp://".length)=="ftp://"){insertInEditor('<img id="newImage-'+ ++newImageIdCounter+'" src="'+C+'"/>')
}else{insertInEditor('<img id="newImage-'+ ++newImageIdCounter+'" src="/space/showimage/'+encodeURIComponent(C)+'"/>')
}var F=document.getElementById(editorId).contentWindow.document;
var E=F.getElementById("newImage-"+newImageIdCounter);
selectImage(E)
}else{if(A=="media"){var G=C.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
var D="type=&quot;file&quot; key=&quot;"+G+"&quot;";
insertInEditor('<img src="http://www.'+siteDomainShort+"/site/embedthumbnail/file/"+encodeURIComponent(C)+'?h=0&w=0" class="WikiMedia" id="wikitext@@media@@'+D+'" title="File Widget: '+G+'" />')
}else{insertInEditor("[[file:"+C+"]]")
}}}else{insertInEditor('<a href="http://'+window.location.hostname+"/space/showimage/"+encodeURIComponent(C)+'">'+C+"</a>")
}}function insertImageInTextEditor(C,A){var B=document.forms.imageToolForm;
if(B.insertMode[0].checked){if(A=="media"){insertInEditor('[[media type="file" key="'+C+'"]]')
}else{insertInEditor("[["+A+":"+C+"]]")
}}else{insertInEditor("[[http://"+window.location.hostname+"/space/showimage/"+encodeURIComponent(C)+"|"+C+"]]")
}}var mediaPopupWindow;
function showMediaTool(){enableDelayedImages("mediaDiv");
if(document.selection){cursorPos=document.selection.createRange().duplicate()
}WindowUtilities.disableScreen("wikispaces","overlay_modal",0);
if(!mediaPopupWindow){mediaPopupWindow=new Window("mediaPopup",{minWidth:340,title:"Widgets",resizable:false,maximizable:false,minimizable:false,className:"wikispaces",onClose:function(){selectedSpan=null;
WindowUtilities.enableScreen("overlay_modal")
},showEffect:Element.show,hideEffect:Element.hide});
mediaPopupWindow.setContent("mediaDiv",true,false)
}resetMediaForms();
mediaPopupWindow.toFront();
mediaPopupWindow.showCenter();
setMediaMenu("main");
setPopupSize(mediaPopupWindow,jQuery("#mediaDiv").get(0),true)
}function hideMediaTool(){mediaPopupWindow.hide();
WindowUtilities.enableScreen("overlay_modal");
if(mediaPreviewPopupWindow){mediaPreviewPopupWindow.hide()
}}function setMediaError(B){var A=document.getElementById("mediaError");
A.style.display="block";
A.innerHTML=B
}function setMediaPreview(B){var A=document.getElementById("mediaPreviewDiv");
A.innerHTML="<table><tr><td>"+B+'</td></tr><tr><td><form action="#" onsubmit="return false;"><input type="button" name="close" value="Close Preview" onclick="mediaPreviewPopupWindow.close();"/></form></td></tr></table>';
showMediaPreview()
}function unSelectMedia(){if(selectedMedia){jQuery(selectedMedia).css("opacity","1.0");
selectedMedia=null
}}function selectMedia(A){unSelectMedia();
selectedMedia=A;
jQuery(A).css("opacity","0.75")
}var previousSection="main";
function startMediaSpinner(){previousSection=currentSection;
setMediaMenu("spinner");
Element.addClassName("mediaContent","mediaContentSpinner");
var A=document.getElementById("mediaError");
A.style.display="none";
A.innerHTML=""
}function stopMediaSpinner(){Element.removeClassName("mediaContent","mediaContentSpinner");
setMediaMenu(previousSection)
}function updateMediaToolPopup(){setPopupSize(mediaPopupWindow,document.getElementById("mediaDiv").getElementsByTagName("table")[0]);
snapPopupToScreen(mediaPopupWindow)
}function snapPopupToScreen(C){var K=Element.getDimensions(C.element).width;
var H=Element.getDimensions(C.element).height;
var L=document.documentElement.scrollTop;
var B=document.documentElement.scrollLeft;
var J=document.documentElement.clientWidth+document.documentElement.scrollLeft;
var G=document.documentElement.clientHeight+document.documentElement.scrollTop;
var M=false;
var I=false;
var D=Position.positionedOffset(C.element)[0]+K;
if(D>J){M=J-K-5
}var A=Position.positionedOffset(C.element)[1]+H;
if(A>G){I=G-H-5
}var F=Position.positionedOffset(C.element)[0];
if(F<B||(M!==false&&M<B)){M=B
}var E=Position.positionedOffset(C.element)[1];
if(E<L||(I!==false&&I<L)){I=L
}if(M!==false){C.element.style.left=M+"px"
}if(I!==false){C.element.style.top=I+"px"
}}var currentMenu="main";
var currentSection="main";
function setMediaMenu(A){if(A=="main"){jQuery(currentMenu+"MediaMenuEntry").removeClass("activeMediaMenuEntry")
}var B=false;
if(document.getElementById(A+"MediaMenuEntry")){jQuery("#"+currentMenu+"MediaMenuEntry").removeClass("activeMediaMenuEntry");
jQuery("#"+A+"MediaMenuEntry").addClass("activeMediaMenuEntry");
currentMenu=A;
B=true
}if(A=="showcustom"){A="custom"
}if(!document.getElementById(A+"MediaMenu")){A="custom"
}jQuery("#"+A+"MediaMenu").find("input.autocompletePage").each(function(){var C=this.autocompleter;
setTimeout(function(){C.findValue()
},1)
});
jQuery("#"+A+"MediaMenu").find("input.autocompleteTag").each(function(){var C=this.autocompleter;
setTimeout(function(){C.findValue()
},1)
});
jQuery("#"+currentSection+"MediaMenu").hide();
jQuery("#"+A+"MediaMenu").show();
currentSection=A;
if((B&&A!="custom")||A=="main"||A=="spinner"||A=="googlecalendar"||A=="flickr"||A=="gabbly"||A=="yackpack"||A=="bittybrowser"||A=="toc"||A.substring(0,7)=="include"){jQuery(document.otherMediaForm).hide()
}else{jQuery(document.otherMediaForm).show()
}if(A!="spinner"){document.otherMediaForm.mediaType.value=A;
updateMediaToolPopup()
}}function textEditorEmbedMedia(){var A;
showMediaTool();
setMediaMenu("main");
if(expandSelectionToTag("[[","media","]]")){A=getSelectedText().match(/\[\[media (.*)\]\]/)[1];
loadMedia("wikitext@@media@@"+A)
}else{if(expandSelectionToTag("[[","rss","]]")){A=getSelectedText().match(/\[\[rss (.*)\]\]/)[1];
loadMedia("wikitext@@rss@@"+A)
}}}function visualEditorEmbedMedia(){showMediaTool();
setMediaMenu("main");
if(selectedMedia&&selectedMedia.parentNode){loadMedia(selectedMedia.id)
}}function resetMediaForms(){jQuery(".mediaForm").each(function(){this.reset()
})
}function loadMedia(A){startMediaSpinner();
document.genericMediaForm.media.value=A;
document.genericMediaForm.submit();
return 
}var mediaPreviewPopupWindow;
function showMediaPreview(){WindowUtilities.disableScreen("wikispaces","overlay_modal",0);
if(!mediaPreviewPopupWindow){mediaPreviewPopupWindow=new Window("mediaPreviewPopup",{minWidth:340,minHeight:340,title:"Media Preview",resizable:false,maximizable:false,minimizable:false,className:"wikispaces",onClose:function(){WindowUtilities.enableScreen("overlay_modal")
},showEffect:Element.show,hideEffect:Element.hide});
mediaPreviewPopupWindow.setContent("mediaPreviewDiv",true,false)
}mediaPreviewPopupWindow.toFront();
setPopupSize(mediaPreviewPopupWindow,document.getElementById("mediaPreviewDiv").getElementsByTagName("table")[0],true)
}function setPopupSize(C,B,A){C.setSize(jQuery(B).outerWidth({margin:true})+20,jQuery(B).outerHeight({margin:true})+20);
if(A){C.showCenter()
}}function insertMediaEmbedInEditor(B){if(cursorPos){cursorPos.select()
}insertInEditor(B);
var A=document.getElementById(currentRTE).contentWindow.document;
attachDoubleClickEventHandlers(A);
stopMediaSpinner();
hideMediaTool();
resetMediaForms();
setMediaMenu("main")
}function submitGoogleCalendar(){var B=document.googlecalendarMediaForm.email.value;
var A="http://www.google.com/calendar/embed?src="+encodeURIComponent(B);
document.otherMediaForm.embedText.value=A;
document.otherMediaForm.save.click()
}function submitYackpack(){var B=document.yackpackMediaForm.channel.value;
var A="http://www.yackpack.com/walkietalkie/?"+encodeURIComponent(B);
document.otherMediaForm.embedText.value=A;
document.otherMediaForm.save.click()
}function submitBittyBrowser(){var A=document.bittybrowserMediaForm.url.value;
document.otherMediaForm.embedText.value='bitty browser\nwebsite: "'+A+'"';
document.otherMediaForm.save.click()
}function embedGabbly(){var A=location.protocol+"//"+location.host+"/"+wikispaces_page;
document.otherMediaForm.embedText.value="<iframe src='http://cw.gabbly.com/gabbly/cw.jsp?e=1&t="+encodeURIComponent(A)+"' scrolling='no' style='width:300px; height:250px;' frameborder='0'></iframe>";
document.otherMediaForm.save.click()
}function insertToc(){insertInEditor("\n[[toc]]");
hideMediaTool()
}Function.prototype.extend=function(A,C){var D=this,B=function(){D.apply(this,arguments);
A.apply(this,arguments)
};
B.prototype=new D();
B.implement(C);
return B
};
Function.prototype.implement=function(B){for(var A in B){this.prototype[A]=B[A]
}};
function AbstractRange(){this.fatal=false;
this.startContainer=null;
this.startOffset=null;
this.endContainer=null;
this.endOffset=null;
this.collapsed=true;
this.commonAncestorContainer=null;
this.START_TO_START=0;
this.START_TO_END=1;
this.END_TO_END=2;
this.END_TO_START=3
}AbstractRange.prototype={setStart:function(A,B){},setEnd:function(A,B){},setStartBefore:function(A){},setStartAfter:function(A){},setEndBefore:function(A){},setEndAfter:function(A){},collapse:function(A){},selectNode:function(A){},selectNodeContents:function(A){},compareBoundaryPoints:function(A,B){},deleteContents:function(){},extractContents:function(){},cloneContents:function(){},insertNode:function(A){},surroundContents:function(A){},cloneRange:function(){},toString:function(){},detach:function(){}};
InternetExplorerRange=AbstractRange.extend(function(A){this.win=A;
this.className="InternetExplorerRange"
},{setStart:function(A,C){try{if(A.nodeType==3&&(C>A.data.length||C<0)){throw ('Exception... "Index or size is negative or greater than the allowed amount" 1 '+C)
}if(A.nodeType==1&&C>0&&(C>A.childNodes.length-1||A.childNodes.length==0)){log("START NODE IS AN ELEMENT"+A.tagName);
throw ('Exception... "Index or size is negative or greater than the allowed amount" 2 '+C)
}this.startContainer=A;
this.startOffset=C;
if(this.endContainer==null&&this.endOffset==null){this.endContainer=A;
this.endOffset=C
}this.collapsed=this._collapsed()
}catch(B){this.fatal=true;
log("setStart exception "+B.name+" - "+B.message,B)
}},setEnd:function(A,C){try{if(A.nodeType==3&&(C>A.data.length||C<0)){throw ('Exception... "Index or size is negative or greater than the allowed amount" 3 '+C+" "+A.data)
}if(A.nodeType==1&&C>0&&(C>A.childNodes.length-1||A.childNodes.length==0)){log("END NODE IS AN ELEMENT"+A.tagName);
throw ('Exception... "Index or size is negative or greater than the allowed amount" 4 '+C)
}this.endContainer=A;
this.endOffset=C;
if(this.startContainer==null&&this.startOffset==null){this.startContainer=A;
this.startOffset=C
}this.collapsed=this._collapsed()
}catch(B){this.fatal=true;
log("setEnd exception "+B.name+" - "+B.message,B)
}},collapse:function(A){},_collapsed:function(){return(this.startContainer==this.endContainer&&this.startOffset==this.endOffset)
},insertNode:function(B){var C=this.win.document.selection.createRange();
var A=this.win.document.createElement("div");
A.appendChild(B);
C.collapse(false);
C.pasteHTML(A.innerHTML)
},surroundContents:function(C){var B=this.win.document.selection.createRange();
var A=this.win.document.createElement("div");
A.appendChild(C);
C.innerHTML+=B.htmlText;
B.pasteHTML(A.innerHTML)
},selectNode:function(A){var B=this.win.document.selection.createRange();
B.moveToElementText(A)
}});
InternetExplorerRange.prototype.toString=function(){var A=this.win.document.selection.createRange();
return A.text
};
W3Range=AbstractRange.extend(function(A){this.win=A;
this.className="W3Range";
this.range=this.windocument.createRange()
},{setStart:function(A,B){this.range.setStart(A,B)
},setEnd:function(A,B){this.range.setEnd(A,B)
}});
W3Range.prototype.toString=function(){return this.range.toString()
};
function Range(A){if(document.all){return new InternetExplorerRange(A)
}else{return new W3Range(A)
}}function Selection(A){if(document.all){return new InternetExplorerSelection(A)
}else{return new W3Selection(A)
}}function W3Selection(A){this.win=A;
this.className="W3Selection";
this.ranges=[]
}W3Selection.prototype={addRange:function(A){this.ranges[this.ranges.length]=A;
this.win.getSelection().addRange(A.range)
},setRangeAt:function(A,B){this.ranges[B]=A;
if(this.ranges.length==1){this._addRange()
}},removeAllRanges:function(){this.ranges.length=0;
this.win.getSelection().removeAllRanges()
},getRangeAt:function(A){return this.win.getSelection().getRangeAt(A)
}};
function InternetExplorerSelection(A){this.win=A;
this.className="InternetExplorerSelection";
this.ranges=[]
}InternetExplorerSelection.prototype={addRange:function(A){this.ranges[this.ranges.length]=A;
if(this.ranges.length==1){this._addRange()
}},setRangeAt:function(A,B){this.ranges[B]=A;
if(this.ranges.length==1){this._addRange()
}},removeAllRanges:function(){this.ranges.length=0
},getRangeAt:function(J){var A=this.win.document.selection.createRange();
var D=new Range(this.win);
var N=A.duplicate();
var P=A.duplicate();
N.collapse(true);
N.move("Character",1);
N.move("Character",-1);
N.pasteHTML("<b id='_range_decomposition_left_temporary'>L</b>");
P.collapse(false);
P.pasteHTML("<b id='_range_decomposition_right_temporary'>R</b>");
var O=false;
var I=false;
var M=this.win.document.getElementById("_range_decomposition_left_temporary");
var C=0;
var E;
if(M.nextSibling&&M.nextSibling.id=="_range_decomposition_right_temporary"){O=true;
log("getRangeAt: zero length range detected")
}var F=oRTE.document.getElementsByTagName("b");
for(var G=0;
G<F.length;
G++){if(F[G].id=="_range_decomposition_left_temporary"){break
}else{if(F[G].id=="_range_decomposition_right_temporary"){log("getRangeAt: right before left detected");
O=true;
I=true
}}}log("Getting left position");
var H=this._getObjectAndOffset(M,O,I,true);
var L=H[0];
var C=H[1];
M=this.win.document.getElementById("_range_decomposition_right_temporary");
var B;
var K;
if(O){B=L;
K=C;
M.parentNode.removeChild(M)
}else{log("getting right position");
var Q=this._getObjectAndOffset(M,O,I,false);
B=Q[0];
K=Q[1]
}log("getRangeAt: setting range endpoints",L,B,C,K);
D.setStart(L,C);
D.setEnd(B,K);
this.setRangeAt(D,J);
return D
},_getObjectAndOffset:function(J,K,G,B){if((J.nextSibling&&J.nextSibling.nodeType==3||J.previousSibling&&J.previousSibling.nodeType==3)){log("mode 1: something touched a text block");
if(J.previousSibling&&J.nextSibling&&J.previousSibling.nodeType==3&&J.nextSibling.nodeType==3){leftOffset=J.previousSibling.data.length;
nextNode=J.previousSibling;
if(B){nextNode.data=nextNode.data+J.nextSibling.data;
J.nextSibling.parentNode.removeChild(J.nextSibling)
}}else{if(!J.previousSibling||J.previousSibling.nodeType==1){leftOffset=0;
nextNode=J.nextSibling
}else{if(!J.nextSibling||J.nextSibling.nodeType==1){leftOffset=J.previousSibling.data.length;
nextNode=J.previousSibling
}}}J.parentNode.removeChild(J)
}else{if(!J.previousSibling||(J.previousSibling&&J.previousSibling.nodeType==1)){log("mode 3: no text nodes, either the previous is empty, or it is an element");
leftOffset=0;
if(G){if(J.nextSibling){nextNode=J.nextSibling
}else{if(J.previousSibling&&J.previousSibling.id=="_range_decomposition_right_temporary"&&J.previousSibling.previousSibling){nextNode=J.previousSibling.previousSibling
}else{nextNode=J.parentNode
}}}else{if(K){if(J.nextSibling.nextSibling){nextNode=J.nextSibling.nextSibling
}else{nextNode=J.parentNode
}}else{if(J.nextSibling){nextNode=J.nextSibling
}else{if(J.previousSibling){nextNode=J.previousSibling;
if(nextNode.nodeType==3){leftOffset=nextNode.length
}}else{var F=oRTE.document.createTextNode("\u00a0");
jQuery(J).after(F);
nextNode=F
}}}}J.parentNode.removeChild(J);
if(nextNode&&nextNode.nodeType==1){log("mode 3, we have an element node, going to bump to the parent",nextNode,leftOffset);
leftOffset=this._getElementIndex(nextNode);
nextNode=nextNode.parentNode;
log("bumped to parent node",nextNode,leftOffset,nextNode.childNodes.item(leftOffset))
}}else{if(!J.nextSibling){log("mode 4: the next is empty");
nextNode=J.previousSibling;
J.parentNode.removeChild(J);
if(nextNode.nodeType==3){leftOffset=nextNode.data.length
}else{if(nextNode.nodeType==1){leftOffset=nextNode.parentNode.childNodes.length
}else{log("unknown node type")
}}}else{log("FAILURE CASE NOT HANDLED",J.previousSibling,J.nextSibling);
J.parentNode.removeChild(J)
}}}log("found a preliminary endpoint",nextNode,leftOffset);
if(nextNode.nodeType==1){var H=nextNode.childNodes.item(leftOffset);
var C=false;
var E=false;
var A=false;
var I=B;
log("Looking for a text node at the "+(I?"start":"end")+" of current node",H);
while(!C){if(H.nodeType==3){nextNode=H;
leftOffset=(I?0:nextNode.length);
C=true;
log("found a text node to use",nextNode,leftOffset)
}else{if(H.nodeType==1&&H.tagName=="BR"){var F=oRTE.document.createTextNode("\u00a0");
jQuery(H).before(F);
nextNode=F;
leftOffset=0;
C=true
}else{if(H.id!="_range_decomposition_right_temporary"&&H.id!="_range_decomposition_left_temporary"&&H.childNodes.length>0){H=H.childNodes.item((I?0:H.childNodes.length-1));
log("Still looking, now checking",H)
}else{if(!E&&nextNode.childNodes.item(leftOffset).previousSibling){E=true;
I=false;
if(nextNode.childNodes.item(leftOffset).previousSibling&&nextNode.childNodes.item(leftOffset).previousSibling.id!="_range_decomposition_right_temporary"){H=nextNode.childNodes.item(leftOffset).previousSibling;
log("ran out of nodes, looking at the previous",H)
}else{H=nextNode.childNodes.item(leftOffset).previousSibling.previousSibling.previousSibling;
log("came across a BAD right temporary in before",H)
}}else{if(!A&&nextNode.childNodes.item(leftOffset).nextSibling){A=true;
I=true;
if(nextNode.childNodes.item(leftOffset).nextSibling&&nextNode.childNodes.item(leftOffset).nextSibling.id!="_range_decomposition_right_temporary"){H=nextNode.childNodes.item(leftOffset).nextSibling;
log("ran out of nodes, looking at the next",H)
}else{H=nextNode.childNodes.item(leftOffset).nextSibling.nextSibling;
log("came across a BAD right temporary in after",H)
}}else{C=true;
var F=oRTE.document.createTextNode("\u00a0");
if(B){jQuery(nextNode.childNodes.item(leftOffset)).before(F);
nextNode=F;
leftOffset=0
}else{jQuery(nextNode.childNodes.item(leftOffset)).after(F);
nextNode=F;
leftOffset=0
}log("Ran out of places to look, giving up and adding a new text node",nextNode,leftOffset)
}}}}}}}var D=new Array();
D[0]=nextNode;
D[1]=leftOffset;
return D
},_addRange:function(){var C=this.ranges[this.ranges.length-1];
if(C.fatal){return 
}var A=this._selectStart(C);
var B=this._selectEnd(C);
A.setEndPoint("EndToStart",B);
A.select();
this.win.document.selection._selectedRange=C
},_selectStart:function(E){var B=this.win.document.body.createTextRange();
var H=E.startContainer;
var G=E.startOffset;
var C=H;
if(H.nodeType==3){log("looking for a spot to move to",H);
var D=G;
var A=null,F=true;
while(C.previousSibling){switch(C.previousSibling.nodeType){case 1:A=C.previousSibling;
F=false;
break;
case 3:D+=C.previousSibling.data.length;
break
}if(A!=null){break
}C=C.previousSibling
}if(A==null){A=H.parentNode;
F=true
}log("Calling moveToElementText",A,D);
B.moveToElementText(A);
B.collapse(F);
B.move("Character",D);
return B
}else{if(H.nodeType==1){switch(E.startContainer.childNodes.item(E.startOffset).nodeType){case 1:case 3:break;
default:log("error, invalid node type in selectStart");
break
}}}return B
},_selectEnd:function(C){var A=this.win.document.body.createTextRange();
var E=C.endContainer,D=E;
var F=C.endOffset;
if(E.nodeType==3){var I=E.data.length-F;
var B=null,H=false;
while(D.nextSibling){switch(D.nextSibling.nodeType){case 1:B=D.nextSibling;
H=true;
break;
case 3:I+=D.nextSibling.data.length;
break
}if(B!=null){break
}D=D.nextSibling
}if(B==null){B=E.parentNode;
H=false
}switch(B.nodeName.toLowerCase()){case"p":case"div":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":I++
}A.moveToElementText(B);
A.collapse(H);
A.move("Character",-I)
}else{if(E.nodeType==1){switch(C.endContainer.childNodes.item(C.endOffset).nodeType){case 3:var F=0;
var G=C.endContainer.childNodes.item(C.endOffset);
C.setEnd(G,F);
return this._selectEnd(C);
break;
default:log("error invalid node type in selectEnd")
}}}return A
},_getElementIndex:function(B){var C=B.parentNode.childNodes;
for(var A=0;
A<C.length;
A++){if(C[A]==B){return A
}}return null
}};
function RGBColor(G){this.ok=false;
if(G.charAt(0)=="#"){G=G.substr(1,6)
}G=G.replace(/ /g,"");
G=G.toLowerCase();
var A={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dodgerblue:"1e90ff",feldspar:"d19275",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslateblue:"8470ff",lightslategray:"778899",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"00ff00",limegreen:"32cd32",linen:"faf0e6",magenta:"ff00ff",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"ff0000",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",violetred:"d02090",wheat:"f5deb3",white:"ffffff",whitesmoke:"f5f5f5",yellow:"ffff00",yellowgreen:"9acd32"};
for(var C in A){if(G==C){G=A[C]
}}var H=[{re:/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,example:["rgb(123, 234, 45)","rgb(255,234,245)"],process:function(I){return[parseInt(I[1]),parseInt(I[2]),parseInt(I[3])]
}},{re:/^(\w{2})(\w{2})(\w{2})$/,example:["#00ff00","336699"],process:function(I){return[parseInt(I[1],16),parseInt(I[2],16),parseInt(I[3],16)]
}},{re:/^(\w{1})(\w{1})(\w{1})$/,example:["#fb0","f0f"],process:function(I){return[parseInt(I[1]+I[1],16),parseInt(I[2]+I[2],16),parseInt(I[3]+I[3],16)]
}}];
for(var B=0;
B<H.length;
B++){var E=H[B].re;
var D=H[B].process;
var F=E.exec(G);
if(F){channels=D(F);
this.r=channels[0];
this.g=channels[1];
this.b=channels[2];
this.ok=true
}}this.r=(this.r<0||isNaN(this.r))?0:((this.r>255)?255:this.r);
this.g=(this.g<0||isNaN(this.g))?0:((this.g>255)?255:this.g);
this.b=(this.b<0||isNaN(this.b))?0:((this.b>255)?255:this.b);
this.toRGB=function(){return"rgb("+this.r+", "+this.g+", "+this.b+")"
};
this.toHex=function(){var K=this.r.toString(16);
var J=this.g.toString(16);
var I=this.b.toString(16);
if(K.length==1){K="0"+K
}if(J.length==1){J="0"+J
}if(I.length==1){I="0"+I
}return"#"+K+J+I
};
this.getHelpXML=function(){var K=new Array();
for(var M=0;
M<H.length;
M++){var J=H[M].example;
for(var L=0;
L<J.length;
L++){K[K.length]=J[L]
}}for(var R in A){K[K.length]=R
}var N=document.createElement("ul");
N.setAttribute("id","rgbcolor-examples");
for(var M=0;
M<K.length;
M++){try{var O=document.createElement("li");
var Q=new RGBColor(K[M]);
var S=document.createElement("div");
S.style.cssText="margin: 3px; border: 1px solid black; background:"+Q.toHex()+"; color:"+Q.toHex();
S.appendChild(document.createTextNode("test"));
var I=document.createTextNode(" "+K[M]+" -> "+Q.toRGB()+" -> "+Q.toHex());
O.appendChild(S);
O.appendChild(I);
N.appendChild(O)
}catch(P){}}return N
}
}var lblSubmit="Submit";
var lblModeRichText="Switch to RichText Mode";
var lblModeHTML="Switch to HTML Mode";
var lblSave="Save";
var lblPrint="Print";
var lblSelectAll="Select/Deselect All";
var lblSpellCheck="Spell Check";
var lblCut="Cut";
var lblCopy="Copy";
var lblPaste="Paste";
var lblUndo="Undo";
var lblRedo="Redo";
var lblHR="Horizontal Rule";
var lblInsertChar="Insert Special Character";
var lblInsertCode="Insert Code";
var lblBold="Bold";
var lblItalic="Italic";
var lblUnderline="Underline";
var lblStrikeThrough="Strike Through";
var lblSuperscript="Superscript";
var lblSubscript="Subscript";
var lblAlgnLeft="Align Left";
var lblAlgnCenter="Center";
var lblAlgnRight="Align Right";
var lblJustifyFull="Justify Full";
var lblOL="Ordered List";
var lblUL="Unordered List";
var lblOutdent="Outdent";
var lblIndent="Indent";
var lblTextColor="Text Color";
var lblBgColor="Background Color";
var lblSearch="Search And Replace";
var lblInsertLink="Add Link";
var lblRemoveLink="Remove Link";
var lblAddImage="Images and Files";
var lblEmbedMedia="Embed Widget";
var lblEmbedSource="Source";
var lblInsertTable="Insert Table";
var lblErrorPreload="Error preloading content.";
var lblLinkType="Link Type";
var lblLinkOldA="existing anchor";
var lblLinkNewA="new anchor";
var lblLinkNoA="No Existing Anchors";
var lblLinkAnchors="Anchors";
var lblLinkAddress="Address";
var lblLinkText="Link Text";
var lblLinkOpenIn="Open Link In";
var lblLinkVal0="Please enter a URL";
var lblLinkVal1="Please enter a space and page name";
var lblLinkSubmit="OK";
var lblLinkPreview="Preview";
var lblLinkCancel="Cancel";
var lblTableRows="Rows";
var lblTableColumns="Columns";
var lblTableWidth="Table width";
var lblTablePx="pixels";
var lblTablePercent="percent";
var lblTableBorder="Border thickness";
var lblTablePadding="Cell padding";
var lblTableSpacing="Cell spacing";
var lblTableSubmit="OK";
var lblTableCancel="Cancel";
var lang="en";
var encoding="utf-8";
var zeroBorder="#c0c0c0";
var InsertTable;
var InsertLink;
var EmbedMedia;
var updateHierarchyHandle;
var updateHierarchyElement;
var ua=navigator.userAgent.toLowerCase();
var isIE=((ua.indexOf("msie")!=-1)&&(ua.indexOf("opera")==-1)&&(ua.indexOf("webtv")==-1))?true:false;
var isGecko=(ua.indexOf("gecko")!=-1)?true:false;
var isSafari=(ua.indexOf("safari")!=-1)?true:false;
var isKonqueror=(ua.indexOf("konqueror")!=-1)?true:false;
var rng;
var currentRTE;
var currentHTML;
var obj_width;
var obj_height;
var isRichText=false;
if(document.getElementById&&document.designMode&&!isSafari&&!isKonqueror){isRichText=true
}function enableDesignMode(D,C,B){log("enableDesignMode: ",arguments);
if(isIE){document.onmouseover=raiseButton;
document.onmouseout=normalButton;
document.onmousedown=lowerButton;
document.onmouseup=raiseButton
}var A='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html id="'+D+'"><head>\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n';
if(B.length>0){A+='<link media="all" type="text/css" href="'+B+'" rel="stylesheet">\n'
}else{A+='<style>@charset "utf-8"; body {background:#FFFFFF;margin:8px;padding:0px;}</style>\n'
}A+='</head><body id="editor_body" class="wiki" style="margin: 0 1px;">';
A+=C;
A+="</body></html>";
if(document.all){var F=frames[D].document;
F.open();
F.write(A);
F.close();
F.designMode="On";
frames[D].document.attachEvent("onkeydown",ieKeyPress)
}else{try{document.getElementById(D).contentDocument.designMode="on";
try{var F=document.getElementById(D).contentWindow.document;
F.open();
F.write(A);
F.close();
if(isGecko){F.addEventListener("keypress",geckoKeyPress,true)
}if(isGecko){rteCommand(D,"useCSS",true)
}}catch(E){log("enableDesignMode non-IE exception",E);
alert(lblErrorPreload)
}}catch(E){log("enableDesignMode exception",E);
if(isGecko){setTimeout("enableDesignMode('"+D+"', currentHTML, '"+B+"');",200);
return 
}else{return false
}}}jQuery(document.getElementById(D)).load(function(){showGuidelines(D);
showCursor(D);
enableSpellCheck(D)
})
}function enableSpellCheck(A){try{document.getElementById(A).contentWindow.document.getElementsByTagName("body")[0].spellcheck=true
}catch(B){setTimeout('enableSpellCheck("'+A+'");',5000)
}}function rteCleanup(A){stripGuidelines(A);
rteSync(A)
}function rteSync(A){var C=document.getElementById("hdn"+A);
if(C.value==null){C.value=""
}var B;
oRTE=document.getElementById(currentRTE).contentWindow;
bodyTags=oRTE.document.getElementsByTagName("HTML")[0].getElementsByTagName("BODY");
for(i=1;
i<bodyTags.length;
i++){bodyTags[0].innerHTML=bodyTags[0].innerHTML+bodyTags[i].innerHTML;
bodyTags[i].parentNode.removeChild(bodyTags[i])
}if(document.all){C.value=frames[A].document.body.innerHTML
}else{C.value=document.getElementById(A).contentWindow.document.body.innerHTML
}}function rteCommand(A,D,F){dlgCleanUp(A);
var I;
if(document.all){I=frames[A];
var B=I.document.selection.createRange();
if((D=="insertorderedlist"||D=="insertunorderedlist")&&!I.document.queryCommandState("InsertOrderedList")&&!I.document.queryCommandState("InsertUnorderedList")){if(B.htmlText==""){sUnique=new Date().getTime();
if(D=="insertunorderedlist"){B.pasteHTML('<ul><li><p id="'+sUnique+'"> &nbsp; </p></li></ul>')
}else{B.pasteHTML('<ol><li><p id="'+sUnique+'"> &nbsp; </p></li></ol>')
}oP=I.document.getElementById(sUnique);
B.moveToElementText(oP);
B.select();
B.collapse(true);
jQuery(oP).replaceWith(jQuery(oP).html())
}else{var E=B.htmlText;
E=E.replace(/<br[\s*\/]?>/gmi,"</li> <li>");
E="<li>"+E+"</li>";
sUnique=new Date().getTime();
if(D=="insertunorderedlist"){B.pasteHTML('<ul id="'+sUnique+'">'+E+"</ul>")
}else{B.pasteHTML('<ol id="'+sUnique+'">'+E+"</ol>")
}oP=I.document.getElementById(sUnique);
B.moveToElementText(oP);
B.select()
}updateHierarchy();
return true
}if(D=="formatblock"){var B=I.document.selection.createRange();
var E=B.htmlText;
if(E!=""){parentNode=ieGetParent();
sTag=F.toUpperCase().replace(/[<>]/g,"");
if(sTag.match(/^H\d$/)){if(parentNode.nodeName.match(/^H\d$/)){if(parentNode.nodeName!=sTag){var C=parentNode.innerHTML;
var G=I.document.createElement(sTag);
parentNode.replaceNode(G);
G.innerHTML=C;
splitOnBr(sTag,I.document)
}else{return false
}}else{E=E.replace(/<br[ \/]*>\s*$/i,"");
E=E.replace(/^\s*<p>/i,"");
E=E.replace(/<\/p>\s*$/i,"");
B.pasteHTML("<"+sTag+">"+E+"</"+sTag+">");
splitOnBr(sTag,I.document)
}}else{if(parentNode!=null&&parentNode.nodeName.match(/^H\d$/)){var C=parentNode.innerHTML;
var G=I.document.createElement("SPAN");
parentNode.replaceNode(G);
G.innerHTML=C
}}B.select();
I.focus()
}return true
}}else{I=document.getElementById(A).contentWindow
}try{I.focus();
I.document.execCommand(D,false,F);
I.focus();
if(D!="useCSS"&&D!="enableInlineTableEditing"&&D!="enableObjectResizing"){detectedChangeDelayed()
}}catch(H){log("rteCommand exception "+H.name+" - "+H.message,H,D,F)
}}function dlgInsertTable(A,B){self.command=B;
currentRTE=A;
InsertTable=popUpWin("/s/rte/insert_table.htm","InsertTable",500,200,"status=yes,resizable=yes,",A)
}function dlgInsertLink(J,F){self.command=F;
var S="";
var D="";
var H="";
var T="";
var I="";
var C="";
if(mode=="visual"){oNode=selectParent("A");
if(!(selectedImage&&selectedImage.parentNode)){rng=setRange(J);
S=stripHTML(rng.toString());
S=jQuery.trim(S)
}if(oNode){var E=oNode.getAttribute("href",2)+"";
E=E.replace(/^(..\/)+/,"/");
rWikispacesURL=new RegExp("");
var U=siteDomainShort.replace(".",".");
rWikispacesURL.compile("^http[s]?://([a-z0-9-]+).("+U+")/([^#/]+)(#(.+)){0,1}$","gi");
rCurrentDomainURL=new RegExp("");
U=location.hostname.replace(".",".");
rCurrentDomainURL.compile("^http[s]?://("+U+")/([^#/]+)(#(.+)){0,1}$","gi");
rWikispacesURLPage=new RegExp("");
rWikispacesURLPage.compile("^/([^#]+)(#(.+)){0,1}$","i");
rURL=new RegExp("");
rURL.compile("^((http|https|ftp|mailto):(//)?)(.*)$","i");
var B=rWikispacesURL.exec(E);
var L=rCurrentDomainURL.exec(E);
if(B){D=B[1];
H=B[3];
T=(B[5])?B[5]:""
}else{if(L){D="";
H=L[2];
T=(L[4])?L[5]:""
}else{var N=rWikispacesURLPage.exec(E);
if(N){D="";
H=N[1];
T=(N[3])?N[3]:""
}else{var K=rURL.exec(E);
if(K){C=K[2];
I=K[4]
}}}}if(H){H=decodeURIComponent(H);
H=H.replace(/\+/g," ")
}}}else{var G;
var M=getSelectedText();
if(M){if(G=M.match(/^\[\[((http|https|ftp|mailto):(\/\/)?)(.*)(?:\|(.*))\]\]$/i)){if(G[5]){S=G[5]
}else{S=M
}if(G[2]){C=G[2]
}if(G[4]){I=G[4]
}}else{if(G=M.match(/\[\[(([a-z0-9-]+):)?([^:|\/\[\]\{\}\$#@\\]+)(?:\#([A-Za-z][-A-Za-z0-9_ ]*))?(\|([^\[\]\xff]+))?\]\]/)){if(G[2]){D=G[2]
}if(G[3]){H=G[3]
}if(G[4]){T=G[4]
}if(G[6]){S=G[6]
}if(!S){if(D&&D!=wikispaces_spaceName){S=D+" : "+H
}else{S=H
}}}else{S=M
}}}}var R="text";
if(selectedImage&&selectedImage.parentNode&&selectedImage.src){R="image"
}sPopupURI="/page/insertlink/"+encodeURIComponent(wikispaces_page)+"?text="+encodeURIComponent(S)+"&space="+encodeURIComponent(D)+"&page="+encodeURIComponent(H)+"&anchor="+encodeURIComponent(T)+"&extLink="+encodeURIComponent(I)+"&extProt="+encodeURIComponent(C)+"&mode="+encodeURIComponent(R);
if(mode=="visual"){rteSync(J);
InsertLink=popUpWin(sPopupURI,"InsertLink",640,320,"status=yes,resizable=yes,",J)
}else{var Q=640;
var O=320;
var P=(screen.availWidth-Q)/2;
var A=(screen.availHeight-O)/2;
window.open(sPopupURI,"InsertLink","width="+Q+",height="+O+",status=yes,resizable=yes,left="+P+",top="+A)
}}function dlgCleanUp(A){if(InsertTable!=null){InsertTable.close()
}InsertTable=null;
if(InsertLink!=null){InsertLink.close()
}InsertLink=null
}function popUpWin(D,H,G,A,C,F){dlgCleanUp(F);
var E=(screen.availWidth-G)/2;
var B=(screen.availHeight-A)/2;
C+="width="+G+",height="+A+",left="+E+",top="+B;
return window.open(D,H,C)
}function selectFont(C,B){var A=document.getElementById(B).selectedIndex;
var D=document.getElementById(B).options[A].value;
var E=B.replace("_"+C,"");
rteCommand(C,E,D);
document.getElementById(B).selectedIndex=0
}function moveSelectionIntoEditor(F){if(document.all){return 
}var E=F.getSelection();
var A=E.getRangeAt(0);
var D=A.startContainer;
var C=F.document.getElementById("editor_body");
if(D!=C&&!Element.childOf(D,C)){var B=F.document.createRange();
B.setStart(F.document.getElementById("editor_body"),0);
B.setStart(F.document.getElementById("editor_body"),0);
B.collapse(true);
E.addRange(B);
E.removeRange(A)
}}function insertHTML(G){var A=currentRTE;
var H;
if(document.all){H=frames[A]
}else{H=document.getElementById(A).contentWindow
}moveSelectionIntoEditor(H);
if(document.all){H.focus();
var B;
if(selectedImage){selectedImage.outerHTML=G;
selectedImage=null
}else{if(selectedMedia){selectedMedia.outerHTML=G;
selectedMedia=null
}else{var B=H.document.selection.createRange();
B.pasteHTML(G);
B.collapse(false);
B.select()
}}}else{var D=H.getSelection();
for(var F=0;
F<D.rangeCount;
F++){D.getRangeAt(F).deleteContents()
}var E=D.getRangeAt(0);
var C=E.createContextualFragment(G);
var I=C.lastChild;
E.insertNode(C);
D.removeAllRanges();
D=H.getSelection();
D.addRange(E);
H.focus()
}detectedChangeDelayed()
}function insertNodeAtSelection(H,E){moveSelectionIntoEditor(H);
var B=H.getSelection();
var F=true;
var G=B.getRangeAt(0);
B.removeAllRanges();
G.deleteContents();
var A=G.startContainer;
var L=G.startOffset;
G=document.createRange();
if(A.nodeType==3&&E.nodeType==3){A.insertData(L,E.nodeValue);
G.setEnd(A,L+E.length);
G.setStart(A,L+E.length)
}else{var C;
if(A.nodeType==3){var D=A;
A=D.parentNode;
var M=D.nodeValue;
var J=M.substr(0,L);
var I=M.substr(L);
var K=document.createTextNode(J);
C=document.createTextNode(I);
A.insertBefore(C,D);
A.insertBefore(E,C);
A.insertBefore(K,E);
A.removeChild(D)
}else{C=A.childNodes[L];
A.insertBefore(E,C)
}if(C!=null){G.setEnd(C,0);
G.setStart(C,0)
}else{G.setEnd(A,0);
G.setStart(A,0)
}}B.addRange(G);
detectedChangeDelayed()
}function setRange(B){var C;
if(document.all){C=frames[B]
}else{C=document.getElementById(B).contentWindow
}var A=new Selection(C);
return A.getRangeAt(0)
}function stripHTML(B){var A=B.replace(/(<([^>]+)>)/ig,"");
A=A.replace(/\r\n/g," ");
A=A.replace(/\n/g," ");
A=A.replace(/\r/g," ");
return A
}function showCursor(A){try{if(document.all){oRTE=frames[A];
oRTE.focus()
}else{oRTE=document.getElementById(A).contentWindow;
oRTE.focus();
oNode=oRTE.document.getElementById("editor_body").lastChild;
oRange=document.createRange();
oRange.setEndAfter(oNode);
oRange.setStartAfter(oNode);
oSel=oRTE.getSelection();
oSel.addRange(oRange);
oRTE.focus()
}}catch(B){setTimeout('showCursor("'+A+'");',5000)
}}function showGuidelines(A){try{if(A.length==0){A=currentRTE
}var H;
if(document.all){H=frames[A]
}else{H=document.getElementById(A).contentWindow
}var I=H.document.getElementsByTagName("table");
for(var E=0;
E<I.length;
E++){if(I[E].getAttribute("border")=="0"){var F=I[E].getElementsByTagName("tr");
for(var C=0;
C<F.length;
C++){var D=F[C].getElementsByTagName("td");
for(var B=0;
B<D.length;
B++){if(C==0&&B==0){D[B].style.border="dashed 1px "+zeroBorder
}else{if(C==0&&B!=0){D[B].style.borderBottom="dashed 1px "+zeroBorder;
D[B].style.borderTop="dashed 1px "+zeroBorder;
D[B].style.borderRight="dashed 1px "+zeroBorder
}else{if(C!=0&&B==0){D[B].style.borderBottom="dashed 1px "+zeroBorder;
D[B].style.borderLeft="dashed 1px "+zeroBorder;
D[B].style.borderRight="dashed 1px "+zeroBorder
}else{if(C!=0&&B!=0){D[B].style.borderBottom="dashed 1px "+zeroBorder;
D[B].style.borderRight="dashed 1px "+zeroBorder
}}}}}}}}}catch(G){setTimeout('showGuidelines("'+A+'");',5000)
}}function stripGuidelines(C){var F;
if(document.all){F=frames[C]
}else{F=document.getElementById(C).contentWindow
}var E=F.document.getElementsByTagName("table");
for(var B=0;
B<E.length;
B++){if(E[B].getAttribute("border")=="0"){var D=E[B].getElementsByTagName("td");
for(var A=0;
A<D.length;
A++){D[A].removeAttribute("style")
}}}}function selectParent(B){var F=null;
if(selectedImage&&selectedImage.parentNode){F=selectedImage;
while(F&&F.nodeName!=B){F=F.parentNode
}if(F&&F.nodeName==B){return F
}return null
}if(selectedMedia&&selectedMedia.parentNode){F=selectedMedia;
while(F&&F.nodeName!=B){F=F.parentNode
}if(F&&F.nodeName==B){return F
}return null
}if(document.all){oRTE=frames[currentRTE];
oRTE.focus();
var E=oRTE.document.selection.createRange();
F=E.parentElement();
while(F&&F.nodeName!=B){F=F.parentNode
}if(F&&F.nodeName==B){oRTE.focus();
oRTE.document.selection.empty();
var E=oRTE.document.selection.createRange();
E.moveToElementText(F);
E.select()
}}else{oRTE=document.getElementById(currentRTE).contentWindow;
oRTE.focus();
oRng=oRTE.window.getSelection().getRangeAt(0);
if(oRng.startContainer.nodeType==1){F=oRng.startContainer.childNodes[oRng.startOffset]
}else{F=oRng.startContainer
}if(F.hasChildNodes()){var D=F.childNodes;
for(var C=0;
C<D.length;
C++){if(D[C].nodeName==B){F=D[C]
}}}while(F&&F.nodeName!=B){F=F.parentNode
}if(F&&F.nodeName==B){oRTE.focus();
var E=oRTE.document.createRange();
E.selectNode(F);
var A=oRTE.getSelection();
A.removeAllRanges();
A.addRange(E)
}}return F
}function geckoKeyPress(C){if(C.ctrlKey){var A=String.fromCharCode(C.charCode).toLowerCase();
var B="";
switch(A){case"b":B="bold";
break;
case"i":B="italic";
break;
case"u":B="underline";
break
}if(B){rteCommand(currentRTE,B,null);
C.preventDefault();
C.stopPropagation()
}}}function ieKeyPress(){oRTE=frames[currentRTE];
var A=oRTE.event;
switch(A.keyCode){case 13:if(!(A.ctrlKey||A.altKey||A.shiftKey)){parentNode=ieGetParent();
if(oRTE.document.queryCommandState("InsertOrderedList")||oRTE.document.queryCommandState("InsertUnorderedList")||"H1"==parentNode.nodeName||"H2"==parentNode.nodeName||"H3"==parentNode.nodeName||"H4"==parentNode.nodeName||"H5"==parentNode.nodeName||"H6"==parentNode.nodeName){return true
}insertHTML("<br />&nbsp;");
var B=oRTE.document.selection.createRange();
B.moveStart("character",-1);
B.select();
oRTE.document.selection.clear();
return false
}break;
case 9:if(!(A.ctrlKey||A.altKey)){if(oRTE.document.queryCommandState("InsertOrderedList")||oRTE.document.queryCommandState("InsertUnorderedList")){if(A.shiftKey){rteCommand(currentRTE,"outdent","");
return false
}else{rteCommand(currentRTE,"indent","");
return false
}}}break
}}function ieGetParent(){var B=null;
oRTE=frames[currentRTE];
oRTE.focus();
var A=oRTE.document.selection.createRange();
B=A.parentElement();
while(B){if(B.nodeType==1&&B.nodeName!="P"&&B.nodeName!="SPAN"&&B.nodeName!="A"){return(B)
}if(B.parentNode){B=B.parentNode
}else{return null
}}}function raiseButton(B){var A=window.event.srcElement;
className=A.className;
if(className=="rteImg"||className=="rteImgDn"){A.className="rteImgUp"
}}function normalButton(B){var A=window.event.srcElement;
className=A.className;
if(className=="rteImgUp"||className=="rteImgDn"){A.className="rteImg"
}}function lowerButton(B){var A=window.event.srcElement;
className=A.className;
if(className=="rteImg"||className=="rteImgUp"){A.className="rteImgDn"
}}function splitOnBr(A,C){var B=jQuery(C).find(A);
B.each(function(){var E=jQuery(this).children();
if(E.length>0&&E.get(0).tagName.toLowerCase()=="p"){E=E.get(0).children()
}var G=jQuery(this);
var D=C.createElement(A);
var H=false;
var F=0;
while(E.length>F){if(E.get(F).nodeType==1&&E.get(F).tagName.toLowerCase()=="br"){if(D.childNodes.length){lastLi=lastLi.insertAdjacentElement("afterEnd",D);
log("added a new li")
}D=C.createElement(A);
E.remove(F);
H=true;
log("BR FOUND IN LIST")
}else{if(H){D.appendChild(E.item(F).cloneNode(true));
E.item(F).removeNode();
log("appended a cloned node")
}else{F++
}}}if(D.childNodes.length){lastLi=lastLi.insertAdjacentElement("afterEnd",D)
}})
}function customEditorStart(D){log("customEditorStart");
var B=false;
if(""==document.getElementById(D).innerHTML||"Type in the content of your new page here."==document.getElementById(D).innerHTML){B=true;
document.getElementById(D).innerHTML="Type in the content of your new page here."
}try{var A=Element.getDimensions(document.getElementById(D)).height;
if(A<300){A=300
}currentRTE=editorId;
document.getElementById(editorId).height=A;
enableDesignMode(editorId,document.getElementById(D).innerHTML,stylesheetUrl);
jQuery(document.getElementById(editorId)).load(function(){if(jQuery.browser.msie){jQuery("#"+editorId).height(500000);
var F=document.getElementById(editorId).contentWindow.document;
var E=F.getElementById("editor_body").scrollHeight;
jQuery("#"+editorId).height(E)
}lookForHeightChange();
if(B){rteCommand(editorId,"selectall","")
}rteCommand(editorId,"enableInlineTableEditing",false);
var F=document.getElementById(currentRTE).contentWindow.document;
attachDoubleClickEventHandlers(F)
});
floatToolbar();
attachEditorEventHandlers(editorId)
}catch(C){log("customEditorStart exception: "+C.name+" - "+C.message);
return false
}startupFinished=true;
return true
}function attachDoubleClickEventHandlers(A){jQuery(A).find("a").unbind("dblclick");
jQuery(A).find(".WikiMedia").unbind("dblclick");
jQuery(A).find("a").dblclick(editorInsertLink);
jQuery(A).find(".WikiMedia").dblclick(editorEmbedMedia)
}function attachEditorEventHandlers(A){log("attachEditorEventHandlers");
if(document.all){oRTE=frames[A].document
}else{oRTE=document.getElementById(A).contentWindow.document
}Event.observe(oRTE,"keyup",keyEventHandler,true);
Event.observe(oRTE,"mousedown",mouseEventHandler,true)
}function keyEventHandler(A){if(typeof updateHierarchyHandle=="number"){clearTimeout(updateHierarchyHandle)
}updateHierarchyHandle=setTimeout("updateHierarchy()",100);
switch(A.keyCode){case 16:case 17:case 18:case 20:case 91:case 93:case 45:case 255:break;
case Event.KEY_ESC:case Event.KEY_LEFT:case Event.KEY_UP:case Event.KEY_RIGHT:case Event.KEY_DOWN:case Event.KEY_PAGEUP:case Event.KEY_PAGEDOWN:case Event.KEY_END:case Event.KEY_HOME:selectElement(A);
break;
case Event.KEY_BACKSPACE:case Event.KEY_RETURN:case Event.KEY_DELETE:case 9:selectElement(A);
detectedChange();
break;
default:detectedChange()
}}function mouseEventHandler(A){if(typeof updateHierarchyHandle=="number"){clearTimeout(updateHierarchyHandle)
}updateHierarchyHandle=setTimeout("updateHierarchy()",100);
selectElement(A)
}function selectElement(C){var D=false;
if(document.all){elem=C.srcElement
}else{elem=C.target
}if(elem.parentNode&&elem.nodeName=="IMG"&&elem.className!="WikiAnchor"&&elem.className!="WikiMedia"){log("selectElement: image on");
selectImage(elem);
D=true
}else{if(selectedImage){log("selectElement: image off");
unSelectImage()
}}if(elem.nodeName=="IMG"&&elem.className=="WikiMedia"){log("selectElement: media on");
selectMedia(elem);
var B=elem.id.match(/wikitext@@(.*)@@/)[1];
if(B=="media"){var A=elem.id.match(/type="(.*)"\s/)[1];
if(A!="custom"){D=true
}}}else{if(selectedMedia){log("selectElement: media off");
unSelectMedia()
}}if(jQuery(elem).is("td,th")){log("selectElement: table on");
selectTableCell(elem)
}else{if(jQuery(elem).parents("td,th").length>0){log("selectElement: table on");
selectTableCell(jQuery(elem).parents("td,th").get(0))
}else{if(selectTableCell){unselectTableCell()
}}}rteCommand(currentRTE,"enableObjectResizing",D)
}function getSelectionContainer(A){if(selectedImage&&selectedImage.parentNode){oNode=selectedImage;
return oNode
}if(selectedMedia&&selectedMedia.parentNode){oNode=selectedMedia;
return oNode
}if(document.all){oRTE=frames[A];
oRTE.focus();
oRange=oRTE.document.selection.createRange();
return oRange.parentElement()
}else{oRTE=document.getElementById(currentRTE).contentWindow;
oRTE.focus();
oNode=oRTE.window.getSelection().getRangeAt(0).commonAncestorContainer;
return oNode
}}function isSelectionUnderTag(B,A){oNode=getSelectionContainer(B);
examineNode=oNode;
while(examineNode!=null){if(examineNode.tagName==A){return examineNode
}examineNode=examineNode.parentNode
}return false
}function updateHierarchy(){if(typeof updateHierarchyHandle=="number"){clearTimeout(updateHierarchyHandle)
}var A=getSelectionContainer(currentRTE);
var B="";
if(null!=updateHierarchyElement&&A==updateHierarchyElement){return 
}log("updateHierarchy");
updateHierarchyElement=A;
unsetAllButtons();
while(A&&A.tagName!="BODY"&&A.tagName!="HTML"){if(A.tagName){setChildStatus(A);
B=A.tagName+" &gt; "+B
}else{B="text &gt; "+B
}A=A.parentNode
}if(selectedMedia&&selectedMedia.parentNode){setButton("rteMediaBtn");
document.getElementById("rteImageBtn").className="rteImg"
}jQuery("#hierarchy").innerHTML=B
}function unsetAllButtons(){jQuery("#Buttons1_WikispacesEditorContent .rteImgUp").removeClass("rteImgUp");
setFormat("p")
}function setFormat(B){var A=document.getElementById("formatblock_"+currentRTE).options;
for(i=0;
i<A.length;
i++){if(A[i].value=="<"+B+">"){document.getElementById("formatblock_"+currentRTE).selectedIndex=i
}}if(B=="pre"||B=="code"){document.getElementById("formatblock_"+currentRTE).disabled=true
}else{document.getElementById("formatblock_"+currentRTE).disabled=false
}}function setChildStatus(A){switch(A.tagName){case"STRONG":case"B":setButton("rteBoldBtn");
break;
case"EM":case"I":setButton("rteItalicBtn");
break;
case"U":setButton("rteUnderlineBtn");
break;
case"OL":setButton("rteOrderedListBtn");
break;
case"UL":setButton("rteUnorderedListBtn");
break;
case"A":setButton("rteLinkBtn");
break;
case"IMG":setButton("rteImageBtn");
break;
case"TABLE":setButton("rteTableBtn");
break;
case"H1":setFormat("h1");
break;
case"H2":setFormat("h2");
break;
case"H3":setFormat("h3");
break;
case"H4":setFormat("h4");
break;
case"H5":setFormat("h5");
break;
case"H6":setFormat("h6");
break;
case"PRE":setCodeFormat(A.className);
setButton("rteCodeBtn");
break;
case"SPAN":if(jQuery(A).attr("style")||jQuery(A).attr("class")){setButton("rteTextColorBtn")
}break
}if(A.style.fontStyle=="italic"){setButton("rteItalicBtn")
}if(A.style.fontWeight=="bold"){setButton("rteBoldBtn")
}if(A.style.textDecoration=="underline"){setButton("rteUnderlineBtn")
}}function setCodeFormat(A){setFormat("code");
var B="Code";
if(A){B+=" ("+A+")"
}document.getElementById("formatblock_"+currentRTE).options[document.getElementById("formatblock_"+currentRTE).selectedIndex].innerHTML=B
}function setButton(A){jQuery("#"+A).addClass("rteImgUp")
}function textEditorSubmit(){autosave(false);
if(anotherEditDetected&&editorSaving){showConcurrentEditorPopup();
editorSaving=false;
return confirm("Someone else has made changes to this page since you started editing.\n\nIf you click OK, we will save your page and overwrite their changes. You will still be able to look back at their changes from the page history tab.\n\nIf you click Cancel, you can either cancel your edit entirely and start again with the latest copy of the page, or use the Page Activity window to look at the changes they have made.")
}return true
}function visualEditorSubmit(){autosave(false);
var B=document.getElementById("mergeStatus").innerHTML;
var A=document.getElementById("mergeResult").innerHTML;
if(B=="success"){oRTE=document.getElementById(currentRTE).contentWindow;
body=oRTE.document.getElementsByTagName("HTML")[0].getElementsByTagName("BODY")[0];
body.innerHTML=A
}rteCleanup(editorId);
if(anotherEditDetected&&B!="success"&&editorSaving){showConcurrentEditorPopup();
editorSaving=false;
return confirm("Someone else has made changes to this page since you started editing.\n\nIf you click OK, we will save your page and overwrite their changes. You will still be able to look back at their changes from the page history tab.\n\nIf you click Cancel, you can either cancel your edit entirely and start again with the latest copy of the page, or use the Page Activity window to look at the changes they have made.")
}return true
}function insertInTextEditor(C){var D=document.getElementById("textEditor");
D.focus();
if(document.selection){sel=document.selection.createRange();
sel.text=C;
sel.select()
}else{if(D.selectionStart||D.selectionStart=="0"){var B=D.selectionStart;
var A=D.selectionEnd;
D.value=D.value.substring(0,B)+C+D.value.substring(A,D.value.length);
if(B==A){setSelectionRange(D,B+C.length,B+C.length)
}else{setSelectionRange(D,B,B+C.length)
}}else{D.value+=C
}}detectedChange()
}var toolbarPopup;
var originalToolbar;
function floatToolbar(){log("floatToolbar");
if(!toolbarPopup){var A;
if(mode=="plain"){A=document.getElementById("textEditor")
}else{A=document.getElementById("editor")
}var C=document.getElementById("Buttons1_"+editorId);
originalToolbar=C.parentNode.removeChild(C);
originalToolbar.className="";
toolbarPopup=new Window("toolbarPopup",{minWidth:800,minHeight:26,title:"Editor",resizable:false,maximizable:false,minimizable:false,closable:false,className:"wikispaces",showEffect:Element.show,hideEffect:Element.hide,helpText:""});
toolbarPopup.setContent(C,true,true);
var B=jQuery(A).offset()["left"]-16;
toolbarPopup.element.style.left=B+"px";
if(jQuery.browser.msie==true&&jQuery.browser.version<7){toolbarPopup.element.style.top=document.documentElement.scrollTop+"px";
registerOnScroll(function(){scrollWindow(toolbarPopup,true)
})
}else{toolbarPopup.element.style.position="fixed";
toolbarPopup.element.style.top="0px"
}toolbarPopup.getContent().style.overflow="hidden"
}toolbarPopup.show();
toolbarPopup.toFront();
toolbarPopup.updateWidth();
toolbarPopup.updateHeight()
}function scrollWindow(B,A){if(B){if(A){jQuery(B.element).css("top",document.documentElement.scrollTop)
}else{jQuery(B.element).css("top",document.documentElement.clientHeight+document.documentElement.scrollTop-B.element.getHeight())
}}}var codePopup;
var cursorPos;
function openCodePopup(){if(mode=="visual"&&document.getElementById("formatblock_"+currentRTE).options[document.getElementById("formatblock_"+currentRTE).selectedIndex].value=="<code>"){alert("You cannot insert a code block inside another code block");
return 
}if(document.selection){cursorPos=document.selection.createRange().duplicate()
}WindowUtilities.disableScreen("wikispaces","overlay_modal",0);
if(!codePopup){codePopup=new Window("codePopup",{minWidth:300,title:"Insert Code",resizable:false,maximizable:false,minimizable:false,className:"wikispaces",onClose:function(){selectedSpan=null;
WindowUtilities.enableScreen("overlay_modal")
},showEffect:Element.show,hideEffect:Element.hide});
codePopup.setContent(document.getElementById("codePopupContents"),true,true)
}codePopup.showCenter();
codePopup.toFront()
}function insertCodeInVisualEditor(){var A=document.codeForm.code.value;
A=A.escapeHTML();
var B=document.codeForm.format.value;
if(!B){B="text"
}if(cursorPos){cursorPos.select()
}insertInEditor('<pre class="'+B+'">'+A+"</pre>");
document.codeForm.reset();
Windows.close("codePopup")
}function insertCodeInTextEditor(){var A=document.codeForm.code.value;
A=A.escapeHTML();
var B=document.codeForm.format.value;
if(!B){B="text"
}if(cursorPos){cursorPos.select()
}insertInEditor('\n[[code format="'+B+'"]]\n'+A+"\n[[code]]\n");
document.codeForm.reset();
Windows.close("codePopup")
}function prepareSelection(A){A.sel_text="";
A.sel_text_pre="";
A.sel_text_post="";
A.sel_start=0;
A.sel_end=0;
A.cur_start=0;
A.cur_end=0;
A.focus();
if(typeof (A.selectionStart)=="number"){A.sel_start=A.selectionStart;
A.cur_start=A.selectionStart;
A.sel_end=A.selectionEnd;
A.cur_end=A.selectionEnd;
A.sel_text=A.value.substring(A.sel_start,A.sel_end);
A.sel_text_pre=A.value.substring(0,A.sel_start);
A.sel_text_post=A.value.substring(A.sel_end,A.value.length)
}else{if(document.selection){var B=document.selection.createRange();
if(true||B.parentElement().id==A.id){var C=document.body.createTextRange();
C.moveToElementText(A);
for(var F=0;
C.compareEndPoints("StartToStart",B)<0;
F++){C.moveStart("character",1)
}A.cur_start=F;
for(var D=0;
D<=F;
D++){if(A.value.charAt(D)=="\n"){F++
}}A.sel_start=F;
var C=document.body.createTextRange();
C.moveToElementText(A);
for(var E=0;
C.compareEndPoints("StartToEnd",B)<0;
E++){C.moveStart("character",1)
}A.cur_end=E;
for(var D=0;
D<=E;
D++){if(A.value.charAt(D)=="\n"){E++
}}A.sel_end=E;
A.sel_text=B.text;
A.sel_text_pre=A.value.substring(0,A.sel_start);
A.sel_text_post=A.value.substring(A.sel_end,A.value.length)
}}}}function getSelectedText(){var A=document.getElementById("textEditor");
if(A){prepareSelection(A);
return(A.sel_text?A.sel_text:"")
}return""
}function expandSelectionToLine(){var C=document.getElementById("textEditor");
prepareSelection(C);
var A;
for(var B=C.sel_start;
B>=0;
B--){if(C.value.substring(B,B+1)=="\n"){A=B+1;
break
}}for(B=C.sel_end;
B<C.value.length-1;
B++){if(C.value.substring(B,B+1)=="\n"){setSelectionRange(C,A,B);
return true
}}return false
}function expandSelectionToTag(B,A,G){var C=getSelectedText().replace(/^\s+/,"").replace(/\s+$/,"");
if(C){if(C.substring(0,A.length+B.length)==B+A&&C.substring(C.length-G.length,C.length)==G){return true
}else{return false
}}else{var J=document.getElementById("textEditor");
prepareSelection(J);
var F=0;
var H=0;
var I=J.sel_start-1;
if(I<0){I=0
}var E=null;
for(var D=I;
D>=0;
D--){if(J.value.substring(D,D+A.length+B.length)==B+A){if(H==0){E=D;
break
}else{H--
}}else{if(J.value.substring(D,D+B.length)==B){return false
}else{if(J.value.substring(D,D+G.length)==G){if(J.sel_start-D>=G.length){H++
}}}}}if(E==null){return false
}I=J.sel_end-(G.length-1);
if(I<0){I=0
}if(I<(E+A.length+B.length)){I=E+A.length+B.length
}for(D=I;
D<J.value.length-1;
D++){if(J.value.substring(D,D+G.length)==G){if(F==0){setSelectionRange(J,E,D+G.length);
return true
}else{F--
}}else{if(J.value.substring(D,D+B.length)==B){F++
}}}}return false
}function wrapTextEditorSelection(K){var F=getSelectedText();
var J=F.length;
F=F.replace(/^\s+/,"");
var B=J-F.length;
F=F.replace(/\s+$/,"");
var I=J-B-F.length;
var A="";
if(F.substring(0,K.length)==K&&F.substring(F.length-K.length,F.length)==K){A=F.substring(K.length,F.length-K.length)
}else{A=K+F+K
}for(var H=0;
H<B;
H++){A=" "+A
}for(var H=0;
H<I;
H++){A=A+" "
}var G=document.getElementById("textEditor");
prepareSelection(G);
var D=G.cur_start;
var E=G.cur_end;
var C=A.length;
if(isIE){for(var H=0;
H<=A.length;
H++){if(A.charAt(H)=="\n"){C--
}}}insertInEditor(A);
if(D==E){setSelectionRange(G,D+(C/2),D+(C/2))
}else{setSelectionRange(G,D,C+D)
}G.focus()
}function addListInTextEditor(F){if(!getSelectedText()){expandSelectionToLine()
}var D=document.getElementById("textEditor");
prepareSelection(D);
var H=D.sel_text;
var A="";
var G=true;
var B=H.split("\n");
for(var C=0;
C<B.length;
C++){var E;
if(E=B[C].match(/^(\#|\*|\>)+\s(.*)$/i)){if(E[1].charAt(0)!=F){G=false
}A+="\n"+F+" "+E[2]
}else{G=false;
A+="\n"+F+" "+B[C]
}}if(D.sel_text_pre.length==0||D.sel_text_pre.charAt(D.sel_text_pre.length-1)=="\n"){A=A.substring(1,A.length)
}if(G){var H=D.sel_text;
A="";
var B=H.split("\n");
for(var C=0;
C<B.length;
C++){if(E=B[C].match(/^(\#|\*|\>)+\s(.*)$/i)){A+=E[2]+"\n"
}}if(D.sel_text.charAt(D.sel_text.length-1)!="\n"){A=A.substring(0,A.length-1)
}}insertInEditor(A)
}function setSelectionRange(element,start,end){if(element.setSelectionRange){element.setSelectionRange(start,end)
}else{var newStart=start;
var newEnd=end;
for(var i=0;
i<start;
i++){if(element.value.charAt(i)=="\n"){newStart--;
newEnd--
}}var range=element.createTextRange();
with(range){collapse(true);
moveEnd("character",newEnd);
moveStart("character",newStart);
select()
}}}function cancelEdit(A){editorConfirmDeparture=false;
window.location=A.href;
return false
}function hidePreview(){jQuery("#previewBox").hide();
jQuery("#editor_wrap").show();
jQuery("#toolbarPopup_table_content").show();
jQuery("#toolbarPopup_table_content_preview").remove()
}function fadeEditor(){jQuery(".contentBox").parents().each(function(){jQuery(this).prevAll(":not(.rbT)").css("opacity",0.3);
jQuery(this).nextAll(":not(.rbB)").css("opacity",0.3)
})
}function showPreview(){var A;
unSelectImage();
unSelectMedia();
unselectTableCell();
jQuery("#toolbarPopup_table_content").hide();
jQuery("#toolbarPopup_table_content_spinner").remove();
jQuery("#toolbarPopup_table_content").after('<td id="toolbarPopup_table_content_spinner" valign="top" align="center" class="wikispaces_content">Loading Preview <img src="/i/spinner.gif" style="text-align: bottom;"/></td>');
if(mode=="visual"){rteSync(currentRTE);
A=document.getElementById("hdn"+currentRTE).value
}else{A=jQuery("#textEditor").val()
}jQuery.ajax({async:false,cache:false,data:{content:A,mode:mode},dataType:"xml",global:false,error:function(B,D,C){log("showPreview ajax error",B,D,C);
autosaveReloadSession(showPreview,3000)
},success:function(E,F){log("showPreviewResponse",E);
var C=E.getElementsByTagName("preview")[0];
var B="";
if(C&&C.childNodes.length>0){for(var D=0;
D<C.childNodes.length;
D++){B+=C.childNodes[D].nodeValue
}}jQuery("#previewBox").html(B);
fixEmbedLayers();
jQuery("#previewBox").show();
jQuery("#editor_wrap").hide();
jQuery("#toolbarPopup_table_content_spinner").remove();
jQuery("#toolbarPopup_table_content").after('<td id="toolbarPopup_table_content_preview" valign="top" align="right" class="wikispaces_content"><input type="button" onclick="hidePreview()" value="Continue Editing"/> <input type="button" name="update_preview" value="Save" style="font-weight: bold;" onclick="document.rte.update.click();" /> <a href="'+cancelUrl+'" onclick="return cancelEdit(this);">Cancel</a>&nbsp;</td>')
},type:"POST",url:"/page/preview/"+encodeURIComponent(wikispaces_page)})
}var onScrollFunctions=Array();
function registerOnScroll(A){onScrollFunctions[onScrollFunctions.length]=A
}window.onscroll=function(){for(i=0;
i<onScrollFunctions.length;
i++){onScrollFunctions[i]()
}};
var stylePopup;
var selectedSpans;
function openStylePopup(){if(mode=="visual"&&document.getElementById("formatblock_"+currentRTE).options[document.getElementById("formatblock_"+currentRTE).selectedIndex].value=="<code>"){alert("You cannot apply a style inside of a code block.");
return 
}if(mode=="visual"){var B=getSelectedSpans();
selectedSpans=B;
setSpanTextVisualEditor(B[0])
}else{expandSelectionToTag("<span","","</span>");
setSpanTextTextEditor()
}var A=new Selection(oRTE);
var C=A.getRangeAt(0).commonAncestorContainer;
if(jQuery(C).parents("a").eq(0).length>0){document.styleForm.styleColor.disabled=true;
document.styleForm.styleColor.style.backgroundColor="#CCCCCC"
}else{document.styleForm.styleColor.disabled=false
}if(document.selection){cursorPos=document.selection.createRange().duplicate()
}WindowUtilities.disableScreen("wikispaces","overlay_modal",0);
if(!stylePopup){stylePopup=new Window("stylePopup",{minWidth:500,title:"Color and Style",resizable:false,maximizable:false,minimizable:false,className:"wikispaces",onClose:function(){selectedSpans=null;
if(mode=="visual"){cleanupEmptySpans()
}WindowUtilities.enableScreen("overlay_modal")
},showEffect:Element.show,hideEffect:Element.hide});
stylePopup.setContent(document.getElementById("stylePopupContents"),true,true)
}setTimeout("jQuery(stylePopup).ready(function() { stylePopup.setSize(0, 300); });",10);
stylePopup.showCenter();
stylePopup.toFront();
jQuery("#colorpickerColor").hide();
jQuery("#colorpickerBackgroundColor").hide()
}function applyStyle(){mergeBasicStyleToAdvanced();
if(mode=="plain"){return applyStyleTextEditor()
}else{return applyStyleVisualEditor()
}}function cleanupEmptySpans(){if(document.all){var D=frames[currentRTE]
}else{var D=document.getElementById(currentRTE).contentWindow
}var C=D.document.getElementsByTagName("span");
for(var B=0;
B<C.length;
B++){var A=jQuery(C[B]);
if(!A.attr("style")&&!A.attr("class")){A.replaceWith(A.contents())
}}if(jQuery(D.document.body).children().eq(jQuery(D.document.body).children().length-1).is("span")){jQuery(D.document.body).append("&nbsp;")
}}function applyStyleTextEditor(){var D=jQuery.trim(document.styleForm.styleText.value);
if(D.length>0){if(cursorPos){cursorPos.select()
}var A=D.replace(/\n/gmi,"; ");
var E=getSelectedText();
var B=E.match(/^<span [\s\S]*?>([\s\S]*)<\/span>$/i);
if(B&&B.length==2){E=B[1]
}var C=document.getElementById("textEditor");
C.focus();
insertInEditor('<span style="'+A+'">'+E+"</span>")
}else{removeStyle()
}stylePopup.close();
return false
}function applyStyleVisualEditor(){try{if(document.all){var G=frames[currentRTE]
}else{var G=document.getElementById(currentRTE).contentWindow
}if(!selectedSpans){return false
}var J=jQuery.trim(document.styleForm.styleText.value);
if(J.length>0){var K=J.replace(/;/gi,"\n").split("\n");
var I=new Selection(G);
log("exising span",selectedSpans);
jQuery(selectedSpans).attr("style","");
for(var E=0;
E<K.length;
E++){var D=K[E].split(":");
var C=D[0].camelize();
var H=jQuery.trim(D[1]);
log("setting attribute",C,H,selectedSpans);
jQuery(selectedSpans).css(C,H)
}}else{removeStyle()
}if(document.all){var A=G.document.body.createTextRange();
A.moveToElementText(selectedSpans[0]);
A.select()
}else{var B=setRange(currentRTE);
B.selectNodeContents(selectedSpans[0])
}stylePopup.close();
G.focus();
return false
}catch(F){log(F.message,F);
throw F;
return false
}}function removeStyle(){if(mode=="visual"){return removeStyleVisualEditor()
}else{return removeStyleTextEditor()
}}function removeStyleTextEditor(){if(cursorPos){cursorPos.select()
}var B=getSelectedText();
var A=B.match(/^<span [\s\S]*?>([\s\S]*)<\/span>$/i);
if(A&&A.length==2){insertInEditor(A[1])
}stylePopup.close()
}function removeStyleVisualEditor(){if(selectedSpans){jQuery(selectedSpans).each(function(){jQuery(this).replaceWith(jQuery(this).html())
})
}stylePopup.close()
}function mergeBasicStyleToAdvanced(){var E=jQuery(document.styleForm.styleText).val();
var D=jQuery(document.styleForm.styleSize).val();
var C=jQuery(document.styleForm.styleFont).val();
var B=jQuery(document.styleForm.styleColor).val();
var A=jQuery(document.styleForm.styleBackgroundColor).val();
var F=jQuery(document.styleForm.styleAlignment).val();
if(D&&D!="100%"){if(E.match(/^\s*font-size:\s*.*$/gmi)){E=E.replace(/^\s*font-size:\s*.*$/gmi,"font-size: "+D)
}else{E=E+"\nfont-size: "+D
}}else{E=E.replace(/^\s*font-size:\s*.*$/gmi,"")
}if(C){if(E.match(/^\s*font-family:\s*.*$/gmi)){E=E.replace(/^\s*font-family:\s*.*$/gmi,"font-family: "+C)
}else{E=E+"\nfont-family: "+C
}}else{E=E.replace(/^\s*font-family:\s*.*$/gmi,"")
}if(B){if(E.match(/^\s*color:\s*.*$/gmi)){E=E.replace(/^\s*color:\s*.*$/gmi,"color: "+B)
}else{E=E+"\ncolor: "+B
}}else{E=E.replace(/^\s*color:\s*.*$/gmi,"")
}if(A){if(E.match(/^\s*background-color:\s*.*$/gmi)){E=E.replace(/^\s*background-color:\s*.*$/gmi,"background-color: "+A)
}else{E=E+"\nbackground-color: "+A
}}else{E=E.replace(/^\s*background-color:\s*.*$/gmi,"")
}if(F){if(E.match(/^\s*text-align:\s*.*$/gmi)){E=E.replace(/^\s*text-align:\s*.*$/gmi,"text-align: "+F)
}else{E=E+"\ntext-align: "+F
}if(!E.match(/^\s*display:\s*block\s*$/gmi)){E=E+"\ndisplay: block"
}}else{E=E.replace(/^\s*text-align:\s*.*$/gmi,"");
E=E.replace(/^\s*display:\s*block\s*$/gmi,"")
}jQuery(document.styleForm.styleText).val(jQuery.trim(E))
}function resetSpanText(){jQuery(document.styleForm.styleSize).val("100%");
jQuery(document.styleForm.styleFont).val("");
jQuery.farbtastic("#colorpickerColor").setColor("#000000");
jQuery(document.styleForm.styleColor).val("");
jQuery.farbtastic("#colorpickerBackgroundColor").setColor("#FFFFFF");
jQuery(document.styleForm.styleBackgroundColor).val("");
jQuery(document.styleForm.styleAlignment).val("");
jQuery(document.styleForm.styleText).val("");
document.styleForm.removeStyleButton.disabled=true
}function setSpanTextTextEditor(H){resetSpanText();
var H=getSelectedText();
var F=H.match(/^<span\s+.*?style="([\s\S]*?)"[\s\S]*<\/span>$/i);
if(F&&F.length==2){var G=F[1];
var B=G.split(";");
for(var C=0;
C<B.length;
C++){var A=B[C].split(":");
var D=jQuery.trim(A[0]);
var E=jQuery.trim(A[1]);
if(D&&E){setSpanTextValue(D,E);
document.styleForm.removeStyleButton.disabled=false
}}}mergeBasicStyleToAdvanced()
}function setSpanTextVisualEditor(B){resetSpanText();
if(B){document.styleForm.removeStyleButton.disabled=false;
if(B.style.length){for(var A=0;
A<B.style.length;
A++){setSpanTextValue(B.style[A],B.style[B.style[A].camelize()])
}}else{for(var D in B.style){var C=B.style[D];
if(C&&C.length>0){setSpanTextValue(D,C)
}}}}mergeBasicStyleToAdvanced()
}function mergeAdvancedStyleToBasic(){var B=jQuery(document.styleForm.styleText).val();
var A;
if(A=B.match(/^\s*font-size:\s*(.+?)\s*$/mi)){setSpanTextValue("font-size",A[1])
}if(A=B.match(/^\s*font-family:\s*(.+?)\s*$/mi)){setSpanTextValue("font-family",A[1])
}if(A=B.match(/^\s*color:\s*(.+?)\s*$/mi)){setSpanTextValue("color",A[1])
}if(A=B.match(/^\s*background-color:\s*(.+?)\s*$/mi)){setSpanTextValue("background-color",A[1])
}if(A=B.match(/^\s*text-align:\s*(.+?)\s*$/mi)){setSpanTextValue("text-align",A[1])
}}function setSpanTextValue(E,D){var B=E.camelize().toLowerCase();
log("setting "+E+" as "+B+" with "+D);
switch(B){case"fontsize":jQuery(document.styleForm.styleSize).val(D);
break;
case"fontfamily":var A=D.replace(/,.*/gi,"").replace(/\'/gi,"");
jQuery(document.styleForm.styleFont).val(A);
break;
case"color":var C=new RGBColor(D).toHex().toUpperCase();
jQuery(document.styleForm.styleColor).val(C);
jQuery.farbtastic("#colorpickerColor").setColor(C);
break;
case"backgroundcolor":var C=new RGBColor(D).toHex().toUpperCase();
jQuery(document.styleForm.styleBackgroundColor).val(C);
jQuery.farbtastic("#colorpickerBackgroundColor").setColor(C);
break;
case"textalign":jQuery(document.styleForm.styleAlignment).val(D);
break;
case"accelerator":case"csstext":break;
default:jQuery(document.styleForm.styleText).val("\n"+jQuery(document.styleForm.styleText).val()+E+": "+D)
}}function getSelectedSpans(){var F;
if(document.all){F=frames[currentRTE]
}else{F=document.getElementById(currentRTE).contentWindow
}F.focus();
var E=new Array;
var B=setRange(currentRTE);
if(B.startContainer.nodeType==3&&B.endContainer.nodeType==3&&B.startOffset==0&&B.endOffset==B.endContainer.length){if(B.startContainer==B.endContainer&&B.startContainer.parentNode.tagName=="SPAN"){var H=selectParent("SPAN");
log("SPAN (1) ",H,B);
E[0]=H;
return E
}}else{if(B.startContainer.nodeType==1&&B.startContainer==B.endContainer&&B.startContainer.tagName=="SPAN"){var H=B.startContainer;
log("SPAN (2) ",H,B);
E[0]=H;
return E
}else{if(B.startContainer.nodeType==1&&B.startOffset==0&&B.endOffset==1&&B.startContainer.childNodes.length==1&&B.startContainer.childNodes[0].tagName=="SPAN"){var H=B.startContainer.childNodes[0];
log("SPAN (3) ",H,B);
return H
}else{if(B.startContainer.nodeType==1&&B.startContainer==B.endContainer&&B.startContainer.childNodes&&B.endContainer.childNodes&&B.startContainer.childNodes[B.startOffset]&&B.endContainer.childNodes[B.endOffset]&&B.startContainer.childNodes[B.startOffset]==B.endContainer.childNodes[B.endOffset]&&B.startContainer.childNodes[B.startOffset].nodeType==1&&B.startContainer.childNodes[B.startOffset].tagName=="SPAN"){var H=B.startContainer.childNodes[B.startOffset];
log("SPAN (4) ",H,B);
E[0]=H;
return E
}else{if(B.startContainer.nodeType==1&&B.startContainer==B.endContainer&&B.startOffset+1==B.endOffset&&B.startContainer.childNodes&&B.endContainer.childNodes&&B.startContainer.childNodes[B.startOffset].nodeType==1&&B.startContainer.childNodes[B.startOffset].tagName=="SPAN"&&B.endContainer.childNodes[B.endOffset].nodeType==3){var H=B.startContainer.childNodes[B.startOffset];
log("SPAN (5) ",H,B);
E[0]=H;
return E
}}}}}if(B.startContainer==B.endContainer&&B.startOffset==B.endOffset){var H=selectParent("SPAN");
if(H){B.setStart(H,0);
B.setEnd(H,H.childNodes.length-1);
log("SPAN (6) ",H,B);
E[0]=H;
return E
}}log("could not find span, creating a new one");
if(B.collapsed){if(document.all){log("adding new span");
var C=F.document.createElement("span");
var D=F.document.createTextNode("\u00a0");
C.appendChild(D);
C.id="798798769876";
B.insertNode(C);
var G=F.document.getElementById("798798769876");
G.id="";
B.setStart(G.childNodes[0],0);
B.setEnd(G.childNodes[0],0);
var A=F.document.body.createTextRange();
A.moveToElementText(G);
A.select();
E[0]=G;
return E
}else{var C=F.document.createElement("span");
var D=F.document.createTextNode(" ");
C.appendChild(D);
B.insertNode(C);
B.selectNodeContents(C);
E[0]=C;
return E
}}else{log("converting font to span");
rteCommand(currentRTE,"forecolor","#100010");
jQuery(F.document).find("pre font[color='#100010']").each(function(J){jQuery(this).replaceWith(jQuery(this).html())
});
var I=new Array();
jQuery(F.document).find("font[@color='#100010'], span[style]").each(function(K){if(jQuery(this).attr("color")=="#100010"||jQuery(this).css("color")=="#100010"||jQuery(this).css("color")=="rgb(16, 0, 16)"){var J=F.document.createElement("span");
jQuery(J).html(jQuery(this).html());
jQuery(this).replaceWith(J);
I[I.length]=J
}});
return I
}}var selectedTableCell;
function selectTableCell(A){selectedTableCell=A;
hideTablePropertiesPopup();
showTablePropertiesMenuHandle();
if(jQuery(selectedTableCell).is("td")){jQuery("#tablePropertiesList .headerToggleLabel").text("Make Header");
jQuery("#tablePropertiesList .alignmentMenu").not(".tableAlignmentMenu").removeClass("disabledMenu")
}else{jQuery("#tablePropertiesList .headerToggleLabel").text("Remove Header");
jQuery("#tablePropertiesList .alignmentMenu").not(".tableAlignmentMenu").addClass("disabledMenu")
}if(jQuery(selectedTableCell).attr("colspan")>1){jQuery("#tablePropertiesList .mergeSplit").removeClass("disabledMenu")
}else{jQuery("#tablePropertiesList .mergeSplit").addClass("disabledMenu")
}if(jQuery(selectedTableCell).prev("td,th").length>0){jQuery("#tablePropertiesList .mergeLeft").removeClass("disabledMenu")
}else{jQuery("#tablePropertiesList .mergeLeft").addClass("disabledMenu")
}if(jQuery(selectedTableCell).next("td,th").length>0){jQuery("#tablePropertiesList .mergeRight").removeClass("disabledMenu")
}else{jQuery("#tablePropertiesList .mergeRight").addClass("disabledMenu")
}}function unselectTableCell(){if(selectedTableCell){removeHighlight();
selectedTableCell=null
}hideTablePropertiesPopup()
}function highlightCell(){if(selectedTableCell){jQuery(selectedTableCell).addClass("highlightTableCell")
}}function highlightCellForMerge(A){if(selectedTableCell){if(A){jQuery(selectedTableCell).prev("td,th").addClass("highlightTableCellForMerge")
}else{jQuery(selectedTableCell).next("td,th").addClass("highlightTableCellForMerge")
}}}function highlightCellForRowMerge(B){if(selectedTableCell){var A=getColumnNumber(selectedTableCell);
if(B){getColumnInPosition(jQuery(selectedTableCell).parent().prev("tr").children("td,th"),A).addClass("highlightTableCellForMerge")
}else{getColumnInPosition(jQuery(selectedTableCell).parent().next("tr").children("td,th"),A).addClass("highlightTableCellForMerge")
}}}function convertCellType(B,A){var C;
if(document.all){C=frames[currentRTE]
}else{C=document.getElementById(currentRTE).contentWindow
}jQuery(B).each(function(D){var F=parseInt(jQuery(this).attr("colspan"));
var E=C.document.createElement(A);
jQuery(E).attr("colspan",F);
jQuery(E).html(jQuery(this).html());
jQuery(this).replaceWith(E);
if(this==selectedTableCell){selectTableCell(E)
}})
}function convertColCellType(){var B=getColCells(getColumnNumber(selectedTableCell),false);
var A=jQuery(selectedTableCell).is("td")?"th":"td";
convertCellType(B,A)
}function convertRowCellType(){var B=jQuery(selectedTableCell).parent("tr").find("td,th");
var A=jQuery(selectedTableCell).is("td")?"th":"td";
convertCellType(B,A)
}function mergeCell(D){if(selectedTableCell){var G;
if(document.all){G=frames[currentRTE]
}else{G=document.getElementById(currentRTE).contentWindow
}var A=selectedTableCell.innerHTML;
var H=parseInt(jQuery(selectedTableCell).attr("colspan")>1?jQuery(selectedTableCell).attr("colspan"):1);
if(D){jQuery(selectedTableCell).prev("td,th").remove()
}else{jQuery(selectedTableCell).next("td,th").remove()
}var C="td";
if(jQuery(selectedTableCell).is("th")){C="th"
}var F=G.document.createElement(C);
jQuery(F).html(jQuery(selectedTableCell).html());
jQuery(F).attr("colspan",H+1);
jQuery(selectedTableCell).replaceWith(F);
var E=jQuery(F).parent("tr").eq(0);
var B=G.document.createElement("tr");
jQuery(B).html(jQuery(E).html());
jQuery(E).after(B);
jQuery(E).remove();
unselectTableCell()
}}function splitCell(){if(selectedTableCell&&jQuery(selectedTableCell).attr("colspan")>1){var D="td";
if(jQuery(selectedTableCell).is("th")){D="th"
}var C="<"+D+">"+jQuery(selectedTableCell).html()+"</"+D+">";
var A=parseInt(jQuery(selectedTableCell).attr("colspan"))-1;
for(var B=0;
B<A;
B++){C+="<td>&nbsp;</td>"
}jQuery(selectedTableCell).replaceWith(C);
unselectTableCell()
}}function highlightTable(A){if(selectedTableCell){jQuery(selectedTableCell).parents("table.wiki_table").eq(0).find("td,th").each(function(B){jQuery(this).addClass(A)
})
}}function highlightSelectedTable(){highlightTable("highlightTableCell")
}function highlightTableForRemoval(){highlightTable("highlightTableCellForRemoval")
}function highlightSelectedRow(){highlightRow("highlightTableCell")
}function highlightRowForRemoval(){highlightRow("highlightTableCellForRemoval")
}function highlightRow(A){if(selectedTableCell){jQuery(selectedTableCell).parent("tr").eq(0).find("td,th").each(function(B){jQuery(this).addClass(A)
})
}}function getColumnNumber(D){var A=0;
var C=jQuery(D).prevAll("td,th");
for(var B=0;
B<C.length;
B++){A+=parseInt(jQuery(C[B]).attr("colspan")>1?jQuery(C[B]).attr("colspan"):1)
}return A
}function getColumnInPosition(C,A){for(var B=0;
B<C.length;
B++){if(getColumnNumber(C[B])>=A){return C[B]
}}}function highlightSelectedCol(){highlightCol("highlightTableCell")
}function highlightColForRemoval(){highlightCol("highlightTableCellForRemoval")
}function highlightCol(B){if(selectedTableCell){var A=getColCells(getColumnNumber(selectedTableCell),false);
jQuery(A).each(function(C){jQuery(this).addClass(B)
})
}}function removeHighlight(A){if(A){jQuery(selectedTableCell).parents("table.wiki_table").find("."+A).each(function(B){jQuery(this).removeClass(A)
})
}else{jQuery(selectedTableCell).parents("table.wiki_table").find(".highlightTableCell,.highlightTableCellForRemoval,.highlightTableCellForMerge").each(function(B){jQuery(this).removeClass("highlightTableCell").removeClass("highlightTableCellForRemoval").removeClass("highlightTableCellForMerge")
})
}}function addNewRow(F,E){if(selectedTableCell){var D=0;
var A=jQuery(selectedTableCell).parent("tr").eq(0).find("td,th");
for(var C=0;
C<A.length;
C++){D+=parseInt(jQuery(A[C]).attr("colspan")>1?jQuery(A[C]).attr("colspan"):1)
}if(F){var B='<tr class="tablePreview"><td colspan="'+D+'">&nbsp;</td></tr>'
}else{var B="<tr>";
for(var C=0;
C<D;
C++){B+="<td>&nbsp;</td>"
}B+="</tr>"
}if(E){jQuery(selectedTableCell).parent("tr").eq(0).before(B)
}else{jQuery(selectedTableCell).parent("tr").eq(0).after(B)
}if(!F){removePreviews();
unselectTableCell()
}}}function removeRow(){if(selectedTableCell){var A=jQuery(selectedTableCell).parent("tr").eq(0).remove();
unselectTableCell()
}}function addNewCol(D,C){if(selectedTableCell){if(D){var F='<td class="tablePreview">&nbsp;&nbsp;&nbsp;&nbsp;</td>'
}else{var F="<td>&nbsp;</td>"
}var A=getColumnNumber(selectedTableCell);
if(!C){var E=parseInt(jQuery(selectedTableCell).attr("colspan")>1?jQuery(selectedTableCell).attr("colspan"):1);
A=A+E-1
}var B=getColCells(A,true);
jQuery(B).each(function(G){if(C){jQuery(this).before(F)
}else{jQuery(this).after(F)
}});
if(!D){removePreviews();
unselectTableCell()
}}}function removeTable(){if(selectedTableCell){jQuery(selectedTableCell).parents("table.wiki_table").eq(0).remove();
unselectTableCell()
}}function removeCol(){if(selectedTableCell){var A=getColCells(getColumnNumber(selectedTableCell),false);
jQuery(A).each(function(B){jQuery(this).remove()
});
unselectTableCell()
}}function alignCell(A){if(jQuery(selectedTableCell).is("td")){jQuery(selectedTableCell).css("text-align",A)
}}function alignRow(B){var A=jQuery(selectedTableCell).parent("tr").eq(0).find("td,th");
jQuery(A).each(function(C){if(jQuery(this).is("td")){jQuery(this).css("text-align",B)
}})
}function alignCol(B){var A=getColCells(getColumnNumber(selectedTableCell),false);
jQuery(A).each(function(C){if(jQuery(this).is("td")){jQuery(this).css("text-align",B)
}})
}function alignTable(B){var A=jQuery(selectedTableCell).parents("table.wiki_table").eq(0).find("td,th");
jQuery(A).each(function(C){if(jQuery(this).is("td")){jQuery(this).css("text-align",B)
}})
}function getColCells(F,B){if(selectedTableCell){var I=jQuery(selectedTableCell).parents("table.wiki_table").eq(0).find("tr");
var D=new Array();
for(var E=0;
E<I.length;
E++){var C=0;
var H=jQuery(I[E]).children();
var G=0;
for(var A=0;
A<H.length;
A++){G+=parseInt(jQuery(H[A]).attr("colspan")>1?jQuery(H[A]).attr("colspan"):1);
if(G>F){D[D.length]=H[A];
break
}else{if(G>F&&B){D[D.length]=H[A-1];
break
}}}}return D
}}function removePreviews(){jQuery(selectedTableCell).parents("table.wiki_table").find(".tablePreview").each(function(A){jQuery(this).remove()
})
}function showTablePropertiesMenuHandle(){var D=Position.positionedOffset(selectedTableCell);
var C=Position.positionedOffset(document.getElementById(editorId));
var B=D[0]+C[0]+Element.getDimensions(selectedTableCell).width+5;
var A=D[1]+C[1]+Element.getDimensions(selectedTableCell).height+5;
if(B+jQuery("#tablePropertiesMenuHandle").width()>jQuery(oRTE.document).find("body").width()){B=jQuery(oRTE.document).find("body").width()-jQuery("#tablePropertiesMenuHandle").width()
}jQuery("#tablePropertiesMenuHandle").css("position","absolute").css("left",B).css("top",A).show();
tablePropertiesShown=true
}var tablePropertiesShown=false;
function showTablePropertiesPopup(){var D=Position.positionedOffset(selectedTableCell);
var C=Position.positionedOffset(document.getElementById(editorId));
var B=D[0]+C[0]+Element.getDimensions(selectedTableCell).width+5;
var A=D[1]+C[1]+Element.getDimensions(selectedTableCell).height+5;
if(B+jQuery("#tableProperties").width()>jQuery(oRTE.document).find("body").width()){B=jQuery(oRTE.document).find("body").width()-jQuery("#tableProperties").width()
}jQuery("#tablePropertiesMenuHandle").hide();
jQuery("#tableProperties").css("position","absolute").css("left",B).css("top",A).show();
tablePropertiesShown=true
}function hideTablePropertiesPopup(){if(tablePropertiesShown){jQuery("#tablePropertiesList ul").hide();
jQuery("#tablePropertiesMenuHandle").hide();
jQuery("#tableProperties").hide();
tablePropertiesShown=false
}}var tablePopup;
function openTablePopup(){if(document.selection){cursorPos=document.selection.createRange().duplicate()
}WindowUtilities.disableScreen("wikispaces","overlay_modal",0);
if(!tablePopup){tablePopup=new Window("tablePopup",{minWidth:300,title:"Insert Table",resizable:false,maximizable:false,minimizable:false,className:"wikispaces",onClose:function(){WindowUtilities.enableScreen("overlay_modal")
},showEffect:Element.show,hideEffect:Element.hide});
tablePopup.setContent(jQuery("#tablePopupContents").get(0),true,true)
}tablePopup.showCenter();
tablePopup.toFront();
tablePopup.setSize(0,jQuery("#tablePopupContents").outerHeight({margin:true})+10)
}function AddTable(C,E){if(mode=="visual"){var B='<table class="wiki_table" width="75%">\n';
for(var D=0;
D<C;
D++){B+="<tr>\n";
for(cols=0;
cols<E;
cols++){B+="<td>&nbsp;</td>\n"
}B+="</tr>\n"
}B+="</table>\n";
if(cursorPos){cursorPos.select()
}insertInEditor(B);
showGuidelines("")
}else{var A="";
for(var D=0;
D<C;
D++){A+="\n||";
for(cols=0;
cols<E;
cols++){A+=" ||"
}}A+="\n";
if(cursorPos){cursorPos.select()
}insertInEditor(A)
}}function tablePropertiesShow(B,A){if(B.is("ul")&&B.is(":visible")){B.slideUp("fast");
return false
}if(B.is("ul")&&!B.is(":visible")){jQuery(A).slideUp("fast");
B.slideDown("fast");
return false
}}jQuery(document).ready(function(){jQuery("#tablePropertiesList ul").hide();
jQuery("#tablePropertiesList .topmenu").click(function(A){A.stopPropagation();
return tablePropertiesShow(jQuery(this).next(),"#tablePropertiesList li ul:visible")
});
jQuery("#tablePropertiesList .submenu").click(function(A){A.stopPropagation();
return tablePropertiesShow(jQuery(this).next(),"#tablePropertiesList li ul li ul:visible")
});
jQuery("#tablePropertiesMenuHandle").click(function(A){A.stopPropagation();
jQuery("#tablePropertiesList ul").hide();
showTablePropertiesPopup();
return false
})
});
var Window=Class.create();
Window.keepMultiModalWindow=false;
Window.hasEffectLib=(typeof Effect!="undefined");
Window.resizeEffectDuration=0.4;
Window.prototype={initialize:function(){var C;
var B=0;
if(arguments.length>0){if(typeof arguments[0]=="string"){C=arguments[0];
B=1
}else{C=arguments[0]?arguments[0].id:null
}}if(!C){C="window_"+new Date().getTime()
}if($(C)){alert("Window "+C+" is already registered in the DOM! Make sure you use setDestroyOnClose() or destroyOnClose: true in the constructor")
}this.options=Object.extend({className:"dialog",blurClassName:null,minWidth:100,minHeight:20,resizable:true,closable:true,minimizable:true,maximizable:true,draggable:true,userData:null,showEffect:(Window.hasEffectLib?Effect.Appear:Element.show),hideEffect:(Window.hasEffectLib?Effect.Fade:Element.hide),showEffectOptions:{},hideEffectOptions:{},effectOptions:null,parent:document.body,title:"&nbsp;",url:null,onload:Prototype.emptyFunction,width:200,height:300,opacity:1,recenterAuto:true,wiredDrag:false,closeCallback:null,destroyOnClose:false,gridX:1,gridY:1},arguments[B]||{});
if(this.options.blurClassName){this.options.focusClassName=this.options.className
}if(typeof this.options.top=="undefined"&&typeof this.options.bottom=="undefined"){this.options.top=this._round(Math.random()*500,this.options.gridY)
}if(typeof this.options.left=="undefined"&&typeof this.options.right=="undefined"){this.options.left=this._round(Math.random()*500,this.options.gridX)
}if(this.options.effectOptions){Object.extend(this.options.hideEffectOptions,this.options.effectOptions);
Object.extend(this.options.showEffectOptions,this.options.effectOptions);
if(this.options.showEffect==Element.Appear){this.options.showEffectOptions.to=this.options.opacity
}}if(Window.hasEffectLib){if(this.options.showEffect==Effect.Appear){this.options.showEffectOptions.to=this.options.opacity
}if(this.options.hideEffect==Effect.Fade){this.options.hideEffectOptions.from=this.options.opacity
}}if(this.options.hideEffect==Element.hide){this.options.hideEffect=function(){Element.hide(this.element);
if(this.options.destroyOnClose){this.destroy()
}}.bind(this)
}if(this.options.parent!=document.body){this.options.parent=$(this.options.parent)
}this.element=this._createWindow(C);
this.element.win=this;
this.eventMouseDown=this._initDrag.bindAsEventListener(this);
this.eventMouseUp=this._endDrag.bindAsEventListener(this);
this.eventMouseMove=this._updateDrag.bindAsEventListener(this);
this.eventOnLoad=this._getWindowBorderSize.bindAsEventListener(this);
this.eventMouseDownContent=this.toFront.bindAsEventListener(this);
this.eventResize=this._recenter.bindAsEventListener(this);
this.topbar=$(this.element.id+"_top");
this.bottombar=$(this.element.id+"_bottom");
this.content=$(this.element.id+"_content");
Event.observe(this.topbar,"mousedown",this.eventMouseDown);
Event.observe(this.bottombar,"mousedown",this.eventMouseDown);
Event.observe(this.content,"mousedown",this.eventMouseDownContent);
Event.observe(window,"load",this.eventOnLoad);
Event.observe(window,"resize",this.eventResize);
Event.observe(window,"scroll",this.eventResize);
Event.observe(this.options.parent,"scroll",this.eventResize);
if(this.options.draggable){var A=this;
[this.topbar,this.topbar.up().previous(),this.topbar.up().next()].each(function(D){D.observe("mousedown",A.eventMouseDown);
D.addClassName("top_draggable")
});
[this.bottombar.up(),this.bottombar.up().previous(),this.bottombar.up().next()].each(function(D){D.observe("mousedown",A.eventMouseDown);
D.addClassName("bottom_draggable")
})
}if(this.options.resizable){this.sizer=$(this.element.id+"_sizer");
Event.observe(this.sizer,"mousedown",this.eventMouseDown)
}this.useLeft=null;
this.useTop=null;
if(typeof this.options.left!="undefined"){this.element.setStyle({left:parseFloat(this.options.left)+"px"});
this.useLeft=true
}else{this.element.setStyle({right:parseFloat(this.options.right)+"px"});
this.useLeft=false
}if(typeof this.options.top!="undefined"){this.element.setStyle({top:parseFloat(this.options.top)+"px"});
this.useTop=true
}else{this.element.setStyle({bottom:parseFloat(this.options.bottom)+"px"});
this.useTop=false
}this.storedLocation=null;
this.setOpacity(this.options.opacity);
if(this.options.zIndex){this.setZIndex(this.options.zIndex)
}if(this.options.destroyOnClose){this.setDestroyOnClose(true)
}this._getWindowBorderSize();
this.width=this.options.width;
this.height=this.options.height;
this.visible=false;
this.constraint=false;
this.constraintPad={top:0,left:0,bottom:0,right:0};
if(this.width&&this.height){this.setSize(this.options.width,this.options.height)
}this.setTitle(this.options.title);
Windows.register(this)
},destroy:function(){this._notify("onDestroy");
Event.stopObserving(this.topbar,"mousedown",this.eventMouseDown);
Event.stopObserving(this.bottombar,"mousedown",this.eventMouseDown);
Event.stopObserving(this.content,"mousedown",this.eventMouseDownContent);
Event.stopObserving(window,"load",this.eventOnLoad);
Event.stopObserving(window,"resize",this.eventResize);
Event.stopObserving(window,"scroll",this.eventResize);
Event.stopObserving(this.content,"load",this.options.onload);
if(this._oldParent){var C=this.getContent();
var A=null;
for(var B=0;
B<C.childNodes.length;
B++){A=C.childNodes[B];
if(A.nodeType==1){break
}A=null
}if(A){this._oldParent.appendChild(A)
}this._oldParent=null
}if(this.sizer){Event.stopObserving(this.sizer,"mousedown",this.eventMouseDown)
}if(this.options.url){this.content.src=null
}if(this.iefix){Element.remove(this.iefix)
}Element.remove(this.element);
Windows.unregister(this)
},setCloseCallback:function(A){this.options.closeCallback=A
},getContent:function(){return this.content
},setContent:function(G,F,B){var A=$(G);
if(null==A){throw"Unable to find element '"+G+"' in DOM"
}this._oldParent=A.parentNode;
var E=null;
var D=null;
if(F){E=Element.getDimensions(A)
}if(B){D=Position.cumulativeOffset(A)
}var C=this.getContent();
this.setHTMLContent("");
C=this.getContent();
C.appendChild(A);
A.show();
if(F){this.setSize(E.width,E.height)
}if(B){this.setLocation(D[1]-this.heightN,D[0]-this.widthW)
}},setHTMLContent:function(A){if(this.options.url){this.content.src=null;
this.options.url=null;
var B='<div id="'+this.getId()+'_content" class="'+this.options.className+'_content"> </div>';
$(this.getId()+"_table_content").innerHTML=B;
this.content=$(this.element.id+"_content")
}this.getContent().innerHTML=A
},setAjaxContent:function(B,A,D,C){this.showFunction=D?"showCenter":"show";
this.showModal=C||false;
A=A||{};
this.setHTMLContent("");
this.onComplete=A.onComplete;
if(!this._onCompleteHandler){this._onCompleteHandler=this._setAjaxContent.bind(this)
}A.onComplete=this._onCompleteHandler;
new Ajax.Request(B,A);
A.onComplete=this.onComplete
},_setAjaxContent:function(A){Element.update(this.getContent(),A.responseText);
if(this.onComplete){this.onComplete(A)
}this.onComplete=null;
this[this.showFunction](this.showModal)
},setURL:function(A){if(this.options.url){this.content.src=null
}this.options.url=A;
var B="<iframe frameborder='0' name='"+this.getId()+"_content'  id='"+this.getId()+"_content' src='"+A+"' width='"+this.width+"' height='"+this.height+"'> </iframe>";
$(this.getId()+"_table_content").innerHTML=B;
this.content=$(this.element.id+"_content")
},getURL:function(){return this.options.url?this.options.url:null
},refresh:function(){if(this.options.url){$(this.element.getAttribute("id")+"_content").src=this.options.url
}},setCookie:function(B,C,M,E,A){B=B||this.element.id;
this.cookie=[B,C,M,E,A];
var K=WindowUtilities.getCookie(B);
if(K){var L=K.split(",");
var I=L[0].split(":");
var H=L[1].split(":");
var J=parseFloat(L[2]),F=parseFloat(L[3]);
var G=L[4];
var D=L[5];
this.setSize(J,F);
if(G=="true"){this.doMinimize=true
}else{if(D=="true"){this.doMaximize=true
}}this.useLeft=I[0]=="l";
this.useTop=H[0]=="t";
this.element.setStyle(this.useLeft?{left:I[1]}:{right:I[1]});
this.element.setStyle(this.useTop?{top:H[1]}:{bottom:H[1]})
}},getId:function(){return this.element.id
},setDestroyOnClose:function(){this.options.destroyOnClose=true
},setConstraint:function(A,B){this.constraint=A;
this.constraintPad=Object.extend(this.constraintPad,B||{});
if(this.useTop&&this.useLeft){this.setLocation(parseFloat(this.element.style.top),parseFloat(this.element.style.left))
}},_initDrag:function(B){if(Event.element(B)==this.sizer&&this.isMinimized()){return 
}if(Event.element(B)!=this.sizer&&this.isMaximized()){return 
}if(Prototype.Browser.IE&&this.heightN==0){this._getWindowBorderSize()
}this.pointer=[this._round(Event.pointerX(B),this.options.gridX),this._round(Event.pointerY(B),this.options.gridY)];
if(this.options.wiredDrag){this.currentDrag=this._createWiredElement()
}else{this.currentDrag=this.element
}if(Event.element(B)==this.sizer){this.doResize=true;
this.widthOrg=this.width;
this.heightOrg=this.height;
this.bottomOrg=parseFloat(this.element.getStyle("bottom"));
this.rightOrg=parseFloat(this.element.getStyle("right"));
this._notify("onStartResize")
}else{this.doResize=false;
var A=$(this.getId()+"_close");
if(A&&Position.within(A,this.pointer[0],this.pointer[1])){this.currentDrag=null;
return 
}this.toFront();
if(!this.options.draggable){return 
}this._notify("onStartMove")
}Event.observe(document,"mouseup",this.eventMouseUp,false);
Event.observe(document,"mousemove",this.eventMouseMove,false);
WindowUtilities.disableScreen("__invisible__","__invisible__",this.overlayOpacity);
document.body.ondrag=function(){return false
};
document.body.onselectstart=function(){return false
};
this.currentDrag.show();
Event.stop(B)
},_round:function(B,A){return A==1?B:B=Math.floor(B/A)*A
},_updateDrag:function(B){var A=[this._round(Event.pointerX(B),this.options.gridX),this._round(Event.pointerY(B),this.options.gridY)];
var J=A[0]-this.pointer[0];
var I=A[1]-this.pointer[1];
if(this.doResize){var H=this.widthOrg+J;
var D=this.heightOrg+I;
J=this.width-this.widthOrg;
I=this.height-this.heightOrg;
if(this.useLeft){H=this._updateWidthConstraint(H)
}else{this.currentDrag.setStyle({right:(this.rightOrg-J)+"px"})
}if(this.useTop){D=this._updateHeightConstraint(D)
}else{this.currentDrag.setStyle({bottom:(this.bottomOrg-I)+"px"})
}this.setSize(H,D);
this._notify("onResize")
}else{this.pointer=A;
if(this.useLeft){var C=parseFloat(this.currentDrag.getStyle("left"))+J;
var G=this._updateLeftConstraint(C);
this.pointer[0]+=G-C;
this.currentDrag.setStyle({left:G+"px"})
}else{this.currentDrag.setStyle({right:parseFloat(this.currentDrag.getStyle("right"))-J+"px"})
}if(this.useTop){var F=parseFloat(this.currentDrag.getStyle("top"))+I;
var E=this._updateTopConstraint(F);
this.pointer[1]+=E-F;
this.currentDrag.setStyle({top:E+"px"})
}else{this.currentDrag.setStyle({bottom:parseFloat(this.currentDrag.getStyle("bottom"))-I+"px"})
}this._notify("onMove")
}if(this.iefix){this._fixIEOverlapping();
this.iefix=null
}this._removeStoreLocation();
Event.stop(B)
},_endDrag:function(A){WindowUtilities.enableScreen("__invisible__");
if(this.doResize){this._notify("onEndResize")
}else{this._notify("onEndMove")
}Event.stopObserving(document,"mouseup",this.eventMouseUp,false);
Event.stopObserving(document,"mousemove",this.eventMouseMove,false);
Event.stop(A);
this._hideWiredElement();
this._saveCookie();
document.body.ondrag=null;
document.body.onselectstart=null
},_updateLeftConstraint:function(B){if(this.constraint&&this.useLeft&&this.useTop){var A=this.options.parent==document.body?WindowUtilities.getPageSize().windowWidth:this.options.parent.getDimensions().width;
if(B<this.constraintPad.left){B=this.constraintPad.left
}if(B+this.width+this.widthE+this.widthW>A-this.constraintPad.right){B=A-this.constraintPad.right-this.width-this.widthE-this.widthW
}}return B
},_updateTopConstraint:function(C){if(this.constraint&&this.useLeft&&this.useTop){var A=this.options.parent==document.body?WindowUtilities.getPageSize().windowHeight:this.options.parent.getDimensions().height;
var B=this.height+this.heightN+this.heightS;
if(C<this.constraintPad.top){C=this.constraintPad.top
}if(C+B>A-this.constraintPad.bottom){C=A-this.constraintPad.bottom-B
}}return C
},_updateWidthConstraint:function(A){if(this.constraint&&this.useLeft&&this.useTop){var B=this.options.parent==document.body?WindowUtilities.getPageSize().windowWidth:this.options.parent.getDimensions().width;
var C=parseFloat(this.element.getStyle("left"));
if(C+A+this.widthE+this.widthW>B-this.constraintPad.right){A=B-this.constraintPad.right-C-this.widthE-this.widthW
}}return A
},_updateHeightConstraint:function(B){if(this.constraint&&this.useLeft&&this.useTop){var A=this.options.parent==document.body?WindowUtilities.getPageSize().windowHeight:this.options.parent.getDimensions().height;
var C=parseFloat(this.element.getStyle("top"));
if(C+B+this.heightN+this.heightS>A-this.constraintPad.bottom){B=A-this.constraintPad.bottom-C-this.heightN-this.heightS
}}return B
},_createWindow:function(A){var F=this.options.className;
var D=document.createElement("div");
D.setAttribute("id",A);
D.className="dialog";
var E;
if(this.options.url){E='<iframe frameborder="0" name="'+A+'_content"  id="'+A+'_content" src="'+this.options.url+'"> </iframe>'
}else{E='<div id="'+A+'_content" class="'+F+'_content"> </div>'
}var G=this.options.closable?"<div class='"+F+"_close' id='"+A+"_close' onclick='Windows.close(\""+A+"\", event)'> </div>":"";
var H=this.options.minimizable?"<div class='"+F+"_minimize' id='"+A+"_minimize' onclick='Windows.minimize(\""+A+"\", event)'> </div>":"";
var I=this.options.maximizable?"<div class='"+F+"_maximize' id='"+A+"_maximize' onclick='Windows.maximize(\""+A+"\", event)'> </div>":"";
var C=this.options.resizable?"class='"+F+"_sizer' id='"+A+"_sizer'":"class='"+F+"_se'";
var B="../themes/default/blank.gif";
D.innerHTML=G+H+I+"      <table id='"+A+"_row1' class=\"top table_window\">        <tr>          <td class='"+F+"_nw'></td>          <td class='"+F+"_n'><div id='"+A+"_top' class='"+F+"_title title_window'>"+this.options.title+"</div></td>          <td class='"+F+"_ne'></td>        </tr>      </table>      <table id='"+A+"_row2' class=\"mid table_window\">        <tr>          <td class='"+F+"_w'></td>            <td id='"+A+"_table_content' class='"+F+"_content' valign='top'>"+E+"</td>          <td class='"+F+"_e'></td>        </tr>      </table>        <table id='"+A+"_row3' class=\"bot table_window\">        <tr>          <td class='"+F+"_sw'></td>            <td class='"+F+"_s'><div id='"+A+"_bottom' class='status_bar'><span style='float:left; width:1px; height:1px'></span></div></td>            <td "+C+"></td>        </tr>      </table>    ";
Element.hide(D);
this.options.parent.insertBefore(D,this.options.parent.firstChild);
Event.observe($(A+"_content"),"load",this.options.onload);
return D
},changeClassName:function(A){var B=this.options.className;
var C=this.getId();
$A(["_close","_minimize","_maximize","_sizer","_content"]).each(function(D){this._toggleClassName($(C+D),B+D,A+D)
}.bind(this));
this._toggleClassName($(C+"_top"),B+"_title",A+"_title");
$$("#"+C+" td").each(function(D){D.className=D.className.sub(B,A)
});
this.options.className=A
},_toggleClassName:function(C,B,A){if(C){C.removeClassName(B);
C.addClassName(A)
}},setLocation:function(C,B){C=this._updateTopConstraint(C);
B=this._updateLeftConstraint(B);
var A=this.currentDrag||this.element;
if(!A){return 
}A.setStyle({top:C+"px"});
A.setStyle({left:B+"px"});
this.useLeft=true;
this.useTop=true
},getLocation:function(){var A={};
if(this.useTop){A=Object.extend(A,{top:this.element.getStyle("top")})
}else{A=Object.extend(A,{bottom:this.element.getStyle("bottom")})
}if(this.useLeft){A=Object.extend(A,{left:this.element.getStyle("left")})
}else{A=Object.extend(A,{right:this.element.getStyle("right")})
}return A
},getSize:function(){return{width:this.width,height:this.height}
},setSize:function(C,B,A){C=parseFloat(C);
B=parseFloat(B);
if(!this.minimized&&C<this.options.minWidth){C=this.options.minWidth
}if(!this.minimized&&B<this.options.minHeight){B=this.options.minHeight
}if(this.options.maxHeight&&B>this.options.maxHeight){B=this.options.maxHeight
}if(this.options.maxWidth&&C>this.options.maxWidth){C=this.options.maxWidth
}if(this.useTop&&this.useLeft&&Window.hasEffectLib&&Effect.ResizeWindow&&A){new Effect.ResizeWindow(this,null,null,C,B,{duration:Window.resizeEffectDuration})
}else{this.width=C;
this.height=B;
var E=this.currentDrag?this.currentDrag:this.element;
E.setStyle({width:C+this.widthW+this.widthE+"px"});
E.setStyle({height:B+this.heightN+this.heightS+"px"});
if(!this.currentDrag||this.currentDrag==this.element){var D=$(this.element.id+"_content");
D.setStyle({height:B+"px"});
D.setStyle({width:C+"px"})
}}},updateHeight:function(){this.setSize(this.width,this.content.scrollHeight,true)
},updateWidth:function(){this.setSize(this.content.scrollWidth,this.height,true)
},toFront:function(){if(this.element.style.zIndex<Windows.maxZIndex){this.setZIndex(Windows.maxZIndex+1)
}if(this.iefix){this._fixIEOverlapping()
}},getBounds:function(B){if(!this.width||!this.height||!this.visible){this.computeBounds()
}var A=this.width;
var C=this.height;
if(!B){A+=this.widthW+this.widthE;
C+=this.heightN+this.heightS
}var D=Object.extend(this.getLocation(),{width:A+"px",height:C+"px"});
return D
},computeBounds:function(){if(!this.width||!this.height){var A=WindowUtilities._computeSize(this.content.innerHTML,this.content.id,this.width,this.height,0,this.options.className);
if(this.height){this.width=A+5
}else{this.height=A+5
}}this.setSize(this.width,this.height);
if(this.centered){this._center(this.centerTop,this.centerLeft)
}},show:function(B){this.visible=true;
if(B){if(typeof this.overlayOpacity=="undefined"){var A=this;
setTimeout(function(){A.show(B)
},10);
return 
}Windows.addModalWindow(this);
this.modal=true;
this.setZIndex(Windows.maxZIndex+1);
Windows.unsetOverflow(this)
}else{if(!this.element.style.zIndex){this.setZIndex(Windows.maxZIndex+1)
}}if(this.oldStyle){this.getContent().setStyle({overflow:this.oldStyle})
}this.computeBounds();
this._notify("onBeforeShow");
if(this.options.showEffect!=Element.show&&this.options.showEffectOptions){this.options.showEffect(this.element,this.options.showEffectOptions)
}else{this.options.showEffect(this.element)
}this._checkIEOverlapping();
WindowUtilities.focusedWindow=this;
this._notify("onShow")
},showCenter:function(A,C,B){this.centered=true;
this.centerTop=C;
this.centerLeft=B;
this.show(A)
},isVisible:function(){return this.visible
},_center:function(C,B){var D=WindowUtilities.getWindowScroll(this.options.parent);
var A=WindowUtilities.getPageSize(this.options.parent);
if(typeof C=="undefined"){C=(A.windowHeight-(this.height+this.heightN+this.heightS))/2
}C+=D.top;
if(typeof B=="undefined"){B=(A.windowWidth-(this.width+this.widthW+this.widthE))/2
}B+=D.left;
this.setLocation(C,B)
},_recenter:function(B){if(this.centered){var A=WindowUtilities.getPageSize(this.options.parent);
var C=WindowUtilities.getWindowScroll(this.options.parent);
if(this.pageSize&&this.pageSize.windowWidth==A.windowWidth&&this.pageSize.windowHeight==A.windowHeight&&this.windowScroll.left==C.left&&this.windowScroll.top==C.top){return 
}this.pageSize=A;
this.windowScroll=C;
if($("overlay_modal")){$("overlay_modal").setStyle({height:(A.pageHeight+"px")})
}if(this.options.recenterAuto){this._center(this.centerTop,this.centerLeft)
}}},hide:function(){this.visible=false;
if(this.modal){Windows.removeModalWindow(this);
Windows.resetOverflow()
}this.oldStyle=this.getContent().getStyle("overflow")||"auto";
this.getContent().setStyle({overflow:"hidden"});
this.options.hideEffect(this.element,this.options.hideEffectOptions);
if(this.iefix){this.iefix.hide()
}if(!this.doNotNotifyHide){this._notify("onHide")
}},close:function(){if(this.visible){if(this.options.closeCallback&&!this.options.closeCallback(this)){return 
}if(this.options.destroyOnClose){var A=this.destroy.bind(this);
if(this.options.hideEffectOptions.afterFinish){var B=this.options.hideEffectOptions.afterFinish;
this.options.hideEffectOptions.afterFinish=function(){B();
A()
}
}else{this.options.hideEffectOptions.afterFinish=function(){A()
}
}}Windows.updateFocusedWindow();
this.doNotNotifyHide=true;
this.hide();
this.doNotNotifyHide=false;
this._notify("onClose")
}},minimize:function(){if(this.resizing){return 
}var A=$(this.getId()+"_row2");
if(!this.minimized){this.minimized=true;
var D=A.getDimensions().height;
this.r2Height=D;
var C=this.element.getHeight()-D;
if(this.useLeft&&this.useTop&&Window.hasEffectLib&&Effect.ResizeWindow){new Effect.ResizeWindow(this,null,null,null,this.height-D,{duration:Window.resizeEffectDuration})
}else{this.height-=D;
this.element.setStyle({height:C+"px"});
A.hide()
}if(!this.useTop){var B=parseFloat(this.element.getStyle("bottom"));
this.element.setStyle({bottom:(B+D)+"px"})
}}else{this.minimized=false;
var D=this.r2Height;
this.r2Height=null;
if(this.useLeft&&this.useTop&&Window.hasEffectLib&&Effect.ResizeWindow){new Effect.ResizeWindow(this,null,null,null,this.height+D,{duration:Window.resizeEffectDuration})
}else{var C=this.element.getHeight()+D;
this.height+=D;
this.element.setStyle({height:C+"px"});
A.show()
}if(!this.useTop){var B=parseFloat(this.element.getStyle("bottom"));
this.element.setStyle({bottom:(B-D)+"px"})
}this.toFront()
}this._notify("onMinimize");
this._saveCookie()
},maximize:function(){if(this.isMinimized()||this.resizing){return 
}if(Prototype.Browser.IE&&this.heightN==0){this._getWindowBorderSize()
}if(this.storedLocation!=null){this._restoreLocation();
if(this.iefix){this.iefix.hide()
}}else{this._storeLocation();
Windows.unsetOverflow(this);
var G=WindowUtilities.getWindowScroll(this.options.parent);
var B=WindowUtilities.getPageSize(this.options.parent);
var F=G.left;
var E=G.top;
if(this.options.parent!=document.body){G={top:0,left:0,bottom:0,right:0};
var D=this.options.parent.getDimensions();
B.windowWidth=D.width;
B.windowHeight=D.height;
E=0;
F=0
}if(this.constraint){B.windowWidth-=Math.max(0,this.constraintPad.left)+Math.max(0,this.constraintPad.right);
B.windowHeight-=Math.max(0,this.constraintPad.top)+Math.max(0,this.constraintPad.bottom);
F+=Math.max(0,this.constraintPad.left);
E+=Math.max(0,this.constraintPad.top)
}var C=B.windowWidth-this.widthW-this.widthE;
var A=B.windowHeight-this.heightN-this.heightS;
if(this.useLeft&&this.useTop&&Window.hasEffectLib&&Effect.ResizeWindow){new Effect.ResizeWindow(this,E,F,C,A,{duration:Window.resizeEffectDuration})
}else{this.setSize(C,A);
this.element.setStyle(this.useLeft?{left:F}:{right:F});
this.element.setStyle(this.useTop?{top:E}:{bottom:E})
}this.toFront();
if(this.iefix){this._fixIEOverlapping()
}}this._notify("onMaximize");
this._saveCookie()
},isMinimized:function(){return this.minimized
},isMaximized:function(){return(this.storedLocation!=null)
},setOpacity:function(A){if(Element.setOpacity){Element.setOpacity(this.element,A)
}},setZIndex:function(A){this.element.setStyle({zIndex:A});
Windows.updateZindex(A,this)
},setTitle:function(A){if(!A||A==""){A="&nbsp;"
}Element.update(this.element.id+"_top",A)
},getTitle:function(){return $(this.element.id+"_top").innerHTML
},setStatusBar:function(B){var A=$(this.getId()+"_bottom");
if(typeof (B)=="object"){if(this.bottombar.firstChild){this.bottombar.replaceChild(B,this.bottombar.firstChild)
}else{this.bottombar.appendChild(B)
}}else{this.bottombar.innerHTML=B
}},_checkIEOverlapping:function(){if(!this.iefix&&(navigator.appVersion.indexOf("MSIE")>0)&&(navigator.userAgent.indexOf("Opera")<0)&&(this.element.getStyle("position")=="absolute")){new Insertion.After(this.element.id,'<iframe id="'+this.element.id+'_iefix" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);" src="javascript:false;" frameborder="0" scrolling="no"></iframe>');
this.iefix=$(this.element.id+"_iefix")
}if(this.iefix){setTimeout(this._fixIEOverlapping.bind(this),50)
}},_fixIEOverlapping:function(){if(this.element&&this.iefix){Position.clone(this.element,this.iefix);
this.iefix.style.zIndex=this.element.style.zIndex-1;
this.iefix.show()
}},_getWindowBorderSize:function(B){var C=this._createHiddenDiv(this.options.className+"_n");
this.heightN=Element.getDimensions(C).height;
C.parentNode.removeChild(C);
var C=this._createHiddenDiv(this.options.className+"_s");
this.heightS=Element.getDimensions(C).height;
C.parentNode.removeChild(C);
var C=this._createHiddenDiv(this.options.className+"_e");
this.widthE=Element.getDimensions(C).width;
C.parentNode.removeChild(C);
var C=this._createHiddenDiv(this.options.className+"_w");
this.widthW=Element.getDimensions(C).width;
C.parentNode.removeChild(C);
var C=document.createElement("div");
C.className="overlay_"+this.options.className;
document.body.appendChild(C);
var A=this;
setTimeout(function(){A.overlayOpacity=($(C).getStyle("opacity"));
C.parentNode.removeChild(C)
},10);
if(Prototype.Browser.IE){this.heightS=$(this.getId()+"_row3").getDimensions().height;
this.heightN=$(this.getId()+"_row1").getDimensions().height
}if(Prototype.Browser.WebKit&&Prototype.Browser.WebKitVersion<420){this.setSize(this.width,this.height)
}if(this.doMaximize){this.maximize()
}if(this.doMinimize){this.minimize()
}},_createHiddenDiv:function(B){var A=document.body;
var C=document.createElement("div");
C.setAttribute("id",this.element.id+"_tmp");
C.className=B;
C.style.display="none";
C.innerHTML="";
A.insertBefore(C,A.firstChild);
return C
},_storeLocation:function(){if(this.storedLocation==null){this.storedLocation={useTop:this.useTop,useLeft:this.useLeft,top:this.element.getStyle("top"),bottom:this.element.getStyle("bottom"),left:this.element.getStyle("left"),right:this.element.getStyle("right"),width:this.width,height:this.height}
}},_restoreLocation:function(){if(this.storedLocation!=null){this.useLeft=this.storedLocation.useLeft;
this.useTop=this.storedLocation.useTop;
if(this.useLeft&&this.useTop&&Window.hasEffectLib&&Effect.ResizeWindow){new Effect.ResizeWindow(this,this.storedLocation.top,this.storedLocation.left,this.storedLocation.width,this.storedLocation.height,{duration:Window.resizeEffectDuration})
}else{this.element.setStyle(this.useLeft?{left:this.storedLocation.left}:{right:this.storedLocation.right});
this.element.setStyle(this.useTop?{top:this.storedLocation.top}:{bottom:this.storedLocation.bottom});
this.setSize(this.storedLocation.width,this.storedLocation.height)
}Windows.resetOverflow();
this._removeStoreLocation()
}},_removeStoreLocation:function(){this.storedLocation=null
},_saveCookie:function(){if(this.cookie){var A="";
if(this.useLeft){A+="l:"+(this.storedLocation?this.storedLocation.left:this.element.getStyle("left"))
}else{A+="r:"+(this.storedLocation?this.storedLocation.right:this.element.getStyle("right"))
}if(this.useTop){A+=",t:"+(this.storedLocation?this.storedLocation.top:this.element.getStyle("top"))
}else{A+=",b:"+(this.storedLocation?this.storedLocation.bottom:this.element.getStyle("bottom"))
}A+=","+(this.storedLocation?this.storedLocation.width:this.width);
A+=","+(this.storedLocation?this.storedLocation.height:this.height);
A+=","+this.isMinimized();
A+=","+this.isMaximized();
WindowUtilities.setCookie(A,this.cookie)
}},_createWiredElement:function(){if(!this.wiredElement){if(Prototype.Browser.IE){this._getWindowBorderSize()
}var B=document.createElement("div");
B.className="wired_frame "+this.options.className+"_wired_frame";
B.style.position="absolute";
this.options.parent.insertBefore(B,this.options.parent.firstChild);
this.wiredElement=$(B)
}if(this.useLeft){this.wiredElement.setStyle({left:this.element.getStyle("left")})
}else{this.wiredElement.setStyle({right:this.element.getStyle("right")})
}if(this.useTop){this.wiredElement.setStyle({top:this.element.getStyle("top")})
}else{this.wiredElement.setStyle({bottom:this.element.getStyle("bottom")})
}var A=this.element.getDimensions();
this.wiredElement.setStyle({width:A.width+"px",height:A.height+"px"});
this.wiredElement.setStyle({zIndex:Windows.maxZIndex+30});
return this.wiredElement
},_hideWiredElement:function(){if(!this.wiredElement||!this.currentDrag){return 
}if(this.currentDrag==this.element){this.currentDrag=null
}else{if(this.useLeft){this.element.setStyle({left:this.currentDrag.getStyle("left")})
}else{this.element.setStyle({right:this.currentDrag.getStyle("right")})
}if(this.useTop){this.element.setStyle({top:this.currentDrag.getStyle("top")})
}else{this.element.setStyle({bottom:this.currentDrag.getStyle("bottom")})
}this.currentDrag.hide();
this.currentDrag=null;
if(this.doResize){this.setSize(this.width,this.height)
}}},_notify:function(A){if(this.options[A]){this.options[A](this)
}else{Windows.notify(A,this)
}}};
var Windows={windows:[],modalWindows:[],observers:[],focusedWindow:null,maxZIndex:200000,overlayShowEffectOptions:{duration:0.5},overlayHideEffectOptions:{duration:0.5},addObserver:function(A){this.removeObserver(A);
this.observers.push(A)
},removeObserver:function(A){this.observers=this.observers.reject(function(B){return B==A
})
},notify:function(A,B){this.observers.each(function(C){if(C[A]){C[A](A,B)
}})
},getWindow:function(A){return this.windows.detect(function(B){return B.getId()==A
})
},getFocusedWindow:function(){return this.focusedWindow
},updateFocusedWindow:function(){this.focusedWindow=this.windows.length>=2?this.windows[this.windows.length-2]:null
},register:function(A){this.windows.push(A)
},addModalWindow:function(A){if(this.modalWindows.length==0){WindowUtilities.disableScreen(A.options.className,"overlay_modal",A.overlayOpacity,A.getId(),A.options.parent)
}else{if(Window.keepMultiModalWindow){$("overlay_modal").style.zIndex=Windows.maxZIndex+1;
Windows.maxZIndex+=1;
WindowUtilities._hideSelect(this.modalWindows.last().getId())
}else{this.modalWindows.last().element.hide()
}WindowUtilities._showSelect(A.getId())
}this.modalWindows.push(A)
},removeModalWindow:function(A){this.modalWindows.pop();
if(this.modalWindows.length==0){WindowUtilities.enableScreen()
}else{if(Window.keepMultiModalWindow){this.modalWindows.last().toFront();
WindowUtilities._showSelect(this.modalWindows.last().getId())
}else{this.modalWindows.last().element.show()
}}},register:function(A){this.windows.push(A)
},unregister:function(A){this.windows=this.windows.reject(function(B){return B==A
})
},closeAll:function(){this.windows.each(function(A){Windows.close(A.getId())
})
},closeAllModalWindows:function(){WindowUtilities.enableScreen();
this.modalWindows.each(function(A){if(A){A.close()
}})
},minimize:function(C,A){var B=this.getWindow(C);
if(B&&B.visible){B.minimize()
}Event.stop(A)
},maximize:function(C,A){var B=this.getWindow(C);
if(B&&B.visible){B.maximize()
}Event.stop(A)
},close:function(C,A){var B=this.getWindow(C);
if(B){B.close()
}if(A){Event.stop(A)
}},blur:function(B){var A=this.getWindow(B);
if(!A){return 
}if(A.options.blurClassName){A.changeClassName(A.options.blurClassName)
}if(this.focusedWindow==A){this.focusedWindow=null
}A._notify("onBlur")
},focus:function(B){var A=this.getWindow(B);
if(!A){return 
}if(this.focusedWindow){this.blur(this.focusedWindow.getId())
}if(A.options.focusClassName){A.changeClassName(A.options.focusClassName)
}this.focusedWindow=A;
A._notify("onFocus")
},unsetOverflow:function(A){this.windows.each(function(B){B.oldOverflow=B.getContent().getStyle("overflow")||"auto";
B.getContent().setStyle({overflow:"hidden"})
});
if(A&&A.oldOverflow){A.getContent().setStyle({overflow:A.oldOverflow})
}},resetOverflow:function(){this.windows.each(function(A){if(A.oldOverflow){A.getContent().setStyle({overflow:A.oldOverflow})
}})
},updateZindex:function(A,B){if(A>this.maxZIndex){this.maxZIndex=A;
if(this.focusedWindow){this.blur(this.focusedWindow.getId())
}}this.focusedWindow=B;
if(this.focusedWindow){this.focus(this.focusedWindow.getId())
}}};
var Dialog={dialogId:null,onCompleteFunc:null,callFunc:null,parameters:null,confirm:function(D,C){if(D&&typeof D!="string"){Dialog._runAjaxRequest(D,C,Dialog.confirm);
return 
}D=D||"";
C=C||{};
var F=C.okLabel?C.okLabel:"Ok";
var A=C.cancelLabel?C.cancelLabel:"Cancel";
C=Object.extend(C,C.windowParameters||{});
C.windowParameters=C.windowParameters||{};
C.className=C.className||"alert";
var B="class ='"+(C.buttonClass?C.buttonClass+" ":"")+" ok_button'";
var E="class ='"+(C.buttonClass?C.buttonClass+" ":"")+" cancel_button'";
var D="      <div class='"+C.className+"_message'>"+D+"</div>        <div class='"+C.className+"_buttons'>          <input type='button' value='"+F+"' onclick='Dialog.okCallback()' "+B+"/>          <input type='button' value='"+A+"' onclick='Dialog.cancelCallback()' "+E+"/>        </div>    ";
return this._openDialog(D,C)
},alert:function(C,B){if(C&&typeof C!="string"){Dialog._runAjaxRequest(C,B,Dialog.alert);
return 
}C=C||"";
B=B||{};
var D=B.okLabel?B.okLabel:"Ok";
B=Object.extend(B,B.windowParameters||{});
B.windowParameters=B.windowParameters||{};
B.className=B.className||"alert";
var A="class ='"+(B.buttonClass?B.buttonClass+" ":"")+" ok_button'";
var C="      <div class='"+B.className+"_message'>"+C+"</div>        <div class='"+B.className+"_buttons'>          <input type='button' value='"+D+"' onclick='Dialog.okCallback()' "+A+"/>        </div>";
return this._openDialog(C,B)
},info:function(B,A){if(B&&typeof B!="string"){Dialog._runAjaxRequest(B,A,Dialog.info);
return 
}B=B||"";
A=A||{};
A=Object.extend(A,A.windowParameters||{});
A.windowParameters=A.windowParameters||{};
A.className=A.className||"alert";
var B="<div id='modal_dialog_message' class='"+A.className+"_message'>"+B+"</div>";
if(A.showProgress){B+="<div id='modal_dialog_progress' class='"+A.className+"_progress'>  </div>"
}A.ok=null;
A.cancel=null;
return this._openDialog(B,A)
},setInfoMessage:function(A){$("modal_dialog_message").update(A)
},closeInfo:function(){Windows.close(this.dialogId)
},_openDialog:function(E,D){var C=D.className;
if(!D.height&&!D.width){D.width=WindowUtilities.getPageSize(D.options.parent||document.body).pageWidth/2
}if(D.id){this.dialogId=D.id
}else{var B=new Date();
this.dialogId="modal_dialog_"+B.getTime();
D.id=this.dialogId
}if(!D.height||!D.width){var A=WindowUtilities._computeSize(E,this.dialogId,D.width,D.height,5,C);
if(D.height){D.width=A+5
}else{D.height=A+5
}}D.effectOptions=D.effectOptions;
D.resizable=D.resizable||false;
D.minimizable=D.minimizable||false;
D.maximizable=D.maximizable||false;
D.draggable=D.draggable||false;
D.closable=D.closable||false;
var F=new Window(D);
F.getContent().innerHTML=E;
F.showCenter(true,D.top,D.left);
F.setDestroyOnClose();
F.cancelCallback=D.onCancel||D.cancel;
F.okCallback=D.onOk||D.ok;
return F
},_getAjaxContent:function(A){Dialog.callFunc(A.responseText,Dialog.parameters)
},_runAjaxRequest:function(C,B,A){if(C.options==null){C.options={}
}Dialog.onCompleteFunc=C.options.onComplete;
Dialog.parameters=B;
Dialog.callFunc=A;
C.options.onComplete=Dialog._getAjaxContent;
new Ajax.Request(C.url,C.options)
},okCallback:function(){var A=Windows.focusedWindow;
if(!A.okCallback||A.okCallback(A)){$$("#"+A.getId()+" input").each(function(B){B.onclick=null
});
A.close()
}},cancelCallback:function(){var A=Windows.focusedWindow;
$$("#"+A.getId()+" input").each(function(B){B.onclick=null
});
A.close();
if(A.cancelCallback){A.cancelCallback(A)
}}};
if(Prototype.Browser.WebKit){var array=navigator.userAgent.match(new RegExp(/AppleWebKit\/([\d\.\+]*)/));
Prototype.Browser.WebKitVersion=parseFloat(array[1])
}var WindowUtilities={getWindowScroll:function(parent){var T,L,W,H;
parent=parent||document.body;
if(parent!=document.body){T=parent.scrollTop;
L=parent.scrollLeft;
W=parent.scrollWidth;
H=parent.scrollHeight
}else{var w=window;
with(w.document){if(w.document.documentElement&&documentElement.scrollTop){T=documentElement.scrollTop;
L=documentElement.scrollLeft
}else{if(w.document.body){T=body.scrollTop;
L=body.scrollLeft
}}if(w.innerWidth){W=w.innerWidth;
H=w.innerHeight
}else{if(w.document.documentElement&&documentElement.clientWidth){W=documentElement.clientWidth;
H=documentElement.clientHeight
}else{W=body.offsetWidth;
H=body.offsetHeight
}}}}return{top:T,left:L,width:W,height:H}
},getPageSize:function(D){D=D||document.body;
var C,G;
var E,B;
if(D!=document.body){C=D.getWidth();
G=D.getHeight();
B=D.scrollWidth;
E=D.scrollHeight
}else{var F,A;
if(window.innerHeight&&window.scrollMaxY){F=document.body.scrollWidth;
A=window.innerHeight+window.scrollMaxY
}else{if(document.body.scrollHeight>document.body.offsetHeight){F=document.body.scrollWidth;
A=document.body.scrollHeight
}else{F=document.body.offsetWidth;
A=document.body.offsetHeight
}}if(self.innerHeight){C=self.innerWidth;
G=self.innerHeight
}else{if(document.documentElement&&document.documentElement.clientHeight){C=document.documentElement.clientWidth;
G=document.documentElement.clientHeight
}else{if(document.body){C=document.body.clientWidth;
G=document.body.clientHeight
}}}if(A<G){E=G
}else{E=A
}if(F<C){B=C
}else{B=F
}}return{pageWidth:B,pageHeight:E,windowWidth:C,windowHeight:G}
},disableScreen:function(C,A,D,E,B){WindowUtilities.initLightbox(A,C,function(){this._disableScreen(C,A,D,E)
}.bind(this),B||document.body)
},_disableScreen:function(C,B,E,F){var D=$(B);
var A=WindowUtilities.getPageSize(D.parentNode);
if(F&&Prototype.Browser.IE){WindowUtilities._hideSelect();
WindowUtilities._showSelect(F)
}D.style.height=(A.pageHeight+"px");
D.style.display="none";
if(B=="overlay_modal"&&Window.hasEffectLib&&Windows.overlayShowEffectOptions){D.overlayOpacity=E;
new Effect.Appear(D,Object.extend({from:0,to:E},Windows.overlayShowEffectOptions))
}else{D.style.display="block"
}},enableScreen:function(B){B=B||"overlay_modal";
var A=$(B);
if(A){if(B=="overlay_modal"&&Window.hasEffectLib&&Windows.overlayHideEffectOptions){new Effect.Fade(A,Object.extend({from:A.overlayOpacity,to:0},Windows.overlayHideEffectOptions))
}else{A.style.display="none";
A.parentNode.removeChild(A)
}if(B!="__invisible__"){WindowUtilities._showSelect()
}}},_hideSelect:function(A){if(Prototype.Browser.IE){A=A==null?"":"#"+A+" ";
$$(A+"select").each(function(B){if(!WindowUtilities.isDefined(B.oldVisibility)){B.oldVisibility=B.style.visibility?B.style.visibility:"visible";
B.style.visibility="hidden"
}})
}},_showSelect:function(A){if(Prototype.Browser.IE){A=A==null?"":"#"+A+" ";
$$(A+"select").each(function(B){if(WindowUtilities.isDefined(B.oldVisibility)){try{B.style.visibility=B.oldVisibility
}catch(C){B.style.visibility="visible"
}B.oldVisibility=null
}else{if(B.style.visibility){B.style.visibility="visible"
}}})
}},isDefined:function(A){return typeof (A)!="undefined"&&A!=null
},initLightbox:function(E,C,A,B){if($(E)){Element.setStyle(E,{zIndex:Windows.maxZIndex+1});
Windows.maxZIndex++;
A()
}else{var D=document.createElement("div");
D.setAttribute("id",E);
D.className="overlay_"+C;
D.style.display="none";
D.style.position="absolute";
D.style.top="0";
D.style.left="0";
D.style.zIndex=Windows.maxZIndex+1;
Windows.maxZIndex++;
D.style.width="100%";
B.insertBefore(D,B.firstChild);
if(Prototype.Browser.WebKit&&E=="overlay_modal"){setTimeout(function(){A()
},10)
}else{A()
}}},setCookie:function(B,A){document.cookie=A[0]+"="+escape(B)+((A[1])?"; expires="+A[1].toGMTString():"")+((A[2])?"; path="+A[2]:"")+((A[3])?"; domain="+A[3]:"")+((A[4])?"; secure":"")
},getCookie:function(C){var B=document.cookie;
var E=C+"=";
var D=B.indexOf("; "+E);
if(D==-1){D=B.indexOf(E);
if(D!=0){return null
}}else{D+=2
}var A=document.cookie.indexOf(";",D);
if(A==-1){A=B.length
}return unescape(B.substring(D+E.length,A))
},_computeSize:function(E,A,B,G,D,F){var I=document.body;
var C=document.createElement("div");
C.setAttribute("id",A);
C.className=F+"_content";
if(G){C.style.height=G+"px"
}else{C.style.width=B+"px"
}C.style.position="absolute";
C.style.top="0";
C.style.left="0";
C.style.display="none";
C.innerHTML=E;
I.insertBefore(C,I.firstChild);
var H;
if(G){H=$(C).getDimensions().width+D
}else{H=$(C).getDimensions().height+D
}I.removeChild(C);
return H
}};