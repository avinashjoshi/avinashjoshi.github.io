---
layout: post
title: ui-select broken with AngularJS 1.5.0
tags: AngularJS angular ui-select broken 1.5.0
---
I recently upgraded my AngularJS app to v1.5.0 and it broke my [ui-select](https://github.com/angular-ui/ui-select) with the following error:
```
Error: [ui.select:transcluded] Expected 1 .ui-select-match but got '0'.
    at http://kinwealth.dev/libs/ui-select/select.min.js:7:2362
    at http://kinwealth.dev/libs/ui-select/select.min.js:7:16268
    at http://kinwealth.dev/scripts/vendor.5d896021.js:4:17269
    at http://kinwealth.dev/scripts/vendor.5d896021.js:4:19883
    at K.d (http://kinwealth.dev/scripts/vendor.5d896021.js:4:18237)
    at j (http://kinwealth.dev/scripts/vendor.5d896021.js:4:21046)
    at http://kinwealth.dev/libs/ui-select/select.min.js:7:16079
    at ga (http://kinwealth.dev/scripts/vendor.5d896021.js:4:28917)
    at s (http://kinwealth.dev/scripts/vendor.5d896021.js:4:22226)
    at http://kinwealth.dev/scripts/vendor.5d896021.js:4:26565 <div class="ui-select-container ui-select-multiple ui-select-bootstrap dropdown form-control" ng-class="{open: $select.open}" ng-model="vm.client.users" theme="bootstrap" ng-disabled="disabled">
```

Upon searching the internet, the workaround is pretty simple as pointed out by [llafuente](https://github.com/angular-ui/ui-select/issues/1325#issuecomment-160922087):

> Add class to ui-select-match and ui-select-choices with the same name

So all I did was add the class `ui-select-match` and `ui-select-choices` to `<ui-select-match>` and `<ui-select-choices>` tags respectively.