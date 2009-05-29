jQuery.noConflict(); 
jQuery(function()
{
	var wym_editors_loaded = 0;
	jQuery('.wymeditor').wymeditor(
	{
	  skin: 'refinery'
	  , iframeBasePath: '/wymeditor/iframe/refinery/'
	  , toolsItems: [
	      {'name': 'Bold', 'title': 'Bold', 'css': 'wym_tools_strong'} 
	      ,{'name': 'Italic', 'title': 'Emphasis', 'css': 'wym_tools_emphasis'}
	      ,{'name': 'InsertOrderedList', 'title': 'Ordered_List', 'css': 'wym_tools_ordered_list'}
	      ,{'name': 'InsertUnorderedList', 'title': 'Unordered_List', 'css': 'wym_tools_unordered_list'}
	      ,{'name': 'CreateLink', 'title': 'Link', 'css': 'wym_tools_link'}
	      ,{'name': 'Unlink', 'title': 'Unlink', 'css': 'wym_tools_unlink'}
	      ,{'name': 'InsertImage', 'title': 'Image', 'css': 'wym_tools_image'}
	      ,{'name': 'InsertTable', 'title': 'Table', 'css': 'wym_tools_table'}
	      ,{'name': 'ToggleHtml', 'title': 'HTML', 'css': 'wym_tools_html'}
	  ]
 
		,toolsHtml: "<ul class='wym_tools wym_section'>" + WYMeditor.TOOLS_ITEMS  + "</ul>"

		,toolsItemHtml: 
			"<li class='" + WYMeditor.TOOL_CLASS + "'>"
				+ "<a href='#' name='" + WYMeditor.TOOL_NAME + "' title='" + WYMeditor.TOOL_TITLE + "'>"	+ WYMeditor.TOOL_TITLE	+ "</a>"
			+ "</li>"
 
	  //containersItems will be appended after tools in postInit.
		, containersItems: [
	      {'name': 'h1', 'title':'Heading_1', 'css':'wym_containers_h1'}
	      ,{'name': 'h2', 'title':'Heading_2', 'css':'wym_containers_h2'}
	      ,{'name': 'h3', 'title':'Heading_3', 'css':'wym_containers_h3'}
	      ,{'name': 'p', 'title':'Paragraph', 'css':'wym_containers_p'}
	  ]    

		, containersHtml: "<ul class='wym_containers wym_section'>" + WYMeditor.CONTAINERS_ITEMS + "</ul>"

		, containersItemHtml:
				"<li class='" + WYMeditor.CONTAINER_CLASS + "'>"
					+ "<a href='#' name='" + WYMeditor.CONTAINER_NAME + "' title='" + WYMeditor.CONTAINER_TITLE + "'></a>"
				+ "</li>"
 
	  , boxHtml: 
		"<div class='wym_box'>"
			+ "<div class='wym_area_top'>" 
				+ WYMeditor.TOOLS 
				+ WYMeditor.CONTAINERS
			+ "</div>"
			+ "<div class='wym_area_main'>"
				+ WYMeditor.HTML
				+ WYMeditor.IFRAME
				+ WYMeditor.STATUS
			+ "</div>"
		+ "</div>"
                 
		, iframeHtml:   
			"<div class='wym_iframe wym_section'>"
	     	+ "<iframe src='" + WYMeditor.IFRAME_BASE_PATH + "wymiframe.html' frameborder='0'"
	      	+ "onload='this.contentWindow.parent.WYMeditor.INSTANCES[" + WYMeditor.INDEX + "].initIframe(this)'>"
				+ "</iframe>"
			+"</div>"

		, dialogDraggable: true

		, dialogImageHtml: ""

	  , dialogLinkHtml: ""
	
		, dialogTableHtml: 
			"<div class='wym_dialog wym_dialog_table'>"
      	+ "<form>"
        	+ "<input type='hidden' id='wym_dialog_type' class='wym_dialog_type' value='"+ WYMeditor.DIALOG_TABLE + "' />"
          + "<div class='field'>"
          	+ "<label for='wym_caption'>{Caption}</label>"
						+ "<input type='text' id='wym_caption' class='wym_caption' value='' size='40' />"
					+ "</div>"
					+ "<div class='field'>"
						+ "<label for='wym_rows'>{Number_Of_Rows}</label>"
						+ "<input type='text' id='wym_rows' class='wym_rows' value='3' size='3' />"
					+ "</div>"
					+ "<div class='field'>"
						+ "<label for='wym_cols'>{Number_Of_Cols}</label>"
						+ "<input type='text' id='wym_cols' class='wym_cols' value='2' size='3' />"
					+ "</div>"
					+ "<div class='form-actions'>"
						+ "<input class='wym_submit' type='button' value='{Insert}' />"
						+ " or "
						+ "<a class='wym_cancel' type='button' href=''>{Cancel}</a>"
					+ "</div>"
				+ "</form>"
			+ "</div>"

	  , dialogFeatures: "?width=928&height=460&modal=true&titlebar=true&auto_size_content=true"
		, dialogInlineFeatures: "?width=600&height=320&modal=true&titlebar=true&auto_size_content=true"

		, dialogId: 'TB_window'

	  , dialogHtml:
			"<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>"
			+ "<html dir='" + WYMeditor.DIRECTION + "'>"
				+ "<head>"
					+ "<link rel='stylesheet' type='text/css' media='screen' href='" + WYMeditor.CSS_PATH + "' />"
					+ "<title>" + WYMeditor.DIALOG_TITLE + "</title>"
					+ "<script type='text/javascript' src='" + WYMeditor.JQUERY_PATH + "'></script>"
					+ "<script type='text/javascript' src='" + WYMeditor.WYM_PATH + "'></script>"
				+ "</head>"
	      + "<div id='page'>" + WYMeditor.DIALOG_BODY + "</div>"
			+ "</html>"
 
	  , postInit: function(wym)
	  {
			wym._iframe.style.height = wym._element.height() + "px";

			$$('.wym_area_top a[title]').each(function(element) 
			{
				new Tooltip(element, {mouseFollow:false, delay: 0, opacity: 1, appearDuration:0, hideDuration: 0, rounded:false});
			});
			
			wym_editors_loaded += 1;			
			if(WYMeditor.INSTANCES.length == wym_editors_loaded){
				WYMeditor.loaded();
			}
		}
	});

});

WYMeditor.XhtmlParser.prototype.normalizeTag = function(tag)
{
    // hack to solve unknown issue of whole page being eaten by safari on dialog open. (TODO: revisit)
    if (jQuery.browser.safari && tag.id == "content")
    {}
    else
    {
        tag = tag.replace(/^([\s<\/>]*)|([\s<\/>]*)$/gm,'').toLowerCase();
    }
    var tags = this._Listener.getTagReplacements();
    return tags[tag] ? tags[tag] : tag;
};

// custom function added by us to hook into when all wymeditor instances on the page have finally loaded:
WYMeditor.loaded = function(){}