import antfu from "@antfu/eslint-config"

export default antfu(
	{
		formatters: true,
		react: true,

		stylistic: {
			indent: "tab",
			quotes: "double",
			semi: false
		},
		type: "lib",

		typescript: true
	},
	{
		rules: {
			"antfu/consistent-chaining": [
				"error",
				{ allowLeadingPropertyAccess: true }
			],
			"antfu/no-top-level-await": "off",
			"jsonc/sort-keys": [
				"error",
				{
					order: [
						"name",
						"version",
						"private",
						"publishConfig",
						"description",
						"scripts",
						"dependencies",
						"devDependencies",
						"peerDependencies",
						"engines",
						"eslintConfig"
					],
					pathPattern: "^$"
				},
				{
					order: { type: "asc" },
					pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies$"
				}
			],
			"no-console": "warn",
			"node/no-process-env": "error",
			"node/prefer-global/process": "off",
			"perfectionist/sort-array-includes": "error",
			"perfectionist/sort-imports": "error",
			"perfectionist/sort-maps": "error",
			"perfectionist/sort-named-exports": "error",
			"perfectionist/sort-named-imports": "error",
			"perfectionist/sort-objects": ["error", { order: "asc", type: "alphabetical" }],
			"style/comma-dangle": ["error", { functions: "never" }],
			"ts/consistent-type-definitions": ["error", "type"],
			"ts/no-redeclare": "off",
			"unicorn/filename-case": [
				"error",
				{
					case: "kebabCase",
					ignore: ["README.md"]
				}
			]
		}
	}
)
