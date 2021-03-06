Extentions are made of different, but cohesive, components. \* COmponents can include "background scripts", "content scripts", an
"option page", "UI Element", and various logic files.

    * Extention Components are created with HTML, CSS, and Javascript.

Extentions must fulfill a single purpose that is narrowly defined and easy to understand.

Create the manifest
{
// required
"name":"name of project",
"version":"current version of the project",
"manifest_version":""

    // Recommended
    "action": {...},
    "default_locale": "en",
    "description":"brief description",
    "icons":{...}

    // OPtional

    // Optional

"action": ...,
"author": ...,
"automation": ...,
"background": {
    
// Required
"service_worker":
},
"chrome_settings_overrides": {...},
"chrome_url_overrides": {...},
"commands": {...},
"content_capabilities": ...,
"content_scripts": [{...}],
"content_security_policy": "policyString",
"converted_from_user_script": ...,
"current_locale": ...,
"declarative_net_request": ...,
"devtools_page": "devtools.html",
"differential_fingerprint": ...,
"event_rules": [{...}],
"externally_connectable": {
"matches": ["*://*.example.com/*"]
},
"file_browser_handlers": [...],
"file_system_provider_capabilities": {
"configurable": true,
"multiple_mounts": true,
"source": "network"
},
"homepage_url": "http://path/to/homepage",
"host_permissions": [...],
"import": [{"id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}],
"incognito": "spanning, split, or not_allowed",
"input_components": ...,
"key": "publicKey",
"minimum_chrome_version": "versionString",
"nacl_modules": [...],
"natively_connectable": ...,
"oauth2": ...,
"offline_enabled": true,
"omnibox": {
"keyword": "aString"
},
"optional_permissions": ["tabs"],
"options_page": "options.html",
"options_ui": {
"chrome_style": true,
"page": "options.html"
},
"permissions": ["tabs"],
"platforms": ...,
"replacement_web_app": ...,
"requirements": {...},
"sandbox": [...],
"short_name": "Short Name",
"storage": {
"managed_schema": "schema.json"
},
"system_indicator": ...,
"tts_engine": {...},
"update_url": "http://path/to/updateInfo.xml",
"version_name": "aString",
"web_accessible_resources": [...]
}
