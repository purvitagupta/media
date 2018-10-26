## Extra Field Settings Provider

### INTRODUCTION
This module provides an interface and the extra field base plugins with
editable display settings.

### REQUIREMENTS
[Extra Field](
https://www.drupal.org/project/extra_field)

### INSTALLATION
For installing the module, just download the source code and enable the module.

### CONFIGURATION
The module does not have a configuration page. You can find all extra field
plugins in <b>Reports > Extra Fields list</b>.

### USES
To provide the extra field plugin with display settings you must at least
implement the `ExtraFieldPlusDisplayInterface`.
But there are two base plugins which can help you with this. Just extend
`ExtraFieldPlusDisplayBase` or `ExtraFieldPlusDisplayFormattedBase` plugins.
All yours extra field plugins have to be placed in
<b>your_custom_module/src/Plugin/ExtraField/Display</b> folder.

### EXAMPLES
Example plugins with simple and formatted output are in
<b>extra_field_plus_example</b> module.

#### CURRENT MAINTAINERS
  - [Andrew Tsiupiakh](https://www.drupal.org/user/3302731)
