"use strict";

const Database = require("../adapters/Database");
const Models = require("../models");
const { MoleculerError } = require("moleculer").Errors;

module.exports = {
	name: "utilisateur",

	settings: {
 		state: {

 		}
	},

	actions: {

		//	call "utilisateur.getAll"
		getAll: {
			params: {

			},
			handler(ctx) {
				return Database()
					.then((db) => {
						return db.get("utilisateur").value();
					});
			}
		},


		//	call "utilisateur.get" --id "ab@ab"
		get: {
			params: {
				id: "string"
			},
			handler(ctx) {
				return ctx.call("utilisateur.verify", { id: ctx.params.id })
				.then((exists) => {
					if (exists) {
						return Database()
							.then((db) => {
								var user = db.get("utilisateur").find({ id: ctx.params.id }).value();;
								return user;
							})
							.catch(() => {
								return new MoleculerError("Utilisateur", 500, "ERR_CRITIAL", { code: 500, message: "Critical error" } )
							});
					} else {
						return new MoleculerError("Utilisateur", 404, "NOT FOUND", { code: 404, message: "Utilisateur doesn't exists" } )
					}
				})
			}
		},

		//	call "utilisateur.verify" --id
		verify: {
			params: {
				id: "string"
			},
			handler(ctx) {
				return Database()
					.then((db) => {
						var value = db.get("utilisateur")
										.filter({ id: ctx.params.id })
										.value();
						return value.length > 0 ? true : false;
					})
			}
		}
	}
}