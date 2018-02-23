"use strict";

const Database = require("../adapters/Database");
const Models = require("../models");
const { MoleculerError } = require("moleculer").Errors;

module.exports = {
	name: "user",

	settings: {
 		state: {

 		}
	},

	actions: {

		//	call "user.getAll"
		getAll: {
			params: {

			},
			handler(ctx) {
				return Database()
					.then((db) => {
						return db.get("user").value();
					});
			}
		},


		//	call "user.get" --id "ab@ab"
		get: {
			params: {
				id: "string"
			},
			handler(ctx) {
				return ctx.call("user.verify", { id: ctx.params.id })
				.then((exists) => {
					if (exists) {
						return Database()
							.then((db) => {
								var user = db.get("user").find({ id: ctx.params.id }).value();;
								return user;
							})
							.catch(() => {
								return new MoleculerError("User", 500, "ERR_CRITIAL", { code: 500, message: "Critical error" } )
							});
					} else {
						return new MoleculerError("User", 404, "NOT FOUND", { code: 404, message: "User doesn't exists" } )
					}
				})
			}
		},

		//	call "user.verify" --id
		verify: {
			params: {
				id: "string"
			},
			handler(ctx) {
				return Database()
					.then((db) => {
						var value = db.get("user")
										.filter({ id: ctx.params.id })
										.value();
						return value.length > 0 ? true : false;
					})
			}
		}
	}
}