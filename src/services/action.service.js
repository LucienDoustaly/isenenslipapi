"use strict";

const Database = require("../adapters/Database");
const Models = require("../models");
const { MoleculerError } = require("moleculer").Errors;

module.exports = {
	name: "action",

	settings: {
 		state: {

 		}
	},

	actions: {

		//	call "action.getAll"
		getAll: {
			params: {

			},
			handler(ctx) {
				return Database()
					.then((db) => {
						return db.get("action").value();
					});
			}
		},


		//	call "action.get" --id_action "ab@ab"
		get: {
			params: {
				id_action: "string"
			},
			handler(ctx) {
				return ctx.call("action.verify", { id_action: ctx.params.id_action })
				.then((exists) => {
					if (exists) {
						return Database()
							.then((db) => {
								var action = db.get("action").find({ id_action: ctx.params.id_action }).value();;
								return action;
							})
							.catch(() => {
								return new MoleculerError("Action", 500, "ERR_CRITIAL", { code: 500, message: "Critical error" } )
							});
					} else {
						return new MoleculerError("Action", 404, "NOT FOUND", { code: 404, message: "Action doesn't exists" } )
					}
				})
			}
		},

		//	call "action.verify" --id_action
		verify: {
			params: {
				id_action: "string"
			},
			handler(ctx) {
				return Database()
					.then((db) => {
						var value = db.get("action")
										.filter({ id_action: ctx.params.id_action })
										.value();
						return value.length > 0 ? true : false;
					})
			}
		}
	}
}