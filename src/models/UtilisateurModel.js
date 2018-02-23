var fields_reducers = {
	"id": (value) => value.length > 0,
	"name": (value) => value.length > 0
};


var UtilisateurModel = function(params) {
	this.id = params.id || "";
	this.name = params.name || "";
}

UtilisateurModel.prototype.create = function() {

	var valid = true;

	var keys = Object.keys(fields_reducers);

	for (var i = 0; i < keys.length; i++)
	{
		if ( typeof this[keys[i]] != typeof undefined ) {
			if ( !fields_reducers[keys[i]](this[keys[i]]) )
			{
				valid = false;
			}
		}
		else
		{
			valid = false;
		}
	}

	if (valid) {
		return this;
	} else {
		return undefined;
	}
}


module.exports = UtilisateurModel;