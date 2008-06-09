/* 30c8191c8fea11c81594fa9b04066467 */
var helpStack=Array();
var currentId="0";
var currentSection="0";
var currentSectionCount=0;
function showGettingStartedHome(){jQuery("#WikispacesGettingStartedCategory").empty();
jQuery("#WikispacesGettingStartedBreadcrumbHome").addClass("WikispacesHelpBreadcrumbCurrent");
jQuery("#WikispacesGettingStartedNav").empty();
jQuery("#w_gs_"+currentSection+"-"+currentId).hide();
jQuery("#w_gs_index").show();
currentId="0";
currentSection="0";
return false
}function showGettingStartedDiv(A,B){jQuery("#WikispacesGettingStartedBreadcrumbs .WikispacesHelpBreadcrumbCurrent").removeClass("WikispacesHelpBreadcrumbCurrent");
jQuery("#WikispacesGettingStartedCategory").html('<span class="WikispacesHelpBreadcrumb WikispacesHelpBreadcrumbCurrent"> &gt; <a href="#" onclick="return false;">'+sectionTitles[A]+"</a></span>");
jQuery("#w_gs_index").hide();
if(A!=currentSection){n=1;
jQuery("#w_gs_s"+A).children().each(function(C){jQuery("#WikispacesGettingStartedNav").append('<div id="w_gs_n'+n+'" class="num" onclick="showGettingStartedDiv(currentSection, \''+n+"');\">"+n+"</div>");
n++
});
currentSectionCount=n-1;
jQuery("#WikispacesGettingStartedNav").append('<div id="w_gs_next" onclick="showGettingStartedDiv(currentSection, parseInt(currentId) + 1);">Next &gt;</div>');
jQuery("#WikispacesGettingStartedNav").append('<div id="w_gs_end" onclick="return showGettingStartedHome();">Menu</div>');
jQuery("#WikispacesGettingStartedNav").show()
}if(B!=currentId){jQuery("#w_gs_n"+currentId).removeClass("navhl");
jQuery("#w_gs_"+currentSection+"-"+currentId).hide()
}jQuery("#w_gs_n"+B).addClass("navhl");
jQuery("#w_gs_"+A+"-"+B).show();
if(parseInt(B)==currentSectionCount){jQuery("#w_gs_next").hide()
}else{jQuery("#w_gs_next").show()
}currentId=B;
currentSection=A;
return false
}function attachGettingStarted(A){jQuery("#WikispacesHelp").css("left",(Math.max(0,jQuery.iUtil.getClient().w/2-450)).toString()+"px");
jQuery("#WikispacesHelp").css("top",(Math.max(0,jQuery.iUtil.getClient().h/2-300)).toString()+"px");
jQuery("#WikispacesHelp").jqm({trigger:"#WikispacesHelpTrigger",onShow:function(B){fixEmbedLayers();
loadGettingStarted(A);
B.w.show()
},onHide:function(B){jQuery("#WikispacesHelp").TransferTo({duration:1000,to:"WikispacesHelpTrigger",className:"jqmTransfer"});
B.w.hide();
B.o.remove()
}})
}var scroll;
function scrollUp(A){if(A){scroll=true
}if(scroll){jQuery("#WikispacesHelpContent").scrollTop(jQuery("#WikispacesHelpContent").scrollTop()-20);
setTimeout("scrollUp(false);",50)
}}function scrollDown(A){if(A){scroll=true
}if(scroll){jQuery("#WikispacesHelpContent").scrollTop(jQuery("#WikispacesHelpContent").scrollTop()+20);
setTimeout("scrollDown(false);",50)
}}function stopScroll(){scroll=false
}function attachHelpWindow(A){jQuery("#WikispacesHelp").css("left",(Math.max(0,jQuery.iUtil.getClient().w/2-450)).toString()+"px");
jQuery("#WikispacesHelp").css("top",(Math.max(0,jQuery.iUtil.getClient().h/2-300)).toString()+"px");
jQuery("#WikispacesHelp").jqm({trigger:"#WikispacesHelpTrigger",onShow:function(B){if(helpStack.length==0){fixEmbedLayers();
loadHelp(A)
}B.w.show()
},onHide:function(B){jQuery("#WikispacesHelp").TransferTo({duration:1000,to:"WikispacesHelpTrigger",className:"jqmTransfer"});
B.w.hide();
B.o.remove()
}})
}function loadGettingStarted(B){jQuery("#WikispacesHelpControls").hide();
jQuery("#WikispacesHelpContent").hide();
jQuery("#WikispacesGettingStartedControls").show();
jQuery("#WikispacesGettingStartedContent").show();
var A="/site/helpcontent/none?mode=gettingstarted"+B;
jQuery.ajax({url:A,type:"GET",dataType:"html",success:function(C,D){jQuery("#WikispacesGettingStartedContent").html(C)
},error:function(C,E,D){reloadSession(function(){loadGettingStarted(B)
},500,"Could Not Fetch Help")
}})
}function loadHelp(D){jQuery("#WikispacesHelpControls").show();
jQuery("#WikispacesHelpContent").show();
jQuery("#WikispacesGettingStartedControls").hide();
jQuery("#WikispacesGettingStartedContent").hide();
var C=document.location.protocol+"//"+document.location.hostname;
if(D.substring(0,C.length)==C&&D.substr(C.length,6)=="/Help."){D=D.substr(C.length)
}if(D.substring(0,7)=="http://"||D.substring(0,8)=="https://"){return false
}jQuery("#WikispacesHelpBreadcrumbSpinner").css("display","inline");
if(D.substr(0,1)=="/"){D=D.substr(1)
}var B="";
if(D.indexOf("#")>0){B=D.substr(D.indexOf("#")+1);
D=D.substr(0,D.indexOf("#"))
}if(D==helpStack[helpStack.length]){if(B){jQuery("#WikispacesHelpContent").scrollTo(jQuery("#WikispacesHelpContent a[name='"+B+"']"))
}else{jQuery("#WikispacesHelpContent").scrollTop(0)
}}else{var A="/site/helpcontent/"+D;
jQuery.ajax({url:A,type:"GET",dataType:"html",success:function(E,F){jQuery("#WikispacesHelpContent").html(E);
fixHelpContent(jQuery("#WikispacesHelpContent"));
generateHelpToc(jQuery("#WikispacesHelpContent"));
attachNavigation(jQuery("#WikispacesHelpContent"));
helpStack.push(D);
showBreadcrumbs();
jQuery("#WikispacesHelpBreadcrumbSpinner").hide();
if(B){jQuery("#WikispacesHelpContent").scrollTo(jQuery("#WikispacesHelpContent a[name='"+B+"']"))
}else{jQuery("#WikispacesHelpContent").scrollTop(0)
}},error:function(E,G,F){reloadSession(function(){loadHelp(D)
},500,"Could Not Fetch Help")
}})
}return true
}function attachNavigation(A){var B=navigator.userAgent.toLowerCase();
if(B.indexOf("mac")!=-1&&B.indexOf("firefox")!=-1){jQuery(A).append('<div class="WikispacesHelpPageUp" onmouseover="scrollUp(true);" onmouseout="stopScroll();"><img src="/i/arrow_up.png"/></div>');
jQuery(A).append('<div class="WikispacesHelpPageDown" onmouseover="scrollDown(true);" onmouseout="stopScroll();"><img src="/i/arrow_down.png"/></div>')
}}function getHelpPageText(B){var A=B;
if(!A){A=""
}if(A.substr(0,1)=="/"){A=A.substr(1)
}A=decodeURIComponent(A);
A=A.replace(/\+/g," ");
if(A.lastIndexOf(".")>0){A=A.substr(A.lastIndexOf(".")+1)
}return A
}var MAX_BREADCRUMBS=4;
function showBreadcrumbs(){jQuery("#WikispacesHelpBreadcrumbs span.WikispacesHelpBreadcrumb").remove(":not(#WikispacesHelpBreadcrumbHome)");
var A=helpStack.length-MAX_BREADCRUMBS;
if(A<1){A=1
}for(var C=A;
C<helpStack.length;
C++){var E=helpStack[C];
var D=getHelpPageText(E);
var F=jQuery("#WikispacesHelpBreadcrumbs span:last");
var B='<span class="WikispacesHelpBreadcrumb"> &gt; <a href="#" onclick="return gotoBreadcrumb(\''+C+"');\">"+D+"</a></span>";
F.after(" "+B)
}if(helpStack.length-1>MAX_BREADCRUMBS){jQuery("#WikispacesHelpBreadcrumbsEllipsis").show()
}else{jQuery("#WikispacesHelpBreadcrumbsEllipsis").hide()
}jQuery("#WikispacesHelpBreadcrumbs .WikispacesHelpBreadcrumbCurrent").removeClass("WikispacesHelpBreadcrumbCurrent");
jQuery("#WikispacesHelpBreadcrumbs .WikispacesHelpBreadcrumb:last").addClass("WikispacesHelpBreadcrumbCurrent")
}function gotoBreadcrumb(A){var C=helpStack[A];
for(var B=helpStack.length;
B>A;
B--){helpStack.pop()
}loadHelp(C);
return false
}function generateHelpToc(A){var B=jQuery('<div id="toc"><h1 class="nopad">Table of Contents</h1></div>');
A.find("h1,h2,h3,h4,h5,h6").each(function(){var C=jQuery('<a href="#">'+jQuery(this).text()+"</a>");
var D=jQuery(this);
C.click(function(F){jQuery("#WikispacesHelpContent").scrollTo(D,300);
F.preventDefault()
});
var E=jQuery('<div style="margin-left: '+this.tagName.substr(1,2)+'em;"></div>');
E.append(C);
B.append(E)
});
A.prepend(B)
}function fixHelpContent(A){jQuery(A).find("a").each(function(){var B=jQuery(this);
B.unbind();
B.click(function(C){if(loadHelp(B.attr("href"))){C.preventDefault()
}})
});
jQuery(A).find("div.includeBody").each(function(){var B=jQuery(this);
if(wikispacesHelpMode=="Wikispaces"&&B.attr("class").indexOf(".PL.")>0){B.remove()
}if(wikispacesHelpMode=="PL"&&B.attr("class").indexOf(".Wikispaces.")>0){B.remove()
}});
jQuery(A).find("img").each(function(){var B=jQuery(this);
B.attr("src",B.attr("src").replace(/:\/\/help\.(?:.*?)\/(.*)/,"://help.wikispaces.com/$1"))
})
}(function(){if(window.jQuery){var _jQuery=window.jQuery
}var jQuery=window.jQuery=function(selector,context){return new jQuery.prototype.init(selector,context)
};
if(window.$){var _$=window.$
}window.$=jQuery;
var quickExpr=/^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/;
var isSimple=/^.[^:#\[\.]*$/;
jQuery.fn=jQuery.prototype={init:function(selector,context){selector=selector||document;
if(selector.nodeType){this[0]=selector;
this.length=1;
return this
}else{if(typeof selector=="string"){var match=quickExpr.exec(selector);
if(match&&(match[1]||!context)){if(match[1]){selector=jQuery.clean([match[1]],context)
}else{var elem=document.getElementById(match[3]);
if(elem){if(elem.id!=match[3]){return jQuery().find(selector)
}else{this[0]=elem;
this.length=1;
return this
}}else{selector=[]
}}}else{return new jQuery(context).find(selector)
}}else{if(jQuery.isFunction(selector)){return new jQuery(document)[jQuery.fn.ready?"ready":"load"](selector)
}}}return this.setArray(selector.constructor==Array&&selector||(selector.jquery||selector.length&&selector!=window&&!selector.nodeType&&selector[0]!=undefined&&selector[0].nodeType)&&jQuery.makeArray(selector)||[selector])
},jquery:"1.2.2",size:function(){return this.length
},length:0,get:function(num){return num==undefined?jQuery.makeArray(this):this[num]
},pushStack:function(elems){var ret=jQuery(elems);
ret.prevObject=this;
return ret
},setArray:function(elems){this.length=0;
Array.prototype.push.apply(this,elems);
return this
},each:function(callback,args){return jQuery.each(this,callback,args)
},index:function(elem){var ret=-1;
this.each(function(i){if(this==elem){ret=i
}});
return ret
},attr:function(name,value,type){var options=name;
if(name.constructor==String){if(value==undefined){return this.length&&jQuery[type||"attr"](this[0],name)||undefined
}else{options={};
options[name]=value
}}return this.each(function(i){for(name in options){jQuery.attr(type?this.style:this,name,jQuery.prop(this,options[name],type,i,name))
}})
},css:function(key,value){if((key=="width"||key=="height")&&parseFloat(value)<0){value=undefined
}return this.attr(key,value,"curCSS")
},text:function(text){if(typeof text!="object"&&text!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text))
}var ret="";
jQuery.each(text||this,function(){jQuery.each(this.childNodes,function(){if(this.nodeType!=8){ret+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this])
}})
});
return ret
},wrapAll:function(html){if(this[0]){jQuery(html,this[0].ownerDocument).clone().insertBefore(this[0]).map(function(){var elem=this;
while(elem.firstChild){elem=elem.firstChild
}return elem
}).append(this)
}return this
},wrapInner:function(html){return this.each(function(){jQuery(this).contents().wrapAll(html)
})
},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html)
})
},append:function(){return this.domManip(arguments,true,false,function(elem){if(this.nodeType==1){this.appendChild(elem)
}})
},prepend:function(){return this.domManip(arguments,true,true,function(elem){if(this.nodeType==1){this.insertBefore(elem,this.firstChild)
}})
},before:function(){return this.domManip(arguments,false,false,function(elem){this.parentNode.insertBefore(elem,this)
})
},after:function(){return this.domManip(arguments,false,true,function(elem){this.parentNode.insertBefore(elem,this.nextSibling)
})
},end:function(){return this.prevObject||jQuery([])
},find:function(selector){var elems=jQuery.map(this,function(elem){return jQuery.find(selector,elem)
});
return this.pushStack(/[^+>] [^+>]/.test(selector)||selector.indexOf("..")>-1?jQuery.unique(elems):elems)
},clone:function(events){var ret=this.map(function(){if(jQuery.browser.msie&&!jQuery.isXMLDoc(this)){var clone=this.cloneNode(true),container=document.createElement("div"),container2=document.createElement("div");
container.appendChild(clone);
container2.innerHTML=container.innerHTML;
return container2.firstChild
}else{return this.cloneNode(true)
}});
var clone=ret.find("*").andSelf().each(function(){if(this[expando]!=undefined){this[expando]=null
}});
if(events===true){this.find("*").andSelf().each(function(i){if(this.nodeType==3){return 
}var events=jQuery.data(this,"events");
for(var type in events){for(var handler in events[type]){jQuery.event.add(clone[i],type,events[type][handler],events[type][handler].data)
}}})
}return ret
},filter:function(selector){return this.pushStack(jQuery.isFunction(selector)&&jQuery.grep(this,function(elem,i){return selector.call(elem,i)
})||jQuery.multiFilter(selector,this))
},not:function(selector){if(selector.constructor==String){if(isSimple.test(selector)){return this.pushStack(jQuery.multiFilter(selector,this,true))
}else{selector=jQuery.multiFilter(selector,this)
}}var isArrayLike=selector.length&&selector[selector.length-1]!==undefined&&!selector.nodeType;
return this.filter(function(){return isArrayLike?jQuery.inArray(this,selector)<0:this!=selector
})
},add:function(selector){return !selector?this:this.pushStack(jQuery.merge(this.get(),selector.constructor==String?jQuery(selector).get():selector.length!=undefined&&(!selector.nodeName||jQuery.nodeName(selector,"form"))?selector:[selector]))
},is:function(selector){return selector?jQuery.multiFilter(selector,this).length>0:false
},hasClass:function(selector){return this.is("."+selector)
},val:function(value){if(value==undefined){if(this.length){var elem=this[0];
if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type=="select-one";
if(index<0){return null
}for(var i=one?index:0,max=one?index+1:options.length;
i<max;
i++){var option=options[i];
if(option.selected){value=jQuery.browser.msie&&!option.attributes.value.specified?option.text:option.value;
if(one){return value
}values.push(value)
}}return values
}else{return(this[0].value||"").replace(/\r/g,"")
}}return undefined
}return this.each(function(){if(this.nodeType!=1){return 
}if(value.constructor==Array&&/radio|checkbox/.test(this.type)){this.checked=(jQuery.inArray(this.value,value)>=0||jQuery.inArray(this.name,value)>=0)
}else{if(jQuery.nodeName(this,"select")){var values=value.constructor==Array?value:[value];
jQuery("option",this).each(function(){this.selected=(jQuery.inArray(this.value,values)>=0||jQuery.inArray(this.text,values)>=0)
});
if(!values.length){this.selectedIndex=-1
}}else{this.value=value
}}})
},html:function(value){return value==undefined?(this.length?this[0].innerHTML:null):this.empty().append(value)
},replaceWith:function(value){return this.after(value).remove()
},eq:function(i){return this.slice(i,i+1)
},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments))
},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem)
}))
},andSelf:function(){return this.add(this.prevObject)
},domManip:function(args,table,reverse,callback){var clone=this.length>1,elems;
return this.each(function(){if(!elems){elems=jQuery.clean(args,this.ownerDocument);
if(reverse){elems.reverse()
}}var obj=this;
if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(elems[0],"tr")){obj=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"))
}var scripts=jQuery([]);
jQuery.each(elems,function(){var elem=clone?jQuery(this).clone(true)[0]:this;
if(jQuery.nodeName(elem,"script")){scripts=scripts.add(elem)
}else{if(elem.nodeType==1){scripts=scripts.add(jQuery("script",elem).remove())
}callback.call(obj,elem)
}});
scripts.each(evalScript)
})
}};
jQuery.prototype.init.prototype=jQuery.prototype;
function evalScript(i,elem){if(elem.src){jQuery.ajax({url:elem.src,async:false,dataType:"script"})
}else{jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"")
}if(elem.parentNode){elem.parentNode.removeChild(elem)
}}jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;
if(target.constructor==Boolean){deep=target;
target=arguments[1]||{};
i=2
}if(typeof target!="object"&&typeof target!="function"){target={}
}if(length==1){target=this;
i=0
}for(;
i<length;
i++){if((options=arguments[i])!=null){for(var name in options){if(target===options[name]){continue
}if(deep&&options[name]&&typeof options[name]=="object"&&target[name]&&!options[name].nodeType){target[name]=jQuery.extend(target[name],options[name])
}else{if(options[name]!=undefined){target[name]=options[name]
}}}}}return target
};
var expando="jQuery"+(new Date()).getTime(),uuid=0,windowData={};
var exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i;
jQuery.extend({noConflict:function(deep){window.$=_$;
if(deep){window.jQuery=_jQuery
}return jQuery
},isFunction:function(fn){return !!fn&&typeof fn!="string"&&!fn.nodeName&&fn.constructor!=Array&&/function/i.test(fn+"")
},isXMLDoc:function(elem){return elem.documentElement&&!elem.body||elem.tagName&&elem.ownerDocument&&!elem.ownerDocument.body
},globalEval:function(data){data=jQuery.trim(data);
if(data){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");
script.type="text/javascript";
if(jQuery.browser.msie){script.text=data
}else{script.appendChild(document.createTextNode(data))
}head.appendChild(script);
head.removeChild(script)
}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase()
},cache:{},data:function(elem,name,data){elem=elem==window?windowData:elem;
var id=elem[expando];
if(!id){id=elem[expando]=++uuid
}if(name&&!jQuery.cache[id]){jQuery.cache[id]={}
}if(data!=undefined){jQuery.cache[id][name]=data
}return name?jQuery.cache[id][name]:id
},removeData:function(elem,name){elem=elem==window?windowData:elem;
var id=elem[expando];
if(name){if(jQuery.cache[id]){delete jQuery.cache[id][name];
name="";
for(name in jQuery.cache[id]){break
}if(!name){jQuery.removeData(elem)
}}}else{try{delete elem[expando]
}catch(e){if(elem.removeAttribute){elem.removeAttribute(expando)
}}delete jQuery.cache[id]
}},each:function(object,callback,args){if(args){if(object.length==undefined){for(var name in object){if(callback.apply(object[name],args)===false){break
}}}else{for(var i=0,length=object.length;
i<length;
i++){if(callback.apply(object[i],args)===false){break
}}}}else{if(object.length==undefined){for(var name in object){if(callback.call(object[name],name,object[name])===false){break
}}}else{for(var i=0,length=object.length,value=object[0];
i<length&&callback.call(value,i,value)!==false;
value=object[++i]){}}}return object
},prop:function(elem,value,type,i,name){if(jQuery.isFunction(value)){value=value.call(elem,i)
}return value&&value.constructor==Number&&type=="curCSS"&&!exclude.test(name)?value+"px":value
},className:{add:function(elem,classNames){jQuery.each((classNames||"").split(/\s+/),function(i,className){if(elem.nodeType==1&&!jQuery.className.has(elem.className,className)){elem.className+=(elem.className?" ":"")+className
}})
},remove:function(elem,classNames){if(elem.nodeType==1){elem.className=classNames!=undefined?jQuery.grep(elem.className.split(/\s+/),function(className){return !jQuery.className.has(classNames,className)
}).join(" "):""
}},has:function(elem,className){return jQuery.inArray(className,(elem.className||elem).toString().split(/\s+/))>-1
}},swap:function(elem,options,callback){var old={};
for(var name in options){old[name]=elem.style[name];
elem.style[name]=options[name]
}callback.call(elem);
for(var name in options){elem.style[name]=old[name]
}},css:function(elem,name,force){if(name=="width"||name=="height"){var val,props={position:"absolute",visibility:"hidden",display:"block"},which=name=="width"?["Left","Right"]:["Top","Bottom"];
function getWH(){val=name=="width"?elem.offsetWidth:elem.offsetHeight;
var padding=0,border=0;
jQuery.each(which,function(){padding+=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0;
border+=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0
});
val-=Math.round(padding+border)
}if(jQuery(elem).is(":visible")){getWH()
}else{jQuery.swap(elem,props,getWH)
}return Math.max(0,val)
}return jQuery.curCSS(elem,name,force)
},curCSS:function(elem,name,force){var ret;
function color(elem){if(!jQuery.browser.safari){return false
}var ret=document.defaultView.getComputedStyle(elem,null);
return !ret||ret.getPropertyValue("color")==""
}if(name=="opacity"&&jQuery.browser.msie){ret=jQuery.attr(elem.style,"opacity");
return ret==""?"1":ret
}if(jQuery.browser.opera&&name=="display"){var save=elem.style.display;
elem.style.display="block";
elem.style.display=save
}if(name.match(/float/i)){name=styleFloat
}if(!force&&elem.style&&elem.style[name]){ret=elem.style[name]
}else{if(document.defaultView&&document.defaultView.getComputedStyle){if(name.match(/float/i)){name="float"
}name=name.replace(/([A-Z])/g,"-$1").toLowerCase();
var getComputedStyle=document.defaultView.getComputedStyle(elem,null);
if(getComputedStyle&&!color(elem)){ret=getComputedStyle.getPropertyValue(name)
}else{var swap=[],stack=[];
for(var a=elem;
a&&color(a);
a=a.parentNode){stack.unshift(a)
}for(var i=0;
i<stack.length;
i++){if(color(stack[i])){swap[i]=stack[i].style.display;
stack[i].style.display="block"
}}ret=name=="display"&&swap[stack.length-1]!=null?"none":(getComputedStyle&&getComputedStyle.getPropertyValue(name))||"";
for(var i=0;
i<swap.length;
i++){if(swap[i]!=null){stack[i].style.display=swap[i]
}}}if(name=="opacity"&&ret==""){ret="1"
}}else{if(elem.currentStyle){var camelCase=name.replace(/\-(\w)/g,function(all,letter){return letter.toUpperCase()
});
ret=elem.currentStyle[name]||elem.currentStyle[camelCase];
if(!/^\d+(px)?$/i.test(ret)&&/^\d/.test(ret)){var style=elem.style.left,runtimeStyle=elem.runtimeStyle.left;
elem.runtimeStyle.left=elem.currentStyle.left;
elem.style.left=ret||0;
ret=elem.style.pixelLeft+"px";
elem.style.left=style;
elem.runtimeStyle.left=runtimeStyle
}}}}return ret
},clean:function(elems,context){var ret=[];
context=context||document;
if(typeof context.createElement=="undefined"){context=context.ownerDocument||context[0]&&context[0].ownerDocument||document
}jQuery.each(elems,function(i,elem){if(!elem){return 
}if(elem.constructor==Number){elem=elem.toString()
}if(typeof elem=="string"){elem=elem.replace(/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+"></"+tag+">"
});
var tags=jQuery.trim(elem).toLowerCase(),div=context.createElement("div");
var wrap=!tags.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!tags.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||tags.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!tags.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!tags.indexOf("<td")||!tags.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!tags.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||jQuery.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];
div.innerHTML=wrap[1]+elem+wrap[2];
while(wrap[0]--){div=div.lastChild
}if(jQuery.browser.msie){var tbody=!tags.indexOf("<table")&&tags.indexOf("<tbody")<0?div.firstChild&&div.firstChild.childNodes:wrap[1]=="<table>"&&tags.indexOf("<tbody")<0?div.childNodes:[];
for(var j=tbody.length-1;
j>=0;
--j){if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j])
}}if(/^\s/.test(elem)){div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]),div.firstChild)
}}elem=jQuery.makeArray(div.childNodes)
}if(elem.length===0&&(!jQuery.nodeName(elem,"form")&&!jQuery.nodeName(elem,"select"))){return 
}if(elem[0]==undefined||jQuery.nodeName(elem,"form")||elem.options){ret.push(elem)
}else{ret=jQuery.merge(ret,elem)
}});
return ret
},attr:function(elem,name,value){if(!elem||elem.nodeType==3||elem.nodeType==8){return undefined
}var fix=jQuery.isXMLDoc(elem)?{}:jQuery.props;
if(name=="selected"&&jQuery.browser.safari){elem.parentNode.selectedIndex
}if(fix[name]){if(value!=undefined){elem[fix[name]]=value
}return elem[fix[name]]
}else{if(jQuery.browser.msie&&name=="style"){return jQuery.attr(elem.style,"cssText",value)
}else{if(value==undefined&&jQuery.browser.msie&&jQuery.nodeName(elem,"form")&&(name=="action"||name=="method")){return elem.getAttributeNode(name).nodeValue
}else{if(elem.tagName){if(value!=undefined){if(name=="type"&&jQuery.nodeName(elem,"input")&&elem.parentNode){throw"type property can't be changed"
}elem.setAttribute(name,""+value)
}if(jQuery.browser.msie&&/href|src/.test(name)&&!jQuery.isXMLDoc(elem)){return elem.getAttribute(name,2)
}return elem.getAttribute(name)
}else{if(name=="opacity"&&jQuery.browser.msie){if(value!=undefined){elem.zoom=1;
elem.filter=(elem.filter||"").replace(/alpha\([^)]*\)/,"")+(parseFloat(value).toString()=="NaN"?"":"alpha(opacity="+value*100+")")
}return elem.filter&&elem.filter.indexOf("opacity=")>=0?(parseFloat(elem.filter.match(/opacity=([^)]*)/)[1])/100).toString():""
}name=name.replace(/-([a-z])/ig,function(all,letter){return letter.toUpperCase()
});
if(value!=undefined){elem[name]=value
}return elem[name]
}}}}},trim:function(text){return(text||"").replace(/^\s+|\s+$/g,"")
},makeArray:function(array){var ret=[];
if(typeof array!="array"){for(var i=0,length=array.length;
i<length;
i++){ret.push(array[i])
}}else{ret=array.slice(0)
}return ret
},inArray:function(elem,array){for(var i=0,length=array.length;
i<length;
i++){if(array[i]==elem){return i
}}return -1
},merge:function(first,second){if(jQuery.browser.msie){for(var i=0;
second[i];
i++){if(second[i].nodeType!=8){first.push(second[i])
}}}else{for(var i=0;
second[i];
i++){first.push(second[i])
}}return first
},unique:function(array){var ret=[],done={};
try{for(var i=0,length=array.length;
i<length;
i++){var id=jQuery.data(array[i]);
if(!done[id]){done[id]=true;
ret.push(array[i])
}}}catch(e){ret=array
}return ret
},grep:function(elems,callback,inv){if(typeof callback=="string"){callback=eval("false||function(a,i){return "+callback+"}")
}var ret=[];
for(var i=0,length=elems.length;
i<length;
i++){if(!inv&&callback(elems[i],i)||inv&&!callback(elems[i],i)){ret.push(elems[i])
}}return ret
},map:function(elems,callback){var ret=[];
for(var i=0,length=elems.length;
i<length;
i++){var value=callback(elems[i],i);
if(value!==null&&value!=undefined){if(value.constructor!=Array){value=[value]
}ret=ret.concat(value)
}}return ret
}});
var userAgent=navigator.userAgent.toLowerCase();
jQuery.browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};
var styleFloat=jQuery.browser.msie?"styleFloat":"cssFloat";
jQuery.extend({boxModel:!jQuery.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":styleFloat,cssFloat:styleFloat,styleFloat:styleFloat,innerHTML:"innerHTML",className:"className",value:"value",disabled:"disabled",checked:"checked",readonly:"readOnly",selected:"selected",maxlength:"maxLength",selectedIndex:"selectedIndex",defaultValue:"defaultValue",tagName:"tagName",nodeName:"nodeName"}});
jQuery.each({parent:"elem.parentNode",parents:"jQuery.dir(elem,'parentNode')",next:"jQuery.nth(elem,2,'nextSibling')",prev:"jQuery.nth(elem,2,'previousSibling')",nextAll:"jQuery.dir(elem,'nextSibling')",prevAll:"jQuery.dir(elem,'previousSibling')",siblings:"jQuery.sibling(elem.parentNode.firstChild,elem)",children:"jQuery.sibling(elem.firstChild)",contents:"jQuery.nodeName(elem,'iframe')?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes)"},function(name,fn){fn=eval("false||function(elem){return "+fn+"}");
jQuery.fn[name]=function(selector){var ret=jQuery.map(this,fn);
if(selector&&typeof selector=="string"){ret=jQuery.multiFilter(selector,ret)
}return this.pushStack(jQuery.unique(ret))
}
});
jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(){var args=arguments;
return this.each(function(){for(var i=0,length=args.length;
i<length;
i++){jQuery(args[i])[original](this)
}})
}
});
jQuery.each({removeAttr:function(name){jQuery.attr(this,name,"");
if(this.nodeType==1){this.removeAttribute(name)
}},addClass:function(classNames){jQuery.className.add(this,classNames)
},removeClass:function(classNames){jQuery.className.remove(this,classNames)
},toggleClass:function(classNames){jQuery.className[jQuery.className.has(this,classNames)?"remove":"add"](this,classNames)
},remove:function(selector){if(!selector||jQuery.filter(selector,[this]).r.length){jQuery("*",this).add(this).each(function(){jQuery.event.remove(this);
jQuery.removeData(this)
});
if(this.parentNode){this.parentNode.removeChild(this)
}}},empty:function(){jQuery(">*",this).remove();
while(this.firstChild){this.removeChild(this.firstChild)
}}},function(name,fn){jQuery.fn[name]=function(){return this.each(fn,arguments)
}
});
jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();
jQuery.fn[type]=function(size){return this[0]==window?jQuery.browser.opera&&document.body["client"+name]||jQuery.browser.safari&&window["inner"+name]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+name]||document.body["client"+name]:this[0]==document?Math.max(Math.max(document.body["scroll"+name],document.documentElement["scroll"+name]),Math.max(document.body["offset"+name],document.documentElement["offset"+name])):size==undefined?(this.length?jQuery.css(this[0],type):null):this.css(type,size.constructor==String?size:size+"px")
}
});
var chars=jQuery.browser.safari&&parseInt(jQuery.browser.version)<417?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",quickChild=new RegExp("^>\\s*("+chars+"+)"),quickID=new RegExp("^("+chars+"+)(#)("+chars+"+)"),quickClass=new RegExp("^([#.]?)("+chars+"*)");
jQuery.extend({expr:{"":"m[2]=='*'||jQuery.nodeName(a,m[2])","#":"a.getAttribute('id')==m[2]",":":{lt:"i<m[3]-0",gt:"i>m[3]-0",nth:"m[3]-0==i",eq:"m[3]-0==i",first:"i==0",last:"i==r.length-1",even:"i%2==0",odd:"i%2","first-child":"a.parentNode.getElementsByTagName('*')[0]==a","last-child":"jQuery.nth(a.parentNode.lastChild,1,'previousSibling')==a","only-child":"!jQuery.nth(a.parentNode.lastChild,2,'previousSibling')",parent:"a.firstChild",empty:"!a.firstChild",contains:"(a.textContent||a.innerText||jQuery(a).text()||'').indexOf(m[3])>=0",visible:'"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden"',hidden:'"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden"',enabled:"!a.disabled",disabled:"a.disabled",checked:"a.checked",selected:"a.selected||jQuery.attr(a,'selected')",text:"'text'==a.type",radio:"'radio'==a.type",checkbox:"'checkbox'==a.type",file:"'file'==a.type",password:"'password'==a.type",submit:"'submit'==a.type",image:"'image'==a.type",reset:"'reset'==a.type",button:'"button"==a.type||jQuery.nodeName(a,"button")',input:"/input|select|textarea|button/i.test(a.nodeName)",has:"jQuery.find(m[3],a).length",header:"/h\\d/i.test(a.nodeName)",animated:"jQuery.grep(jQuery.timers,function(fn){return a==fn.elem;}).length"}},parse:[/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,new RegExp("^([:.#]*)("+chars+"+)")],multiFilter:function(expr,elems,not){var old,cur=[];
while(expr&&expr!=old){old=expr;
var f=jQuery.filter(expr,elems,not);
expr=f.t.replace(/^\s*,\s*/,"");
cur=not?elems=f.r:jQuery.merge(cur,f.r)
}return cur
},find:function(t,context){if(typeof t!="string"){return[t]
}if(context&&context.nodeType!=1&&context.nodeType!=9){return[]
}context=context||document;
var ret=[context],done=[],last,nodeName;
while(t&&last!=t){var r=[];
last=t;
t=jQuery.trim(t);
var foundToken=false;
var re=quickChild;
var m=re.exec(t);
if(m){nodeName=m[1].toUpperCase();
for(var i=0;
ret[i];
i++){for(var c=ret[i].firstChild;
c;
c=c.nextSibling){if(c.nodeType==1&&(nodeName=="*"||c.nodeName.toUpperCase()==nodeName)){r.push(c)
}}}ret=r;
t=t.replace(re,"");
if(t.indexOf(" ")==0){continue
}foundToken=true
}else{re=/^([>+~])\s*(\w*)/i;
if((m=re.exec(t))!=null){r=[];
var merge={};
nodeName=m[2].toUpperCase();
m=m[1];
for(var j=0,rl=ret.length;
j<rl;
j++){var n=m=="~"||m=="+"?ret[j].nextSibling:ret[j].firstChild;
for(;
n;
n=n.nextSibling){if(n.nodeType==1){var id=jQuery.data(n);
if(m=="~"&&merge[id]){break
}if(!nodeName||n.nodeName.toUpperCase()==nodeName){if(m=="~"){merge[id]=true
}r.push(n)
}if(m=="+"){break
}}}}ret=r;
t=jQuery.trim(t.replace(re,""));
foundToken=true
}}if(t&&!foundToken){if(!t.indexOf(",")){if(context==ret[0]){ret.shift()
}done=jQuery.merge(done,ret);
r=ret=[context];
t=" "+t.substr(1,t.length)
}else{var re2=quickID;
var m=re2.exec(t);
if(m){m=[0,m[2],m[3],m[1]]
}else{re2=quickClass;
m=re2.exec(t)
}m[2]=m[2].replace(/\\/g,"");
var elem=ret[ret.length-1];
if(m[1]=="#"&&elem&&elem.getElementById&&!jQuery.isXMLDoc(elem)){var oid=elem.getElementById(m[2]);
if((jQuery.browser.msie||jQuery.browser.opera)&&oid&&typeof oid.id=="string"&&oid.id!=m[2]){oid=jQuery('[@id="'+m[2]+'"]',elem)[0]
}ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[]
}else{for(var i=0;
ret[i];
i++){var tag=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];
if(tag=="*"&&ret[i].nodeName.toLowerCase()=="object"){tag="param"
}r=jQuery.merge(r,ret[i].getElementsByTagName(tag))
}if(m[1]=="."){r=jQuery.classFilter(r,m[2])
}if(m[1]=="#"){var tmp=[];
for(var i=0;
r[i];
i++){if(r[i].getAttribute("id")==m[2]){tmp=[r[i]];
break
}}r=tmp
}ret=r
}t=t.replace(re2,"")
}}if(t){var val=jQuery.filter(t,r);
ret=r=val.r;
t=jQuery.trim(val.t)
}}if(t){ret=[]
}if(ret&&context==ret[0]){ret.shift()
}done=jQuery.merge(done,ret);
return done
},classFilter:function(r,m,not){m=" "+m+" ";
var tmp=[];
for(var i=0;
r[i];
i++){var pass=(" "+r[i].className+" ").indexOf(m)>=0;
if(!not&&pass||not&&!pass){tmp.push(r[i])
}}return tmp
},filter:function(t,r,not){var last;
while(t&&t!=last){last=t;
var p=jQuery.parse,m;
for(var i=0;
p[i];
i++){m=p[i].exec(t);
if(m){t=t.substring(m[0].length);
m[2]=m[2].replace(/\\/g,"");
break
}}if(!m){break
}if(m[1]==":"&&m[2]=="not"){r=isSimple.test(m[3])?jQuery.filter(m[3],r,true).r:jQuery(r).not(m[3])
}else{if(m[1]=="."){r=jQuery.classFilter(r,m[2],not)
}else{if(m[1]=="["){var tmp=[],type=m[3];
for(var i=0,rl=r.length;
i<rl;
i++){var a=r[i],z=a[jQuery.props[m[2]]||m[2]];
if(z==null||/href|src|selected/.test(m[2])){z=jQuery.attr(a,m[2])||""
}if((type==""&&!!z||type=="="&&z==m[5]||type=="!="&&z!=m[5]||type=="^="&&z&&!z.indexOf(m[5])||type=="$="&&z.substr(z.length-m[5].length)==m[5]||(type=="*="||type=="~=")&&z.indexOf(m[5])>=0)^not){tmp.push(a)
}}r=tmp
}else{if(m[1]==":"&&m[2]=="nth-child"){var merge={},tmp=[],test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3]=="even"&&"2n"||m[3]=="odd"&&"2n+1"||!/\D/.test(m[3])&&"0n+"+m[3]||m[3]),first=(test[1]+(test[2]||1))-0,last=test[3]-0;
for(var i=0,rl=r.length;
i<rl;
i++){var node=r[i],parentNode=node.parentNode,id=jQuery.data(parentNode);
if(!merge[id]){var c=1;
for(var n=parentNode.firstChild;
n;
n=n.nextSibling){if(n.nodeType==1){n.nodeIndex=c++
}}merge[id]=true
}var add=false;
if(first==0){if(node.nodeIndex==last){add=true
}}else{if((node.nodeIndex-last)%first==0&&(node.nodeIndex-last)/first>=0){add=true
}}if(add^not){tmp.push(node)
}}r=tmp
}else{var f=jQuery.expr[m[1]];
if(typeof f!="string"){f=jQuery.expr[m[1]][m[2]]
}f=eval("false||function(a,i){return "+f+"}");
r=jQuery.grep(r,f,not)
}}}}}return{r:r,t:t}
},dir:function(elem,dir){var matched=[];
var cur=elem[dir];
while(cur&&cur!=document){if(cur.nodeType==1){matched.push(cur)
}cur=cur[dir]
}return matched
},nth:function(cur,result,dir,elem){result=result||1;
var num=0;
for(;
cur;
cur=cur[dir]){if(cur.nodeType==1&&++num==result){break
}}return cur
},sibling:function(n,elem){var r=[];
for(;
n;
n=n.nextSibling){if(n.nodeType==1&&(!elem||n!=elem)){r.push(n)
}}return r
}});
jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType==3||elem.nodeType==8){return 
}if(jQuery.browser.msie&&elem.setInterval!=undefined){elem=window
}if(!handler.guid){handler.guid=this.guid++
}if(data!=undefined){var fn=handler;
handler=function(){return fn.apply(this,arguments)
};
handler.data=data;
handler.guid=fn.guid
}var events=jQuery.data(elem,"events")||jQuery.data(elem,"events",{}),handle=jQuery.data(elem,"handle")||jQuery.data(elem,"handle",function(){var val;
if(typeof jQuery=="undefined"||jQuery.event.triggered){return val
}val=jQuery.event.handle.apply(arguments.callee.elem,arguments);
return val
});
handle.elem=elem;
jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");
type=parts[0];
handler.type=parts[1];
var handlers=events[type];
if(!handlers){handlers=events[type]={};
if(!jQuery.event.special[type]||jQuery.event.special[type].setup.call(elem)===false){if(elem.addEventListener){elem.addEventListener(type,handle,false)
}else{if(elem.attachEvent){elem.attachEvent("on"+type,handle)
}}}}handlers[handler.guid]=handler;
jQuery.event.global[type]=true
});
elem=null
},guid:1,global:{},remove:function(elem,types,handler){if(elem.nodeType==3||elem.nodeType==8){return 
}var events=jQuery.data(elem,"events"),ret,index;
if(events){if(types==undefined){for(var type in events){this.remove(elem,type)
}}else{if(types.type){handler=types.handler;
types=types.type
}jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");
type=parts[0];
if(events[type]){if(handler){delete events[type][handler.guid]
}else{for(handler in events[type]){if(!parts[1]||events[type][handler].type==parts[1]){delete events[type][handler]
}}}for(ret in events[type]){break
}if(!ret){if(!jQuery.event.special[type]||jQuery.event.special[type].teardown.call(elem)===false){if(elem.removeEventListener){elem.removeEventListener(type,jQuery.data(elem,"handle"),false)
}else{if(elem.detachEvent){elem.detachEvent("on"+type,jQuery.data(elem,"handle"))
}}}ret=null;
delete events[type]
}}})
}for(ret in events){break
}if(!ret){var handle=jQuery.data(elem,"handle");
if(handle){handle.elem=null
}jQuery.removeData(elem,"events");
jQuery.removeData(elem,"handle")
}}},trigger:function(type,data,elem,donative,extra){data=jQuery.makeArray(data||[]);
if(!elem){if(this.global[type]){jQuery("*").add([window,document]).trigger(type,data)
}}else{if(elem.nodeType==3||elem.nodeType==8){return undefined
}var val,ret,fn=jQuery.isFunction(elem[type]||null),event=!data[0]||!data[0].preventDefault;
if(event){data.unshift(this.fix({type:type,target:elem}))
}data[0].type=type;
if(jQuery.isFunction(jQuery.data(elem,"handle"))){val=jQuery.data(elem,"handle").apply(elem,data)
}if(!fn&&elem["on"+type]&&elem["on"+type].apply(elem,data)===false){val=false
}if(event){data.shift()
}if(extra&&jQuery.isFunction(extra)){ret=extra.apply(elem,val==null?data:data.concat(val));
if(ret!==undefined){val=ret
}}if(fn&&donative!==false&&val!==false&&!(jQuery.nodeName(elem,"a")&&type=="click")){this.triggered=true;
try{elem[type]()
}catch(e){}}this.triggered=false
}return val
},handle:function(event){var val;
event=jQuery.event.fix(event||window.event||{});
var parts=event.type.split(".");
event.type=parts[0];
var handlers=jQuery.data(this,"events")&&jQuery.data(this,"events")[event.type],args=Array.prototype.slice.call(arguments,1);
args.unshift(event);
for(var j in handlers){var handler=handlers[j];
args[0].handler=handler;
args[0].data=handler.data;
if(!parts[1]||handler.type==parts[1]){var ret=handler.apply(this,args);
if(val!==false){val=ret
}if(ret===false){event.preventDefault();
event.stopPropagation()
}}}if(jQuery.browser.msie){event.target=event.preventDefault=event.stopPropagation=event.handler=event.data=null
}return val
},fix:function(event){var originalEvent=event;
event=jQuery.extend({},originalEvent);
event.preventDefault=function(){if(originalEvent.preventDefault){originalEvent.preventDefault()
}originalEvent.returnValue=false
};
event.stopPropagation=function(){if(originalEvent.stopPropagation){originalEvent.stopPropagation()
}originalEvent.cancelBubble=true
};
if(!event.target){event.target=event.srcElement||document
}if(event.target.nodeType==3){event.target=originalEvent.target.parentNode
}if(!event.relatedTarget&&event.fromElement){event.relatedTarget=event.fromElement==event.target?event.toElement:event.fromElement
}if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;
event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);
event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0)
}if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode)){event.which=event.charCode||event.keyCode
}if(!event.metaKey&&event.ctrlKey){event.metaKey=event.ctrlKey
}if(!event.which&&event.button){event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)))
}return event
},special:{ready:{setup:function(){bindReady();
return 
},teardown:function(){return 
}},mouseenter:{setup:function(){if(jQuery.browser.msie){return false
}jQuery(this).bind("mouseover",jQuery.event.special.mouseenter.handler);
return true
},teardown:function(){if(jQuery.browser.msie){return false
}jQuery(this).unbind("mouseover",jQuery.event.special.mouseenter.handler);
return true
},handler:function(event){if(withinElement(event,this)){return true
}arguments[0].type="mouseenter";
return jQuery.event.handle.apply(this,arguments)
}},mouseleave:{setup:function(){if(jQuery.browser.msie){return false
}jQuery(this).bind("mouseout",jQuery.event.special.mouseleave.handler);
return true
},teardown:function(){if(jQuery.browser.msie){return false
}jQuery(this).unbind("mouseout",jQuery.event.special.mouseleave.handler);
return true
},handler:function(event){if(withinElement(event,this)){return true
}arguments[0].type="mouseleave";
return jQuery.event.handle.apply(this,arguments)
}}}};
jQuery.fn.extend({bind:function(type,data,fn){return type=="unload"?this.one(type,data,fn):this.each(function(){jQuery.event.add(this,type,fn||data,fn&&data)
})
},one:function(type,data,fn){return this.each(function(){jQuery.event.add(this,type,function(event){jQuery(this).unbind(event);
return(fn||data).apply(this,arguments)
},fn&&data)
})
},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn)
})
},trigger:function(type,data,fn){return this.each(function(){jQuery.event.trigger(type,data,this,true,fn)
})
},triggerHandler:function(type,data,fn){if(this[0]){return jQuery.event.trigger(type,data,this[0],false,fn)
}return undefined
},toggle:function(){var args=arguments;
return this.click(function(event){this.lastToggle=0==this.lastToggle?1:0;
event.preventDefault();
return args[this.lastToggle].apply(this,arguments)||false
})
},hover:function(fnOver,fnOut){return this.bind("mouseenter",fnOver).bind("mouseleave",fnOut)
},ready:function(fn){bindReady();
if(jQuery.isReady){fn.call(document,jQuery)
}else{jQuery.readyList.push(function(){return fn.call(this,jQuery)
})
}return this
}});
jQuery.extend({isReady:false,readyList:[],ready:function(){if(!jQuery.isReady){jQuery.isReady=true;
if(jQuery.readyList){jQuery.each(jQuery.readyList,function(){this.apply(document)
});
jQuery.readyList=null
}jQuery(document).triggerHandler("ready")
}}});
var readyBound=false;
function bindReady(){if(readyBound){return 
}readyBound=true;
if(document.addEventListener&&!jQuery.browser.opera){document.addEventListener("DOMContentLoaded",jQuery.ready,false)
}if(jQuery.browser.msie&&window==top){(function(){if(jQuery.isReady){return 
}try{document.documentElement.doScroll("left")
}catch(error){setTimeout(arguments.callee,0);
return 
}jQuery.ready()
})()
}if(jQuery.browser.opera){document.addEventListener("DOMContentLoaded",function(){if(jQuery.isReady){return 
}for(var i=0;
i<document.styleSheets.length;
i++){if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);
return 
}}jQuery.ready()
},false)
}if(jQuery.browser.safari){var numStyles;
(function(){if(jQuery.isReady){return 
}if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);
return 
}if(numStyles===undefined){numStyles=jQuery("style, link[rel=stylesheet]").length
}if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);
return 
}jQuery.ready()
})()
}jQuery.event.add(window,"load",jQuery.ready)
}jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,change,select,submit,keydown,keypress,keyup,error").split(","),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name)
}
});
var withinElement=function(event,elem){var parent=event.relatedTarget;
while(parent&&parent!=elem){try{parent=parent.parentNode
}catch(error){parent=elem
}}return parent==elem
};
jQuery(window).bind("unload",function(){jQuery("*").add(document).unbind()
});
jQuery.fn.extend({load:function(url,params,callback){if(jQuery.isFunction(url)){return this.bind("load",url)
}var off=url.indexOf(" ");
if(off>=0){var selector=url.slice(off,url.length);
url=url.slice(0,off)
}callback=callback||function(){};
var type="GET";
if(params){if(jQuery.isFunction(params)){callback=params;
params=null
}else{params=jQuery.param(params);
type="POST"
}}var self=this;
jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status=="success"||status=="notmodified"){self.html(selector?jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):res.responseText)
}self.each(callback,[res.responseText,status,res])
}});
return this
},serialize:function(){return jQuery.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){return jQuery.nodeName(this,"form")?jQuery.makeArray(this.elements):this
}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type))
}).map(function(i,elem){var val=jQuery(this).val();
return val==null?null:val.constructor==Array?jQuery.map(val,function(val,i){return{name:elem.name,value:val}
}):{name:elem.name,value:val}
}).get()
}});
jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f)
}
});
var jsc=(new Date).getTime();
jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;
data=null
}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type})
},getScript:function(url,callback){return jQuery.get(url,null,callback,"script")
},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json")
},post:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;
data={}
}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type})
},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings)
},ajaxSettings:{global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null,username:null,password:null,accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(s){var jsonp,jsre=/=\?(&|$)/g,status,data;
s=jQuery.extend(true,s,jQuery.extend(true,{},jQuery.ajaxSettings,s));
if(s.data&&s.processData&&typeof s.data!="string"){s.data=jQuery.param(s.data)
}if(s.dataType=="jsonp"){if(s.type.toLowerCase()=="get"){if(!s.url.match(jsre)){s.url+=(s.url.match(/\?/)?"&":"?")+(s.jsonp||"callback")+"=?"
}}else{if(!s.data||!s.data.match(jsre)){s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?"
}}s.dataType="json"
}if(s.dataType=="json"&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){jsonp="jsonp"+jsc++;
if(s.data){s.data=(s.data+"").replace(jsre,"="+jsonp+"$1")
}s.url=s.url.replace(jsre,"="+jsonp+"$1");
s.dataType="script";
window[jsonp]=function(tmp){data=tmp;
success();
complete();
window[jsonp]=undefined;
try{delete window[jsonp]
}catch(e){}if(head){head.removeChild(script)
}}
}if(s.dataType=="script"&&s.cache==null){s.cache=false
}if(s.cache===false&&s.type.toLowerCase()=="get"){var ts=(new Date()).getTime();
var ret=s.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+ts+"$2");
s.url=ret+((ret==s.url)?(s.url.match(/\?/)?"&":"?")+"_="+ts:"")
}if(s.data&&s.type.toLowerCase()=="get"){s.url+=(s.url.match(/\?/)?"&":"?")+s.data;
s.data=null
}if(s.global&&!jQuery.active++){jQuery.event.trigger("ajaxStart")
}if((!s.url.indexOf("http")||!s.url.indexOf("//"))&&(s.dataType=="script"||s.dataType=="json")&&s.type.toLowerCase()=="get"){var head=document.getElementsByTagName("head")[0];
var script=document.createElement("script");
script.src=s.url;
if(s.scriptCharset){script.charset=s.scriptCharset
}if(!jsonp){var done=false;
script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){done=true;
success();
complete();
head.removeChild(script)
}}
}head.appendChild(script);
return undefined
}var requestDone=false;
var xml=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
xml.open(s.type,s.url,s.async,s.username,s.password);
try{if(s.data){xml.setRequestHeader("Content-Type",s.contentType)
}if(s.ifModified){xml.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT")
}xml.setRequestHeader("X-Requested-With","XMLHttpRequest");
xml.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default)
}catch(e){}if(s.beforeSend){s.beforeSend(xml)
}if(s.global){jQuery.event.trigger("ajaxSend",[xml,s])
}var onreadystatechange=function(isTimeout){if(!requestDone&&xml&&(xml.readyState==4||isTimeout=="timeout")){requestDone=true;
if(ival){clearInterval(ival);
ival=null
}status=isTimeout=="timeout"&&"timeout"||!jQuery.httpSuccess(xml)&&"error"||s.ifModified&&jQuery.httpNotModified(xml,s.url)&&"notmodified"||"success";
if(status=="success"){try{data=jQuery.httpData(xml,s.dataType)
}catch(e){status="parsererror"
}}if(status=="success"){var modRes;
try{modRes=xml.getResponseHeader("Last-Modified")
}catch(e){}if(s.ifModified&&modRes){jQuery.lastModified[s.url]=modRes
}if(!jsonp){success()
}}else{jQuery.handleError(s,xml,status)
}complete();
if(s.async){xml=null
}}};
if(s.async){var ival=setInterval(onreadystatechange,13);
if(s.timeout>0){setTimeout(function(){if(xml){xml.abort();
if(!requestDone){onreadystatechange("timeout")
}}},s.timeout)
}}try{xml.send(s.data)
}catch(e){jQuery.handleError(s,xml,null,e)
}if(!s.async){onreadystatechange()
}function success(){if(s.success){s.success(data,status)
}if(s.global){jQuery.event.trigger("ajaxSuccess",[xml,s])
}}function complete(){if(s.complete){s.complete(xml,status)
}if(s.global){jQuery.event.trigger("ajaxComplete",[xml,s])
}if(s.global&&!--jQuery.active){jQuery.event.trigger("ajaxStop")
}}return xml
},handleError:function(s,xml,status,e){if(s.error){s.error(xml,status,e)
}if(s.global){jQuery.event.trigger("ajaxError",[xml,s,e])
}},active:0,httpSuccess:function(r){try{return !r.status&&location.protocol=="file:"||(r.status>=200&&r.status<300)||r.status==304||r.status==1223||jQuery.browser.safari&&r.status==undefined
}catch(e){}return false
},httpNotModified:function(xml,url){try{var xmlRes=xml.getResponseHeader("Last-Modified");
return xml.status==304||xmlRes==jQuery.lastModified[url]||jQuery.browser.safari&&xml.status==undefined
}catch(e){}return false
},httpData:function(r,type){var ct=r.getResponseHeader("content-type");
var xml=type=="xml"||!type&&ct&&ct.indexOf("xml")>=0;
var data=xml?r.responseXML:r.responseText;
if(xml&&data.documentElement.tagName=="parsererror"){throw"parsererror"
}if(type=="script"){jQuery.globalEval(data)
}if(type=="json"){data=eval("("+data+")")
}return data
},param:function(a){var s=[];
if(a.constructor==Array||a.jquery){jQuery.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value))
})
}else{for(var j in a){if(a[j]&&a[j].constructor==Array){jQuery.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this))
})
}else{s.push(encodeURIComponent(j)+"="+encodeURIComponent(a[j]))
}}}return s.join("&").replace(/%20/g,"+")
}});
jQuery.fn.extend({show:function(speed,callback){return speed?this.animate({height:"show",width:"show",opacity:"show"},speed,callback):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";
if(jQuery.css(this,"display")=="none"){var elem=jQuery("<"+this.tagName+" />").appendTo("body");
this.style.display=elem.css("display");
if(this.style.display=="none"){this.style.display="block"
}elem.remove()
}}).end()
},hide:function(speed,callback){return speed?this.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):this.filter(":visible").each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");
this.style.display="none"
}).end()
},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle(fn,fn2):fn?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"]()
})
},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback)
},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback)
},slideToggle:function(speed,callback){return this.animate({height:"toggle"},speed,callback)
},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback)
},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback)
},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback)
},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);
return this[optall.queue===false?"each":"queue"](function(){if(this.nodeType!=1){return false
}var opt=jQuery.extend({},optall);
var hidden=jQuery(this).is(":hidden"),self=this;
for(var p in prop){if(prop[p]=="hide"&&hidden||prop[p]=="show"&&!hidden){return jQuery.isFunction(opt.complete)&&opt.complete.apply(this)
}if(p=="height"||p=="width"){opt.display=jQuery.css(this,"display");
opt.overflow=this.style.overflow
}}if(opt.overflow!=null){this.style.overflow="hidden"
}opt.curAnim=jQuery.extend({},prop);
jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);
if(/toggle|show|hide/.test(val)){e[val=="toggle"?hidden?"show":"hide":val](prop)
}else{var parts=val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;
if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";
if(unit!="px"){self.style[name]=(end||1)+unit;
start=((end||1)/e.cur(true))*start;
self.style[name]=start+unit
}if(parts[1]){end=((parts[1]=="-="?-1:1)*end)+start
}e.custom(start,end,unit)
}else{e.custom(start,val,"")
}}});
return true
})
},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;
type="fx"
}if(!type||(typeof type=="string"&&!fn)){return queue(this[0],type)
}return this.each(function(){if(fn.constructor==Array){queue(this,type,fn)
}else{queue(this,type).push(fn);
if(queue(this,type).length==1){fn.apply(this)
}}})
},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;
if(clearQueue){this.queue([])
}this.each(function(){for(var i=timers.length-1;
i>=0;
i--){if(timers[i].elem==this){if(gotoEnd){timers[i](true)
}timers.splice(i,1)
}}});
if(!gotoEnd){this.dequeue()
}return this
}});
var queue=function(elem,type,array){if(!elem){return undefined
}type=type||"fx";
var q=jQuery.data(elem,type+"queue");
if(!q||array){q=jQuery.data(elem,type+"queue",array?jQuery.makeArray(array):[])
}return q
};
jQuery.fn.dequeue=function(type){type=type||"fx";
return this.each(function(){var q=queue(this,type);
q.shift();
if(q.length){q[0].apply(this)
}})
};
jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};
opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:{slow:600,fast:200}[opt.duration])||400;
opt.old=opt.complete;
opt.complete=function(){if(opt.queue!==false){jQuery(this).dequeue()
}if(jQuery.isFunction(opt.old)){opt.old.apply(this)
}};
return opt
},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p
},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum
}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;
this.elem=elem;
this.prop=prop;
if(!options.orig){options.orig={}
}}});
jQuery.fx.prototype={update:function(){if(this.options.step){this.options.step.apply(this.elem,[this.now,this])
}(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);
if(this.prop=="height"||this.prop=="width"){this.elem.style.display="block"
}},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null){return this.elem[this.prop]
}var r=parseFloat(jQuery.css(this.elem,this.prop,force));
return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0
},custom:function(from,to,unit){this.startTime=(new Date()).getTime();
this.start=from;
this.end=to;
this.unit=unit||this.unit||"px";
this.now=this.start;
this.pos=this.state=0;
this.update();
var self=this;
function t(gotoEnd){return self.step(gotoEnd)
}t.elem=this.elem;
jQuery.timers.push(t);
if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;
for(var i=0;
i<timers.length;
i++){if(!timers[i]()){timers.splice(i--,1)
}}if(!timers.length){clearInterval(jQuery.timerId);
jQuery.timerId=null
}},13)
}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);
this.options.show=true;
this.custom(0,this.cur());
if(this.prop=="width"||this.prop=="height"){this.elem.style[this.prop]="1px"
}jQuery(this.elem).show()
},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);
this.options.hide=true;
this.custom(this.cur(),0)
},step:function(gotoEnd){var t=(new Date()).getTime();
if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;
this.pos=this.state=1;
this.update();
this.options.curAnim[this.prop]=true;
var done=true;
for(var i in this.options.curAnim){if(this.options.curAnim[i]!==true){done=false
}}if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;
this.elem.style.display=this.options.display;
if(jQuery.css(this.elem,"display")=="none"){this.elem.style.display="block"
}}if(this.options.hide){this.elem.style.display="none"
}if(this.options.hide||this.options.show){for(var p in this.options.curAnim){jQuery.attr(this.elem.style,p,this.options.orig[p])
}}}if(done&&jQuery.isFunction(this.options.complete)){this.options.complete.apply(this.elem)
}return false
}else{var n=t-this.startTime;
this.state=n/this.options.duration;
this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);
this.now=this.start+((this.end-this.start)*this.pos);
this.update()
}return true
}};
jQuery.fx.step={scrollLeft:function(fx){fx.elem.scrollLeft=fx.now
},scrollTop:function(fx){fx.elem.scrollTop=fx.now
},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now)
},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit
}};
jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;
if(elem){with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522,fixed=jQuery.css(elem,"position")=="fixed";
if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();
add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));
add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop)
}else{add(elem.offsetLeft,elem.offsetTop);
while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);
if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2){border(offsetParent)
}if(!fixed&&jQuery.css(offsetParent,"position")=="fixed"){fixed=true
}offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;
offsetParent=offsetParent.offsetParent
}while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(jQuery.css(parent,"display"))){add(-parent.scrollLeft,-parent.scrollTop)
}if(mozilla&&jQuery.css(parent,"overflow")!="visible"){border(parent)
}parent=parent.parentNode
}if((safari2&&(fixed||jQuery.css(offsetChild,"position")=="absolute"))||(mozilla&&jQuery.css(offsetChild,"position")!="absolute")){add(-doc.body.offsetLeft,-doc.body.offsetTop)
}if(fixed){add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop))
}}results={top:top,left:left}
}}function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true))
}function add(l,t){left+=parseInt(l)||0;
top+=parseInt(t)||0
}return results
}
})();
jQuery.dequeue=function(B,A){jQuery(B).dequeue(A)
};
jQuery.iUtil={getPosition:function(F){var A=0;
var H=0;
var G=F.style;
var E=false;
if(jQuery(F).css("display")=="none"){var B=G.visibility;
var D=G.position;
E=true;
G.visibility="hidden";
G.display="block";
G.position="absolute"
}var C=F;
while(C){A+=C.offsetLeft+(C.currentStyle&&!jQuery.browser.opera?parseInt(C.currentStyle.borderLeftWidth)||0:0);
H+=C.offsetTop+(C.currentStyle&&!jQuery.browser.opera?parseInt(C.currentStyle.borderTopWidth)||0:0);
C=C.offsetParent
}C=F;
while(C&&C.tagName&&C.tagName.toLowerCase()!="body"){A-=C.scrollLeft||0;
H-=C.scrollTop||0;
C=C.parentNode
}if(E==true){G.display="none";
G.position=D;
G.visibility=B
}return{x:A,y:H}
},getPositionLite:function(B){var A=0,C=0;
while(B){A+=B.offsetLeft||0;
C+=B.offsetTop||0;
B=B.offsetParent
}return{x:A,y:C}
},getSize:function(F){var A=jQuery.css(F,"width");
var D=jQuery.css(F,"height");
var E=0;
var H=0;
var G=F.style;
if(jQuery(F).css("display")!="none"){E=F.offsetWidth;
H=F.offsetHeight
}else{var B=G.visibility;
var C=G.position;
G.visibility="hidden";
G.display="block";
G.position="absolute";
E=F.offsetWidth;
H=F.offsetHeight;
G.display="none";
G.position=C;
G.visibility=B
}return{w:A,h:D,wb:E,hb:H}
},getSizeLite:function(A){return{wb:A.offsetWidth||0,hb:A.offsetHeight||0}
},getClient:function(C){var B,A,D;
if(C){A=C.clientWidth;
B=C.clientHeight
}else{D=document.documentElement;
A=window.innerWidth||self.innerWidth||(D&&D.clientWidth)||document.body.clientWidth;
B=window.innerHeight||self.innerHeight||(D&&D.clientHeight)||document.body.clientHeight
}return{w:A,h:B}
},getScroll:function(G){var D=0,B=0,A=0,E=0,C=0,F=0;
if(G&&G.nodeName.toLowerCase()!="body"){D=G.scrollTop;
B=G.scrollLeft;
A=G.scrollWidth;
E=G.scrollHeight;
C=0;
F=0
}else{if(document.documentElement){D=document.documentElement.scrollTop;
B=document.documentElement.scrollLeft;
A=document.documentElement.scrollWidth;
E=document.documentElement.scrollHeight
}else{if(document.body){D=document.body.scrollTop;
B=document.body.scrollLeft;
A=document.body.scrollWidth;
E=document.body.scrollHeight
}}C=self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0;
F=self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0
}return{t:D,l:B,w:A,h:E,iw:C,ih:F}
},getMargins:function(G,C){var E=jQuery(G);
var D=E.css("marginTop")||"";
var F=E.css("marginRight")||"";
var A=E.css("marginBottom")||"";
var B=E.css("marginLeft")||"";
if(C){return{t:parseInt(D)||0,r:parseInt(F)||0,b:parseInt(A)||0,l:parseInt(B)}
}else{return{t:D,r:F,b:A,l:B}
}},getPadding:function(G,C){var E=jQuery(G);
var D=E.css("paddingTop")||"";
var F=E.css("paddingRight")||"";
var A=E.css("paddingBottom")||"";
var B=E.css("paddingLeft")||"";
if(C){return{t:parseInt(D)||0,r:parseInt(F)||0,b:parseInt(A)||0,l:parseInt(B)}
}else{return{t:D,r:F,b:A,l:B}
}},getBorder:function(G,C){var E=jQuery(G);
var D=E.css("borderTopWidth")||"";
var F=E.css("borderRightWidth")||"";
var A=E.css("borderBottomWidth")||"";
var B=E.css("borderLeftWidth")||"";
if(C){return{t:parseInt(D)||0,r:parseInt(F)||0,b:parseInt(A)||0,l:parseInt(B)||0}
}else{return{t:D,r:F,b:A,l:B}
}},getPointer:function(B){var A=B.pageX||(B.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft))||0;
var C=B.pageY||(B.clientY+(document.documentElement.scrollTop||document.body.scrollTop))||0;
return{x:A,y:C}
},traverseDOM:function(A,B){B(A);
A=A.firstChild;
while(A){jQuery.iUtil.traverseDOM(A,B);
A=A.nextSibling
}},purgeEvents:function(A){jQuery.iUtil.traverseDOM(A,function(C){for(var B in C){if(typeof C[B]==="function"){C[B]=null
}}})
},centerEl:function(D,C){var A=jQuery.iUtil.getScroll();
var B=jQuery.iUtil.getSize(D);
if(!C||C=="vertically"){jQuery(D).css({top:A.t+((Math.max(A.h,A.ih)-A.t-B.hb)/2)+"px"})
}if(!C||C=="horizontally"){jQuery(D).css({left:A.l+((Math.max(A.w,A.iw)-A.l-B.wb)/2)+"px"})
}},fixPNG:function(B,D){var A=jQuery('img[@src*="png"]',B||document),C;
A.each(function(){C=this.src;
this.src=D;
this.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+C+"')"
})
}};
[].indexOf||(Array.prototype.indexOf=function(B,D){D=(D==null)?0:D;
var A=this.length;
for(var C=D;
C<A;
C++){if(this[C]==B){return C
}}return -1
});
jQuery.fxCheckTag=function(A){if(/^tr$|^td$|^tbody$|^caption$|^thead$|^tfoot$|^col$|^colgroup$|^th$|^body$|^header$|^script$|^frame$|^frameset$|^option$|^optgroup$|^meta$/i.test(A.nodeName)){return false
}else{return true
}};
jQuery.fx.destroyWrapper=function(C,A){var D=C.firstChild;
var B=D.style;
B.position=A.position;
B.marginTop=A.margins.t;
B.marginLeft=A.margins.l;
B.marginBottom=A.margins.b;
B.marginRight=A.margins.r;
B.top=A.top+"px";
B.left=A.left+"px";
C.parentNode.insertBefore(D,C);
C.parentNode.removeChild(C)
};
jQuery.fx.buildWrapper=function(E){if(!jQuery.fxCheckTag(E)){return false
}var K=jQuery(E);
var I=E.style;
var F=false;
if(K.css("display")=="none"){oldVisibility=K.css("visibility");
K.css("visibility","hidden").show();
F=true
}var C={};
C.position=K.css("position");
C.sizes=jQuery.iUtil.getSize(E);
C.margins=jQuery.iUtil.getMargins(E);
var D=E.currentStyle?E.currentStyle.styleFloat:K.css("float");
C.top=parseInt(K.css("top"))||0;
C.left=parseInt(K.css("left"))||0;
var L="w_"+parseInt(Math.random()*10000);
var G=document.createElement(/^img$|^br$|^input$|^hr$|^select$|^textarea$|^object$|^iframe$|^button$|^form$|^table$|^ul$|^dl$|^ol$/i.test(E.nodeName)?"div":E.nodeName);
jQuery.attr(G,"id",L);
var J=jQuery(G).addClass("fxWrapper");
var A=G.style;
var H=0;
var B=0;
if(C.position=="relative"||C.position=="absolute"){H=C.top;
B=C.left
}A.top=H+"px";
A.left=B+"px";
A.position=C.position!="relative"&&C.position!="absolute"?"relative":C.position;
A.height=C.sizes.hb+"px";
A.width=C.sizes.wb+"px";
A.marginTop=C.margins.t;
A.marginRight=C.margins.r;
A.marginBottom=C.margins.b;
A.marginLeft=C.margins.l;
A.overflow="hidden";
if(jQuery.browser.msie){A.styleFloat=D
}else{A.cssFloat=D
}if(jQuery.browser=="msie"){I.filter="alpha(opacity="+0.999*100+")"
}I.opacity=0.999;
E.parentNode.insertBefore(G,E);
G.appendChild(E);
I.marginTop="0px";
I.marginRight="0px";
I.marginBottom="0px";
I.marginLeft="0px";
I.position="absolute";
I.listStyle="none";
I.top="0px";
I.left="0px";
if(F){K.hide();
I.visibility=oldVisibility
}return{oldStyle:C,wrapper:jQuery(G)}
};
jQuery.fx.namedColors={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]};
jQuery.fx.parseColor=function(B,A){if(jQuery.fx.namedColors[B]){return{r:jQuery.fx.namedColors[B][0],g:jQuery.fx.namedColors[B][1],b:jQuery.fx.namedColors[B][2]}
}else{if(result=/^rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$/.exec(B)){return{r:parseInt(result[1]),g:parseInt(result[2]),b:parseInt(result[3])}
}else{if(result=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)$/.exec(B)){return{r:parseFloat(result[1])*2.55,g:parseFloat(result[2])*2.55,b:parseFloat(result[3])*2.55}
}else{if(result=/^#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/.exec(B)){return{r:parseInt("0x"+result[1]+result[1]),g:parseInt("0x"+result[2]+result[2]),b:parseInt("0x"+result[3]+result[3])}
}else{if(result=/^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/.exec(B)){return{r:parseInt("0x"+result[1]),g:parseInt("0x"+result[2]),b:parseInt("0x"+result[3])}
}else{return A==true?false:{r:255,g:255,b:255}
}}}}}};
jQuery.fx.cssProps={borderBottomWidth:1,borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,bottom:1,fontSize:1,height:1,left:1,letterSpacing:1,lineHeight:1,marginBottom:1,marginLeft:1,marginRight:1,marginTop:1,maxHeight:1,maxWidth:1,minHeight:1,minWidth:1,opacity:1,outlineOffset:1,outlineWidth:1,paddingBottom:1,paddingLeft:1,paddingRight:1,paddingTop:1,right:1,textIndent:1,top:1,width:1,zIndex:1};
jQuery.fx.colorCssProps={backgroundColor:1,borderBottomColor:1,borderLeftColor:1,borderRightColor:1,borderTopColor:1,color:1,outlineColor:1};
jQuery.fx.cssSides=["Top","Right","Bottom","Left"];
jQuery.fx.cssSidesEnd={borderWidth:["border","Width"],borderColor:["border","Color"],margin:["margin",""],padding:["padding",""]};
jQuery.fn.extend({animate:function(D,A,C,B){return this.queue(function(){var E=jQuery.speed(A,C,B);
var F=new jQuery.fxe(this,E,D)
})
},pause:function(A,B){return this.queue(function(){var C=jQuery.speed(A,B);
var D=new jQuery.pause(this,C)
})
},stop:function(A){return this.each(function(){if(this.animationHandler){jQuery.stopAnim(this,A)
}})
},stopAll:function(A){return this.each(function(){if(this.animationHandler){jQuery.stopAnim(this,A)
}if(this.queue&&this.queue.fx){this.queue.fx=[]
}})
}});
jQuery.extend({pause:function(C,B){var D=this,A;
D.step=function(){if(jQuery.isFunction(B.complete)){B.complete.apply(C)
}};
D.timer=setInterval(function(){D.step()
},B.duration);
C.animationHandler=D
},easing:{linear:function(C,E,A,D,B){return((-Math.cos(C*Math.PI)/2)+0.5)*D+A
}},fxe:function(C,O,B){var I=this,M;
var L=C.style;
var G=jQuery.css(C,"overflow");
var J=jQuery.css(C,"display");
var H={};
I.startTime=(new Date()).getTime();
O.easing=O.easing&&jQuery.easing[O.easing]?O.easing:"linear";
I.getValues=function(V,Q){if(jQuery.fx.cssProps[V]){if(Q=="show"||Q=="hide"||Q=="toggle"){if(!C.orig){C.orig={}
}var P=parseFloat(jQuery.curCSS(C,V));
C.orig[V]=P&&P>-10000?P:(parseFloat(jQuery.css(C,V))||0);
Q=Q=="toggle"?(J=="none"?"show":"hide"):Q;
O[Q]=true;
H[V]=Q=="show"?[0,C.orig[V]]:[C.orig[V],0];
if(V!="opacity"){L[V]=H[V][0]+(V!="zIndex"&&V!="fontWeight"?"px":"")
}else{jQuery.attr(L,"opacity",H[V][0])
}}else{H[V]=[parseFloat(jQuery.curCSS(C,V)),parseFloat(Q)||0]
}}else{if(jQuery.fx.colorCssProps[V]){H[V]=[jQuery.fx.parseColor(jQuery.curCSS(C,V)),jQuery.fx.parseColor(Q)]
}else{if(/^margin$|padding$|border$|borderColor$|borderWidth$/i.test(V)){var S=Q.replace(/\s+/g," ").replace(/rgb\s*\(\s*/g,"rgb(").replace(/\s*,\s*/g,",").replace(/\s*\)/g,")").match(/([^\s]+)/g);
switch(V){case"margin":case"padding":case"borderWidth":case"borderColor":S[3]=S[3]||S[1]||S[0];
S[2]=S[2]||S[0];
S[1]=S[1]||S[0];
for(var U=0;
U<jQuery.fx.cssSides.length;
U++){var R=jQuery.fx.cssSidesEnd[V][0]+jQuery.fx.cssSides[U]+jQuery.fx.cssSidesEnd[V][1];
H[R]=V=="borderColor"?[jQuery.fx.parseColor(jQuery.curCSS(C,R)),jQuery.fx.parseColor(S[U])]:[parseFloat(jQuery.curCSS(C,R)),parseFloat(S[U])]
}break;
case"border":for(var U=0;
U<S.length;
U++){var W=parseFloat(S[U]);
var X=!isNaN(W)?"Width":(!/transparent|none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset/i.test(S[U])?"Color":false);
if(X){for(var T=0;
T<jQuery.fx.cssSides.length;
T++){R="border"+jQuery.fx.cssSides[T]+X;
H[R]=X=="Color"?[jQuery.fx.parseColor(jQuery.curCSS(C,R)),jQuery.fx.parseColor(S[U])]:[parseFloat(jQuery.curCSS(C,R)),W]
}}else{L.borderStyle=S[U]
}}break
}}else{L[V]=Q
}}}return false
};
for(p in B){if(p=="style"){var A=jQuery.parseStyle(B[p]);
for(np in A){this.getValues(np,A[np])
}}else{if(p=="className"){if(document.styleSheets){for(var E=0;
E<document.styleSheets.length;
E++){var F=document.styleSheets[E].cssRules||document.styleSheets[E].rules||null;
if(F){for(var D=0;
D<F.length;
D++){if(F[D].selectorText=="."+B[p]){var K=new RegExp("."+B[p]+" {");
var N=F[D].style.cssText;
var A=jQuery.parseStyle(N.replace(K,"").replace(/}/g,""));
for(np in A){this.getValues(np,A[np])
}}}}}}}else{this.getValues(p,B[p])
}}}L.display=J=="none"?"block":J;
L.overflow="hidden";
I.step=function(){var Q=(new Date()).getTime();
if(Q>O.duration+I.startTime){clearInterval(I.timer);
I.timer=null;
for(R in H){if(R=="opacity"){jQuery.attr(L,"opacity",H[R][1])
}else{if(typeof H[R][1]=="object"){L[R]="rgb("+H[R][1].r+","+H[R][1].g+","+H[R][1].b+")"
}else{L[R]=H[R][1]+(R!="zIndex"&&R!="fontWeight"?"px":"")
}}}if(O.hide||O.show){for(var R in C.orig){if(R=="opacity"){jQuery.attr(L,R,C.orig[R])
}else{L[R]=""
}}}L.display=O.hide?"none":(J!="none"?J:"block");
L.overflow=G;
C.animationHandler=null;
if(jQuery.isFunction(O.complete)){O.complete.apply(C)
}}else{var T=Q-this.startTime;
var S=T/O.duration;
for(R in H){if(typeof H[R][1]=="object"){L[R]="rgb("+parseInt(jQuery.easing[O.easing](S,T,H[R][0].r,(H[R][1].r-H[R][0].r),O.duration))+","+parseInt(jQuery.easing[O.easing](S,T,H[R][0].g,(H[R][1].g-H[R][0].g),O.duration))+","+parseInt(jQuery.easing[O.easing](S,T,H[R][0].b,(H[R][1].b-H[R][0].b),O.duration))+")"
}else{var P=jQuery.easing[O.easing](S,T,H[R][0],(H[R][1]-H[R][0]),O.duration);
if(R=="opacity"){jQuery.attr(L,"opacity",P)
}else{L[R]=P+(R!="zIndex"&&R!="fontWeight"?"px":"")
}}}}};
I.timer=setInterval(function(){I.step()
},13);
C.animationHandler=I
},stopAnim:function(B,A){if(A){B.animationHandler.startTime-=100000000
}else{window.clearInterval(B.animationHandler.timer);
B.animationHandler=null;
jQuery.dequeue(B,"fx")
}}});
jQuery.parseStyle=function(B){var C={};
if(typeof B=="string"){B=B.toLowerCase().split(";");
for(var A=0;
A<B.length;
A++){rule=B[A].split(":");
if(rule.length==2){C[jQuery.trim(rule[0].replace(/\-(\w)/g,function(D,E){return E.toUpperCase()
}))]=jQuery.trim(rule[1])
}}}return C
};
jQuery.fn.Highlight=function(B,A,D,C){return this.queue("interfaceColorFX",function(){this.oldStyleAttr=jQuery(this).attr("style")||"";
C=typeof D=="string"?D:C||null;
D=typeof D=="function"?D:null;
var F=jQuery(this).css("backgroundColor");
var E=this.parentNode;
while(F=="transparent"&&E){F=jQuery(E).css("backgroundColor");
E=E.parentNode
}jQuery(this).css("backgroundColor",A);
if(typeof this.oldStyleAttr=="object"){this.oldStyleAttr=this.oldStyleAttr.cssText
}jQuery(this).animate({backgroundColor:F},B,C,function(){jQuery.dequeue(this,"interfaceColorFX");
if(typeof jQuery(this).attr("style")=="object"){jQuery(this).attr("style")["cssText"]="";
jQuery(this).attr("style")["cssText"]=this.oldStyleAttr
}else{jQuery(this).attr("style",this.oldStyleAttr)
}if(D){D.apply(this)
}})
})
};
jQuery.transferHelper=null;
jQuery.fn.TransferTo=function(A){return this.queue("interfaceFX",function(){new jQuery.fx.itransferTo(this,A)
})
};
jQuery.fx.itransferTo=function(A,C){if(jQuery.transferHelper==null){jQuery("body",document).append('<div id="transferHelper"></div>');
jQuery.transferHelper=jQuery("#transferHelper")
}jQuery.transferHelper.css("display","block").css("position","absolute");
var B=this;
B.el=jQuery(A);
if(!C||!C.to){return 
}if(C.to.constructor==String&&document.getElementById(C.to)){C.to=document.getElementById(C.to)
}else{if(!C.to.childNodes){return 
}}if(!C.duration){C.duration=500
}B.duration=C.duration;
B.to=C.to;
B.classname=C.className;
B.complete=C.complete;
if(B.classname){jQuery.transferHelper.addClass(B.classname)
}B.diffWidth=0;
B.diffHeight=0;
if(jQuery.boxModel){B.diffWidth=(parseInt(jQuery.transferHelper.css("borderLeftWidth"))||0)+(parseInt(jQuery.transferHelper.css("borderRightWidth"))||0)+(parseInt(jQuery.transferHelper.css("paddingLeft"))||0)+(parseInt(jQuery.transferHelper.css("paddingRight"))||0);
B.diffHeight=(parseInt(jQuery.transferHelper.css("borderTopWidth"))||0)+(parseInt(jQuery.transferHelper.css("borderBottomWidth"))||0)+(parseInt(jQuery.transferHelper.css("paddingTop"))||0)+(parseInt(jQuery.transferHelper.css("paddingBottom"))||0)
}B.start=jQuery.extend(jQuery.iUtil.getPosition(B.el.get(0)),jQuery.iUtil.getSize(B.el.get(0)));
B.end=jQuery.extend(jQuery.iUtil.getPosition(B.to),jQuery.iUtil.getSize(B.to));
B.start.wb-=B.diffWidth;
B.start.hb-=B.diffHeight;
B.end.wb-=B.diffWidth;
B.end.hb-=B.diffHeight;
B.callback=C.complete;
jQuery.transferHelper.css("width",B.start.wb+"px").css("height",B.start.hb+"px").css("top",B.start.y+"px").css("left",B.start.x+"px").animate({top:B.end.y,left:B.end.x,width:B.end.wb,height:B.end.hb},B.duration,function(){if(B.classname){jQuery.transferHelper.removeClass(B.classname)
}jQuery.transferHelper.css("display","none");
if(B.complete&&B.complete.constructor==Function){B.complete.apply(B.el.get(0),[B.to])
}jQuery.dequeue(B.el.get(0),"interfaceFX")
})
};
(function(E){E.fn.jqm=function(H){var F="jqmOverlay";
if(navigator.userAgent.toLowerCase().indexOf("mac")!=-1&&navigator.userAgent.toLowerCase().indexOf("firefox")!=-1){F="jqmOverlayMacFF"
}var A={zIndex:3000,overlay:50,overlayClass:F,closeClass:"jqmClose",trigger:".jqModal",ajax:false,target:false,modal:false,toTop:false,onShow:false,onHide:false,onLoad:false};
return this.each(function(){if(this._jqm){return 
}N++;
this._jqm=N;
L[N]={c:E.extend(A,H),a:false,w:E(this).addClass("jqmID"+N),s:N};
if(A.trigger){E(this).jqmAddTrigger(A.trigger)
}})
};
E.fn.jqmAddClose=function(A){K(this,A,"jqmHide");
return this
};
E.fn.jqmAddTrigger=function(A){K(this,A,"jqmShow");
return this
};
E.fn.jqmShow=function(A){return this.each(function(){if(!L[this._jqm].a){E.jqm.open(this._jqm,A)
}})
};
E.fn.jqmHide=function(A){return this.each(function(){if(L[this._jqm].a){E.jqm.close(this._jqm,A)
}})
};
E.jqm={hash:{},open:function(U,T){var O=L[U],P=O.c,H="."+P.closeClass,Q=(/^\d+$/.test(O.w.css("z-index")))?O.w.css("z-index"):P.zIndex,F=E("<div></div>").css({height:"100%",width:"100%",position:"fixed",left:0,top:0,"z-index":Q-1,opacity:P.overlay/100});
O.t=T;
O.a=true;
O.w.css("z-index",Q);
if(P.modal){if(!B[0]){M("bind")
}B.push(U);
F.css("cursor","wait")
}else{if(P.overlay>0){O.w.jqmAddClose(F)
}else{F=false
}}O.o=(F)?F.addClass(P.overlayClass).prependTo("body"):false;
if(D){E("html,body").css({height:"100%",width:"100%"});
if(F){F=F.css({position:"absolute"})[0];
for(var R in {Top:1,Left:1}){F.style.setExpression(R.toLowerCase(),"(_=(document.documentElement.scroll"+R+" || document.body.scroll"+R+"))+'px'")
}}}if(P.ajax){var A=P.target||O.w,S=P.ajax,A=(typeof A=="string")?E(A,O.w):E(A),S=(S.substr(0,1)=="@")?E(T).attr(S.substring(1)):S;
A.load(S,function(){if(P.onLoad){P.onLoad.call(this,O)
}if(H){O.w.jqmAddClose(E(H,O.w))
}J(O)
})
}else{if(H){O.w.jqmAddClose(E(H,O.w))
}}if(P.toTop&&O.o){O.w.before('<span id="jqmP'+O.w[0]._jqm+'"></span>').insertAfter(O.o)
}(P.onShow)?P.onShow(O):O.w.show();
J(O);
return false
},close:function(F){var A=L[F];
A.a=false;
if(B[0]){B.pop();
if(!B[0]){M("unbind")
}}if(A.c.toTop&&A.o){E("#jqmP"+A.w[0]._jqm).after(A.w).remove()
}if(A.c.onHide){A.c.onHide(A)
}else{A.w.hide();
if(A.o){A.o.remove()
}}return false
}};
var N=0,L=E.jqm.hash,B=[],D=E.browser.msie&&(E.browser.version=="6.0"),G=E('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({opacity:0}),J=function(A){if(D){if(A.o){A.o.html('<p style="width:100%;height:100%"/>').prepend(G)
}else{if(!E("iframe.jqm",A.w)[0]){A.w.prepend(G)
}}}I(A)
},I=function(A){try{E(":input:visible",A.w)[0].focus()
}catch(F){}},M=function(A){E()[A]("keypress",C)[A]("keydown",C)[A]("mousedown",C)
},C=function(H){var A=L[B[B.length-1]],F=(!E(H.target).parents(".jqmID"+A.s)[0]);
if(F){I(A)
}return !F
},K=function(A,H,O){var F=[];
A.each(function(){F.push(this._jqm)
});
E(H).each(function(){if(this[O]){E.extend(this[O],F)
}else{this[O]=F;
E(this).click(function(){for(var P in {jqmShow:1,jqmHide:1}){for(var Q in this[P]){if(L[this[P][Q]]){L[this[P][Q]].w[P](this)
}}}return false
})
}})
}
})(jQuery);
jQuery.autocomplete=function(N,F){var e=this;
this.input=N;
var B=jQuery(N).attr("autocomplete","off");
if(F.inputClass){B.addClass(F.inputClass)
}var T=document.createElement("div");
var D=jQuery(T);
D.hide().addClass(F.resultsClass).css("position","absolute");
if(F.width>0){D.css("width",F.width)
}jQuery("body").append(T);
N.autocompleter=e;
var K=null;
var R="";
var J=-1;
var O={};
var c=false;
var E=false;
var X=null;
function V(){O={};
O.data={};
O.length=0
}V();
B.keydown(function(f){X=f.keyCode;
switch(f.keyCode){case 38:f.preventDefault();
M(-1);
break;
case 40:f.preventDefault();
M(1);
break;
case 9:case 13:if(C()){B.get(0).blur();
f.preventDefault()
}break;
default:J=-1;
if(K){clearTimeout(K)
}K=setTimeout(function(){W()
},F.delay);
break
}}).focus(function(){E=true
}).blur(function(){E=false;
U()
});
Z();
function W(){if(X==46||(X>8&&X<32)){return D.hide()
}var f=B.val();
if(f==R){return 
}R=f;
if(f.length>=F.minChars){B.addClass(F.loadingClass);
Y(f)
}else{B.removeClass(F.loadingClass);
D.hide()
}}function M(g){var f=jQuery("li",T);
if(!f){return 
}J+=g;
if(J<0){J=0
}else{if(J>=f.size()){J=f.size()-1
}}f.removeClass("ac_over");
jQuery(f[J]).addClass("ac_over")
}function C(){var f=jQuery("li.ac_over",T)[0];
if(!f){var g=jQuery("li",T);
if(F.selectOnly){if(g.length==1){f=g[0]
}}else{if(F.selectFirst){f=g[0]
}}}if(f){I(f);
return true
}else{return false
}}function I(f){var h=B.get(0).autocompleter;
if(!f){f=document.createElement("li");
f.extra=[];
f.selectValue=""
}var g=jQuery.trim(f.selectValue?f.selectValue:f.innerHTML);
N.lastSelected=g;
R=g;
D.html("");
B.val(g);
Z();
if(F.onItemSelect){setTimeout(function(){F.onItemSelect(h,f)
},1)
}}function H(i,g){var h=B.get(0);
if(h.createTextRange){var f=h.createTextRange();
f.collapse(true);
f.moveStart("character",i);
f.moveEnd("character",g);
f.select()
}else{if(h.setSelectionRange){h.setSelectionRange(i,g)
}else{if(h.selectionStart){h.selectionStart=i;
h.selectionEnd=g
}}}h.focus()
}function Q(f){if(X!=8){B.val(B.val()+f.substring(R.length));
H(R.length,f.length)
}}function P(){var g=N;
var i=0;
while(g.tagName.toUpperCase()!="BODY"){if(jQuery(g).css("z-index")!="auto"){i=jQuery(g).css("z-index");
break
}else{g=g.parentNode
}}jQuery(N);
var h=S(N);
var f=(F.width>0)?F.width:B.width();
D.css({zIndex:i,width:parseInt(f)+"px",top:(h.y+N.offsetHeight)+"px",left:h.x+"px"}).show()
}function U(){if(K){clearTimeout(K)
}K=setTimeout(Z,200)
}function Z(){if(K){clearTimeout(K)
}B.removeClass(F.loadingClass);
if(D.is(":visible")){D.hide()
}if(F.mustMatch){var f=B.val();
if(f!=N.lastSelected){I(null)
}}}function L(g,f){if(f){B.removeClass(F.loadingClass);
T.innerHTML="";
if(!E||f.length==0){return Z()
}if(jQuery.browser.msie){D.append(document.createElement("iframe"))
}T.appendChild(a(f));
if(F.autoFill&&(B.val().toLowerCase()==g.toLowerCase())){Q(f[0][0])
}P()
}else{Z()
}}function A(j){if(!j){return null
}var f=[];
var h=j.split(F.lineSeparator);
for(var g=0;
g<h.length;
g++){var k=jQuery.trim(h[g]);
if(k){f[f.length]=k.split(F.cellSeparator)
}}return f
}function a(o){var m=document.createElement("ul");
var k=o.length;
if((F.maxItemsToShow>0)&&(F.maxItemsToShow<k)){k=F.maxItemsToShow
}for(var l=0;
l<k;
l++){var q=o[l];
if(!q){continue
}var g=document.createElement("li");
if(F.formatItem){g.innerHTML=F.formatItem(q,l,k);
g.selectValue=q[0]
}else{g.innerHTML=q[0];
g.selectValue=q[0]
}var f=null;
if(q.length>1){f=[];
for(var h=1;
h<q.length;
h++){f[f.length]=q[h]
}}g.extra=f;
m.appendChild(g);
jQuery(g).hover(function(){jQuery("li",m).removeClass("ac_over");
jQuery(this).addClass("ac_over");
J=jQuery("li",m).indexOf(jQuery(this).get(0))
},function(){jQuery(this).removeClass("ac_over")
}).click(function(i){i.preventDefault();
i.stopPropagation();
I(this)
})
}return m
}function Y(g){if(!F.matchCase){g=g.toLowerCase()
}var f=F.cacheLength?d(g):null;
if(f){L(g,f)
}else{if((typeof F.url=="string")&&(F.url.length>0)){jQuery.ajax({type:"GET",url:b(g),success:function(h){h=A(h);
G(g,h);
L(g,h)
},error:function(h,j,i){reloadSession(function(){Y(g)
},3000)
}})
}else{B.removeClass(F.loadingClass)
}}}function b(h){var f=F.url+"?q="+encodeURI(h);
for(var g in F.extraParams){f+="&"+g+"="+encodeURI(F.extraParams[g])
}return f
}function d(f){if(!f){return null
}if(O.data[f]){return O.data[f]
}return null
}this.flushCache=function(){V()
};
this.setExtraParams=function(f){F.extraParams=f
};
this.findValue=function(){var h=B.val();
var f=this;
if(!h.length){return 
}if(!F.matchCase){h=h.toLowerCase()
}var g=F.cacheLength?d(h):null;
if(g){this.findValueCallback(f,h,g)
}else{if((typeof F.url=="string")&&(F.url.length>0)){jQuery.ajax({type:"GET",url:b(h),success:function(i){i=A(i);
G(h,i);
f.findValueCallback(f,h,i)
},error:function(i,k,j){reloadSession(function(){f.findValue()
},3000)
}})
}else{this.findValueCallback(f,h,null)
}}};
this.findValueCallback=function(l,f,k){if(k){B.removeClass(F.loadingClass)
}var o=(k)?k.length:0;
var r=null;
for(var m=0;
m<o;
m++){var s=k[m];
if(s[0].toLowerCase()==f.toLowerCase()){r=document.createElement("li");
if(F.formatItem){r.innerHTML=F.formatItem(s,m,o);
r.selectValue=s[0]
}else{r.innerHTML=s[0];
r.selectValue=s[0]
}var g=null;
if(s.length>1){g=[];
for(var h=1;
h<s.length;
h++){g[g.length]=s[h]
}}r.extra=g
}}if(F.onFindValue){setTimeout(function(){F.onFindValue(l,r)
},1)
}};
function G(g,f){if(!f||!g||!F.cacheLength){return 
}if(!O.length||O.length>F.cacheLength){V();
O.length++
}else{if(!O[g]){O.length++
}}O.data[g]=f
}function S(g){var h=g.offsetLeft||0;
var f=g.offsetTop||0;
while(g=g.offsetParent){h+=g.offsetLeft;
f+=g.offsetTop
}return{x:h,y:f}
}};
jQuery.fn.autocomplete=function(B,A,C){A=A||{};
A.url=B;
A.inputClass=A.inputClass||"ac_input";
A.resultsClass=A.resultsClass||"ac_results";
A.lineSeparator=A.lineSeparator||"\n";
A.cellSeparator=A.cellSeparator||"|";
A.minChars=A.minChars||1;
A.delay=A.delay||400;
A.matchCase=A.matchCase||0;
A.matchSubset=0;
A.matchContains=0;
A.cacheLength=A.cacheLength||10;
A.mustMatch=A.mustMatch||0;
A.extraParams=A.extraParams||{};
A.loadingClass=A.loadingClass||"ac_loading";
A.selectFirst=A.selectFirst||false;
A.selectOnly=A.selectOnly||false;
A.maxItemsToShow=A.maxItemsToShow||-1;
A.autoFill=A.autoFill||false;
A.width=parseInt(A.width,10)||0;
this.each(function(){var D=this;
new jQuery.autocomplete(D,A)
});
return this
};
jQuery.fn.autocompleteArray=function(B,A){return this.autocomplete(null,A,B)
};
jQuery.fn.indexOf=function(B){for(var A=0;
A<this.length;
A++){if(this[A]==B){return A
}}return -1
};
(function(B){B.dimensions={version:"1.2"};
B.each(["Height","Width"],function(D,C){B.fn["inner"+C]=function(){if(!this[0]){return 
}var F=C=="Height"?"Top":"Left",E=C=="Height"?"Bottom":"Right";
return this.is(":visible")?this[0]["client"+C]:A(this,C.toLowerCase())+A(this,"padding"+F)+A(this,"padding"+E)
};
B.fn["outer"+C]=function(F){if(!this[0]){return 
}var H=C=="Height"?"Top":"Left",E=C=="Height"?"Bottom":"Right";
F=B.extend({margin:false},F||{});
var G=this.is(":visible")?this[0]["offset"+C]:A(this,C.toLowerCase())+A(this,"border"+H+"Width")+A(this,"border"+E+"Width")+A(this,"padding"+H)+A(this,"padding"+E);
return G+(F.margin?(A(this,"margin"+H)+A(this,"margin"+E)):0)
}
});
B.each(["Left","Top"],function(D,C){B.fn["scroll"+C]=function(E){if(!this[0]){return 
}return E!=undefined?this.each(function(){this==window||this==document?window.scrollTo(C=="Left"?E:B(window)["scrollLeft"](),C=="Top"?E:B(window)["scrollTop"]()):this["scroll"+C]=E
}):this[0]==window||this[0]==document?self[(C=="Left"?"pageXOffset":"pageYOffset")]||B.boxModel&&document.documentElement["scroll"+C]||document.body["scroll"+C]:this[0]["scroll"+C]
}
});
B.fn.extend({position:function(){var H=0,G=0,F=this[0],I,C,E,D;
if(F){E=this.offsetParent();
I=this.offset();
C=E.offset();
I.top-=A(F,"marginTop");
I.left-=A(F,"marginLeft");
C.top+=A(E,"borderTopWidth");
C.left+=A(E,"borderLeftWidth");
D={top:I.top-C.top,left:I.left-C.left}
}return D
},offsetParent:function(){var C=this[0].offsetParent;
while(C&&(!/^body|html$/i.test(C.tagName)&&B.css(C,"position")=="static")){C=C.offsetParent
}return B(C)
}});
function A(C,D){return parseInt(B.curCSS(C.jquery?C[0]:C,D,true))||0
}})(jQuery);
(function(C){var A=C.scrollTo=function(F,E,D){A.window().scrollTo(F,E,D)
};
A.defaults={axis:"y",duration:1};
A.window=function(){return C(C.browser.safari?"body":"html")
};
C.fn.scrollTo=function(F,E,D){if(typeof E=="object"){D=E;
E=0
}D=C.extend({},A.defaults,D);
E=E||D.speed||D.duration;
D.queue=D.queue&&D.axis.length>1;
if(D.queue){E/=2
}D.offset=B(D.offset);
D.over=B(D.over);
return this.each(function(){var M=this,K=C(M),L=F,J,H={},N=K.is("html,body");
switch(typeof L){case"number":case"string":if(/^([+-]=)?\d+(px)?$/.test(L)){L=B(L);
break
}L=C(L,this);
case"object":if(L.is||L.style){J=(L=C(L)).offset()
}}C.each(D.axis.split(""),function(R,S){var T=S=="x"?"Left":"Top",V=T.toLowerCase(),Q="scroll"+T,O=M[Q],P=S=="x"?"Width":"Height",U=P.toLowerCase();
if(J){H[Q]=J[V]+(N?0:O-K.offset()[V]);
if(D.margin){H[Q]-=parseInt(L.css("margin"+T))||0;
H[Q]-=parseInt(L.css("border"+T+"Width"))||0
}H[Q]+=D.offset[V]||0;
if(D.over[V]){H[Q]+=L[U]()*D.over[V]
}}else{H[Q]=L[V]
}if(/^\d+$/.test(H[Q])){H[Q]=H[Q]<=0?0:Math.min(H[Q],G(P))
}if(!R&&D.queue){if(O!=H[Q]){I(D.onAfterFirst)
}delete H[Q]
}});
I(D.onAfter);
function I(O){if(H.scrollTop){K.scrollTop(H.scrollTop)
}if(H.scrollLeft){K.scrollLeft(H.scrollLeft)
}}function G(O){var P=N?C.browser.opera?document.body:document.documentElement:M;
return P["scroll"+O]-P["client"+O]
}})
};
function B(D){return typeof D=="object"?D:{top:D,left:D}
}})(jQuery);
(function(A){A.fn.hoverIntent=function(I,H){var J={sensitivity:7,interval:100,timeout:0};
J=A.extend(J,H?{over:I,out:H}:I);
var L,K,F,D;
var E=function(M){L=M.pageX;
K=M.pageY
};
var C=function(N,M){M.hoverIntent_t=clearTimeout(M.hoverIntent_t);
if((Math.abs(F-L)+Math.abs(D-K))<J.sensitivity){A(M).unbind("mousemove",E);
M.hoverIntent_s=1;
return J.over.apply(M,[N])
}else{F=L;
D=K;
M.hoverIntent_t=setTimeout(function(){C(N,M)
},J.interval)
}};
var G=function(N,M){M.hoverIntent_t=clearTimeout(M.hoverIntent_t);
M.hoverIntent_s=0;
return J.out.apply(M,[N])
};
var B=function(P){var O=(P.type=="mouseover"?P.fromElement:P.toElement)||P.relatedTarget;
while(O&&O!=this){try{O=O.parentNode
}catch(P){O=this
}}if(O==this){return false
}var N=jQuery.extend({},P);
var M=this;
if(M.hoverIntent_t){M.hoverIntent_t=clearTimeout(M.hoverIntent_t)
}if(P.type=="mouseover"){F=N.pageX;
D=N.pageY;
A(M).bind("mousemove",E);
if(M.hoverIntent_s!=1){M.hoverIntent_t=setTimeout(function(){C(N,M)
},J.interval)
}}else{A(M).unbind("mousemove",E);
if(M.hoverIntent_s==1){M.hoverIntent_t=setTimeout(function(){G(N,M)
},J.timeout)
}}};
return this.mouseover(B).mouseout(B)
}
})(jQuery);
/* http://wikispaces.com/ Copyright 2005 Tangient LLC */
function pop(url,w,h){id=Math.floor(Math.random()*10000);
eval("pop_"+id+" = window.open(url, '"+id+"', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=' + w + ',height=' + h);")
}function htod(A){return parseInt(A,16)
}var jsDebugMode=false;
if(document.cookie&&document.cookie.indexOf("debug_js=")!=-1){jsDebugMode=true
}function log(){var F="";
for(var D=0;
D<arguments.length;
D++){var G=dumpObject(arguments[D]);
if(G){F+=G+"\n"
}else{F+=arguments[D]+"\n"
}}if(jsDebugMode){if(window.console){window.console.log(arguments)
}else{var E=document.getElementById("loggingConsole");
if(!E){E=document.createElement("textarea");
E.id="loggingConsole";
E.cols="150";
E.rows="10";
document.getElementsByTagName("body")[0].appendChild(E)
}E.value+="\n"+F
}}if(typeof startupFinished=="undefined"||!startupFinished){var C=document.getElementById("startupLog");
if(C){C.value+="\n"+F
}}var H=document.getElementById("ringLog");
var B=1000;
if(H){H.value+="\n"+F;
var A=H.value.split("\n");
if(A.length>B){A=A.slice(A.length-B,A.length)
}H.value=A.join("\n")
}}function dumpObject(B){var A="";
if(B){if(B.nodeType==1){A+="Element Object (tag: "+B.nodeName+")";
if(B.id){A+=" (id: "+B.id+")"
}}else{if(B.nodeType==3){A+="Text Object (length: "+B.data.length+') (data: "'+B.data+'")'
}}return A
}return false
}function highlightIncludeSection(B,D){B.className="includeEditButtonActive";
var C=document.getElementsByClassName("includeBody-"+D);
for(var A=0;
A<C.length;
A++){C[A].className="includeBodyActive includeBody-"+D
}}function unHighlightIncludeSection(B,D){B.className="includeEditButton";
var C=document.getElementsByClassName("includeBody-"+D);
for(var A=0;
A<C.length;
A++){C[A].className="includeBody includeBody-"+D
}}jQuery(document).ready(function(){jQuery("body").click(function(A){if(!jQuery(A.target).parents("#WikiPageSubMenu").length){jQuery("#WikiPageSubMenu").addClass("WikiPageSubMenuDisabled").removeClass("WikiPageSubMenuEnabled")
}});
jQuery("#WikiPageSubMenuControl").click(function(A){A.preventDefault();
A.stopPropagation();
jQuery("#WikiPageSubMenu").toggleClass("WikiPageSubMenuDisabled").toggleClass("WikiPageSubMenuEnabled");
return false
});
jQuery(".WikiPageSubMenuEntry").click(function(A){if(jQuery(A.target).children("a").length==1){window.location=jQuery(A.target).children("a")[0].href
}});
jQuery("a.userLink").click(function(B){var A=jQuery(this);
jQuery(".userMenu").remove();
var C=document.createElement("div");
C.className="userMenu";
document.body.appendChild(C);
var D=A.attr("href").substring(A.attr("href").lastIndexOf("/")+1);
jQuery(C).load("/user/menu/"+D,{},function(){var E=jQuery(this);
E.fadeIn("slow");
E.css("position","absolute");
E.css("left",A.offset().left-3);
E.css("top",A.offset().top-8)
});
B.stopPropagation();
return false
});
jQuery("body").click(function(){jQuery(".userMenu").remove()
})
});
function embed_odeo(A){document.writeln('<embed src="http://odeo.com/flash/audio_player_fullsize.swf" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" quality="high" width="440" height="80" wmode="transparent" allowScriptAccess="any" flashvars="valid_sample_rate=true&external_url='+A+'"></embed>')
}function embed_quicktime(E,C,D,A,F,G,B){if(G!=""){document.writeln('<embed type="'+E+'" style="cursor:hand; cursor:pointer;" href="'+F+'" src="'+G+'" width="'+D+'" height="'+A+'" autoplay="false" target="myself" controller="false" loop="'+B+'" scale="aspect" bgcolor="'+C+'" pluginspage="http://www.apple.com/quicktime/download/"></embed>')
}else{document.writeln('<embed type="'+E+'" style="cursor:hand; cursor:pointer;" src="'+F+'" width="'+D+'" height="'+A+'" autoplay="false" target="myself" controller="true" loop="'+B+'" scale="aspect" bgcolor="'+C+'" pluginspage="http://www.apple.com/quicktime/download/"></embed>')
}}function embed_flash(C,E,A,F,B,D){document.writeln('<embed src="'+F+'" pluginspage="http://www.macromedia.com/go/getflashplayer" type="'+D+'" quality="high" width="'+E+'" height="'+A+'" bgcolor="'+C+'" loop="'+B+'"></embed>')
}function embed_flv(D,A,E,F,B,C){document.writeln('<embed src="'+C+'" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" quality="high" width="'+D+'" height="'+A+'" wmode="transparent" flashvars="file='+E+"&autostart=false&repeat="+B+"&showdigits=true&showfsbutton=false&width="+D+"&height="+A+'"></embed>')
}function embed_wmedia(B,A,C){document.writeln('<embed type="application/x-mplayer2" src="'+C+'" autosize="1" width="'+B+'" height="'+A+'" showcontrols="1" showstatusbar="0" showdisplay="0" autostart="0"></embed>')
}function embed_generic(B,A,C,D){document.writeln('<embed src="'+C+'" type="'+D+'" quality="high" width="'+B+'" height="'+A+'"></embed>')
}function enableDelayedImages(A){jQuery("#"+A+" img").each(function(B){var C=jQuery(this);
if(C){C.attr("src",C.attr("longdesc"));
C.removeAttr("longdesc")
}})
}var sessionReloadAttempt=0;
function reloadSessionSuccess(){sessionReloadAttempt=0
}function reloadSession(E,C,B){log("reloadSession",E,"attempt "+sessionReloadAttempt);
if(sessionReloadAttempt>4){if(B){alert(B)
}return 
}else{var D=(new Date()).getTime();
var A='<iframe id="sessionReloadIfr'+sessionReloadAttempt+'" src="/space/sessionreload?_='+D+'" name="sessionReloadIfr'+sessionReloadAttempt+'" style="display: none; width:0; height:0; border:0; padding:0; margin:0; visibility: hidden;"></iframe>';
jQuery("body").append(A);
sessionReloadAttempt++;
setTimeout(E,C)
}}function fixEmbedLayers(){jQuery("embed").attr("wmode","transparent");
jQuery("object").each(function(){var A=jQuery(this).find("param[name='wmode']");
if(A.length==0){jQuery(this).prepend('<param name="wmode" value="transparent"/>');
jQuery(this).html(jQuery(this).html())
}})
};