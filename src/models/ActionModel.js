var fields_reducers = {
	"id_action": (value) => value.length > 0,
	"activity": (value) => value.length > 0
};


var ActionModel = function(params) {
	this.id_action = params.id_ation || "";
	this.activity = params.activity || "";
}

ActionModel.prototype.create = function() {

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


module.exports = ActionModel;