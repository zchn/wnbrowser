/* c75251a47aa40eacc28222bed9536ef5 */
/* http://wikispaces.com/ Copyright 2008 Tangient LLC */
var insertImageInEditor=insertImageInVisualEditor;
var editorSubmit=visualEditorSubmit;
var insertInEditor=insertHTML;
var insertCode=insertCodeInVisualEditor;
var editorBold=function(){rteCommand(currentRTE,"bold","")
};
var editorItalic=function(){rteCommand(currentRTE,"italic","")
};
var editorUnderline=function(){rteCommand(currentRTE,"underline","")
};
var editorOL=function(){rteCommand(currentRTE,"insertorderedlist","")
};
var editorUL=function(){rteCommand(currentRTE,"insertunorderedlist","")
};
var editorHR=function(){rteCommand(currentRTE,"inserthorizontalrule","")
};
var editorInsertLink=function(){dlgInsertLink(currentRTE,"link")
};
var editorRemoveLink=function(){rteCommand(currentRTE,"unlink","")
};
var editorInsertImage=function(){toggleImageEditTool();
return false
};
var editorEmbedMedia=visualEditorEmbedMedia;
var editorSelectFont=function(A){selectFont(currentRTE,A.id);
updateHierarchy()
};
var editorInsertChar=function(){var D=500;
var A=200;
var C=(screen.availWidth-D)/2;
var B=(screen.availHeight-A)/2;
window.open("/s/rte/insert_char.htm","InsertChar","width="+D+",height="+A+",status=yes,resizable=yes,left="+C+",top="+B);
return false
};