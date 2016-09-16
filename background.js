chrome.storage.local.set({"links":[]});

// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  var linkUrl = info.linkUrl;

  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

function linkClick(info, tab){
	console.log("Item info " + JSON.stringify(info));
	var linkUrl = info.linkUrl;
	console.log("url: " + linkUrl);

	chrome.storage.local.get("test", function(result){
		console.log("TEST " + result);
	});

	// Grab the already saved links
	chrome.storage.local.get("links", function(result){
		console.log("links already saved= " + result.links);
		//Add link to save onto existing links
		var linksToSave = result.links;
		linksToSave.push(linkUrl);
		chrome.storage.local.set({"links": linksToSave}, function(){
			console.log("Saved links: " + linksToSave);
			});
		}
	);
}

//Make the context menu item on links
var context = "link"
var title = "LinkSaver"
var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": linkClick});
console.log("'" + context + "' item:" + id);