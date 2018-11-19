- [-] Selected theme value should be saved in settings ==> So can be overrided, persisted, etc
- [-] Theme selection should be done through hook
- [-] Provider should be auto injected
- [-] Have a default theme

- [-] Themes should provide styles for components by saving them in a key-value pair.
- [-] ComponentRegistry should auto inject styles in a component if they're available in the theme.
- [-] components may have defaultStyles prop or/and put them in component registry? BOTH
- [-] withStyles hoc? NO.

- [-] How to override themes?
- [-] Themes should be overrideable through boot options aka bluebase.js.
- [-] Themes should be overrideable on a per-component usage
- [-] Themes should be overrideable on every-component usage
- [-] Extend themes through createTheme

Notes:

- themes prop in bluebase.js overrides all themes