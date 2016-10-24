CSSSupport=
{
	d:document.createElement("detect"),
	CSSprefix:"Webkit,Moz,O,ms,Khtml".split(","),
	// test prefixed code
	TestPrefixes:function(prop) 
	{
		var
			Uprop = prop.charAt(0).toUpperCase() + prop.substr(1),
			All = (prop + ' ' + this.CSSprefix.join(Uprop + ' ') + Uprop).split(' ');
		for (var n = 0, np = All.length; n < np; n++) {
			if (this.d.style[All[n]] === "") return true;
		}
        return false;
	}

}