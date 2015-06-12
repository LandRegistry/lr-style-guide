


if(!Function.prototype.bind){Function.prototype.bind=function(oThis){if(typeof this!=="function"){
 throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");}
var aArgs=Array.prototype.slice.call(arguments,1),fToBind=this,fNOP=function(){},fBound=function(){return fToBind.apply(this instanceof fNOP&&oThis?this:oThis,aArgs.concat(Array.prototype.slice.call(arguments)));};fNOP.prototype=this.prototype;fBound.prototype=new fNOP();return fBound;};}
(function(){"use strict";var root=this,$=root.jQuery;if(typeof GOVUK==='undefined'){root.GOVUK={};}
var SelectionButtons=function(elmsOrSelector,opts){var $elms;this.selectedClass='selected';this.focusedClass='focused';if(opts!==undefined){$.each(opts,function(optionName,optionObj){this[optionName]=optionObj;}.bind(this));}
if(typeof elmsOrSelector==='string'){$elms=$(elmsOrSelector);this.selector=elmsOrSelector;this.setInitialState($(this.selector));}else{this.$elms=elmsOrSelector;this.setInitialState(this.$elms);}
this.addEvents();};SelectionButtons.prototype.addEvents=function(){if(typeof this.$elms!=='undefined'){this.addElementLevelEvents();}else{this.addDocumentLevelEvents();}};SelectionButtons.prototype.setInitialState=function($elms){$elms.each(function(idx,elm){var $elm=$(elm);if($elm.is(':checked')){this.markSelected($elm);}}.bind(this));};SelectionButtons.prototype.markFocused=function($elm,state){if(state==='focused'){$elm.parent('label').addClass(this.focusedClass);}else{$elm.parent('label').removeClass(this.focusedClass);}};SelectionButtons.prototype.markSelected=function($elm){var radioName;if($elm.attr('type')==='radio'){radioName=$elm.attr('name');$($elm[0].form).find('input[name="'+radioName+'"]').parent('label').removeClass(this.selectedClass);$elm.parent('label').addClass(this.selectedClass);}else{ if($elm.is(':checked')){$elm.parent('label').addClass(this.selectedClass);}else{$elm.parent('label').removeClass(this.selectedClass);}}};SelectionButtons.prototype.addElementLevelEvents=function(){this.clickHandler=this.getClickHandler();this.focusHandler=this.getFocusHandler({'level':'element'});this.$elms.on('click',this.clickHandler).on('focus blur',this.focusHandler);};SelectionButtons.prototype.addDocumentLevelEvents=function(){this.clickHandler=this.getClickHandler();this.focusHandler=this.getFocusHandler({'level':'document'});$(document).on('click',this.selector,this.clickHandler).on('focus blur',this.selector,this.focusHandler);};SelectionButtons.prototype.getClickHandler=function(){return function(e){this.markSelected($(e.target));}.bind(this);};SelectionButtons.prototype.getFocusHandler=function(opts){var focusEvent=(opts.level==='document')?'focusin':'focus';return function(e){var state=(e.type===focusEvent)?'focused':'blurred';this.markFocused($(e.target),state);}.bind(this);};SelectionButtons.prototype.destroy=function(){if(typeof this.selector!=='undefined'){$(document).off('click',this.selector,this.clickHandler).off('focus blur',this.selector,this.focusHandler);}else{this.$elms.off('click',this.clickHandler).off('focus blur',this.focusHandler);}};root.GOVUK.SelectionButtons=SelectionButtons;}).call(this);


(function(){
 function addEvent(node,type,callback){if(node.addEventListener){node.addEventListener(type,function(e){callback(e,e.target);},false);}else if(node.attachEvent){node.attachEvent('on'+type,function(e){callback(e,e.srcElement);});}} 
function addClickEvent(node,callback){ addEvent(node,'keypress',function(e,target){if(target.nodeName==="SUMMARY"){if(e.keyCode===32){if(e.preventDefault){e.preventDefault();}else{e.returnValue=false;}}}});addEvent(node,'keyup',function(e,target){if(e.keyCode===13||e.keyCode===32){callback(e,target);}});addEvent(node,'mouseup',function(e,target){callback(e,target);});} 
function getAncestor(node,match){do{if(!node||node.nodeName.toLowerCase()===match){break;}}while(node=node.parentNode);return node;}
 
var started=false; function addDetailsPolyfill(list){
 if(started){return;}
started=true;
 if((list=document.getElementsByTagName('details')).length===0){return;} 
var n=list.length,i=0;for(n;i<n;i++){var details=list[i]; details.__native=typeof(details.open)=='boolean'; details.__summary=details.getElementsByTagName('summary').item(0);details.__content=details.getElementsByTagName('div').item(0);
 if(!details.__content.id){details.__content.id='details-content-'+i;} 
details.setAttribute('role','group'); details.__summary.setAttribute('role','button'); details.__summary.setAttribute('aria-controls',details.__content.id);
 details.__summary.tabIndex=0;
 if(details.open===true){details.__summary.setAttribute('aria-expanded','true');details.__content.setAttribute('aria-hidden','false');details.__content.style.display='block';} 
if(details.open===false){details.__summary.setAttribute('aria-expanded','false');details.__content.setAttribute('aria-hidden','true');details.__content.style.display='none';} 
if(!details.__native){ var twisty=document.createElement('i');
 if(details.getAttribute('open')===""){details.__summary.setAttribute('aria-expanded','true');details.__content.setAttribute('aria-hidden','false');} 
if(details.getAttribute('open')==null||details.getAttribute('open')=="undefined"){details.__summary.setAttribute('aria-expanded','false');details.__content.setAttribute('aria-hidden','true');details.__content.style.display='none';}}
 
details.__summary.__details=details;
 if(!details.__native){var twisty=document.createElement('i');if(details.getAttribute('open')===""){twisty.className='arrow arrow-open';twisty.appendChild(document.createTextNode('\u25bc'));}else{twisty.className='arrow arrow-closed';twisty.appendChild(document.createTextNode('\u25ba'));}
details.__summary.__twisty=details.__summary.insertBefore(twisty,details.__summary.firstChild);details.__summary.__twisty.setAttribute('aria-hidden','true');}}
 
function statechange(summary){var expanded=summary.__details.__summary.getAttribute('aria-expanded')=='true';var hidden=summary.__details.__content.getAttribute('aria-hidden')=='true';summary.__details.__summary.setAttribute('aria-expanded',(expanded?'false':'true'));summary.__details.__content.setAttribute('aria-hidden',(hidden?'false':'true'));summary.__details.__content.style.display=(expanded?'none':'block');if(summary.__twisty){summary.__twisty.firstChild.nodeValue=(expanded?'\u25ba':'\u25bc');summary.__twisty.setAttribute('class',(expanded?'arrow arrow-closed':'arrow arrow-open'));}
return true;} 
addClickEvent(document,function(e,summary){if(!(summary=getAncestor(summary,'summary'))){return true;}
return statechange(summary);});}

 
addEvent(document,'DOMContentLoaded',addDetailsPolyfill);addEvent(window,'load',addDetailsPolyfill);})();$(function(){$('.case-list .summary td:first-child').wrapInner('<a href="#"></a>');$('.case-list .details').attr('aria-hidden','true');$('.case-list').on('click','.summary',function(e){e.preventDefault();var $el=$(this).next();var hidden=($el.attr('aria-hidden')?'false':'true');$el.toggleClass('js-hidden').attr('aria-hidden',hidden);});});$(function(){ jQuery.fx.off=true;
 var $blockLabels=$(".block-label input[type='radio'], .block-label input[type='checkbox']");new GOVUK.SelectionButtons($blockLabels);
});